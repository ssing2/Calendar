@echo off
chcp 65001 >nul
title Calendar 2025-2026 一键部署工具 (GitHub + Vercel)

echo.
echo 🚀 开始一键部署 Calendar 2025-2026...
echo 📋 执行步骤: Git提交 → GitHub推送 → Vercel生产部署
echo.

REM 检查Git状态
echo 📊 检查Git状态...
git status --porcelain > temp_status.txt
set /p git_changes=<temp_status.txt
del temp_status.txt

if not "%git_changes%"=="" (
    echo 📝 发现未提交的更改
    
    REM 提示用户输入提交信息
    set /p commit_msg="💬 请输入提交信息 (直接回车使用默认信息): "
    if "%commit_msg%"=="" set commit_msg=更新日历功能和修复
    
    echo.
    echo 📤 提交更改到Git...
    git add .
    git commit -m "%commit_msg%"
    
    if %errorlevel% neq 0 (
        echo ❌ Git提交失败
        pause
        exit /b 1
    )
    echo ✅ Git提交成功
) else (
    echo ✅ 工作目录干净，无需提交
)

echo.
echo 🔄 推送到GitHub (SSH方式)...
git push
if %errorlevel% neq 0 (
    echo ❌ GitHub推送失败
    echo 💡 请检查SSH配置或网络连接
    pause
    exit /b 1
)
echo ✅ GitHub推送成功

echo.
echo 🚀 部署到Vercel生产环境...
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI 未安装
    echo 📦 正在安装 Vercel CLI...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ 安装失败，请手动安装: npm install -g vercel
        pause
        exit /b 1
    )
)

REM 检查当前目录是否为项目根目录
if not exist "vercel.json" (
    echo ❌ 错误: 请在项目根目录运行此脚本
    pause
    exit /b 1
)

echo 📁 检查部署文件...
echo ✅ index.html - 主页
echo ✅ css/ - 样式文件
echo ✅ js/ - JavaScript文件
echo ✅ data/ - 数据文件
echo ✅ create/ - 日历创建器
echo ✅ *-2026-calendar/ - 月份页面
echo.

REM 显示将被忽略的文件
echo 🚫 将被忽略的文件:
echo    📄 所有 .md 文档文件
echo    🧪 测试文件 (test.html, logo-selection.html)
echo    📦 开发文件 (components/, package.json)
echo    📊 数据文件 (calendar2026.csv)
echo.

REM 确认部署
set /p confirm="🤔 确认部署到 Vercel? (y/N): "
if /i not "%confirm%"=="y" (
    echo ❌ 部署已取消
    pause
    exit /b 0
)

echo.
echo 🚀 正在部署...
echo.

REM 开始部署
vercel --prod

if %errorlevel% equ 0 (
    echo.
    echo ✅ 部署完成!
    echo.
    echo 🌐 您的网站已发布!
    echo.
    echo 📋 下一步:
    echo 1. 🌍 配置自定义域名 ^(推荐: calendar2026.com^)
    echo 2. 📊 设置 Google Analytics
    echo 3. 💰 申请 Amazon Associates 账户
    echo 4. 🔍 提交到 Google Search Console
    echo.
    echo 🎉 Calendar 2025-2026 部署成功!
) else (
    echo.
    echo ❌ 部署失败，请检查错误信息
)

echo.
pause
