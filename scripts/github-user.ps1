$envPath = Join-Path $PSScriptRoot "..\credentials\github.env"
$token = (Get-Content $envPath -Raw) -replace '\s', '\n' | ConvertFrom-StringData
if (-not $token.GITHUB_TOKEN) { throw "Please set GITHUB_TOKEN in credentials/github.env" }
Invoke-RestMethod 'https://api.github.com/user' -Headers @{ Authorization = "token $($token.GITHUB_TOKEN)" }
