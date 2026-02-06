
import React, { useState, useEffect, useRef } from 'react';
import { AppState } from './types';
import { NO_MESSAGES, DEFAULT_DATE } from './constants';
import HeartBackground from './components/HeartBackground';
import { generateRomanticMessage } from './services/geminiService';

declare const confetti: any;

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INVITING);
  const [noCount, setNoCount] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [aiMessage, setAiMessage] = useState<string>("");
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [userName, setUserName] = useState("Миний хайрт");
  
  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setYesButtonSize(yesButtonSize + 0.5);
  };

  const handleYesClick = () => {
    setAppState(AppState.ACCEPTED);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fb7185', '#fff']
    });
  };

  const getAiMessage = async () => {
    setIsLoadingAi(true);
    const msg = await generateRomanticMessage(userName);
    setAiMessage(msg);
    setIsLoadingAi(false);
  };

  const noButtonText = NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];

  return (
    <div className="min-h-screen relative bg-rose-50 flex flex-col items-center justify-center p-4 overflow-hidden">
      <HeartBackground />

      <div className="relative z-10 w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-rose-200 text-center transition-all duration-500 transform hover:scale-[1.01]">
        
        {appState === AppState.INVITING ? (
          <div className="space-y-8">
            <div className="flex justify-center">
              <img 
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMThpZmxwd255Nm1pbm52bm92ejZ2ZDNvcmVzZ2F5eGtpZ3YxeXJyeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif" 
                alt="Cute Cat" 
                className="w-48 h-48 rounded-full shadow-lg border-4 border-rose-100"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-romantic text-rose-600 font-bold mb-4 drop-shadow-sm">
              Миний Валентин болох уу? ❤️
            </h1>
            
            <p className="text-rose-500 font-medium">
              Чамайгаа энэ жил хамгийн гоё болзоонд урьж байна!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button
                onClick={handleYesClick}
                style={{ transform: `scale(${yesButtonSize})` }}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-300 hover:shadow-rose-300/50"
              >
                Тийм ээ! 😍
              </button>
              
              {noCount < 10 && (
                <button
                  onClick={handleNoClick}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-md"
                >
                  {noButtonText}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-center">
              <img 
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2pzZTc0OHZ2em9yYXM5MW5zbGJvcmMzbnhsMTFmazc3czFpeWFsbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ytu2GUYbvhz7zShGwS/giphy.gif"
                alt="Happy Dance" 
                className="w-56 h-56 rounded-full"
              />
            </div>

            <h2 className="text-4xl font-romantic text-rose-600 font-bold">
              БАЯРЛАЛАА! ХАЙРТАЙ ШҮҮ! 😘
            </h2>

            <div className="bg-rose-100 p-6 rounded-2xl text-left border border-rose-200 shadow-inner">
              <h3 className="font-bold text-rose-700 mb-2 flex items-center">
                <span className="mr-2">📍</span> Болзооны мэдээлэл:
              </h3>
              <ul className="space-y-2 text-rose-600">
                <li><span className="font-semibold">Хаана:</span> {DEFAULT_DATE.location}</li>
                <li><span className="font-semibold">Хэзээ:</span> {DEFAULT_DATE.time}</li>
                <li><span className="font-semibold">Юу хийх:</span> {DEFAULT_DATE.activity}</li>
              </ul>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Нэрээ бичээрэй..."
                  className="flex-1 p-2 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none text-rose-600"
                />
                <button
                  onClick={getAiMessage}
                  disabled={isLoadingAi}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-bold disabled:opacity-50 transition-colors"
                >
                  {isLoadingAi ? "Уншиж байна..." : "AI Захидал"}
                </button>
              </div>

              {aiMessage && (
                <div className="p-4 bg-white border-2 border-dashed border-rose-300 rounded-xl animate-bounceIn italic text-rose-600">
                  "{aiMessage}"
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setAppState(AppState.INVITING);
                setNoCount(0);
                setYesButtonSize(1);
                setAiMessage("");
              }}
              className="text-rose-400 text-sm hover:underline mt-4"
            >
              Дахиад эхлэх үү? 🔄
            </button>
          </div>
        )}
      </div>

      <footer className="mt-8 text-rose-400 text-sm font-medium z-10 text-center">
        Хайртай хүндээ зориулан бүтээв ❤️
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-bounceIn {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
