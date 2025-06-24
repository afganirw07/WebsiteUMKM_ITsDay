// main.js
document.addEventListener('DOMContentLoaded', function() {
    const components = ['header', 'footer', 'banner', 'testimonial', 'totalServices', 'why', 'reason' , 'about', 'chat' , 'contact', 'layanan', 'partner' , 'sponsor', "procces2"];
    
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

                    // Tambahan khusus testimonial agar updateTestimonial dipanggil setelah komponen dimuat
                    if (component === 'testimonial' && window.updateTestimonial) {
                        window.updateTestimonial();
                        // Re-attach event listeners for arrows
                        document.getElementById('testimonial-prev').onclick = window.showPrevTestimonial;
                        document.getElementById('testimonial-next').onclick = window.showNextTestimonial;
                        document.querySelectorAll('#testimonial-dots button').forEach(btn => {
                            btn.onclick = () => {
                                window.currentTestimonial = parseInt(btn.getAttribute('data-dot'));
                                window.updateTestimonial();
                            };
                        });
                    }
                })
                .catch(error => console.error('Error loading component:', error));
        }
    });
});
