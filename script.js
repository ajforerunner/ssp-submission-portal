document.addEventListener('DOMContentLoaded', function() {
    // Test FormSubmit connection
    testFormSubmit();
    
    // Load subcontractors and projects from JSON files
    loadSubcontractors();
    loadProjects();
    
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
            this.closest('.form-group').classList.add('filled');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.closest('.form-group').classList.remove('filled');
            }
        });
        
        // Check if the input already has a value (for page refresh cases)
        if (input.value) {
            input.closest('.form-group').classList.add('filled');
        }
    });

    // Form submission handling
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const form = this;
        const formData = new FormData(form);
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        // Submit via fetch API
        fetch('https://formsubmit.co/ajax/byesukbiprojects.uk@equans.com', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Redirect to thank you page
            window.location.href = 'thanks.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your form. Please try again.');
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
});

// Function to test FormSubmit connection
function testFormSubmit() {
    // Test if FormSubmit is properly connected
    fetch('https://formsubmit.co/ajax/byesukbiprojects.uk@equans.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            test: 'Testing FormSubmit connection',
            email: 'test@example.com'
        })
    })
    .then(response => response.json())
    .then(data => console.log('FormSubmit test response:', data))
    .catch(error => console.error('FormSubmit test error:', error));
}

// Function to load subcontractors from JSON file
function loadSubcontractors() {
    fetch('subcontractors.json')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('subcontractor');
            // Clear existing options except the first one
            while (selectElement.options.length > 1) {
                selectElement.remove(1);
            }
            
            // Add new options
            data.forEach(contractor => {
                const option = document.createElement('option');
                option.value = contractor;
                option.textContent = contractor;
                selectElement.appendChild(option);
            });
            
            // Refresh Select2 if it's initialized
            if ($.fn.select2) {
                $('#subcontractor').select2('destroy').select2({
                    placeholder: "Search and select...",
                    allowClear: true
                });
                $('.select2-selection').css('padding-left', '28px');
            }
        })
        .catch(error => console.error('Error loading subcontractors:', error));
}

// Function to load projects from JSON file
function loadProjects() {
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('project');
            // Clear existing options except the first one
            while (selectElement.options.length > 1) {
                selectElement.remove(1);
            }
            
            // Add new options
            data.forEach(project => {
                const option = document.createElement('option');
                option.value = project;
                option.textContent = project;
                selectElement.appendChild(option);
            });
            
            // Refresh Select2 if it's initialized
            if ($.fn.select2) {
                $('#project').select2('destroy').select2({
                    placeholder: "Search and select...",
                    allowClear: true
                });
                $('.select2-selection').css('padding-left', '28px');
            }
        })
        .catch(error => console.error('Error loading projects:', error));
}
