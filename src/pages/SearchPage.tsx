import { useState } from "react";
import { SearchBar } from "@/src/components/SearchBar";
import { ListingCard } from "@/src/components/ListingCard";
import { 
  SlidersHorizontal, 
  Map, 
  ArrowUpRight,
  ChevronDown
} from "lucide-react";

const ALL_PROPERTIES = [
  {
    id: "1",
    title: "Skyline Elite Residency",
    type: "PG",
    price: 18500,
    city: "Mumbai",
    locality: "Andheri West",
    rating: 4.8,
    isVerified: true,
    amenities: ["WiFi", "AC", "Food", "Laundry"],
    images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80"]
  },
  {
    id: "2",
    title: "Ivy League Hostel",
    type: "Hostel",
    price: 12000,
    city: "Delhi",
    locality: "North Campus",
    rating: 4.5,
    isVerified: true,
    amenities: ["WiFi", "Food", "Gym"],
    images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80"]
  },
  {
    id: "3",
    title: "Central Student Suites",
    type: "Rental",
    price: 25000,
    city: "Bangalore",
    locality: "Indiranagar",
    rating: 4.9,
    isVerified: true,
    amenities: ["WiFi", "Kitchen", "AC"],
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d95280?auto=format&fit=crop&q=80"]
  }
];

export function SearchPage() {
  const [results] = useState(ALL_PROPERTIES);

  return (
    <div className="pt-32 pb-20 bg-black min-h-screen text-white font-sans">
      <div className="container mx-auto px-6">
        <div className="mb-16 border-b border-border pb-12">
           <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none mb-6 italic">Marketplace.</h1>
           <p className="text-muted text-lg font-medium uppercase tracking-widest leading-relaxed">Discover {results.length} elite staying options handpicked for excellence across the network.</p>
        </div>

        <SearchBar onSearch={(filters) => console.log("Searching...", filters)} />

        <div className="mt-24 flex flex-col lg:flex-row gap-20">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-16">
            <div className="space-y-12">
               <div className="flex items-center justify-between border-b border-border pb-4">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                   <SlidersHorizontal className="w-3 h-3" /> Filter Parameters
                 </h3>
                 <button className="text-[10px] text-muted font-black uppercase tracking-widest hover:text-white transition-colors underline">Reset</button>
               </div>
               
               <div className="space-y-12">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-6 flex justify-between items-center group cursor-pointer">
                       Asset Category <ChevronDown className="w-3 h-3 group-hover:text-white transition-colors" />
                    </h4>
                    <div className="space-y-4">
                       {['PG / Mess', 'Hostel', 'Rental', 'Flatshare'].map(type => (
                         <label key={type} className="flex items-center gap-4 cursor-pointer group">
                           <div className="w-4 h-4 border border-border group-hover:border-white transition-colors bg-black flex items-center justify-center">
                              <input type="checkbox" className="hidden" />
                              <div className="w-1.5 h-1.5 bg-white opacity-0 transition-opacity" />
                           </div>
                           <span className="text-[11px] font-black uppercase tracking-widest text-muted group-hover:text-white transition-colors">{type}</span>
                         </label>
                       ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-6 flex justify-between items-center group cursor-pointer">
                       Utility Stack <ChevronDown className="w-3 h-3 group-hover:text-white transition-colors" />
                    </h4>
                    <div className="space-y-4">
                       {['WiFi', 'Food', 'AC', 'Laundry', 'Security'].map(item => (
                         <label key={item} className="flex items-center gap-4 cursor-pointer group">
                            <div className="w-4 h-4 border border-border group-hover:border-white transition-colors bg-black flex items-center justify-center">
                              <input type="checkbox" className="hidden" />
                              <div className="w-1.5 h-1.5 bg-white opacity-0 transition-opacity" />
                           </div>
                           <span className="text-[11px] font-black uppercase tracking-widest text-muted group-hover:text-white transition-colors">{item}</span>
                         </label>
                       ))}
                    </div>
                  </div>
               </div>
            </div>

            <div className="p-8 border border-border relative overflow-hidden group hover:border-white transition-all cursor-pointer">
               <Map className="w-12 h-12 text-white opacity-5 absolute -right-2 -bottom-2 group-hover:opacity-20 transition-opacity" />
               <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 italic flex items-center gap-2">Spatial View <ArrowUpRight className="w-3 h-3" /></h3>
               <p className="text-[11px] text-muted mb-6 font-medium leading-relaxed uppercase tracking-wider">Visualize verified campus assets in high-definition isometric perspective.</p>
               <button className="w-full py-4 bg-zinc-900 border border-border text-white text-[10px] font-black uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-all">Connect Map</button>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 bg-border border border-border">
               {results.map((property) => (
                 <ListingCard key={property.id} property={property} />
               ))}
             </div>
             
             {/* Load More */}
             <div className="mt-20 flex justify-center">
                <button className="px-16 py-6 border border-border hover:border-white text-white text-[11px] font-black uppercase tracking-widest transition-all italic leading-none flex items-center gap-3">
                  Sync More Nodes <ChevronDown className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
