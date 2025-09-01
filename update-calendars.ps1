$months = @("March", "April", "May", "June", "July", "August", "September", "October", "November", "December")

foreach ($month in $months) {
    $monthLower = $month.ToLower()
    $fileName = "d:\Web2088\Calendar\$monthLower-2026-calendar\index.html"
    
    if (Test-Path $fileName) {
        Write-Host "Updating $month calendar page..."
        
        # Read the file content
        $content = Get-Content $fileName -Raw
        
        # Replace the old script section with the new one
        $oldPattern = '    <!-- Scripts -->\s*<script src="../js/main\.js"></script>\s*<script>\s*function download.*?Calendar\(\) \{[^}]*\}[^<]*</script>'
        $newScript = @"
    <!-- Scripts -->
    <script src="../js/main.js"></script>
    <!-- PDF/Excel Libraries -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <!-- Universal Download Script -->
    <script src="../js/calendar-download.js"></script>
    <script>
        function download$($month)Calendar() {
            downloadMonthlyCalendar('$month', 'pdf');
        }
"@
        
        # Use regex to replace
        $updatedContent = $content -replace $oldPattern, $newScript
        
        # Write the updated content back to the file
        Set-Content $fileName -Value $updatedContent -Encoding UTF8
        
        Write-Host "$month calendar updated successfully!"
    } else {
        Write-Host "File not found: $fileName"
    }
}

Write-Host "All calendar pages have been updated with PDF/Excel download functionality!"
