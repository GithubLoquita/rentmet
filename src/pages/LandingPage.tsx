import { motion } from "motion/react";
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Users, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import VoxelCity from "@/src/components/VoxelCity";

export function LandingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-black text-white font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-8"
            >
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Live in Beta — Early Access for Owners
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-[120px] font-display font-black tracking-tighter leading-[0.85] uppercase mb-12"
            >
              Student Housing,<br />
              <span className="italic text-muted">Reimagined.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted font-medium mb-16 max-w-2xl leading-relaxed"
            >
              The premium standard for elite student accommodation. Verified assets, zero brokerage, and a curated community of scholars.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                to="/search" 
                className="px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 group"
              >
                Secure a Stay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/owner/add" 
                className="px-12 py-6 border border-border font-black uppercase text-xs tracking-[0.3em] hover:border-white transition-all flex items-center justify-center gap-3"
              >
                List Your Asset <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* 3D Voxel Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-40">
           <VoxelCity />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-40 border-t border-border">
        <div className="container mx-auto px-6">
           <div className="mb-24 flex justify-between items-end">
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted mb-4 italic underline decoration-white/20 underline-offset-8">Infrastructure</h2>
                <p className="text-4xl font-display font-black tracking-tighter uppercase leading-none">Built for the Elite.</p>
              </div>
              <p className="text-muted text-xs font-bold uppercase tracking-widest max-w-[200px] text-right italic leading-relaxed">Everything a student needs to thrive in the modern campus ecosystem.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-border border border-border">
              {[
                { title: "Hyper-Verified", desc: "Every property undergoing a 40-point physical inspection before listing.", icon: ShieldCheck },
                { title: "Zero Latency", desc: "Direct owner communication with instant booking protocols and zero brokerage.", icon: Zap },
                { title: "High Occupancy", desc: "A network of 50,000+ elite students seeking premium accommodation daily.", icon: Users },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  {...fadeInUp}
                  className="bg-black p-16 group hover:bg-zinc-900 transition-colors"
                >
                  <feature.icon className="w-8 h-8 mb-10 text-white" />
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-6 group-hover:text-white transition-colors italic">{feature.title}</h3>
                  <p className="text-muted font-medium leading-relaxed uppercase text-[11px] tracking-widest">{feature.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Stats / Numbers */}
      <section className="py-32 bg-white text-black">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { label: "Active Nodes", value: "2.4k+" },
                { label: "Verified Students", value: "50k+" },
                { label: "Success Rate", value: "99.2%" },
                { label: "Market Volume", value: "$4.2M" },
              ].map((stat, i) => (
                <div key={i}>
                   <h4 className="text-6xl md:text-8xl font-display font-black tracking-tighter italic mb-4">{stat.value}</h4>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{stat.label}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-40">
        <div className="container mx-auto px-6">
           <motion.div 
             {...fadeInUp}
             className="max-w-5xl mx-auto text-center"
           >
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter uppercase leading-[1.1] mb-12 italic">
                "RentMate turned our student housing struggle into a premium living experience. The verification is world-class."
              </h2>
              <div className="flex flex-col items-center gap-4">
                 <div className="w-16 h-16 bg-white flex items-center justify-center font-black text-black">
                   A
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest">Aryan Sharma</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted italic">IIT Bombay • Elite Resident</p>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 border-t border-border relative">
        <div className="container mx-auto px-6 text-center z-10 relative">
           <h2 className="text-6xl md:text-9xl font-display font-black tracking-tighter uppercase mb-16 italic">Join the Elite.</h2>
           <Link 
            to="/student" 
            className="inline-flex items-center gap-3 px-16 py-8 bg-white text-black font-black uppercase text-sm tracking-[0.4em] hover:bg-zinc-200 transition-all group"
          >
            Start Your Journey <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="absolute inset-0 bg-zinc-900/10 pointer-events-none opacity-50" />
      </section>
    </div>
  );
}
