import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, LogIn } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { auth, signInWithGoogle } from "@/src/lib/firebase";
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "firebase/auth";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const navLinks = [
    { name: "Explore", path: "/search" },
    { name: "List Asset", path: "/owner/add" },
    { name: "Vision", path: "/about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-8",
        isScrolled ? "bg-black/80 backdrop-blur-3xl border-b border-border py-4" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white flex items-center justify-center font-display font-black text-black text-xs">
            R
          </div>
          <span className="font-display font-black text-lg tracking-tighter uppercase text-white">
            RentMate
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-[10px] font-black uppercase tracking-[0.2em] transition-colors text-muted hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-8">
          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/student" className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-white transition-colors">
                Control Center
              </Link>
              <div className="w-10 h-10 bg-white flex items-center justify-center font-black text-black text-xs cursor-pointer group relative">
                 {user.displayName?.[0] || user.email?.[0] || 'U'}
                 <div className="absolute top-full right-0 mt-4 w-48 bg-black border border-border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto p-4 space-y-4">
                    <Link to="/student" className="block text-[9px] font-black uppercase tracking-widest text-muted hover:text-white transition-colors">Student Mode</Link>
                    <Link to="/owner" className="block text-[9px] font-black uppercase tracking-widest text-muted hover:text-white transition-colors">Owner Mode</Link>
                    <button onClick={() => signOut(auth)} className="block text-[9px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors w-full text-left">Terminate Session</button>
                 </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <button
                onClick={signInWithGoogle}
                className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-white transition-colors"
              >
                Access
              </button>
              <button
                onClick={signInWithGoogle}
                className="px-8 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-colors"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black border-b border-border flex flex-col p-8 gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-xs font-black uppercase tracking-widest text-muted hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-border opacity-20" />
            <button
              onClick={() => {
                signInWithGoogle();
                setIsMenuOpen(false);
              }}
              className="w-full py-5 bg-white text-black flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
