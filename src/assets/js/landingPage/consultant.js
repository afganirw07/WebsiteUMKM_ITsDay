const consultants = [
    {
        name: 'Steven\nMuhammad\nIbrahim',
        education: 'S1 Fakultas Agama Islam, Universitas Islam Negeri',
        image: 'https://placehold.co/206x215',
        position: { left: '131.96px' }
    },
    {
        name: 'Hillary\nNatasha\nAzzahra',
        education: 'S2 Fakultas Pendidikan Islam, Universitas Al Azhar Jakarta',
        image: 'https://placehold.co/170x211',
        position: { left: '390.23px' }
    },
    {
        name: 'Fernando\nSadikin',
        education: 'S1 Fakultas Agama Islam, BINUS University Jakarta',
        image: 'https://placehold.co/198x199',
        position: { left: '648.50px' }
    },
    {
        name: 'Michelle\nRose',
        education: 'S1 Fakultas Pendidikan Dasar, Universitas Indonesia',
        image: 'https://placehold.co/188x249',
        position: { left: '906.77px' }
    }
];

function createConsultantCard(consultant) {
    return `
        <div class="w-60 h-96 absolute bg-neutral-50 rounded-[10px] shadow-[4px_4px_10px_0px_rgba(0,0,0,0.25)]" style="left: ${consultant.position.left}">
            <!-- Arrow Icon -->
            <div class="w-7 h-7 right-4 top-7 absolute overflow-hidden">
                <div class="w-2 h-3.5 left-[11.25px] top-[7.50px] absolute outline outline-2 outline-offset-[-0.89px] outline-black"></div>
            </div>

            <!-- Consultant Info -->
            <div class="w-32 h-20 left-[27px] top-[28px] absolute text-black text-xl font-bold font-['Lexend'] whitespace-pre-line">
                ${consultant.name}
            </div>

            <!-- Education -->
            <div class="w-48 h-4 left-[27px] top-[117px] absolute text-black text-[6.87px] font-light font-['Lexend']">
                ${consultant.education}
            </div>

            <!-- Experience Badge -->
            <div class="w-20 h-4 left-[27px] top-[143px] absolute bg-teal-950 rounded-[3px] flex items-center">
                <div class="w-2.5 h-2.5 ml-2 bg-white"></div>
                <span class="ml-2 text-white text-[8px] font-medium font-['Urbanist']">Pengalaman</span>
            </div>

            <!-- Rating Badge -->
            <div class="w-10 h-4 left-[114px] top-[143px] absolute bg-teal-950 rounded-[3px] flex items-center">
                <div class="w-2.5 h-2.5 ml-2 bg-white"></div>
                <span class="ml-1 text-white text-[7px] font-medium font-['Urbanist']">99+</span>
            </div>

            <!-- Skills -->
            <div class="flex gap-2 left-[27px] top-[168px] absolute">
                <div class="px-2 py-1 text-black text-[7px] font-normal font-['Urbanist'] rounded-sm border-[0.50px] border-black">
                    Konsultan
                </div>
                <div class="px-2 py-1 text-black text-[7px] font-normal font-['Urbanist'] rounded-sm border-[0.50px] border-black">
                    Auditor Halal
                </div>
                <div class="px-2 py-1 text-black text-[7px] font-normal font-['Urbanist'] rounded-sm border-[0.50px] border-black">
                    Ekspertis Makanan
                </div>
            </div>

            <!-- Consultant Image -->
            <img class="w-52 h-52 left-[27px] top-[207px] absolute object-cover" src="${consultant.image}" alt="${consultant.name}">
        </div>
    `;
}

function initConsultantSection() {
    const consultantSection = document.getElementById('consultant');
    if (consultantSection) {
        consultantSection.innerHTML = `
            <div class="w-[1280px] h-[775px] relative bg-white overflow-hidden mx-auto">
                <!-- Background Elements -->
                <div class="w-80 h-72 left-[440px] top-[-107px] absolute bg-yellow-100/80 blur-3xl"></div>
                <div class="w-96 h-96 left-[939px] top-[111px] absolute bg-emerald-200/30 blur-[50px]"></div>
                <div class="w-[585px] h-72 left-[-228px] top-[345px] absolute bg-emerald-900/30 blur-[50px]"></div>

                <!-- Section Title -->
                <div class="w-[680px] absolute left-1/2 -translate-x-1/2 top-[48px] text-center">
                    <h1 class="text-black text-[40px] font-bold font-['Lexend']">Hubungi Konsultan Professional</h1>
                </div>
                <div class="w-[532px] absolute left-1/2 -translate-x-1/2 top-[120px] text-center">
                    <h2 class="text-black text-2xl font-light font-['Lexend']">Terverifikasi Oleh MUI (Majelis Ulama Indonesia)</h2>
                </div>

                <!-- Consultant Cards Container -->
                <div class="absolute w-full max-w-[1200px] left-[47.5%] -translate-x-1/2 top-[220px] flex justify-center items-stretch gap-8">
                    <!-- Steven -->
                    <div class="w-[280px] bg-white rounded-[20px] shadow-lg p-8 relative flex flex-col">
                        <!-- Content Container -->
                        <div class="flex flex-col h-full">
                            <!-- Name and Arrow -->
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-[22px] font-bold font-['Lexend'] leading-tight">Steven<br/>Muhammad<br/>Ibrahim</h3>
                                <svg class="mt-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 6L15 12L9 18" stroke="black" stroke-width="2"/>
                                </svg>
                            </div>
                            
                            <!-- Education -->
                            <p class="text-[11px] font-light font-['Lexend'] mb-4">S1 Fakultas Agama Islam,<br/>Universitas Islam Negeri</p>
                            
                            <!-- Badges -->
                            <div class="flex gap-2 mb-3">
                                <div class="bg-teal-950 rounded-[4px] px-2 py-1 flex items-center">
                                    <div class="w-2 h-2 bg-white mr-1.5"></div>
                                    <span class="text-white text-[8px] font-medium font-['Urbanist']">Pengalaman</span>
                                </div>
                                <div class="bg-teal-950 rounded-[4px] px-2 py-1 flex items-center">
                                    <div class="w-2 h-2 bg-white mr-1"></div>
                                    <span class="text-white text-[8px] font-medium font-['Urbanist']">99+</span>
                                </div>
                            </div>
                            
                            <!-- Tags -->
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="px-3 py-1 text-[8px] font-normal font-['Urbanist'] rounded-[4px] border border-black">Konsultan</span>
                                <span class="px-3 py-1 text-[8px] font-normal font-['Urbanist'] rounded-[4px] border border-black">Auditor Halal</span>
                                <span class="px-3 py-1 text-[8px] font-normal font-['Urbanist'] rounded-[4px] border border-black">Ekspertis Makanan</span>
                            </div>
                        </div>
                        
                        <!-- Image -->
                        <div class="mt-auto -mx-8 -mb-8">
                            <img src="/src/assets/img/Steven-Muhammad-Ibrahim.png" alt="Steven Muhammad Ibrahim" class="w-full h-[300px] object-contain rounded-b-[20px]"/>
                        </div>
                    </div>

                    <!-- Hillary -->
                    <div class="w-[280px] bg-white rounded-[20px] shadow-lg p-8 relative flex flex-col">
                        <!-- Content Container -->
                        <div class="flex flex-col h-full">
                            <!-- Name and Arrow -->
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-[22px] font-bold font-['Lexend'] leading-tight">Hillary<br/>Natasha<br/>Azzahra</h3>
                                <svg class="mt-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 6L15 12L9 18" stroke="black" stroke-width="2"/>
                                </svg>
                            </div>
                            
                            <!-- Education -->
                            <p class="text-[11px] font-light font-['Lexend'] mb-4">S2 Fakultas Pendidikan Islam,<br/>Universitas Al Azhar Jakarta</p>
                            
                            <!-- Badges -->
                            <div class="flex gap-2 mb-3">
                                <div class="bg-teal-950 rounded-[4px] px-2 py-1 flex items-center">
                                    <div class="w-2 h-2 bg-white mr-1.5"></div>
                                    <span class="text-white text-[8px] font-medium font-['Urbanist']">Pengalaman</span>
                                </div>
                                <div class="bg-teal-950 rounded-[4px] px-2 py-1 flex items-center">
                                    <div class="w-2 h-2 bg-white mr-1"></div>
                                    <span class="text-white text-[8px] font-medium font-['Urbanist']">99+</span>
                                </div>
                            </div>
                            
                            <!-- Tags -->
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="px-3 py-1 text-[8px] font-normal font-['Urbanist'] rounded-[4px] border border-black">Konsultan</span>
                                <span class="px-3 py-1 text-[8px] font-normal font-['Urbanist'] rounded-[4px] border border-black">Auditor Halal</span>
                                <span class="px-3 py-1 text-[8px] font-normal font-['Urbanist'] rounded-[4px] border border-black">Ekspertis Makanan</span>
                            </div>
                        </div>
                        
                        <!-- Image -->
                        <div class="mt-auto -mx-8 -mb-8">
                            <img src="/src/assets/img/Hillary-Natasha-Azzahra.png" alt="Hillary Natasha Azzahra" class="w-full h-[300px] object-contain rounded-b-[20px]"/>
                        </div>
                    </div>

                    <!-- Fernando -->
                    <div class="w-[280px] bg-white rounded-[20px] shadow-lg p-8 relative flex flex-col">
                        <!-- Content Container -->
                        <div class="flex flex-col h-full">
                            <!-- Name and Arrow -->
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-[22px] font-bold font-['Lexend'] leading-tight">Fernando<br/>Sadikin</h3>
                                <svg class="mt-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 6L15 12L9 18" stroke="black" stroke-width="2"/>
                                </svg>
                            </div>
                            
                            <!-- Education -->
                            <p class="text-[11px] font-light font-['Lexend'] mb-4">S1 Fakultas Agama Islam,<br/>BINUS University Jakarta</p>
                            
                            <!-- Badges -->
                            <div class="flex gap-2 mb-3">
                                <div class="bg-teal-950 rounded-[4px] px-2 py-1 flex items-center">
                                    <div class="w-2 h-2 bg-white mr-1.5"></div>
                                    <span class="text-white text-[8px] font-medium font-['Urbanist']">Pengalaman</span>
                                </div>
                                <div class="bg-teal-950 rounded-[4px] px-2 py-1 flex items-center">
                                    <div class="w-2 h-2 bg-white mr-1"></div>
                                    <span class="text-white text-[8px] font-medium font-['Urbanist']">99+</span>
                                </div>
                            </div>
                            
                            <!-- Tags -->
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="px-3 py-1 text-[8px] font-normal font-['Urbanist'] rounded-[4px] border border-black">Konsultan</span>
                                <span class="px-3 py-1 text-[8px] font-normal font-['Urbanist'] rounded-[4px] border border-black">Auditor Halal</span>
                                <span class="px-3 py-1 text-[8px] font-normal font-['Urbanist'] rounded-[4px] border border-black">Ekspertis Makanan</span>
                            </div>
                        </div>
                        
                        <!-- Image -->
                        <div class="mt-auto -mx-8 -mb-8">
                            <img src="/src/assets/img/Fernando-Sadikin.png" alt="Fernando Sadikin" class="w-full h-[300px] object-contain rounded-b-[20px]"/>
                        </div>
                    </div>

                    <!-- Michelle -->
                    <div class="w-[280px] bg-white rounded-[20px] shadow-lg p-8 relative flex flex-col">
                        <!-- Content Container -->
                        <div class="flex flex-col h-full">
                            <!-- Name and Arrow -->
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-[22px] font-bold font-['Lexend'] leading-tight">Michelle<br/>Rose</h3>
                                <svg class="mt-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 6L15 12L9 18" stroke="black" stroke-width="2"/>
                                </svg>
                            </div>
                            
                            <!-- Education -->
                            <p class="text-[11px] font-light font-['Lexend'] mb-4">S1 Fakultas Pendidikan Dasar,<br/>Universitas Indonesia</p>
                            
                            <!-- Badges -->
                            <div class="flex gap-2 mb-3">
                                <div class="bg-teal-950 rounded-[4px] px-2 py-1 flex items-center">
                                    <div class="w-2 h-2 bg-white mr-1.5"></div>
                                    <span class="text-white text-[8px] font-medium font-['Urbanist']">Pengalaman</span>
                                </div>
                                <div class="bg-teal-950 rounded-[4px] px-2 py-1 flex items-center">
                                    <div class="w-2 h-2 bg-white mr-1"></div>
                                    <span class="text-white text-[8px] font-medium font-['Urbanist']">99+</span>
                                </div>
                            </div>
                            
                            <!-- Tags -->
                            <div class="flex flex-wrap gap-2 mb-5">
                                <span class="px-3 py-1 text-[8px] font-normal font-['Urbanist'] rounded-[4px] border border-black">Konsultan</span>
                                <span class="px-3 py-1 text-[8px] font-normal font-['Urbanist'] rounded-[4px] border border-black">Auditor Halal</span>
                                <span class="px-3 py-1 text-[8px] font-normal font-['Urbanist'] rounded-[4px] border border-black">Ekspertis Makanan</span>
                            </div>
                        </div>
                        
                        <!-- Image -->
                        <div class="mt-auto -mx-8 -mb-8">
                            <img src="/src/assets/img/Michelle-Rose.png" alt="Michelle Rose" class="w-full h-[300px] object-contain rounded-b-[20px]"/>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initConsultantSection); 