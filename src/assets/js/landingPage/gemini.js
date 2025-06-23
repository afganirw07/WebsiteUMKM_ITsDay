// chatWidget.js
class ChatWidget {
  constructor() {
    this.isOpen = false;
    this.messages = this.loadMessages();
    this.isTyping = false;
    
    this.initializeElements();
    this.bindEvents();
    this.renderMessages();
  }

  initializeElements() {
    this.chatToggle = document.getElementById('chatToggle');
    this.chatPanel = document.getElementById('chatPanel');
    this.chatContent = document.getElementById('chatContent');
    this.messageInput = document.getElementById('messageInput');
    this.sendButton = document.getElementById('sendButton');
    this.closeChat = document.getElementById('closeChat');
    this.messageIcon = document.getElementById('messageIcon');
    this.closeIcon = document.getElementById('closeIcon');
    this.notificationBadge = document.getElementById('notificationBadge');
  }

  bindEvents() {
    this.chatToggle.addEventListener('click', () => this.toggleChat());
    this.closeChat.addEventListener('click', () => this.closeChat());
    this.sendButton.addEventListener('click', () => this.handleSend());
    this.messageInput.addEventListener('keypress', (e) => this.handleKeyPress(e));
    this.messageInput.addEventListener('input', () => this.updateSendButton());
  }

  loadMessages() {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        text: 'Hello! I am your chat assistant. How can I help you?',
        from: 'bot',
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }
    ];
  }

  saveMessages() {
    localStorage.setItem('chatMessages', JSON.stringify(this.messages));
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      this.openChat();
    } else {
      this.closeChatPanel();
    }
  }

  openChat() {
    this.chatPanel.classList.remove('hidden');
    this.chatPanel.classList.add('flex');
    
    // Trigger animation
    setTimeout(() => {
      this.chatPanel.classList.remove('scale-0', 'opacity-0');
      this.chatPanel.classList.add('scale-100', 'opacity-100');
    }, 10);

    // Update icons
    this.messageIcon.classList.add('hidden');
    this.closeIcon.classList.remove('hidden');
    this.notificationBadge.classList.add('hidden');
    this.chatToggle.classList.add('rotate-180');

    // Focus input
    setTimeout(() => {
      this.messageInput.focus();
    }, 300);
  }

  closeChatPanel() {
    this.chatPanel.classList.remove('scale-100', 'opacity-100');
    this.chatPanel.classList.add('scale-0', 'opacity-0');
    
    setTimeout(() => {
      this.chatPanel.classList.add('hidden');
      this.chatPanel.classList.remove('flex');
    }, 300);

    // Update icons
    this.messageIcon.classList.remove('hidden');
    this.closeIcon.classList.add('hidden');
    this.notificationBadge.classList.remove('hidden');
    this.chatToggle.classList.remove('rotate-180');
  }

  closeChat() {
    this.isOpen = false;
    this.closeChatPanel();
  }

  updateSendButton() {
    const hasText = this.messageInput.value.trim();
    
    if (hasText) {
      this.sendButton.classList.remove('bg-gray-200', 'text-gray-400', 'cursor-not-allowed');
      this.sendButton.classList.add('bg-gradient-to-r', 'from-red-500', 'to-pink-600', 'text-white', 'hover:shadow-md', 'transform', 'hover:scale-105');
    } else {
      this.sendButton.classList.add('bg-gray-200', 'text-gray-400', 'cursor-not-allowed');
      this.sendButton.classList.remove('bg-gradient-to-r', 'from-red-500', 'to-pink-600', 'text-white', 'hover:shadow-md', 'transform', 'hover:scale-105');
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleSend();
    }
  }

  async handleSend() {
    const input = this.messageInput.value.trim();
    if (!input) return;

    const newMessage = {
      id: this.messages.length + 1,
      text: input,
      from: 'user',
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    this.messages.push(newMessage);
    this.messageInput.value = '';
    this.updateSendButton();
    this.renderMessages();
    this.showTypingIndicator();
    this.saveMessages();

    try {
      const aiReply = await getRecommendation(input);

      const botResponse = {
        id: this.messages.length + 1,
        text: aiReply.text,
        from: 'bot',
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        products: aiReply.products,
      };

      this.messages.push(botResponse);
    } catch (err) {
      console.error('Error:', err);
      this.messages.push({
        id: this.messages.length + 1,
        text: 'Maaf, terjadi kesalahan saat menghubungi AI.',
        from: 'bot',
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    }

    this.hideTypingIndicator();
    this.renderMessages();
    this.saveMessages();
  }

  showTypingIndicator() {
    this.isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'flex justify-start';
    typingDiv.innerHTML = `
      <div class="flex items-end space-x-2 max-w-[85%] sm:max-w-[80%]">
        <img
          src="https://i.pinimg.com/736x/1d/23/3d/1d233dbaf37c7c70866d5d0a783e0c92.jpg"
          alt="Bot Avatar"
          class="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
        <div class="px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-2xl rounded-bl-none shadow-sm border">
          <div class="flex space-x-1">
            <div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
          </div>
        </div>
      </div>
    `;
    
    this.chatContent.appendChild(typingDiv);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    this.isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  createProductScroller(products) {
    if (!products || products.length === 0) return '';
    
    return `
      <div class="w-full overflow-x-auto scrollbar-hide py-2 mt-2">
        <div class="inline-flex gap-3 w-max">
          ${products.map(product => `
            <div class="flex-shrink-0 cursor-pointer w-[150px] sm:w-[180px] bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-300" onclick="handleProductClick('${product._id}')">
              <img
                src="${product.image}"
                alt="${product.title}"
                class="w-full h-28 sm:h-32 object-cover rounded-t-xl"
              />
              <div class="p-2">
                <h4 class="text-xs sm:text-sm font-semibold line-clamp-2">${product.title}</h4>
                <p class="text-xs text-gray-500">${product.brand}</p>
                <p class="text-xl text-black font-bold">$${product.retailPrice}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderMessages() {
    this.chatContent.innerHTML = '';
    
    this.messages.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.className = `flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`;
      
      const isUser = msg.from === 'user';
      const avatarSrc = isUser 
        ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K'
        : 'https://i.pinimg.com/736x/1d/23/3d/1d233dbaf37c7c70866d5d0a783e0c92.jpg';
      
      messageDiv.innerHTML = `
        <div class="flex items-end space-x-2 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${isUser ? 'bg-gradient-to-r from-red-500 to-blue-600' : 'bg-gray-500'}">
            ${isUser ? 
              `<svg class="w-4 h-4" fill="white" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` :
              `<img src="${avatarSrc}" alt="Bot Avatar" class="w-8 h-8 rounded-full object-cover flex-shrink-0" />`
            }
          </div>
          <div class="flex flex-col">
            <div class="px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-sm max-w-[230px] break-words ${
              isUser
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 border rounded-bl-none'
            }">
              <p class="text-xs sm:text-sm leading-relaxed">${msg.text}</p>
              ${msg.products ? this.createProductScroller(msg.products) : ''}
            </div>
            <span class="text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}">
              ${msg.time}
            </span>
          </div>
        </div>
      `;
      
      this.chatContent.appendChild(messageDiv);
    });

    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.chatContent.scrollTop = this.chatContent.scrollHeight;
    }, 100);
  }
}

// Handle product click
function handleProductClick(productId) {
  console.log('Product clicked:', productId);
  // You can implement navigation to product detail page here
  // For example: window.location.href = `/product/${productId}`;
  alert(`Navigating to product: ${productId}`);
}

// Initialize chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new ChatWidget();
});