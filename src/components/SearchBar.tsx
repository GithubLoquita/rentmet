import { useState } from "react";
import { Search, MapPin, Filter, IndianRupee, Users } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

export function SearchBar({ onSearch }: { onSearch?: (filters: any) => void }) {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="w-full max-w-5xl mx-auto -mt-20 relative z-30 px-6">
      <div className="bg-black border border-border shadow-[0_0_50px_rgba(255,255,255,0.05)] p-1 md:p-2">
        <div className="flex flex-col md:flex-row items-stretch gap-1">
          
          <div className="flex-1 flex items-center gap-3 px-6 py-5 bg-[#050505] border border-transparent focus-within:border-white/20 transition-all group">
            <Search className="w-5 h-5 text-muted shrink-0 group-focus-within:text-white" />
            <input 
              type="text" 
              placeholder="College name, city, or area..." 
              className="w-full bg-transparent border-none focus:ring-0 text-white font-bold placeholder:text-muted placeholder:font-medium"
            />
          </div>

          <div className="flex items-stretch gap-1">
            <div className="px-6 py-5 bg-[#050505] flex items-center gap-3 cursor-pointer hover:bg-[#0A0A0A] transition-colors border border-transparent hover:border-white/10 group">
               <IndianRupee className="w-4 h-4 text-muted group-hover:text-white" />
               <span className="text-sm font-bold text-white whitespace-nowrap">Budget</span>
            </div>

            <div className="px-6 py-5 bg-[#050505] flex items-center gap-3 cursor-pointer hover:bg-[#0A0A0A] transition-colors border border-transparent hover:border-white/10 group">
               <Users className="w-4 h-4 text-muted group-hover:text-white" />
               <span className="text-sm font-bold text-white whitespace-nowrap">Resident</span>
            </div>

            <button className="px-10 py-5 bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-white/90 transition-all shrink-0">
              Find Rooms
            </button>
          </div>
        </div>

        <div className="flex items-center gap-8 py-4 px-6 border-t border-border mt-1">
           {['All', 'PG', 'Hostel', 'Rentals', 'Flatshare'].map((type) => (
             <button
              key={type}
              onClick={() => setActiveTab(type.toLowerCase())}
              className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                activeTab === type.toLowerCase() 
                  ? "text-white" 
                  : "text-muted hover:text-white/50"
              )}
             >
               {type}
             </button>
           ))}
           <div className="ml-auto text-[10px] font-black uppercase tracking-[0.2em] text-muted hover:text-white cursor-pointer transition-colors">
             More Options +
           </div>
        </div>
      </div>
    </div>
  );
}
