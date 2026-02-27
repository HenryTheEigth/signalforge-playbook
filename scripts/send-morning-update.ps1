$workspace = "$PSScriptRoot\.." | Resolve-Path -Relative
$path = Join-Path $workspace "knowledge\morning-update.md"
$msg = Get-Content $path -Raw
openclaw message send --channel telegram --message "$msg"