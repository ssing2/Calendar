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

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Git提交成功" -ForegroundColor Green
} else {
    Write-Host "❌ Git提交失败" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

Write-Host "🔄 2/3 推送到GitHub..." -ForegroundColor Yellow
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ GitHub推送成功" -ForegroundColor Green
} else {
    Write-Host "❌ GitHub推送失败" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

Write-Host "🚀 3/3 部署到Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 部署完成！网站已更新" -ForegroundColor Green
    Write-Host "🌐 您的更改已发布到生产环境" -ForegroundColor Green
} else {
    Write-Host "❌ Vercel部署失败，请检查错误信息" -ForegroundColor Red
}

Write-Host ""
Read-Host "按回车键退出"
