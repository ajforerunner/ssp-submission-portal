document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.querySelector('form');
    const submissionType = document.getElementById('submission-type');
    
    // Show different form fields based on submission type
    submissionType.addEventListener('change', function() {
        // Add any custom logic here to show/hide fields based on the submission type
    });
    
    // Add camera capture option if available
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        const fileUploadGroup = document.getElementById('file-upload').closest('.form-group');
        
        const cameraButton = document.createElement('button');
        cameraButton.type = 'button';
        cameraButton.textContent = 'Take Photo';
        cameraButton.className = 'camera-button';
        cameraButton.onclick = openCamera;
        
        fileUploadGroup.appendChild(cameraButton);
    }
    
    function openCamera() {
        // Camera functionality would go here
        // This is a simplified example - actual implementation would be more complex
        alert('Camera functionality will be implemented in the next phase.');
    }
});
