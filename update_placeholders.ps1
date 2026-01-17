$target1 = 'placeholder="017XXX XXXXXX"'
$target2 = 'placeholder="XXX XXXXXX"'
$replacement = 'placeholder="Phone number"'

$files1 = @(
    "h:\e-com\pages\seller-registration.vue",
    "h:\e-com\pages\forgot-password.vue"
)

$files2 = @(
    "h:\e-com\pages\signup.vue",
    "h:\e-com\pages\login.vue",
    "h:\e-com\pages\user-dashboard.vue",
    "h:\e-com\pages\checkout.vue",
    "h:\e-com\pages\seller-registration.vue"
)

foreach ($file in $files1) {
    if (Test-Path $file) {
        $content = Get-Content -Path $file -Raw
        $newContent = $content.Replace($target1, $replacement)
        if ($content -ne $newContent) {
            $newContent | Set-Content -Path $file -NoNewline
            Write-Host "Updated $file"
        } else {
            Write-Host "No change in $file"
        }
    } else {
        Write-Host "File not found: $file"
    }
}

foreach ($file in $files2) {
    if (Test-Path $file) {
        $content = Get-Content -Path $file -Raw
        $newContent = $content.Replace($target2, $replacement)
        if ($content -ne $newContent) {
            $newContent | Set-Content -Path $file -NoNewline
            Write-Host "Updated $file"
        } else {
            Write-Host "No change in $file"
        }
    } else {
        Write-Host "File not found: $file"
    }
}
