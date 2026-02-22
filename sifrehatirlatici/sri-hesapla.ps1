# SRI Hash Hesaplama Scripti
# VS Code terminalinde calistirin: .\sri-hesapla.ps1

$urls = @{
    "argon2" = "https://cdnjs.cloudflare.com/ajax/libs/argon2-browser/1.18.0/argon2-bundled.min.js"
    "fb-app"  = "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
    "fb-auth" = "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"
    "fb-db"   = "https://www.gstatic.com/firebasejs/10.12.0/firebase-database-compat.js"
}

Write-Host "`n=== SRI Hash Hesaplaniyor ===" -ForegroundColor Cyan

foreach ($ad in $urls.Keys) {
    $url = $urls[$ad]
    Write-Host "`n[$ad] indiriliyor..." -ForegroundColor Yellow
    $bytes = (Invoke-WebRequest -Uri $url -UseBasicParsing).Content
    $sha384 = [System.Security.Cryptography.SHA384]::Create()
    $hash = $sha384.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($bytes))
    $b64 = [Convert]::ToBase64String($hash)
    Write-Host "integrity=`"sha384-$b64`"" -ForegroundColor Green
    Write-Host "URL: $url"
}

Write-Host "`n=== Tamamlandi ===" -ForegroundColor Cyan
Write-Host "Yukaridaki integrity degerlerini sifrehatirlatici.html dosyasindaki" -ForegroundColor White
Write-Host "ilgili <script> taglarinin integrity="" atributune yapistirin." -ForegroundColor White
