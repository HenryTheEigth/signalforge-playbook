$envPath = Join-Path $PSScriptRoot "..\credentials\github.env"
$token = (Get-Content $envPath -Raw) -replace '\s', '\n' | ConvertFrom-StringData
if (-not $token.GITHUB_TOKEN) { throw "Please set GITHUB_TOKEN in credentials/github.env" }
$body = @{ name = 'signalforge-playbook'; description = 'Signalforge AI Playbook Builder' } | ConvertTo-Json
Invoke-RestMethod 'https://api.github.com/user/repos' -Method Post -Headers @{ Authorization = "token $($token.GITHUB_TOKEN)"; 'User-Agent' = 'OpenClaw-Agent' } -Body $body
