// Add any JavaScript functionality here
document.addEventListener('DOMContentLoaded', function() {
    // Load components
    const components = ['header', 'footer', 'hero', 'testimonial'];
    
    components.forEach(component => {
        const element = document.getElementById(component);
        if (element) {
            fetch(`../components/${component}.html`)
                .then(response => response.text())
                .then(data => {
                    element.innerHTML = data;
                })
                .catch(error => console.error('Error loading component:', error));
        }
    });
}); 