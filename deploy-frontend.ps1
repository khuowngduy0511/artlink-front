# Deploy Frontend with Refresh Token Fix
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   DEPLOY FRONTEND - FIX REFRESH TOKEN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
Set-Location "d:\Clone\artworks-sharing-platform"

Write-Host "[1/5] Git Status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "[2/5] Adding changes..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "[3/5] Committing..." -ForegroundColor Yellow
git commit -m "Fix refresh token logic - use refreshToken instead of accessToken"

Write-Host ""
Write-Host "[4/5] Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   DEPLOYMENT TRIGGERED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Vercel will auto-deploy from GitHub" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT: Set Environment Variables on Vercel Dashboard!" -ForegroundColor Red
Write-Host ""
Write-Host "📋 Go to: https://vercel.com/dashboard" -ForegroundColor Cyan
Write-Host "   → Select project 'artlink-front'" -ForegroundColor Cyan
Write-Host "   → Settings → Environment Variables" -ForegroundColor Cyan
Write-Host "   → Add variables from .env.production" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 See VERCEL_ENV_CHECK.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""
Write-Host "[5/5] Opening Vercel dashboard..." -ForegroundColor Yellow
Start-Process "https://vercel.com/dashboard"

Write-Host ""
Write-Host "✅ Done! Wait 2-3 minutes for deployment to complete" -ForegroundColor Green
Write-Host ""
