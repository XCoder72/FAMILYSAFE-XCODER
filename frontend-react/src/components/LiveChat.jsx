import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// ✨ UPDATED: Pointing to your live Render backend
const socket = io.connect("https://familysafe-xcoder.onrender.com");

export default function LiveChat() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const chatContainerRef = useRef(null);
  const [userData, setUserData] = useState({ name: 'User' });

  // Load user data once on mount
  useEffect(() => {
    const saved = localStorage.getItem('familySafeUser');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserData({
        name: parsed.name || parsed.adminName || parsed.memberName || 'User'
      });
    }
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        id: Math.random().toString(36).substring(7),
        author: userData.name, // ✨ Use actual name from DB/Localstorage
        text: currentMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };

      setMessageList((list) => [...list, messageData]);
      
      // Emit to the cloud server
      await socket.emit("send_message", { ...messageData, isMe: false });
      setCurrentMessage(""); 
    }
  };

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", receiveMessageHandler);
    return () => socket.off("receive_message", receiveMessageHandler);
  }, []);

  return (
    <div className="flex w-full h-full bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/60 dark:border-slate-700/50 rounded-4xl shadow-xl overflow-hidden transition-colors duration-500">
      
      {/* LEFT PANE: Contacts List */}
      <div className="hidden md:flex flex-col w-80 bg-slate-50/50 dark:bg-slate-900/40 border-r border-slate-100 dark:border-slate-800/50 transition-colors z-10">
        <div className="p-6 pb-4">
          <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-4">Messages</h2>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search network..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm font-medium"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1">
          <div className="flex items-center gap-3 p-3 bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate">Family Network</h4>
              <p className="text-xs font-medium text-emerald-500 animate-pulse">Live Secure Channel</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANE: Chat Window */}
      <div className="flex-1 flex flex-col relative bg-transparent">
        <div className="bg-white/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-4 px-6 flex justify-between items-center z-10 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-base">Network Messenger</h3>
              <p className="text-[9px] font-black text-emerald-500 flex items-center gap-1.5 uppercase tracking-widest">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                E2EE Cloud Sync
              </p>
            </div>
          </div>
        </div>

        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/30 dark:bg-slate-900/30"
        >
          {messageList.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full opacity-40">
              <svg className="w-12 h-12 mb-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <p className="text-xs font-bold uppercase tracking-widest">Start a secure conversation</p>
            </div>
          )}

          {messageList.map((msg, index) => {
            const isFirst = index === 0 || messageList[index - 1].author !== msg.author;
            return (
              <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} ${isFirst ? 'mt-4' : 'mt-1'}`}>
                {isFirst && (
                  <span className="text-[10px] font-black text-slate-400 uppercase mb-1 px-2">{msg.author}</span>
                )}
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-medium shadow-sm ${
                  msg.isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-tl-none border border-slate-100 dark:border-slate-700'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[8px] font-bold text-slate-400 mt-1 px-2">{msg.time}</span>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-white/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 backdrop-blur-md">
          <div className="flex gap-2 items-center max-w-4xl mx-auto">
            <input 
              type="text" 
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type encrypted message..." 
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-5 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500/30 transition-all outline-none"
            />
            <button 
              onClick={sendMessage}
              disabled={currentMessage.trim() === ""}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90"
            >
              <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}