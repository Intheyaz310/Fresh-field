import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2 } from 'lucide-react';

const QA_PAIRS = [
  {
    q: /milk|curd|ghee|paneer|butter|products?/i,
    a: 'We offer fresh Milk, Ghee, Curd, Paneer, and Butter. Would you like to know more about any product?'
  },
  {
    q: /order|delivery|shipping|when.*arrive|track/i,
    a: 'You can order directly from our website. Delivery is usually within 24 hours in your area! Need help placing an order?'
  },
  {
    q: /farm|practice|organic|sustainable|hygienic/i,
    a: 'Our farm practices are 100% organic, sustainable, and hygienic. We never use antibiotics or growth hormones.'
  },
  {
    q: /a2.*milk|a2/i,
    a: 'A2 Milk is easy to digest, rich in nutrients, and better for health. Would you like to know more?'
  },
  {
    q: /career|job|apply|vacancy|opening/i,
    a: 'We are always looking for passionate people! Visit our Careers section or ask me about open positions.'
  },
  {
    q: /hi|hello|hey|how are you|good morning|good evening/i,
    a: 'Hi! 👋 I\'m MooBot. How can I help you today?'
  },
  {
    q: /faq|help|support|contact/i,
    a: 'You can ask me about our products, orders, farm practices, A2 milk, or careers. I\'m here to help!'
  },
  {
    q: /.*/,
    a: 'Sorry, I\'m not sure about that. Can you rephrase or ask about products, orders, farm, A2 milk, or careers?'
  }
];

const WELCOME_MSG = {
  from: 'bot',
  text: "Hi! 👋 I'm MooBot. How can I help you today?"
};

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('moobot-chat');
    return saved ? JSON.parse(saved) : [WELCOME_MSG];
  });
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem('moobot-chat', JSON.stringify(messages));
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setTimeout(() => {
      const answer = QA_PAIRS.find(pair => pair.q.test(userMsg.text))?.a || QA_PAIRS[QA_PAIRS.length-1].a;
      setMessages((msgs) => [...msgs, { from: 'bot', text: answer }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Bubble */}
      {!open && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="bg-dairy-green text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl text-3xl border-4 border-white focus:outline-none"
          aria-label="Open chat"
        >
          🐄
        </motion.button>
      )}
      {/* Chat Window */}
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-80 sm:w-96 h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-dairy-green"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-dairy-green px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐄</span>
                <span className="font-bold text-white text-lg">MooBot</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setMinimized(true)} className="text-white hover:bg-dairy-cream/30 rounded p-1" aria-label="Minimize"><Minimize2 size={20} /></button>
                <button onClick={() => setOpen(false)} className="text-white hover:bg-dairy-cream/30 rounded p-1" aria-label="Close"><X size={20} /></button>
              </div>
            </div>
            {/* Chat Body */}
            <div className="flex-1 bg-dairy-cream/40 px-4 py-3 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div key={idx} className={`mb-3 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-4 py-2 rounded-2xl shadow text-base ${msg.from === 'user' ? 'bg-dairy-green text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-dairy-green/30'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            {/* Input */}
            <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 bg-white border-t border-dairy-green/20">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green text-gray-800 bg-dairy-cream/40"
                autoComplete="off"
              />
              <button
                type="submit"
                className="btn-primary px-4 py-2 text-base"
                disabled={!input.trim()}
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
        {/* Minimized State */}
        {open && minimized && (
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            onClick={() => setMinimized(false)}
            className="bg-dairy-green text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl text-3xl border-4 border-white focus:outline-none"
            aria-label="Restore chat"
            style={{ position: 'absolute', bottom: 0, right: 0 }}
          >
            🐄
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotWidget; 