document.addEventListener('DOMContentLoaded', function() {
    const components = ['header', 'footer', 'hero', 'testimonial', 'totalServices'];
    
    // ngefetch halaman
    components.forEach(component => {
        const element = document.getElementById(component);
        if (element) {
            fetch(`../components/${component}.html`)
                .then(response => response.text())
                .then(data => {
                    element.innerHTML = data;

                    // Jalankan init function jika ada setelah konten dimuat
                    if (window[`init_${component}`]) {
                        window[`init_${component}`]();
                    }
                })
                .catch(error => console.error('Error loading component:', error));
        }
    });
});
