@echo off
chcp 65001 >nul
title Calendar 2025-2026 Vercel 部署工具

echo.
echo 🚀 开始部署 Calendar 2025-2026 到 Vercel...
echo.

REM 检查 Vercel CLI 是否安装
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
