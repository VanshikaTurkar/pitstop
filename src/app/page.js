'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const userMessage = { text: inputMessage, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');

      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      conversationHistory.push({
        role: 'user',
        content: inputMessage
      });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);

      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error. Please try again.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.imageContainer}>
        <h1>PitStops</h1>
        <p>Find and rate the best pit stops on your next road trip</p>
        <button onClick={() => router.push('/rate')}>Get Started</button>
        <button onClick={() => router.push('/search')}>Find a Pit Stop</button>
      </div>

      {/* Chatbot UI */}
      <div className={`${styles.chatbot} ${isChatOpen ? styles.open : ''}`}>
        <button 
          className={styles.chatToggle}
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? '✕' : '💬'}
        </button>
        
        {isChatOpen && (
          <div className={styles.chatContainer}>
            <div className={styles.chatMessages}>
              {messages.length === 0 && (
                <div className={styles.welcomeMessage}>
                  Hello! How can I help you with your road trip planning?
                </div>
              )}
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`${styles.message} ${styles[msg.sender]}`}
                >
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className={styles.loadingIndicator}>
                  Thinking...
                </div>
              )}
            </div>
            <form onSubmit={handleSendMessage} className={styles.chatInput}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? '...' : 'Send'}
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="location-container">
        <h1 className="location-title">Rest Area</h1>
        <Image 
          src="/Scenic-CA-drive.jpg"
          alt="Blue rest area road sign with an upward pointing arrow"
          width={800}
          height={400}
          
          className="location-image"
          priority
        />
        <div className="rating-container">
          <h2 className="rating-title">Rate the pit stops from your road trip</h2>
          {/* Your rating components go here */}
        </div>
      </div>
    </div>
  );
}