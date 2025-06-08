// main.js
document.addEventListener('DOMContentLoaded', function() {
    const components = ['header', 'footer', 'banner', 'testimonial', 'totalServices', 'why', 'reason' , 'about', 'layanan'];
    
    components.forEach(component => {
        const element = document.getElementById(component);
        if (element) {
            fetch(`./src/components/${component}.html`)
                .then(response => response.text())
                .then(data => {
                    element.innerHTML = data;

                    if (component === 'header') {
                        // jalankan init navbar setelah header load
                        if (window.initNavbar) window.initNavbar();
                    }

                    // Jalankan init function jika ada setelah konten dimuat
                    if (window[`init_${component}`]) {
                        window[`init_${component}`]();
                    }
                })
                .catch(error => console.error('Error loading component:', error));
        }
    });
});
