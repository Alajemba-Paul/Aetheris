'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Zap } from 'lucide-react';
import Link from 'next/link';

export default function CreateEvent() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [cap, setCap] = useState('50');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const lat = 5.39; // Default FUTO lat mock
    const lng = 6.98; // Default FUTO lng mock

    const { error } = await supabase.from('events').insert([
      {
        title: title,
        attendee_cap: parseInt(cap),
        lat: lat,
        lng: lng,
        is_paid: true
      }
    ]);

    setLoading(false);

    if (!error) {
      alert('Event Created! 10 USDC Base Fee Processed (Mocked).');
      router.push('/');
    } else {
      alert('Error creating event. Check Supabase connection.');
    }
  };

  return (
    <div className="relative h-screen w-full bg-black text-cyan-400 font-sans flex flex-col items-center justify-center">
      <div className="relative w-full max-w-md h-full max-h-[900px] bg-black border-x border-cyan-900/30 overflow-y-auto">
        
        <header className="flex items-center p-4 border-b border-cyan-900/50 sticky top-0 bg-black/90 backdrop-blur z-10">
          <Link href="/">
            <button className="text-cyan-600 hover:text-cyan-400 p-2">
              <ChevronLeft size={24} />
            </button>
          </Link>
          <h2 className="text-lg font-bold text-cyan-100 ml-2 tracking-wide uppercase">Forge a Spark</h2>
        </header>

        <main className="p-6">
          <form onSubmit={handleCreate} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-cyan-700 mb-2">Event Title</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-900 border border-cyan-900 rounded-xl p-4 text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                placeholder="e.g., Blockfest Meetup"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-cyan-700 mb-2">Attendee Cap</label>
              <input 
                type="number" 
                required
                value={cap}
                onChange={(e) => setCap(e.target.value)}
                className="w-full bg-zinc-900 border border-cyan-900 rounded-xl p-4 text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>

            <div className="bg-cyan-950/20 border border-amber-500/30 rounded-xl p-5 my-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-cyan-100 font-medium">Creation Stake</span>
                <span className="text-amber-400 font-bold text-lg flex items-center gap-1">
                  <Zap size={16} className="fill-amber-400" /> 10 USDC
                </span>
              </div>
              <p className="text-xs text-cyan-600 leading-relaxed">
                Paying this fee mints your event on-chain. 50% of this fee goes directly to the weekly Aether Vault prize pool.
              </p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-extrabold tracking-wide py-4 rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? 'Forging...' : 'Sign Transaction'}
            </button>
          </form>
        </main>

      </div>
    </div>
  );
}
