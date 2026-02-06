
import React, { useEffect, useState } from 'react';

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 5}s`,
      size: `${10 + Math.random() * 30}px`,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }
        .heart-float {
          animation: float linear infinite;
        }
      `}</style>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-rose-300 opacity-20 heart-float"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default HeartBackground;
