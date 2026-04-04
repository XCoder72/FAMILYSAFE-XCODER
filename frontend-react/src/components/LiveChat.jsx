import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5000");

export default function LiveChat() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  
  // ✨ FIX 1: We target the specific container now, NOT the end element
  const chatContainerRef = useRef(null);

  // ✨ FIX 2: Safe scrolling that won't push your header off the screen!
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
        author: "Admin (You)", 
        text: currentMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };

      setMessageList((list) => [...list, messageData]);
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
    <div className="flex w-full h-full bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/60 dark:border-slate-700/50 rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-colors duration-500">
      
      {/* ======================================= */}
      {/* LEFT PANE: Contacts List (Sidebar) */}
      {/* ======================================= */}
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
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm font-medium text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all shadow-sm inset-y-0"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1 custom-scrollbar">
          
          <div className="flex items-center gap-3 p-3 bg-linear-to-r from-indigo-50 to-blue-50/50 dark:from-indigo-500/10 dark:to-blue-500/5 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl cursor-pointer transition-all shadow-sm">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate">Family Network</h4>
                <span className="text-[10px] font-black text-indigo-500 animate-pulse">LIVE</span>
              </div>
              <p className="text-xs font-medium text-indigo-600/70 dark:text-indigo-400/80 truncate">Active encrypted channel...</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 hover:bg-white dark:hover:bg-slate-800/60 rounded-2xl cursor-pointer transition-colors group border border-transparent">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-linear-to-tr from-sky-100 dark:from-slate-700 to-blue-100 dark:to-slate-600 flex items-center justify-center text-blue-600 dark:text-white font-black text-lg border-2 border-white dark:border-slate-800 shadow-sm">
                P
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm truncate group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Priya Mehta</h4>
                <span className="text-[10px] font-bold text-slate-400">2h</span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">I safely reached school!</p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================= */}
      {/* RIGHT PANE: Main Chat Window */}
      {/* ======================================= */}
      <div className="flex-1 flex flex-col relative bg-transparent">
        
        <div className="bg-white/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-4 px-6 flex justify-between items-center z-10 backdrop-blur-md transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-base">Family Network Group</h3>
              <p className="text-[10px] font-bold text-emerald-500 flex items-center gap-1.5 mt-0.5 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
                End-to-End Encrypted
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full hover:bg-white dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center transition-colors shadow-sm dark:shadow-none border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-white dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center transition-colors shadow-sm dark:shadow-none border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </button>
          </div>
        </div>

        {/* ✨ FIX 3: Attached the ref specifically to THIS scrolling div */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-95"
        >
          
          {messageList.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">Secure Channel Established</p>
              <p className="text-xs font-medium">Messages are instantly synced and encrypted.</p>
            </div>
          )}

          {messageList.map((msg, index) => {
            const isFirst = index === 0 || messageList[index - 1].isMe !== msg.isMe;
            
            return (
              <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} ${isFirst ? 'mt-6' : 'mt-1'}`}>
                {isFirst && (
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 ml-2 mr-2">{msg.author}</span>
                )}
                
                <div 
                  className={`max-w-[75%] px-5 py-3 shadow-sm text-sm font-medium leading-relaxed
                    ${msg.isMe 
                      ? 'bg-linear-to-br from-blue-500 to-indigo-600 text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 text-slate-800 dark:text-white rounded-2xl rounded-tl-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-600 mt-1 ml-2 mr-2">{msg.time}</span>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-white/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 backdrop-blur-md transition-colors z-10">
          <div className="flex gap-2 items-center relative max-w-4xl mx-auto">
            
            <button className="w-10 h-10 rounded-full hover:bg-white dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center transition-colors shrink-0 shadow-sm dark:shadow-none border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
              <svg className="w-5 h-5 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
            </button>

            <input 
              type="text" 
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Message family..." 
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-full px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all text-slate-800 dark:text-white placeholder:text-slate-400 shadow-sm"
            />

            <button 
              onClick={sendMessage}
              disabled={currentMessage.trim() === ""}
              className="bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-blue-300 disabled:to-indigo-300 dark:disabled:from-slate-700 dark:disabled:to-slate-700 disabled:cursor-not-allowed text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-md shrink-0 ml-1"
            >
              <svg className="w-5 h-5 translate-x-px -translate-y-px" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}