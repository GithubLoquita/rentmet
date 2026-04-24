import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, Star, Heart, ShieldCheck } from "lucide-react";
import { formatPrice, cn } from "@/src/lib/utils";
import { auth, db, signInWithGoogle } from "@/src/lib/firebase";
import { doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

interface ListingCardProps {
  property: {
    id: string;
    title: string;
    type: string;
    price: number;
    city: string;
    locality: string;
    rating: number;
    images: string[];
    isVerified?: boolean;
  };
}

export function ListingCard({ property }: ListingCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setIsSaved(false);
      return;
    }

    const wishlistDoc = doc(db, "users", user.uid, "wishlist", property.id);
    const unsubscribe = onSnapshot(wishlistDoc, (docSnap) => {
      setIsSaved(docSnap.exists());
    });

    return () => unsubscribe();
  }, [property.id, auth.currentUser]);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const user = auth.currentUser;
    if (!user) {
      try {
        await signInWithGoogle();
      } catch (error) {
        console.error("Failed to sign in", error);
      }
      return;
    }

    setLoading(true);
    const wishlistRef = doc(db, "users", user.uid, "wishlist", property.id);

    try {
      if (isSaved) {
        await deleteDoc(wishlistRef);
      } else {
        await setDoc(wishlistRef, {
          propertyId: property.id,
          savedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Error updating wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-black group border-none"
    >
      <Link to={`/property/${property.id}`} className="block relative group">
        <div className="aspect-[4/5] bg-zinc-900 border border-border group-hover:border-white transition-all duration-500 relative overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700" 
          />
          
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="px-3 py-1 bg-white text-black text-[9px] font-black uppercase tracking-widest leading-none">
              {property.type}
            </span>
            {property.isVerified && (
              <div className="w-5 h-5 bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
              </div>
            )}
          </div>
          
          <button 
            onClick={toggleWishlist}
            disabled={loading}
            className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all z-10"
          >
            <Heart className={cn("w-4 h-4 transition-colors", isSaved ? "fill-white text-white" : "text-white")} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
             <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em]">
               Initiate Protocol
             </button>
          </div>
        </div>

        <div className="pt-8 pb-10 px-2 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] leading-tight group-hover:text-white transition-colors">{property.title}</h3>
            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-muted">
               <Star className="w-3 h-3 fill-white text-white" />
               {property.rating}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted italic">
            <MapPin className="w-3 h-3" />
            {property.locality}, {property.city}
          </div>

          <div className="pt-4 border-t border-white/5 flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted">Listing Price</span>
              <p className="text-xl font-display font-medium tracking-tighter italic leading-none">{formatPrice(property.price)} <span className="text-[9px] font-black not-italic text-muted uppercase tracking-widest">/ Mo</span></p>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
               Low Latency
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
