import { useEffect, useState } from "react";

export default function App() {
  const [show, setShow] = useState(false);
  const [surpriseVisible, setSurpriseVisible] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    setTimeout(() => setShow(true), 1200);
    
    // Inject styles when component mounts
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.id = "custom-animations";
    styleSheet.innerHTML = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes confetti {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
      
      @keyframes wiggle {
        0%, 100% { transform: rotate(-3deg); }
        50% { transform: rotate(3deg); }
      }
      
      @keyframes spinSlow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      .animate-fade-in-up {
        animation: fadeInUp 1s ease-out forwards;
      }
      
      .animate-fade-in-down {
        animation: fadeInDown 1s ease-out 0.5s forwards;
      }
      
      .animate-confetti {
        animation: confetti 3s linear forwards;
      }
      
      .animate-wiggle {
        animation: wiggle 0.5s ease-in-out infinite;
      }
      
      .animate-spin-slow {
        animation: spinSlow 6s linear infinite;
      }
    `;
    document.head.appendChild(styleSheet);
    
    // Cleanup function to remove styles when component unmounts
    return () => {
      const existingStyle = document.getElementById("custom-animations");
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  const handleSurpriseClick = () => {
    setSurpriseVisible(!surpriseVisible);
    setClickCount(prev => prev + 1);
    
    // Trigger confetti effect
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 text-white overflow-hidden">
      {/* Confetti effect */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      )}
      
      <div className="text-center p-6 max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl relative z-20 transform transition-all duration-500 hover:scale-105">
        {/* Surprise icon */}
        <div 
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={handleSurpriseClick}
          title="Click for a surprise!"
        >
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 hover:rotate-12">
            <span className="text-3xl">🎁</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
          🎉 Happy New Year 2026! 🎉
        </h1>

        <h2 className="text-2xl md:text-4xl font-semibold mb-6 animate-fade-in-up">
          Dear Vanshika Chauhan 💖
        </h2>

        {show && (
          <div className="space-y-4">
            <p className="text-lg md:text-xl leading-relaxed animate-fade-in">
              As this new year begins, I just want you to know how special you are
              to me. 💕  
              <br /><br />
              Thank you for being my happiness, my smile, and my strength.  
              May this year bring us more love, laughter, and beautiful memories together. 🌸
              <br /><br />
              I’m grateful for you today and always. 💫
            </p>
            
            {/* Surprise content */}
            {surpriseVisible && (
              <div className="mt-6 p-4 bg-white/20 rounded-xl animate-fade-in-up border border-white/30 transform transition-all duration-700">
                <h3 className="text-xl font-bold mb-2 text-yellow-300 animate-pulse">
                  Special Message #{clickCount}! 🎊
                </h3>
                <p className="text-lg">
                  Every time you click the gift, it multiplies the love I have for you! 💖
                  You've clicked {clickCount} times - that's how many reasons I love you! 😍
                </p>
                <div className="mt-3 text-2xl animate-wiggle">
                  🌟✨💫✨🌟
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-4xl animate-bounce">
          ❤️ 💖 💕 💙 💛
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <div className="animate-spin-slow text-2xl">🎊</div>
          <div className="animate-pulse text-2xl">🎈</div>
          <div className="animate-bounce text-2xl">🎇</div>
        </div>

        <p className="mt-6 text-sm opacity-80 animate-fade-in-down">
          — With Love, Siddharth 💌
        </p>
      </div>
      
      {/* Additional background decorations */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-pink-400/20 animate-ping"></div>
        <div className="absolute bottom-1/3 right-1/3 w-20 h-20 rounded-full bg-blue-400/20 animate-ping" style={{animationDelay: "1s"}}></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-yellow-400/20 animate-ping" style={{animationDelay: "2s"}}></div>
      </div>
    </div>
  );
}


