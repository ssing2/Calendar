@echo off
chcp 65001 >nul
title Calendar 2025-2026 GitHub 上传工具

echo.
echo 📚 Calendar 2025-2026 GitHub 上传工具
echo ==========================================
echo.

REM 检查 Git 是否安装
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git 未安装
    echo 📥 请先安装 Git: https://git-scm.com/
    echo.
    pause
    exit /b 1
)

echo ✅ Git 已安装
echo.

REM 检查当前目录
if not exist "index.html" (
    echo ❌ 错误: 请在项目根目录运行此脚本
    echo 📁 当前目录应包含 index.html 文件
    pause
    exit /b 1
)

echo 📁 当前项目目录: %CD%
echo.

REM 显示将要上传的文件
echo 📄 将要上传的主要文件:
echo    ✅ index.html - 主页
echo    ✅ css/ - 样式文件
echo    ✅ js/ - JavaScript文件
echo    ✅ data/ - 数据文件
echo    ✅ create/ - 日历创建器
echo    ✅ *-2026-calendar/ - 12个月份页面
echo    ✅ vercel.json - 部署配置
echo.

echo 🚫 将被忽略的文件 (根据 .gitignore):
echo    📄 文档文件 (*.md)
echo    🧪 测试文件 (test.html, logo-selection.html)
echo    📦 备份文件 (index-backup.html, index-fixed.html)
echo.

REM 获取仓库信息
set /p repo_name="📝 输入仓库名称 [calendar-2025-2026]: "
if "%repo_name%"=="" set repo_name=calendar-2025-2026

set /p repo_desc="📝 输入仓库描述 [Free Calendar 2025-2026 Templates]: "
if "%repo_desc%"=="" set repo_desc=Free Calendar 2025-2026 Templates

set /p github_user="👤 输入您的 GitHub 用户名: "
if "%github_user%"=="" (
    echo ❌ GitHub 用户名不能为空
    pause
    exit /b 1
)

echo.
echo 📋 仓库信息确认:
echo    📦 仓库名: %repo_name%
echo    📝 描述: %repo_desc%
echo    👤 用户: %github_user%
echo    🌐 URL: https://github.com/%github_user%/%repo_name%
echo.

set /p confirm="🤔 确认创建并上传到 GitHub? (y/N): "
if /i not "%confirm%"=="y" (
    echo ❌ 操作已取消
    pause
    exit /b 0
)

echo.
echo 🚀 开始上传过程...
echo.

REM 初始化 Git 仓库
echo 1️⃣ 初始化 Git 仓库...
git init
if %errorlevel% neq 0 (
    echo ❌ Git 初始化失败
    pause
    exit /b 1
)

REM 设置默认分支为 main
git branch -M main

REM 添加所有文件
echo 2️⃣ 添加文件到 Git...
git add .
if %errorlevel% neq 0 (
    echo ❌ 添加文件失败
    pause
    exit /b 1
)

REM 创建首次提交
echo 3️⃣ 创建首次提交...
git commit -m "Initial commit: Calendar 2025-2026 website with professional logo and 12 monthly templates"
if %errorlevel% neq 0 (
    echo ❌ 提交失败
    pause
    exit /b 1
)

REM 添加远程仓库
echo 4️⃣ 添加远程仓库...
git remote add origin https://github.com/%github_user%/%repo_name%.git
if %errorlevel% neq 0 (
    echo ❌ 添加远程仓库失败
    echo 💡 请确保您已在 GitHub 上创建了仓库: %repo_name%
    pause
    exit /b 1
)

REM 推送到 GitHub
echo 5️⃣ 推送到 GitHub...
echo 🔐 请输入您的 GitHub 凭据...
git push -u origin main
if %errorlevel% equ 0 (
    echo.
    echo ✅ 上传成功!
    echo.
    echo 🌐 您的仓库地址:
    echo    https://github.com/%github_user%/%repo_name%
    echo.
    echo 🚀 下一步 - Vercel 部署:
    echo 1. 访问 https://vercel.com
    echo 2. 点击 "Import Project"
    echo 3. 选择您的 GitHub 仓库: %repo_name%
    echo 4. Vercel 会自动检测配置并部署
    echo.
    echo 📋 部署后检查:
    echo    ✅ 主页加载正常
    echo    ✅ Logo 显示正确 (Calendar 2025-2026)
    echo    ✅ 所有月份页面可访问
    echo    ✅ 日历创建器功能正常
    echo.
    echo 🎉 Calendar 2025-2026 已成功上传到 GitHub!
) else (
    echo.
    echo ❌ 推送失败
    echo.
    echo 💡 可能的解决方案:
    echo 1. 确保您已在 GitHub 上创建了名为 "%repo_name%" 的仓库
    echo 2. 检查 GitHub 用户名是否正确
    echo 3. 确保您有推送权限
    echo 4. 尝试使用 GitHub Personal Access Token
    echo.
    echo 📝 手动创建仓库:
    echo 1. 访问 https://github.com/new
    echo 2. 仓库名: %repo_name%
    echo 3. 描述: %repo_desc%
    echo 4. 设为 Public
    echo 5. 不要初始化 README (因为我们已经有内容)
    echo 6. 创建后重新运行此脚本
)

echo.
pause
