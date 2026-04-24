import { useState } from "react";
import { Sidebar } from "@/src/components/Sidebar";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  Info, 
  Check,
  ChevronRight,
  ChevronLeft,
  Upload,
  Zap,
  Wifi,
  Utensils
} from "lucide-react";

export default function AddProperty() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar role="owner" />
      
      <main className="flex-1 ml-64 p-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-20 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-display font-black tracking-tighter uppercase mb-2">Asset Integration.</h1>
              <p className="text-muted font-medium">Adding a new node to the RentMate property network.</p>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4">
              <span className="text-white">Step {step}</span>
              <div className="w-40 h-1 bg-border relative">
                 <motion.div 
                   className="absolute left-0 top-0 h-full bg-white"
                   initial={{ width: "25%" }}
                   animate={{ width: `${(step / totalSteps) * 100}%` }}
                 />
              </div>
              <span className="text-muted">{totalSteps}</span>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              {step === 1 && (
                <div className="space-y-10">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted block">Identity Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Skyline Elite Residency"
                        className="w-full bg-black border border-border p-6 text-sm font-bold focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted block">Asset Classification</label>
                      <select className="w-full bg-black border border-border p-6 text-sm font-bold focus:outline-none focus:border-white transition-colors appearance-none">
                        <option>PG (Paying Guest)</option>
                        <option>Hostel</option>
                        <option>Private Rental</option>
                        <option>Flatshare</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted block">Operational Description</label>
                    <textarea 
                      placeholder="Detailed property specifications..."
                      rows={6}
                      className="w-full bg-black border border-border p-6 text-sm font-bold focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10">
                   <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted block">Target City</label>
                      <input 
                        type="text" 
                        placeholder="Mumbai, Delhi, Bangalore..."
                        className="w-full bg-black border border-border p-6 text-sm font-bold focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted block">Locality Node</label>
                      <input 
                        type="text" 
                        placeholder="Andheri West, Hauz Khas..."
                        className="w-full bg-black border border-border p-6 text-sm font-bold focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>
                  <div className="p-12 border border-dashed border-border flex flex-col items-center justify-center text-center space-y-4 hover:border-white transition-colors cursor-pointer group">
                     <MapPin className="w-8 h-8 text-muted group-hover:text-white transition-colors" />
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted group-hover:text-white transition-colors">Connect Google Maps Coordinates</p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10">
                   <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted block">Monthly Rent (INR)</label>
                      <div className="relative">
                        <IndianRupee className="w-4 h-4 absolute left-6 top-1/2 -translate-y-1/2 text-muted" />
                        <input 
                          type="number" 
                          placeholder="0.00"
                          className="w-full bg-black border border-border py-6 pl-14 pr-6 text-sm font-bold focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted block">Security Deposit (INR)</label>
                      <div className="relative">
                        <IndianRupee className="w-4 h-4 absolute left-6 top-1/2 -translate-y-1/2 text-muted" />
                        <input 
                          type="number" 
                          placeholder="0.00"
                          className="w-full bg-black border border-border py-6 pl-14 pr-6 text-sm font-bold focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted block">Included Protocols</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       {[
                         { icon: Wifi, label: "Gigabit WiFi" },
                         { icon: Utensils, label: "Premium Food" },
                         { icon: Zap, label: "Electricity" },
                         { icon: Info, label: "Housekeeping" }
                       ].map((item) => (
                         <div key={item.label} className="p-6 border border-border flex flex-col items-center gap-4 hover:border-white transition-colors cursor-pointer group">
                           <item.icon className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-muted group-hover:text-white transition-colors">{item.label}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-10">
                   <div className="p-20 border-2 border-dashed border-border flex flex-col items-center justify-center text-center space-y-6 hover:border-white transition-colors cursor-pointer group">
                      <div className="w-16 h-16 bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest mb-1">Visual Asset Upload</h3>
                        <p className="text-[10px] text-muted font-medium uppercase tracking-widest">DRAG AND DROP HIGH-RES PHOTOGRAPHY (MAX 10MB)</p>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-video bg-zinc-900 border border-border" />
                      ))}
                   </div>
                </div>
              )}

              <footer className="pt-20 border-t border-border flex justify-between">
                <button 
                  onClick={prevStep}
                  disabled={step === 1}
                  className="flex items-center gap-3 px-8 py-5 border border-border text-[10px] font-black uppercase tracking-widest text-muted hover:text-white hover:border-white transition-all disabled:opacity-0"
                >
                  <ChevronLeft className="w-4 h-4" /> Discard Changes
                </button>
                
                {step < totalSteps ? (
                  <button 
                    onClick={nextStep}
                    className="flex items-center gap-3 px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all"
                  >
                    Confirm & Next <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    className="flex items-center gap-3 px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all"
                  >
                    Initialize Listing <Check className="w-4 h-4" />
                  </button>
                )}
              </footer>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
