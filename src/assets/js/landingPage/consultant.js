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
      const nameWords = consultant.name.split(' ');
      const nameLines = [nameWords.slice(0, Math.ceil(nameWords.length / 2)).join(' '), nameWords.slice(Math.ceil(nameWords.length / 2)).join(' ')];

      return `
      <div class="bg-white rounded-[20px] shadow-md relative min-h-[500px] group transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up">
        <div class="absolute top-4 right-4 bg-gradient-to-br from-red-500 to-rose-600 w-[42px] h-[42px] rounded-full shadow flex items-center justify-center flex-col">
          <span class="text-yellow-300 text-[10px] font-bold">${consultant.discount}%</span>
          <span class="text-white text-[8px] uppercase">Hemat</span>
        </div>

        <div class="p-4 space-y-4">
          <div>
            <h3 class="text-base font-bold text-gray-900">
              ${nameLines.map((line, i) => `<div class="animate-fade-in-down" style="animation-delay: ${0.1 * (i + 1)}s">${line}</div>`).join('')}
            </h3>
          </div>

          <p class="text-xs text-gray-600 animate-fade-in">${consultant.education}</p>

          <div class="animate-fade-in">
            <span class="text-[10px] text-gray-500">Mulai dari</span>
            <div class="flex items-center gap-1 mt-1">
              <span class="text-sm font-bold text-emerald-600">${consultant.discountedPrice}</span>
              <span class="text-[10px] text-gray-400 line-through">${consultant.originalPrice}</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-1 animate-fade-in">
            <div class="flex items-center px-2 py-1 bg-teal-950 text-white rounded text-[10px]">
              <img src="/src/assets/icon/list.png" class="w-3 h-3 mr-1" /> Pengalaman
            </div>
            <div class="flex items-center px-2 py-1 bg-teal-950 text-white rounded text-[10px]">
              <img src="/src/assets/icon/like.png" class="w-3 h-3 mr-1" /> 99+
            </div>
          </div>

          <div class="flex flex-wrap gap-1 text-[10px] animate-fade-in">
            <span class="px-2 py-1 border border-gray-300 rounded">Konsultan</span>
            <span class="px-2 py-1 border border-gray-300 rounded">Auditor Halal</span>
            <span class="px-2 py-1 border border-gray-300 rounded">Ekspertis Makanan</span>
          </div>
        </div>

        <div class="absolute left-0 right-0 bottom-0 h-[200px] overflow-hidden rounded-b-[20px]">
          <img src="${consultant.image}" class="w-full h-full object-contain object-top transition-all duration-500 group-hover:saturate-110" />
        </div>
      </div>
      `;
    }

    function initConsultantSection() {
      const consultantSection = document.getElementById('consultant');
      consultantSection.innerHTML = `
        <div class="relative bg-gradient-to-br from-yellow-50/80 via-emerald-50/30 to-white overflow-hidden">
          <div class="absolute inset-0 pointer-events-none z-0">
            <div class="absolute w-[40vw] h-[40vw] max-w-[500px] left-[10%] top-0 bg-yellow-100/40 blur-[80px] animate-pulse"></div>
            <div class="absolute w-[45vw] h-[45vw] max-w-[600px] right-[5%] top-[20%] bg-emerald-100/30 blur-[100px] animate-pulse"></div>
            <div class="absolute w-[30vw] h-[30vw] max-w-[400px] left-[20%] bottom-[10%] bg-cyan-100/20 blur-[90px] animate-pulse"></div>
          </div>

          <div class="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-[1440px] mx-auto">
            <div class="text-center mb-12 animate-fade-in-down">
              <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Hubungi Konsultan Profesional</h1>
              <p class="text-sm sm:text-base text-gray-700">Terverifikasi oleh MUI (Majelis Ulama Indonesia)</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              ${consultants.map(c => createConsultantCard(c)).join('')}
            </div>
          </div>
        </div>
      `;

      const styleSheet = document.createElement("style");
      styleSheet.textContent = `
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
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

    document.addEventListener('DOMContentLoaded', initConsultantSection);