import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import coffeeIMG from './assets/IMG_8216.jpg'
import { 
  Heart, 
  ChevronRight, 
  MailOpen, 
  Sparkles, 
  Flower2, 
  Gift, 
  Clock, 
  Calendar, 
  Camera, 
  Volume2, 
  VolumeX,
  Star,
  X,
  Music
} from 'lucide-react';

// --- Helper Components ---

const CloudRain = ({ size }) => <span style={{fontSize: size}}>🌧️</span>;

/**
 * CONFIGURATION
 */
const APP_CONFIG = {
  wifeName: "Minakshi",
  startDate: "2020-05-20", 
  anniversaryDate: "Feb 14, 2026",
  introMessage: "Every day with you feels like a dream, but today is extra special.",
  reasons: [
    "Your beautiful smile",
    "Your kind heart",
    "The way you laugh",
    "How you support me",
    "Everything about you"
  ],
  finalLetter: `To my dearest Minakshi,

Words can't describe how much you mean to me. You are my best friend, my soulmate, and my greatest adventure. Thank you for being you and for filling my life with so much color.

I love you more than all the stars in the sky.

Forever Yours.`,
  memories: [
    { 
      text: "Our First Coffee", 
      icon: <Clock size={16}/>, 
      imageUrl: coffeeIMG,
      description: "That first sip of coffee where I knew you were the one."
    },
    { 
      text: "That Rainy Walk", 
      icon: <CloudRain size={16}/>, 
      imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=800", 
      description: "Sharing an umbrella and laughing under the clouds."
    },
    { 
      text: "Summer 2023", 
      icon: <Camera size={16}/>, 
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800", 
      description: "The golden sun and your even brighter smile."
    },
    { 
      text: "Forever to Go", 
      icon: <Heart size={16}/>, 
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800", 
      description: "Just the beginning of our beautiful forever."
    }
  ],
  // Add a direct link to an MP3 file here if you have one. 
  // For now, this is a placeholder or you can use a royalty free link.
  musicUrl: "https://assets.mixkit.co/music/preview/mixkit-love-story-piano-solo-29.mp3" 
};

// --- New Creative Components ---

const CursorTrail = () => {
  const [trail, setTrail] = useState([]);

  // Handle both mouse and touch events
  const addParticle = useCallback((x, y) => {
    const id = Date.now() + Math.random();
    setTrail(prev => [...prev.slice(-15), { id, x, y }]); // Limit trail length
    setTimeout(() => {
      setTrail(prev => prev.filter(p => p.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => addParticle(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      addParticle(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [addParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {trail.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.8, scale: 0.5 }}
          animate={{ opacity: 0, scale: 1.5, y: -20 }}
          transition={{ duration: 0.8 }}
          className="absolute text-rose-400"
          style={{ left: p.x, top: p.y }}
        >
          <Heart size={12} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

const RotatingReasons = ({ reasons }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % reasons.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [reasons]);

  return (
    <div className="h-8 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="text-rose-600 font-medium italic text-sm sm:text-base"
        >
          I love {reasons[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// --- Existing Components Refined ---

const Confetti = () => {
  const pieces = useMemo(() => [...Array(35)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#fb7185', '#f43f5e', '#ec4899', '#fbcfe8'][Math.floor(Math.random() * 4)],
    size: Math.random() * 8 + 4,
    delay: Math.random() * 1.5
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1 }}
          animate={{ y: '110vh', rotate: 360 }}
          transition={{ duration: 2.5, delay: p.delay, ease: "easeIn" }}
          className="absolute"
          style={{ backgroundColor: p.color, width: p.size, height: p.size, borderRadius: '2px' }}
        />
      ))}
    </div>
  );
};

const Typewriter = ({ text, delay = 0.04 }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, delay * 1000);
    return () => clearInterval(timer);
  }, [text]);
  return <span className="whitespace-pre-wrap">{displayedText}</span>;
};

const FloatingBackground = () => {
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 22;
  const elements = useMemo(() => [...Array(count)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 15,
    size: 12 + Math.random() * 20
  })), [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ y: -50, x: `${el.x}vw`, opacity: 0 }}
          animate={{ y: '110vh', rotate: 360, opacity: [0, 0.3, 0.3, 0] }}
          transition={{ duration: el.duration, repeat: Infinity, delay: el.delay, ease: "linear" }}
          className="absolute text-rose-200"
        >
          {el.id % 2 === 0 ? <Heart size={el.size} fill="currentColor" /> : <Flower2 size={el.size} />}
        </motion.div>
      ))}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [stage, setStage] = useState('landing');
  const [daysTogether, setDaysTogether] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const start = new Date(APP_CONFIG.startDate);
    const today = new Date();
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    setDaysTogether(diff);
  }, []);

  // Handle audio play/pause
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio autoplay prevented"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Auto-start audio on first interaction if possible
  const handleStartJourney = () => {
    setStage('gift');
    if (!isPlaying && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log("User must interact first"));
    }
  };

  const handleReveal = () => {
    setStage('reveal');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 font-sans text-slate-800 selection:bg-rose-100 overflow-x-hidden relative flex flex-col">
      <FloatingBackground />
      <CursorTrail />
      {showConfetti && <Confetti />}

      {/* Audio Element */}
      <audio ref={audioRef} loop src={APP_CONFIG.musicUrl} />

      {/* Memory Polaroid Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMemory(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotate: 5, opacity: 0 }}
              className="relative bg-white p-4 pb-12 sm:p-6 sm:pb-16 shadow-2xl max-w-sm sm:max-w-md w-full z-10 transform transition-transform"
              style={{ borderRadius: '4px' }} // Sharp corners for polaroid feel
            >
              <button 
                onClick={() => setSelectedMemory(null)}
                className="absolute -top-3 -right-3 p-2 bg-rose-500 text-white rounded-full shadow-lg hover:bg-rose-600 transition-colors z-20"
              >
                <X size={16} />
              </button>
              
              <div className="aspect-square w-full relative bg-gray-100 mb-4 overflow-hidden border border-gray-100">
                <img 
                  src={selectedMemory.imageUrl} 
                  alt={selectedMemory.text} 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                />
              </div>
              
              <div className="text-center font-serif">
                <h3 className="text-xl sm:text-2xl text-gray-800 mb-2 font-bold">{selectedMemory.text}</h3>
                <p className="text-rose-600 text-sm sm:text-base italic font-handwriting">
                   {selectedMemory.description}
                </p>
                <div className="absolute bottom-4 right-6 text-gray-300">
                  <Heart size={16} fill="#f43f5e" className="text-rose-500" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-10 sm:py-20 relative z-10">
        <AnimatePresence mode="wait">
          
          {stage === 'landing' && (
            <motion.div 
              key="landing" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, filter: "blur(10px)" }} 
              className="text-center w-full max-w-xl mx-auto flex flex-col items-center gap-6 sm:gap-10"
            >
              <div className="space-y-4 sm:space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: -20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-rose-200 text-rose-500 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] shadow-sm"
                >
                  <Calendar size={14} /> {APP_CONFIG.anniversaryDate}
                </motion.div>
                
                <div className="relative">
                  <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif text-rose-950 font-bold leading-[1.1] px-2 drop-shadow-sm">
                    I Love You, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                      {APP_CONFIG.wifeName}
                    </span>
                  </h1>
                  <motion.div 
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-4 sm:-right-8 text-amber-400 opacity-60"
                  >
                    <Sparkles size={32} />
                  </motion.div>
                </div>

                <RotatingReasons reasons={APP_CONFIG.reasons} />

                <div className="flex justify-center gap-6 sm:gap-10 py-4">
                  <div className="text-center p-4 bg-white/50 rounded-2xl border border-white shadow-sm backdrop-blur-sm">
                    <p className="text-3xl sm:text-4xl font-serif font-bold text-rose-900 leading-none">{daysTogether}</p>
                    <p className="text-[10px] uppercase tracking-widest text-rose-400 font-bold mt-1">Days Together</p>
                  </div>
                  <div className="w-px h-16 bg-gradient-to-b from-transparent via-rose-300 to-transparent" />
                  <div className="text-center p-4 bg-white/50 rounded-2xl border border-white shadow-sm backdrop-blur-sm">
                    <p className="text-3xl sm:text-4xl font-serif font-bold text-rose-900 leading-none">∞</p>
                    <p className="text-[10px] uppercase tracking-widest text-rose-400 font-bold mt-1">Forever To Go</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartJourney}
                className="w-full sm:w-auto px-12 py-4 sm:py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-bold text-lg sm:text-xl shadow-lg shadow-rose-300/50 transition-all flex items-center justify-center gap-3 group touch-manipulation relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                   Begin Surprise <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          )}

          {stage === 'gift' && (
            <motion.div key="gift" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center px-4">
              <h2 className="text-2xl sm:text-3xl font-serif text-rose-950 mb-10 sm:mb-14">A gift for you, <br className="sm:hidden" /> {APP_CONFIG.wifeName}...</h2>
              <motion.div 
                whileTap={{ scale: 0.9 }}
                onClick={handleReveal} 
                className="cursor-pointer relative group inline-block touch-manipulation"
              >
                <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-tr from-rose-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse" />
                <motion.div 
                  animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }} 
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="relative"
                >
                   <Gift size={130} className="sm:size-[160px] text-rose-500 mx-auto drop-shadow-2xl" strokeWidth={1.5} />
                   <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white p-2.5 sm:p-3 rounded-full shadow-lg text-rose-500">
                     <Sparkles size={18} fill="currentColor" />
                   </div>
                </motion.div>
                <p className="mt-8 text-rose-400 text-sm animate-bounce">Tap to open</p>
              </motion.div>
            </motion.div>
          )}

          {stage === 'reveal' && (
            <motion.div key="reveal" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl px-2">
              <div className="bg-white/90 backdrop-blur-md rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-16 shadow-[0_20px_60px_rgba(244,63,94,0.15)] border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-100 to-rose-50 rounded-bl-full -mr-16 -mt-16 opacity-60" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose-100 to-rose-50 rounded-tr-full -ml-16 -mb-16 opacity-60" />
                
                <div className="relative z-10">
                  <MailOpen size={32} className="text-rose-400 mb-6 sm:mb-8" />
                  
                  <div className="min-h-[260px] sm:min-h-[300px]">
                    <h2 className="text-3xl sm:text-4xl font-serif text-rose-950 mb-6 sm:mb-8">My Minakshi,</h2>
                    <div className="text-rose-900 text-lg sm:text-xl leading-relaxed font-serif italic space-y-4 sm:space-y-6">
                      <Typewriter text={APP_CONFIG.finalLetter} delay={0.035} />
                    </div>
                  </div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5 }} className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-rose-100">
                    <p className="text-center text-rose-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">Tap our memories</p>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {APP_CONFIG.memories.map((m, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedMemory(m)}
                          className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-50/50 flex items-center gap-2 sm:gap-3 text-rose-700 text-xs sm:text-sm font-medium transition-all text-left border border-transparent hover:bg-white hover:shadow-md hover:border-rose-100 touch-manipulation"
                        >
                          <span className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0 group-hover:text-rose-500 transition-colors">{m.icon}</span>
                          <span className="truncate">{m.text}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.button 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 7.5 }} 
                onClick={() => setStage('landing')} 
                className="mt-8 sm:mt-12 text-rose-400 hover:text-rose-600 transition-colors flex items-center gap-2 mx-auto text-[10px] font-bold tracking-widest uppercase touch-manipulation"
              >
                <Heart size={14} fill="currentColor" /> Relive the magic
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Music Control */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        <button 
          onClick={toggleAudio}
          className={`w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border transition-all active:scale-90 ${isPlaying ? 'bg-rose-500 text-white border-rose-500 shadow-rose-300/50' : 'bg-white/80 text-rose-400 border-rose-100'}`}
        >
          {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>
    </div>
  );
}