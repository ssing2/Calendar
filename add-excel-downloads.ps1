$months = @("January", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")

foreach ($month in $months) {
    $monthLower = $month.ToLower()
    $fileName = "d:\Web2088\Calendar\$monthLower-2026-calendar\index.html"
    
    if (Test-Path $fileName) {
        Write-Host "Adding Excel download to $month calendar page..."
        
        # Read the file content
        $content = Get-Content $fileName -Raw
        
        # Find and replace the download button section
        $oldPattern = '(\s+<button onclick="download' + $month + 'Calendar\(\)" class="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-colors">\s+Download PDF\s+</button>)'
        
        $newButtons = @"
                    <button onclick="download$($month)Calendar('pdf')" class="border-2 border-primary-600 text-primary-600 px-6 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-colors">
                        📄 Download PDF
                    </button>
                    <button onclick="download$($month)Calendar('excel')" class="border-2 border-green-600 text-green-600 px-6 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
                        📊 Download Excel
                    </button>
"@
        
        # Use regex to replace
        $updatedContent = $content -replace $oldPattern, $newButtons
        
        # Also update the function definition
        $oldFunctionPattern = "function download$($month)Calendar\(\) \{\s+downloadMonthlyCalendar\('$month', 'pdf'\);\s+\}"
        $newFunction = "function download$($month)Calendar(format = 'pdf') { downloadMonthlyCalendar('$month', format); }"
        
        $updatedContent = $updatedContent -replace $oldFunctionPattern, $newFunction
        
        # Write the updated content back to the file
        Set-Content $fileName -Value $updatedContent -Encoding UTF8
        
        Write-Host "$month calendar updated with Excel download!"
    } else {
        Write-Host "File not found: $fileName"
    }
}

Write-Host "All calendar pages now have both PDF and Excel download options!"
