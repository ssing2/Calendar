# 快速部署脚本 - GitHub + Vercel
Write-Host ""
Write-Host "⚡ 快速部署到 GitHub + Vercel 生产环境" -ForegroundColor Cyan
Write-Host ""

# 获取提交信息
$commitMsg = Read-Host "💬 提交信息 (直接回车使用默认)"
if ([string]::IsNullOrEmpty($commitMsg)) {
    $commitMsg = "快速更新和部署 - $(Get-Date -Format 'MM-dd HH:mm')"
}

Write-Host ""
Write-Host "📤 1/3 Git提交..." -ForegroundColor Yellow
git add .
git commit -m "$commitMsg"

Write-Host "🔄 2/3 推送到GitHub..." -ForegroundColor Yellow  
git push

Write-Host "🚀 3/3 部署到Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host ""
Write-Host "✅ 部署流程完成！" -ForegroundColor Green
Write-Host ""
Read-Host "按回车键退出"
