import { Sidebar } from "@/src/components/Sidebar";
import { motion } from "motion/react";
import { 
  Search, 
  Heart, 
  Calendar, 
  ChevronRight,
  TrendingUp,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar role="student" />
      
      <main className="flex-1 ml-64 p-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-display font-black tracking-tighter uppercase mb-2">My Network.</h1>
            <p className="text-muted font-medium">Managing your stays and community interactions.</p>
          </div>
          <div className="flex gap-4">
             <Link to="/search" className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-2">
                <Search className="w-4 h-4" /> Discover Assets
             </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
             {/* Pending Bookings */}
             <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-border pb-4 mb-8">Active Requests</h2>
                <div className="space-y-4">
                   {[1].map((item) => (
                     <div key={item} className="p-8 bg-zinc-900/50 border border-border flex items-center justify-between group hover:border-white transition-all">
                        <div className="flex items-center gap-8">
                           <div className="w-20 h-20 bg-zinc-800 border border-border" />
                           <div>
                              <h3 className="text-sm font-black uppercase tracking-widest mb-1 group-hover:text-white transition-colors">Skyline Elite Residency</h3>
                              <p className="text-[10px] text-muted font-medium uppercase tracking-widest mb-4">Unit A2 • Single Occupancy</p>
                              <div className="flex gap-3">
                                 <span className="px-2 py-1 bg-zinc-800 text-[9px] font-black uppercase tracking-widest text-amber-500">Awaiting Owner Response</span>
                                 <span className="px-2 py-1 bg-zinc-800 text-[9px] font-black uppercase tracking-widest text-muted">Move-in: July 15</span>
                              </div>
                           </div>
                        </div>
                        <button className="p-4 border border-border text-muted hover:text-white hover:border-white transition-all">
                           <ChevronRight className="w-5 h-5" />
                        </button>
                     </div>
                   ))}
                </div>
             </section>

             {/* Wishlist Preview */}
             <section>
                <div className="flex items-center justify-between border-b border-border pb-4 mb-8">
                   <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Saved Assets</h2>
                   <Link to="/student/wishlist" className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-white transition-colors underline">View All</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-border border border-border">
                   {[1, 2].map((item) => (
                     <div key={item} className="bg-black p-8 group overflow-hidden">
                        <div className="aspect-video bg-zinc-900 mb-6 border border-border relative overflow-hidden">
                           <button className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-xl flex items-center justify-center border border-white/20">
                              <Heart className="w-4 h-4 fill-white text-white" />
                           </button>
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-1 group-hover:text-white transition-colors">Premium Student Hub</h3>
                        <p className="text-[10px] text-muted font-medium uppercase tracking-widest flex items-center gap-1 mb-4">
                           <MapPin className="w-3 h-3" /> Mumbai, Maharashtra
                        </p>
                        <div className="flex items-center justify-between border-t border-border pt-4">
                           <span className="text-sm font-display font-medium tracking-tighter italic">₹12,500 <span className="text-[10px] text-muted not-italic uppercase font-bold">/ MO</span></span>
                           <button className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-white text-black hover:bg-zinc-200 transition-colors">Book</button>
                        </div>
                     </div>
                   ))}
                </div>
             </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-12">
             <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-border pb-4 mb-8">Verification Status</h2>
                <div className="p-8 bg-zinc-900/30 border border-border space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-border flex items-center justify-center text-muted font-black text-xs">
                        60%
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Identity Pending</h4>
                        <p className="text-[10px] text-muted font-medium uppercase tracking-tighter">Level 1 Complete</p>
                      </div>
                   </div>
                   <p className="text-[11px] text-muted font-medium leading-relaxed">
                      Upload your Student ID to unlock **Verified Booking** and zero-brokerage guarantees.
                   </p>
                   <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                      Complete Verification
                   </button>
                </div>
             </section>

             <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-border pb-4 mb-8">Network Insights</h2>
                <div className="space-y-4">
                   <div className="p-6 border border-border hover:border-white transition-all cursor-default group">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-[10px] font-black uppercase tracking-widest text-muted">Surge Demand</span>
                         <TrendingUp className="w-4 h-4 text-emerald-500" />
                      </div>
                      <p className="text-[11px] text-muted font-medium group-hover:text-white transition-colors">
                         Prices in North Campus are increasing. Lock your booking in the next 48 hours.
                      </p>
                   </div>
                </div>
             </section>
          </div>
        </div>
      </main>
    </div>
  );
}
