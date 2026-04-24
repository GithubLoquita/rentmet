import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Github, Mail, Send, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-32 pb-16 border-t border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          <div className="flex flex-col gap-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white flex items-center justify-center font-display font-black text-black">
                R
              </div>
              <span className="font-display font-black text-2xl tracking-tighter uppercase">RentMate</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs font-medium">
              The premium standard for student accommodation. Verified assets, zero brokerage, elite living.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-muted hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-muted hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-muted hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8">Platform</h4>
            <ul className="flex flex-col gap-4 text-muted text-sm font-bold">
              <li><Link to="/search" className="hover:text-white transition-colors">Browse Stays</Link></li>
              <li><Link to="/list-property" className="hover:text-white transition-colors">List Asset</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Vision</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8">Support</h4>
            <ul className="flex flex-col gap-4 text-muted text-sm font-bold">
              <li className="flex items-center gap-3 hover:text-white transition-colors"><Mail className="w-4 h-4" /> support@rentmate.tech</li>
              <li className="flex items-center gap-3 hover:text-white transition-colors"><Send className="w-4 h-4" /> @rentmate_hq</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8">Updates</h4>
            <p className="text-muted mb-6 text-xs font-medium">Join our network of elite students.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Work email" 
                className="flex-1 bg-surface border border-border py-4 px-5 focus:outline-none focus:border-white transition-colors text-xs font-bold"
              />
              <button className="p-4 bg-white text-black hover:bg-white/90 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-muted text-[10px] font-black uppercase tracking-widest">© 2024 RentMate Technologies. Excellence Guaranteed.</p>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-muted">
             <a href="#" className="hover:text-white">Privacy</a>
             <a href="#" className="hover:text-white">Terms</a>
             <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

