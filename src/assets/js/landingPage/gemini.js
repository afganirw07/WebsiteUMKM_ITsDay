// EcoTera Chat Widget JavaScript
class EcoTeraChatWidget {
    constructor() {
        this.apiKey = 'AIzaSyD2aks3kuDU9eTbGAIyDmO-gWEp7z8R1HU';
        this.isOpen = false;
        this.messages = this.loadMessages();
        this.isTyping = false;
        
        // Mark as initialized
        window.ecoTeraChatWidget = this;
        
        this.init();
    }

    // Load messages from localStorage
    loadMessages() {
        const saved = localStorage.getItem('chatMessages');
        return saved ? JSON.parse(saved) : [
            {
                id: 1,
                text: 'Halo! Saya asisten percakapan EcoTera. Ada yang bisa saya bantu mengenai sertifikasi halal dan keberlanjutan UMKM?',
                from: 'bot',
                time: new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            }
        ];
    }



    // Parse markdown to HTML
    parseMarkdown(text) {
        return text
            .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }

    // Get AI recommendation
    async getRecommendation(userInput) {
        try {
          const prompt = `Kamu adalah asisten AI dari EcoTera, sebuah website yang berfokus pada pemberdayaan UMKM di sektor makanan dan minuman untuk mendapatkan sertifikasi halal dan menerapkan praktik ramah lingkungan.

Jawablah pertanyaan pengguna dalam bahasa Indonesia atau Inggris, sesuai dengan bahasa yang digunakan oleh pengguna. Gunakan nada yang ramah, mendukung, dan profesional.

- Fokus hanya pada topik seputar sertifikasi halal, keberlanjutan lingkungan, UMKM, layanan webinar, dan konsultasi yang disediakan oleh EcoTera.
- Jika relevan, sarankan layanan atau program EcoTera yang sesuai dengan kebutuhan pengguna, lalu jelaskan alasan singkat mengapa layanan tersebut cocok.
- Jika pengguna bertanya siapa pendiri atau pemilik EcoTera, jawab dengan **Afgan Irwansyah Hidayat** (gunakan huruf tebal).

User: "${userInput}"`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            const data = await response.json();
            const text = data.candidates[0].content.parts[0].text;

            return this.parseMarkdown(text);
        } catch (error) {
            console.error('Error from Gemini:', error);
            return 'Maaf, saya mengalami kesulitan untuk merespon saat ini.';
        }
    }

    // Create message HTML
    createMessageHTML(msg) {
        const isUser = msg.from === 'user';
        const avatar = isUser 
            ? `<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
               </div>`
            : `<img src="https://static.vecteezy.com/system/resources/previews/007/225/199/non_2x/robot-chat-bot-concept-illustration-vector.jpg" 
                    alt="Bot Avatar" class="w-8 h-8 rounded-full object-cover">`;

        return `
            <div class="flex ${isUser ? 'justify-end' : 'justify-start'}">
                <div class="flex items-end space-x-2 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}">
                    ${avatar}
                    <div class="flex flex-col">
                        <div class="px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-sm max-w-[280px] break-words ${
                            isUser
                                ? 'bg-gradient-to-br from-primary to-secondary  text-white rounded-br-none'
                                : 'bg-white text-gray-800 border border-primary border-1.5 rounded-bl-none '
                        }">
                            <p class="text-xs sm:text-sm leading-relaxed">${msg.text}</p>
                        </div>
                        <span class="text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}">
                            ${msg.time}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    // Create typing indicator
    createTypingIndicator() {
        return `
            <div class="flex justify-start">
                <div class="flex items-end space-x-2 max-w-[85%] sm:max-w-[80%]">
                    <img src="https://static.vecteezy.com/system/resources/previews/007/225/199/non_2x/robot-chat-bot-concept-illustration-vector.jpg" 
                         alt="Bot Avatar" class="w-8 h-8 rounded-full object-cover flex-shrink-0">
                    <div class="px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-2xl rounded-bl-none shadow-sm border">
                        <div class="flex space-x-1">
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Render messages
    renderMessages() {
        const chatContent = document.getElementById('chatContent');
        const messagesHTML = this.messages.map(msg => this.createMessageHTML(msg)).join('');
        const typingIndicator = this.isTyping ? this.createTypingIndicator() : '';
        
        chatContent.innerHTML = messagesHTML + typingIndicator;
        this.scrollToBottom();
    }

    // Scroll to bottom
    scrollToBottom() {
        const chatContent = document.getElementById('chatContent');
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    // Toggle chat
    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatPanel = document.getElementById('chatPanel');
        const messageIcon = document.getElementById('messageIcon');
        const closeIcon = document.getElementById('closeIcon');
        const notificationBadge = document.getElementById('notificationBadge');

        if (this.isOpen) {
            chatPanel.classList.remove('hidden', 'scale-0', 'opacity-0');
            chatPanel.classList.add('flex', 'scale-100', 'opacity-100');
            messageIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            notificationBadge.classList.add('hidden');
            this.renderMessages();
        } else {
            chatPanel.classList.remove('flex', 'scale-100', 'opacity-100');
            chatPanel.classList.add('hidden', 'scale-0', 'opacity-0');
            messageIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }

    // Update send button state
    updateSendButton() {
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const hasText = messageInput.value.trim().length > 0;

        if (hasText) {
            sendButton.classList.remove('bg-gray-200', 'text-gray-400', 'cursor-not-allowed');
            sendButton.classList.add('bg-gradient-to-r', 'from-primary', 'to-secondary', 'text-white', 'hover:shadow-md', 'transform', 'hover:scale-105');
        } else {
            sendButton.classList.add('bg-gray-200', 'text-gray-400', 'cursor-not-allowed');
            sendButton.classList.remove('bg-gradient-to-r', 'from-primary-500', 'to-secondary-600', 'text-white', 'hover:shadow-md', 'transform', 'hover:scale-105');
        }
    }

    // Send message
    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const inputText = messageInput.value.trim();
        
        if (!inputText) return;

        // Add user message
        const newMessage = {
            id: this.messages.length + 1,
            text: inputText,
            from: 'user',
            time: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        this.messages.push(newMessage);
        
        messageInput.value = '';
        this.updateSendButton();
        
        // Show typing indicator
        this.isTyping = true;
        this.renderMessages();

        try {
            // Get AI response
            const aiReply = await this.getRecommendation(inputText);

            const botResponse = {
                id: this.messages.length + 1,
                text: aiReply,
                from: 'bot',
                time: new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            };

            this.messages.push(botResponse);
    
        } catch (error) {
            console.error('Error:', error);
            const errorResponse = {
                id: this.messages.length + 1,
                text: 'Maaf, terjadi kesalahan saat menghubungi AI.',
                from: 'bot',
                time: new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            };
            this.messages.push(errorResponse);
        }

        this.isTyping = false;
        this.renderMessages();
    }

    // Create chat widget HTML if it doesn't exist
    createChatWidget() {
        // Check if chat widget already exists
        if (document.getElementById('chatToggle')) {
            return true;
        }

        // Create the chat widget HTML
        const chatWidgetHTML = `
        <section class="ecotera-chat-widget">
          <!-- Floating Button -->
          <div class="fixed bottom-6 right-6 z-50">
            <button
              id="chatToggle"
              class="relative bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            >
              <!-- Message Icon -->
              <svg id="messageIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <!-- Close Icon -->
              <svg id="closeIcon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <!-- Notification Badge -->
              <span
                id="notificationBadge"
                class="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                1
              </span>
            </button>
          </div>

          <!-- Chat Panel -->
          <div
            id="chatPanel"
            class="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] max-h-[32rem] sm:max-h-[70vh] bg-white rounded-2xl shadow-2xl z-50 flex-col overflow-hidden transform transition-all duration-300 ease-out scale-0 opacity-0 origin-bottom-right hidden"
          >
            <!-- Header -->
            <div class="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 sm:px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <div class="flex items-center space-x-3">
                <div class="relative">
                  <img src="https://static.vecteezy.com/system/resources/previews/007/225/199/non_2x/robot-chat-bot-concept-illustration-vector.jpg"
                    alt="Bot Avatar" class="w-8 h-8 rounded-full object-cover" />
                  <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                </div>
                <div class="min-w-0">
                  <span class="font-semibold text-sm sm:text-base">EcoTera Assistant</span>
                  <p class="text-xs opacity-80 hidden sm:block">Siap membantu Anda</p>
                </div>
              </div>
              <button id="closeChat" class="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Chat Content -->
            <div id="chatContent" class="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 bg-gray-50 max-h-96">
              <!-- Messages will be populated here -->
            </div>

            <!-- Input -->
            <div class="p-4 bg-white border-t border-gray-100">
              <div
                class="flex items-center space-x-2 bg-gray-50 rounded-full border border-gray-200 px-4 py-2 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition-all duration-200">
                <input
                  type="text"
                  id="messageInput"
                  class="flex-1 bg-transparent text-xs sm:text-sm placeholder-gray-500 focus:outline-none"
                  placeholder="Tanyakan tentang sertifikasi halal..." />
                <button
                  id="sendButton"
                  class="p-2 rounded-full transition-all duration-200 bg-gray-200 text-gray-400 cursor-not-allowed">
                  <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-2 text-center hidden sm:block">Tekan Enter untuk mengirim pesan</p>
            </div>
          </div>
        </section>
        `;

        // Append to body
        document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);
        return true;
    }

    // Check if all required elements exist
    checkElements() {
        const requiredElements = [
            'chatToggle',
            'chatPanel', 
            'chatContent',
            'closeChat',
            'sendButton',
            'messageInput',
            'messageIcon',
            'closeIcon',
            'notificationBadge'
        ];

        for (const elementId of requiredElements) {
            if (!document.getElementById(elementId)) {
                console.error(`Element with ID '${elementId}' not found`);
                return false;
            }
        }
        return true;
    }

    // Initialize event listeners
    async init() {
        // First, try to create chat widget if it doesn't exist
        this.createChatWidget();

        // Wait for the next frame to ensure DOM elements are rendered
        await new Promise(resolve => requestAnimationFrame(resolve));

        // Check if elements exist after creation
        if (!this.checkElements()) {
            console.error('Required elements not found. Make sure the HTML structure is correct.');
            return;
        }

        // Toggle chat button
        document.getElementById('chatToggle').addEventListener('click', () => {
            this.toggleChat();
        });

        // Close chat button
        document.getElementById('closeChat').addEventListener('click', () => {
            this.toggleChat();
        });

        // Send button
        document.getElementById('sendButton').addEventListener('click', () => {
            this.sendMessage();
        });

        // Message input
        const messageInput = document.getElementById('messageInput');
        messageInput.addEventListener('input', () => {
            this.updateSendButton();
        });

        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Initial render if chat is open
        if (this.isOpen) {
            this.renderMessages();
        }

        console.log('EcoTera Chat Widget initialized successfully!');
    }
}

// Initialize chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure all elements are rendered
    setTimeout(() => {
        new EcoTeraChatWidget();
    }, 100);
});

// Also try to initialize on window load as fallback
window.addEventListener('load', () => {
    // Only initialize if not already initialized
    if (!window.ecoTeraChatWidget) {
        window.ecoTeraChatWidget = new EcoTeraChatWidget();
    }
});

// Add required CSS styles
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
        }
        40%, 43% {
            transform: translate3d(0,-10px,0);
        }
        70% {
            transform: translate3d(0,-5px,0);
        }
        90% {
            transform: translate3d(0,-2px,0);
        }
    }

    .ecotera-chat-widget .animate-bounce {
        animation: bounce 1s infinite;
    }

    .ecotera-chat-widget .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: .5;
        }
    }

    /* Ensure Tailwind classes work */
    .ecotera-chat-widget .fixed { position: fixed !important; }
    .ecotera-chat-widget .bottom-6 { bottom: 1.5rem !important; }
    .ecotera-chat-widget .right-6 { right: 1.5rem !important; }
    .ecotera-chat-widget .z-50 { z-index: 50 !important; }
    .ecotera-chat-widget .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)) !important; }
    .ecotera-chat-widget .from-green-500 { --tw-gradient-from: #10b981; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(16, 185, 129, 0)); }
    .ecotera-chat-widget .to-blue-600 { --tw-gradient-to: #2563eb; }
    .ecotera-chat-widget .text-white { color: #ffffff !important; }
    .ecotera-chat-widget .p-4 { padding: 1rem !important; }
    .ecotera-chat-widget .rounded-full { border-radius: 9999px !important; }
    .ecotera-chat-widget .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; }
    .ecotera-chat-widget .w-6 { width: 1.5rem !important; }
    .ecotera-chat-widget .h-6 { height: 1.5rem !important; }
    .ecotera-chat-widget .hidden { display: none !important; }
    .ecotera-chat-widget .bg-white { background-color: #ffffff !important; }
    .ecotera-chat-widget .rounded-2xl { border-radius: 1rem !important; }
    .ecotera-chat-widget .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important; }
    .ecotera-chat-widget .flex { display: flex !important; }
    .ecotera-chat-widget .flex-col { flex-direction: column !important; }
    .ecotera-chat-widget .overflow-hidden { overflow: hidden !important; }
`;
document.head.appendChild(style);