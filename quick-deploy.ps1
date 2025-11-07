# Quick Deploy Script for Frontend
# Run this to deploy fixes to Vercel

Write-Host "🚀 Deploying Frontend Fixes to Vercel..." -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
Set-Location "D:\Clone\artworks-sharing-platform"

# Check git status
Write-Host "📊 Current Git Status:" -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "📦 Adding modified files..." -ForegroundColor Yellow

# Add modified files
git add .env.production
git add src/layout/HomeScreen/CategoryAndTag/CategoryCarousel/CategoryCarousel.tsx
git add src/components/TagCarousel.tsx
git add public/manifest.json
git add VERCEL_DEPLOY_GUIDE.md

# Show what will be committed
Write-Host ""
Write-Host "📝 Files to commit:" -ForegroundColor Yellow
git diff --cached --name-only

Write-Host ""
$confirm = Read-Host "Continue with commit? (y/n)"

if ($confirm -eq 'y' -or $confirm -eq 'Y') {
    # Commit
    Write-Host ""
    Write-Host "💾 Committing changes..." -ForegroundColor Yellow
    git commit -m "Fix production build: Update env vars, add array validation, fix manifest

- Fix TypeError: t.map is not a function in CategoryCarousel and TagCarousel
- Update .env.production with correct Render backend URLs
- Fix manifest.json logo references
- Add VERCEL_DEPLOY_GUIDE.md for deployment instructions"

    # Push
    Write-Host ""
    Write-Host "🚢 Pushing to GitHub..." -ForegroundColor Yellow
    git push origin main

    Write-Host ""
    Write-Host "✅ DONE! Vercel will auto-deploy in 2-3 minutes." -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to https://vercel.com/dashboard" -ForegroundColor White
    Write-Host "2. Check deployment status in 'artlink-front' project" -ForegroundColor White
    Write-Host "3. Add Environment Variables (see VERCEL_DEPLOY_GUIDE.md)" -ForegroundColor White
    Write-Host "4. Test: https://artlink-front.vercel.app" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 Full guide: D:\Clone\artworks-sharing-platform\VERCEL_DEPLOY_GUIDE.md" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "❌ Deployment cancelled." -ForegroundColor Red
}
