document.addEventListener('DOMContentLoaded', function() {
    // Initialize Select2 for searchable dropdowns
    $(document).ready(function() {
        $('.searchable-select').select2({
            placeholder: "Search and select...",
            allowClear: true
        });
        
        // Fix for Select2 with icon
        $('.select2-selection').css('padding-left', '28px');
    });
    
    // File upload handling
    const fileInput = document.getElementById('file-upload');
    const fileLabel = document.getElementById('file-name');
    const fileContainer = document.querySelector('.file-upload-container');
    
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            fileLabel.textContent = fileInput.files[0].name;
            fileContainer.style.borderColor = '#ff6b4a';
            fileContainer.style.backgroundColor = '#fff8f6';
        } else {
            fileLabel.textContent = 'Drag & drop or click to upload';
            fileContainer.style.borderColor = '#ddd';
            fileContainer.style.backgroundColor = '#f9f9f9';
        }
    });
    
    // Drag and drop support
    fileContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
        fileContainer.style.borderColor = '#ff6b4a';
        fileContainer.style.backgroundColor = '#fff8f6';
    });
    
    fileContainer.addEventListener('dragleave', function(e) {
        e.preventDefault();
        if (fileInput.files.length === 0) {
            fileContainer.style.borderColor = '#ddd';
            fileContainer.style.backgroundColor = '#f9f9f9';
        }
    });
    
    fileContainer.addEventListener('drop', function(e) {
        e.preventDefault();
    });
    
    // Add animation for form inputs
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add
