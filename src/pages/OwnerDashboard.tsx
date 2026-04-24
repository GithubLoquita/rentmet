import { Sidebar } from "@/src/components/Sidebar";
import { motion } from "motion/react";
import { 
  Users, 
  Bed, 
  TrendingUp, 
  Clock,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";

export default function OwnerDashboard() {
  const stats = [
    { label: "Total Revenue", value: "₹45,280", icon: TrendingUp, trend: "+12%" },
    { label: "Active Listings", value: "12", icon: Bed, trend: "0%" },
    { label: "Occupancy Rate", value: "94%", icon: Users, trend: "+2.4%" },
    { label: "Pending Visits", value: "08", icon: Clock, trend: "-1" },
  ];

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar role="owner" />
      
      <main className="flex-1 ml-64 p-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-display font-black tracking-tighter uppercase mb-2">Control Panel.</h1>
            <p className="text-muted font-medium">Welcome back, Administrator. Your assets are performing optimally.</p>
          </div>
          <div className="flex gap-4">
             <div className="px-4 py-2 bg-zinc-900 border border-border text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Live Network Status: Good
             </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mb-12 bg-border border border-border">
          {stats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
              className="bg-black p-8 group hover:bg-zinc-900 transition-colors cursor-default"
            >
              <div className="flex justify-between items-start mb-4">
                <stat.icon className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">{stat.trend}</span>
              </div>
              <h3 className="text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-2">{stat.label}</h3>
              <p className="text-3xl font-display font-bold tracking-tighter italic">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Recent Activity Logs</h2>
              <button className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-white transition-colors flex items-center gap-1">
                Full Log <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="space-y-1">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-between p-6 bg-zinc-900/50 border border-border hover:border-white transition-all group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 bg-white flex items-center justify-center font-black text-black text-xs">
                      {String(item).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-1 group-hover:text-white transition-colors">Booking request from Rahul S.</h4>
                      <p className="text-[10px] text-muted font-medium">Verified Student • 2 mins ago • Deluxe Suite A2</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-border pb-4">Terminal Commands</h2>
            <div className="grid grid-cols-1 gap-2">
              <button className="p-6 border border-border bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                Publish New Asset
              </button>
              <button className="p-6 border border-border bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 transition-colors">
                Broadcast Notice
              </button>
              <button className="p-6 border border-border bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 transition-colors">
                Export Financials
              </button>
            </div>

            <div className="p-8 bg-zinc-900/30 border border-dashed border-border rounded-lg">
               <h3 className="text-[10px] font-black uppercase tracking-widest mb-4">Elite Verification</h3>
               <p className="text-[11px] text-muted font-medium leading-relaxed mb-6">
                 Your owner account is in "Beta" status. Complete full KYC to unlock verified badges and priority listing placement.
               </p>
               <button className="w-full py-3 bg-zinc-800 text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-700 transition-colors">
                 Begin KYC
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
