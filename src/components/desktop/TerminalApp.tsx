'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: '/help',
      output: (
        <div className="space-y-1.5 text-gray-300 font-pixel text-[11px]">
          <p className="text-emerald-400 font-bold">[SERVER // OVERWORLD]: Minecraft Console v1.21</p>
          <p className="text-gray-400">Type <span className="text-yellow-400">/help</span> or <span className="text-cyan-400">help</span> to view server commands.</p>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    let cmd = input.trim().toLowerCase();
    if (!cmd) return;
    if (cmd.startsWith('/')) {
      cmd = cmd.substring(1);
    }

    let response: React.ReactNode;

    switch (cmd) {
      case 'help':
        response = (
          <div className="space-y-1 text-gray-300 text-xs font-mono">
            <p className="text-yellow-400 font-pixel text-[10px] mb-1">[AVAILABLE CONSOLE COMMANDS]:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-emerald-400 font-bold">/stats</span> (or bio) - Read player profile &amp; stats</div>
              <div><span className="text-cyan-400 font-bold">/inventory</span> (or skills) - List equipped items</div>
              <div><span className="text-amber-400 font-bold">/builds</span> (or projects) - View active worlds</div>
              <div><span className="text-purple-400 font-bold">/beacon</span> (or contact) - Transmit message</div>
              <div><span className="text-rose-400 font-bold">/clear</span> - Clear console logs</div>
              <div><span className="text-yellow-300 font-bold">/op hire</span> - Recruiter easter egg</div>
            </div>
          </div>
        );
        break;

      case 'stats':
      case 'bio':
        response = (
          <p className="text-gray-300 leading-relaxed">
            <span className="text-emerald-400 font-bold">[PLAYER DIPESH_SONI]:</span> UI/UX Designer at Toba Tech &amp; Frontend Developer specializing in React 19, TypeScript, Next.js, and high-performance interactive web experiences. 1st Place Winner at Codefiesta 3.0 National Hackathon.
          </p>
        );
        break;

      case 'inventory':
      case 'skills':
        response = (
          <div className="space-y-1 text-gray-300 text-xs">
            <p><strong className="text-emerald-400 font-pixel text-[10px]">TIER 1 (DIAMOND):</strong> TypeScript, React 19, Next.js 15, JavaScript ES6+, HTML5/CSS3</p>
            <p><strong className="text-cyan-400 font-pixel text-[10px]">TIER 2 (EMERALD):</strong> Tailwind CSS v4, Figma, Responsive Systems, 3D Canvas</p>
            <p><strong className="text-amber-400 font-pixel text-[10px]">TIER 3 (REDSTONE):</strong> Node.js, MongoDB, Firebase, Git, Vercel</p>
          </div>
        );
        break;

      case 'builds':
      case 'projects':
        response = (
          <div className="space-y-1.5 text-gray-300 text-xs">
            <p><span className="text-amber-400 font-bold">[WORLD 1] PixelWings:</span> Production service platform with modern state architecture.</p>
            <p><span className="text-amber-400 font-bold">[WORLD 2] Fiction:</span> High-performance next-gen web gaming platform (React + GSAP + Lenis).</p>
            <p><span className="text-amber-400 font-bold">[WORLD 3] Ghummakkad:</span> Travel &amp; booking engine built with Next.js App Router &amp; SSR.</p>
          </div>
        );
        break;

      case 'beacon':
      case 'contact':
        response = (
          <div className="space-y-1 text-gray-300 text-xs">
            <p>Transmission Endpoint: <a href="mailto:sonidipesh901@gmail.com" className="text-emerald-400 underline">sonidipesh901@gmail.com</a></p>
            <p>GitHub Repository: <a href="https://github.com/dini28" target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com/dini28</a></p>
            <p>LinkedIn Portal: <a href="https://linkedin.com/in/dini28" target="_blank" rel="noreferrer" className="text-purple-400 underline">linkedin.com/in/dini28</a></p>
          </div>
        );
        break;

      case 'op hire':
      case 'hire':
      case 'sudo hire':
        response = (
          <div className="p-3 card-surface border-2 border-emerald-500/50 text-emerald-200">
            <p className="font-pixel text-[10px] flex items-center gap-1.5 text-yellow-300">
              <Sparkles className="w-4 h-4 text-yellow-400" /> [ACHIEVEMENT UNLOCKED]: CANDIDATE ACQUIRED!
            </p>
            <p className="mt-1.5 text-xs text-gray-300">Ready to join your server! Let's craft incredible digital builds. Email me at <a href="mailto:sonidipesh901@gmail.com" className="text-emerald-400 font-bold underline">sonidipesh901@gmail.com</a>.</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        response = (
          <p className="text-rose-400">
            Unknown command: '{cmd}'. Type <span className="text-yellow-400 font-pixel text-[10px]">/help</span> for commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: input, output: response }]);
    setInput('');
  };

  return (
    <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm h-full flex flex-col bg-[#0b0d13]">
      <div className="flex-1 space-y-4">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="text-yellow-400 font-pixel text-[9px]">[SERVER]:</span>
              <span className="text-white font-semibold">{item.command}</span>
            </div>
            <div className="pl-4 py-1">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommand} className="mt-4 pt-3 border-t-2 border-white/10 flex items-center gap-2">
        <span className="text-emerald-400 shrink-0 font-pixel text-[10px]">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type a command (e.g. '/help', '/builds', '/inventory')..."
          className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 placeholder:text-gray-600 font-mono text-xs"
          autoFocus
        />
      </form>
    </div>
  );
};
