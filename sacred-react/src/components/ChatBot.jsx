import React, { useState, useEffect, useRef } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa'; // Import chat and close icons
import '../style/comp_css/chatbot.css'; // Import the external CSS file

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0); // Track unread messages
  const ws = useRef(null);
  const chatWindowRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const socketUrl = 'ws://127.0.0.1:8000/ws/chat/';
    ws.current = new WebSocket(socketUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setConnectionStatus('Connected');
    };

    ws.current.onmessage = (event) => {
      setIsBotTyping(false);
      try {
        const data = JSON.parse(event.data);
        let userMessage = data.user_message;
        let aiResponse = data.ai_response;

        // Clean the AI response by removing <think> tags and the content between them
        if (aiResponse) {
          aiResponse = aiResponse.replace(/<think>.*?<\/think>/g, '').trim();
        }

        if (userMessage) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: userMessage, sender: 'user' },
          ]);
        }

        if (aiResponse) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: aiResponse, sender: 'bot' },
          ]);
          if (!isChatVisible) {
            setUnreadMessages((prev) => prev + 1); // Increment unread messages
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [isChatVisible]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatVisible]);

  const sendMessage = () => {
    if (inputMessage.trim() !== '' && ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ message: inputMessage }));
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, sender: 'user' },
      ]);
      setInputMessage('');
      setIsBotTyping(true);
    }
  };

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
    if (!isChatVisible) {
      setUnreadMessages(0); // Reset unread messages when chat is opened
    }
  };

  return (
    <>
      <div className="chat-icon" onClick={toggleChat}>
        <FaCommentDots size={30} color="#fff" /> {/* React Icon for chat */}
        {unreadMessages > 0 && (
          <span className="unread-badge">{unreadMessages}</span>
        )}
      </div>
      <div className={`chat-container ${isChatVisible ? 'visible' : ''}`}>
        <div className="chat-header">
          <div className="chat-title">AI Assistant</div>
          <button className="close-button" onClick={toggleChat}>
            <FaTimes size={20} color="#fff" />
          </button>
        </div>
        <div className="connection-status">{connectionStatus}</div>
        <div className="chat-window" ref={chatWindowRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.sender === 'user' ? 'user-message' : 'bot-message'}
            >
              {message.text}
            </div>
          ))}
          {isBotTyping && (
            <div className="bot-message">
              <div style={{ fontStyle: 'italic' }}>Bot is typing...</div>
            </div>
          )}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="input"
            placeholder="Type a message..."
            ref={inputRef}
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;