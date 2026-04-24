import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { 
  MapPin, 
  Star, 
  Wifi, 
  Utensils, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Users,
  ChevronRight,
  Heart,
  Share2,
  Calendar,
  Check
} from "lucide-react";
import { formatPrice } from "@/src/lib/utils";

export default function PropertyDetail() {
  const { id } = useParams();

  // Mock property data
  const property = {
    id: id,
    title: "Skyline Elite Residency",
    description: "Premium student living in the heart of the city. We offer a holistic environment with state-of-the-art facilities, zero-interference management, and a vibrant student community. Perfect for serious scholars and ambitious students.",
    type: "PG",
    price: 18500,
    deposit: 37000,
    city: "Mumbai",
    locality: "Andheri West",
    college: "SVKM's NMIMS",
    distance: 1.2,
    gender: "Boys",
    rating: 4.8,
    isVerified: true,
    amenities: ["Gigabit WiFi", "Gourmet Meals", "Laundry", "24/7 Security", "Gym", "Power Backup"],
    rules: ["Gate closes at 11 PM", "Visitors allowed in common areas", "Quiet hours after 10 PM", "No smoking"],
    images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80"]
  };

  return (
    <div className="pt-24 pb-32 bg-black min-h-screen text-white font-sans">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest">
                {property.type}
              </span>
              <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                <ShieldCheck className="w-3 h-3" /> Verified Asset
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase max-w-4xl leading-[0.9]">
              {property.title}.
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-muted text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2 italic"><MapPin className="w-4 h-4" /> {property.locality}, {property.city}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {property.distance}km from {property.college}</span>
              <span className="flex items-center gap-2"><Star className="w-4 h-4 fill-white text-white" /> {property.rating} (42 Reviews)</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="p-4 border border-border hover:border-white transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-4 border border-border hover:border-white transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-20">
          <div className="md:col-span-8 aspect-[16/9] bg-zinc-900 border border-border relative overflow-hidden group">
            <img src={property.images[0]} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="" />
          </div>
          <div className="md:col-span-4 grid grid-cols-1 gap-2">
            <div className="bg-zinc-900 border border-border" />
            <div className="bg-zinc-900 border border-border relative flex items-center justify-center">
              <button className="text-[10px] font-black uppercase tracking-[0.3em] underline hover:text-white transition-colors text-muted">View Gallery (12+)</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-20">
            {/* Description */}
            <section className="space-y-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted border-b border-border pb-4">Executive Summary</h2>
              <p className="text-xl font-medium leading-relaxed max-w-3xl text-zinc-100">
                {property.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8">
                 <div className="p-6 border border-border space-y-4">
                    <Users className="w-5 h-5 text-muted" />
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Target Resident</h4>
                      <p className="text-xs font-bold uppercase tracking-widest">{property.gender} Students Only</p>
                    </div>
                 </div>
                 <div className="p-6 border border-border space-y-4">
                    <Calendar className="w-5 h-5 text-muted" />
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Minimum Lease</h4>
                      <p className="text-xs font-bold uppercase tracking-widest">06 Months Required</p>
                    </div>
                 </div>
                 <div className="p-6 border border-border space-y-4">
                    <Check className="w-5 h-5 text-muted" />
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Availability</h4>
                      <p className="text-xs font-bold uppercase tracking-widest">Immediate Move-in</p>
                    </div>
                 </div>
              </div>
            </section>

            {/* Amenities */}
            <section className="space-y-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted border-b border-border pb-4">Asset Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-border border border-border">
                {[
                  { icon: Wifi, label: "600MBPS WiFi" },
                  { icon: Utensils, label: "Buffet Dining" },
                  { icon: Zap, label: "Power Grid" },
                  { icon: ShieldCheck, label: "Secure Vitals" },
                  { icon: Users, label: "Elite Community" },
                  { icon: Clock, label: "Zero Timing" },
                ].map((item) => (
                  <div key={item.label} className="bg-black p-8 flex flex-col items-center justify-center text-center gap-4 hover:bg-zinc-900 transition-colors">
                    <item.icon className="w-6 h-6 text-white" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Rules */}
            <section className="space-y-12">
               <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted border-b border-border pb-4">Operational Protocols</h2>
               <div className="space-y-6">
                 {property.rules.map((rule, index) => (
                   <div key={index} className="flex items-center gap-6 group">
                     <span className="text-[10px] font-black text-muted group-hover:text-white transition-colors">{String(index + 1).padStart(2, '0')}</span>
                     <span className="text-sm font-bold uppercase tracking-widest text-muted group-hover:text-white transition-colors italic">{rule}</span>
                   </div>
                 ))}
               </div>
            </section>
          </div>

          {/* Booking Widget */}
          <aside className="lg:col-span-1">
             <div className="sticky top-32 p-10 border border-border bg-zinc-900/30 backdrop-blur-3xl space-y-8">
               <div className="flex justify-between items-end border-b border-border pb-8">
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted mb-2">Price Estimate</h3>
                    <p className="text-4xl font-display font-black tracking-tighter italic whitespace-nowrap">{formatPrice(property.price)} <span className="text-[10px] font-black not-italic uppercase tracking-widest text-muted">/ Month</span></p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted mb-2">Deposit</h3>
                    <p className="text-sm font-bold tracking-widest">{formatPrice(property.deposit)}</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-muted">Select Room Configuration</label>
                    <select className="w-full bg-black border border-border p-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-white transition-colors appearance-none">
                       <option>Single Occupancy (Elite)</option>
                       <option>Twin Sharing (Standard)</option>
                       <option>Triple Sharing (Basic)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-muted">Proposed Intake Date</label>
                    <input type="date" className="w-full bg-black border border-border p-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-white transition-colors" />
                  </div>
               </div>

               <button className="w-full py-6 bg-white text-black text-xs font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 group">
                  Initialize Booking <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>

               <div className="pt-4 flex flex-col gap-4">
                  <button className="w-full py-4 border border-border text-[10px] font-black uppercase tracking-widest hover:border-white transition-colors">
                    Coordinate Visit
                  </button>
                  <p className="text-[10px] text-muted text-center font-medium leading-relaxed px-4">
                    Booking requires a verified student ID. Zero hidden charges. Platinum service included.
                  </p>
               </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
