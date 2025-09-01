@echo off
chcp 65001 >nul
title Vercel 部署修复工具

echo.
echo 🔧 Vercel 配置修复完成!
echo ==========================================
echo.

echo ✅ 已修复的问题:
echo    - 移除了有问题的正则表达式
echo    - 简化了 vercel.json 配置
echo    - 保留了基本的安全头设置
echo.

echo 📄 当前 vercel.json 内容:
type vercel.json
echo.

echo 🚀 现在可以重新部署:
echo.
echo 选择部署方法:
echo [1] 使用 Vercel CLI
echo [2] 使用 GitHub 自动部署
echo [3] 检查配置文件
echo [4] 退出
echo.

set /p choice="请选择 (1-4): "

if "%choice%"=="1" (
    echo.
    echo 🚀 使用 Vercel CLI 部署...
    echo 确保已安装 Vercel CLI: npm i -g vercel
    echo.
    vercel --prod
    if %errorlevel% equ 0 (
        echo ✅ 部署成功!
    ) else (
        echo ❌ 部署失败，请检查错误信息
    )
) else if "%choice%"=="2" (
    echo.
    echo 📝 GitHub 自动部署步骤:
    echo 1. 提交修复到 GitHub:
    echo    git add vercel.json
    echo    git commit -m "Fix vercel.json configuration"
    echo    git push origin master
    echo.
    echo 2. 在 Vercel 控制台:
    echo    - 访问 https://vercel.com/dashboard
    echo    - 找到您的项目
    echo    - 点击 "Redeploy"
    echo.
) else if "%choice%"=="3" (
    echo.
    echo 📋 配置文件检查:
    echo.
    echo vercel.json:
    type vercel.json
    echo.
    echo .vercelignore:
    if exist .vercelignore (
        type .vercelignore
    ) else (
        echo 文件不存在
    )
) else (
    echo 退出...
    exit /b 0
)

echo.
pause
