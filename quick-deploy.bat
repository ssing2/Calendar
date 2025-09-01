@echo off
chcp 65001 >nul
title 快速部署 - GitHub + Vercel

echo.
echo ⚡ 快速部署到 GitHub + Vercel 生产环境
echo.

REM 获取提交信息
set /p commit_msg="💬 提交信息 (直接回车使用默认): "
if "%commit_msg%"=="" set commit_msg=快速更新和部署

echo.
echo 📤 1/3 Git提交...
git add .
git commit -m "%commit_msg%"

echo 🔄 2/3 推送到GitHub...
git push

echo 🚀 3/3 部署到Vercel...
vercel --prod

echo.
if %errorlevel% equ 0 (
    echo ✅ 部署完成！网站已更新
) else (
    echo ❌ 部署失败，请检查错误
)
echo.
pause
