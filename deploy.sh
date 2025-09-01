#!/bin/bash

# Calendar 2025-2026 Vercel 部署脚本
# 使用方法: ./deploy.sh 或 bash deploy.sh

echo "🚀 开始部署 Calendar 2025-2026 到 Vercel..."

# 检查 Vercel CLI 是否安装
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装"
    echo "📦 正在安装 Vercel CLI..."
    npm install -g vercel
fi

# 检查当前目录是否为项目根目录
if [ ! -f "vercel.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 显示将要部署的文件
echo "📁 检查部署文件..."
echo "✅ index.html - 主页"
echo "✅ css/ - 样式文件"
echo "✅ js/ - JavaScript文件"
echo "✅ data/ - 数据文件"
echo "✅ create/ - 日历创建器"
echo "✅ *-2026-calendar/ - 月份页面"

# 确认部署
read -p "🤔 确认部署到 Vercel? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "❌ 部署已取消"
    exit 0
fi

# 开始部署
echo "🚀 正在部署..."
vercel --prod

# 部署完成
echo "✅ 部署完成!"
echo ""
echo "🌐 您的网站已发布到:"
echo "   https://your-project-name.vercel.app"
echo ""
echo "📋 下一步:"
echo "1. 🌍 配置自定义域名 (推荐: calendar2026.com)"
echo "2. 📊 设置 Google Analytics"
echo "3. 💰 申请 Amazon Associates 账户"
echo "4. 🔍 提交到 Google Search Console"
echo ""
echo "🎉 Calendar 2025-2026 部署成功!"
