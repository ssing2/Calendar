# 一键部署指南 🚀

## 快速部署脚本

我已经为您创建了多个部署脚本，可以一次性完成：GitHub提交 + Vercel生产部署

### 🎯 **推荐使用**: `quick-deploy-simple.ps1`

#### 使用方法
```powershell
# 在项目根目录执行
.\quick-deploy-simple.ps1
```

#### 执行流程
1. **📤 Git提交**: 自动添加所有更改并提交
2. **🔄 GitHub推送**: 通过SSH推送到远程仓库  
3. **🚀 Vercel部署**: 自动部署到生产环境

#### 功能特点
- ✅ 自动生成时间戳提交信息
- ✅ 可自定义提交信息
- ✅ 一键完成整个发布流程
- ✅ 彩色输出，状态清晰

### 📋 **可选脚本**

#### 1. `quick-deploy.bat` (批处理版本)
```cmd
quick-deploy.bat
```

#### 2. `deploy.bat` (完整版本)
```cmd
deploy.bat
```
- 包含更多检查和确认步骤
- 显示部署文件列表
- 有部署前确认提示

### 🌐 **最新部署地址**
https://calendar2026v2-hqut95a9g-ssing2s-projects.vercel.app

### ⚡ **使用示例**
```powershell
PS D:\Web2088\Calendar> .\quick-deploy-simple.ps1

⚡ 快速部署到 GitHub + Vercel 生产环境

💬 提交信息 (直接回车使用默认): 修复下载功能

📤 1/3 Git提交...
[master abc1234] 修复下载功能
 2 files changed, 50 insertions(+), 10 deletions(-)

🔄 2/3 推送到GitHub...
✅ 推送成功

🚀 3/3 部署到Vercel...
✅ Production: https://calendar2026v2-xxx.vercel.app

✅ 部署流程完成！
```

### 💡 **使用建议**

1. **日常更新**: 使用 `quick-deploy-simple.ps1`
2. **重要发布**: 使用 `deploy.bat` (有确认步骤)
3. **快速修复**: 直接运行脚本，使用默认提交信息

### 🔧 **故障排除**

如果遇到问题，可以手动执行命令：
```powershell
git add .
git commit -m "您的提交信息"
git push
vercel --prod
```

### 📝 **注意事项**

- 确保在项目根目录运行脚本
- SSH配置必须正常 (已配置完成)
- Vercel CLI必须已安装 (已安装)
- 网络连接正常

---

**现在您只需要一个命令就能完成整个发布流程！** 🎉
