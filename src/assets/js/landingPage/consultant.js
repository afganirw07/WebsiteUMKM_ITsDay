// Consultant data with varied discounts
const consultants = [
    {
        name: 'Steven Muhammad Ibrahim',
        education: 'S1 Fakultas Agama Islam, Universitas Islam Negeri',
        originalPrice: 'Rp 460.000',
        discount: 25,
        discountedPrice: 'Rp 345.000',
        image: '/src/assets/img/Steven-Muhammad-Ibrahim.png'
    },
    {
        name: 'Hillary Natasha Azzahra',
        education: 'S2 Fakultas Pendidikan Islam, Universitas Al Azhar Jakarta',
        originalPrice: 'Rp 550.000',
        discount: 30,
        discountedPrice: 'Rp 385.000',
        image: '/src/assets/img/Hillary-Natasha-Azzahra.png'
    },
    {
        name: 'Fernando Sadikin',
        education: 'S1 Fakultas Agama Islam, BINUS University Jakarta',
        originalPrice: 'Rp 520.000',
        discount: 15,
        discountedPrice: 'Rp 442.000',
        image: '/src/assets/img/Fernando-Sadikin.png'
    },
    {
        name: 'Michelle Rose',
        education: 'S1 Fakultas Pendidikan Dasar, Universitas Indonesia',
        originalPrice: 'Rp 750.000',
        discount: 40,
        discountedPrice: 'Rp 450.000',
        image: '/src/assets/img/Michelle-Rose.png'
    }
];

function createConsultantCard(consultant) {
    const nameLines = consultant.name.split(' ');
    
    return `
        <div class="consultant-card bg-white rounded-[24px] shadow-lg relative h-[1100px] group transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-2xl animate-fade-in-up" style="animation-delay: ${Math.random() * 0.5}s">
            <!-- Gradient Border Effect -->
            <div class="absolute inset-0 rounded-[24px] bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 opacity-0 transition-opacity duration-500 group-hover:opacity-20"></div>

            <!-- Discount Badge -->
            <div class="absolute top-6 right-6 bg-gradient-to-br from-red-500 to-rose-600 text-center w-[65px] h-[65px] rounded-full animate-bounce shadow-lg" style="animation-delay: ${Math.random() * 0.5}s">
                <div class="flex flex-col justify-center h-full transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <span class="text-yellow-300 text-xl font-bold leading-none animate-pulse">${consultant.discount}%</span>
                    <span class="text-white text-[11px] uppercase tracking-wider">Hemat</span>
                </div>
            </div>

            <!-- Content Section -->
            <div class="p-8 space-y-8">
                <!-- Header -->
                <div class="flex justify-between items-start gap-4 group/title transform transition-all duration-500 group-hover:translate-x-2">
                    <h3 class="text-[32px] font-bold">
                        ${nameLines.map((line, index) => `
                            <div class="leading-tight hover:text-emerald-600 transition-colors duration-300 animate-fade-in-down" 
                                 style="animation-delay: ${0.1 * (index + 1)}s">
                                ${line}
                            </div>
                        `).join('')}
                    </h3>
                </div>

                <!-- Education -->
                <p class="text-base text-gray-600 leading-relaxed transform transition-all duration-500 group-hover:translate-x-2 animate-fade-in" style="animation-delay: 0.3s">
                    ${consultant.education}
                </p>

                <!-- Price Section -->
                <div class="transform transition-all duration-500 group-hover:translate-x-2 animate-fade-in" style="animation-delay: 0.4s">
                    <span class="text-gray-500 block mb-2 group-hover:text-emerald-600 transition-colors duration-300">Mulai Dari</span>
                    <div class="flex items-baseline gap-3">
                        <span class="text-2xl font-bold text-emerald-600 animate-pulse group-hover:scale-110 transition-transform duration-300">${consultant.discountedPrice}</span>
                        <span class="text-base text-gray-400 line-through group-hover:opacity-75 transition-opacity duration-300">${consultant.originalPrice}</span>
                    </div>
                </div>

                <!-- Experience Badges -->
                <div class="flex flex-wrap gap-3 animate-fade-in" style="animation-delay: 0.5s">
                    <div class="inline-flex items-center px-4 py-2 bg-teal-950 text-white rounded-lg text-sm transform transition-all duration-500 hover:scale-105 hover:bg-teal-900 hover:shadow-lg cursor-pointer group/badge">
                        <img src="/src/assets/icon/list.png" alt="Pengalaman" class="w-5 h-5 mr-2 transition-transform duration-300 group-hover/badge:rotate-12" />
                        <span class="group-hover/badge:translate-x-1 transition-transform duration-300">Pengalaman</span>
                    </div>
                    <div class="inline-flex items-center px-4 py-2 bg-teal-950 text-white rounded-lg text-sm transform transition-all duration-500 hover:scale-105 hover:bg-teal-900 hover:shadow-lg cursor-pointer group/badge">
                        <img src="/src/assets/icon/like.png" alt="Like" class="w-5 h-5 mr-2 transition-transform duration-300 group-hover/badge:rotate-12" />
                        <span class="group-hover/badge:translate-x-1 transition-transform duration-300">99+</span>
                    </div>
                </div>

                <!-- Tags Container -->
                <div class="flex flex-wrap gap-2 mb-12 animate-fade-in" style="animation-delay: 0.6s">
                    <span class="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg transform transition-all duration-500 hover:scale-105 hover:border-emerald-600 hover:text-emerald-600 hover:shadow-md cursor-pointer group-hover:translate-y-1">
                        Konsultan
                    </span>
                    <span class="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg transform transition-all duration-500 hover:scale-105 hover:border-emerald-600 hover:text-emerald-600 hover:shadow-md cursor-pointer group-hover:translate-y-1" style="transition-delay: 0.1s">
                        Auditor Halal
                    </span>
                    <span class="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg transform transition-all duration-500 hover:scale-105 hover:border-emerald-600 hover:text-emerald-600 hover:shadow-md cursor-pointer group-hover:translate-y-1" style="transition-delay: 0.2s">
                        Ekspertis Makanan
                    </span>
                </div>
            </div>

            <!-- Image Container -->
            <div class="absolute left-0 right-0 bottom-0 h-[550px] overflow-hidden rounded-b-[24px] group-hover:shadow-lg transition-shadow duration-500">
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                
                <!-- Image Wrapper -->
                <div class="w-full h-full transform transition-all duration-700 ease-out origin-bottom hover:scale-105 group-hover:translate-y-2">
                    <img src="${consultant.image}" 
                         alt="${consultant.name}"
                         class="w-full h-full object-cover object-top transition-all duration-700 group-hover:saturate-110">
                </div>

                <!-- Shine Effect -->
                <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none"></div>
            </div>
        </div>
    `;
}

function initConsultantSection() {
    const consultantSection = document.getElementById('consultant');
    if (consultantSection) {
        consultantSection.innerHTML = `
            <div class="relative bg-gradient-to-br from-yellow-50/80 via-emerald-50/30 to-white overflow-hidden">
                <!-- Animated Background Elements -->
                <div class="absolute inset-0 pointer-events-none">
                    <div class="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] left-[10%] top-0 bg-yellow-100/40 blur-[80px] animate-pulse" style="animation-duration: 3s"></div>
                    <div class="absolute w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] right-[5%] top-[20%] bg-emerald-100/30 blur-[100px] animate-pulse" style="animation-duration: 4s; animation-delay: 1s"></div>
                    <div class="absolute w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] left-[20%] bottom-[10%] bg-cyan-100/20 blur-[90px] animate-pulse" style="animation-duration: 5s; animation-delay: 2s"></div>
                </div>

                <!-- Main Content -->
                <div class="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-[1440px] mx-auto">
                    <!-- Header -->
                    <div class="text-center mb-16 animate-fade-in-down">
                        <h1 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-['Lexend'] text-gray-900 mb-4 animate-fade-in-down">
                            Hubungi Konsultan Professional
                        </h1>
                        <p class="text-base sm:text-lg lg:text-xl font-light font-['Lexend'] text-gray-700 animate-fade-in-up" style="animation-delay: 0.2s">
                            Terverifikasi Oleh MUI (Majelis Ulama Indonesia)
                        </p>
                    </div>

                    <!-- Consultant Cards Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        ${consultants.map(consultant => createConsultantCard(consultant)).join('')}
                    </div>
                </div>
            </div>
        `;

        // Add required styles to head
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            @keyframes fade-in-up {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes fade-in-down {
                0% {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes fade-in {
                0% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }
            .animate-fade-in-up {
                animation: fade-in-up 0.6s ease-out forwards;
            }
            .animate-fade-in-down {
                animation: fade-in-down 0.6s ease-out forwards;
            }
            .animate-fade-in {
                animation: fade-in 0.6s ease-out forwards;
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initConsultantSection);

// Handle window resize
window.addEventListener('resize', () => {
    // Add any specific resize handling if needed
}); 
document.addEventListener('DOMContentLoaded', initConsultantSection); 