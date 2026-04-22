'use client';

import { useState, useEffect } from 'react';
import { Map, Compass, Ticket, MessageSquare, PlusCircle, Lock, User, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AetherisDashboard() {
  const [mockPrizePool, setMockPrizePool] = useState(1450);
  const [activeTab, setActiveTab] = useState('map');
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => setMockPrizePool(prev => prev + 5), 45000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase.from('events').select('*');
      if (!error && data) setEvents(data);
    }
    fetchEvents();
  }, []);

  return (
    <div className="relative h-screen w-full bg-black text-cyan-400 font-sans overflow-hidden flex flex-col items-center justify-center">
      <div className="relative w-full max-w-md h-full max-h-[900px] bg-black shadow-2xl flex flex-col border-x border-cyan-900/30">
        
        {/* TOP BAR */}
        <header className="absolute top-0 z-20 w-full p-4 bg-gradient-to-b from-black via-black/90 to-transparent">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">
              AETHERIS
            </h1>
            <div className="flex flex-col items-end">
              <span className="text-xs uppercase tracking-wider text-cyan-700">Weekly Vault</span>
              <span className="text-lg font-bold text-amber-400">${mockPrizePool.toLocaleString()}</span>
            </div>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search Sparks, Codes, or Pathfinders..." 
              className="w-full bg-cyan-950/30 border border-cyan-800/50 rounded-full py-2.5 px-4 text-sm text-cyan-100 placeholder-cyan-700 focus:outline-none focus:border-cyan-400 transition-all backdrop-blur-md"
            />
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 relative w-full h-full bg-zinc-900 pt-24 pb-20">
          
          {/* MAP TAB */}
          {activeTab === 'map' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/3.3792,6.5244,12,0/600x900?access_token=YOUR_MOCK_TOKEN')] bg-cover bg-center opacity-30"></div>
              {events.map((event, i) => (
                <div key={event.id || i} className="absolute cursor-pointer" style={{ top: `${Math.random() * 60 + 20}%`, left: `${Math.random() * 60 + 20}%` }}>
                  <div className="relative flex items-center justify-center group">
                    <div className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-cyan-400 opacity-20"></div>
                    <div className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)] border-2 border-black"></div>
                    <div className="absolute bottom-6 bg-black/90 border border-cyan-800 text-cyan-100 text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {event.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* COMING SOON UI BLOCK FOR OTHER TABS */}
          {activeTab !== 'map' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black p-6 z-10">
              <div className="w-24 h-24 mb-6 rounded-full border border-cyan-900/50 bg-cyan-950/20 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                <Lock size={40} className="text-amber-400 opacity-80" />
              </div>
              <h2 className="text-2xl font-bold text-cyan-100 mb-2 text-center">
                {activeTab === 'tickets' ? 'cNFT Passes' : activeTab === 'chat' ? 'Aether Echoes' : 'Voyager Profile'}
              </h2>
              <p className="text-cyan-700 text-center text-sm max-w-[250px] leading-relaxed">
                {activeTab === 'tickets' && 'Solana Seed Vault integration pending. Your immutable passes will appear here.'}
                {activeTab === 'chat' && 'Decentralized reputation and real-time event comms are currently forging in the Aether.'}
                {activeTab === 'profile' && 'Web3 Wallet abstraction via Dynamic.xyz is initializing.'}
              </p>
              <div className="mt-8 px-4 py-2 border border-cyan-800/50 rounded-full bg-cyan-950/30 flex items-center gap-2">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-xs text-cyan-400 font-medium tracking-widest uppercase">Coming Soon</span>
              </div>
            </div>
          )}
        </main>

        {/* FLOATING ACTION BUTTON */}
        <div className="absolute bottom-24 right-4 z-20">
          <Link href="/create">
            <button className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-black p-4 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95 transition-transform">
              <PlusCircle size={28} strokeWidth={2.5} />
            </button>
          </Link>
        </div>

        {/* BOTTOM NAVIGATION */}
        <nav className="absolute bottom-0 z-20 w-full h-20 bg-black/80 backdrop-blur-xl border-t border-cyan-900/50 pb-safe">
          <div className="flex justify-around items-center h-full px-2">
            <NavIcon icon={<Compass size={24} />} label="Explore" isActive={activeTab === 'map'} onClick={() => setActiveTab('map')} />
            <NavIcon icon={<Ticket size={24} />} label="Passes" isActive={activeTab === 'tickets'} onClick={() => setActiveTab('tickets')} />
            <NavIcon icon={<MessageSquare size={24} />} label="Echoes" isActive={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
            <NavIcon icon={<User size={24} />} label="Profile" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          </div>
        </nav>

      </div>
    </div>
  );
}

function NavIcon({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 h-full gap-1 cursor-pointer transition-all duration-200 ${isActive ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-cyan-800 hover:text-cyan-600'}`}
    >
      {icon}
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </div>
  );
}
