import React, { useState, useCallback } from 'react';
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

const Sidebar = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slideIn = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const sidebarX = interpolate(slideIn, [0, 1], [-100, 0]);

  const menuItems = [
    { id: 1, icon: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> }, // Home
    { id: 2, icon: <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> }, // Stats
    { id: 3, icon: <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v4a2 2 0 00-2-2" /> }, // Server
    { id: 4, icon: <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 21a9.994 9.994 0 007.454-3.344m-2.837-5.658V11a4 4 0 118 0v.171m-3.337 5.103l.066.102M12 11V9a4 4 0 10-8 0v2.171m3.337 5.103l-.066.102M12 11a4 4 0 11-8 0V9a4 4 0 118 0v2z" /> }, // Security
    { id: 5, icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" /> }, // Power/Energy
    { id: 6, icon: <React.Fragment><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></React.Fragment> }, // Settings
    { id: 7, icon: <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /> }, // Logout
  ];

  return (
    <div
      style={{
        width: 80,
        height: '100%',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        transform: `translateX(${sidebarX}px)`,
        zIndex: 10,
      }}
    >
      <div className="w-12 h-12 bg-blue-600 rounded-xl mb-12 flex items-center justify-center shadow-lg shadow-blue-500/20">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center transition-all duration-300 ${
            item.id === 6 ? 'bg-blue-600/30 border border-blue-500 text-blue-400' : 'text-gray-500 hover:bg-white/10 hover:text-white'
          }`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {item.icon}
          </svg>
        </div>
      ))}
    </div>
  );
};

const TopBar = ({ onToggleHUD }: { onToggleHUD: () => void }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = spring({
    frame: frame - 15,
    fps,
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 80,
        right: 0,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        opacity: fadeIn,
        zIndex: 10,
      }}
    >
      <div className="flex items-center gap-12">
        <h1 className="text-white text-2xl font-bold">IoT devices</h1>
        <div className="flex bg-gray-800/50 rounded-full p-1 border border-white/5">
          {['Overview', 'Engine room', 'Internet device', 'Office device', 'Other device'].map((tab, i) => (
            <div
              key={tab}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                i === 1 ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-8 text-gray-300">
        <div className="text-xl">11:25 AM</div>
        <div className="flex items-center gap-2">
          <span>28°C</span>
        </div>
        <button 
          onClick={onToggleHUD}
          className="w-10 h-10 bg-red-500/20 border border-red-500/50 rounded-full flex items-center justify-center relative hover:bg-red-500/30 transition-colors cursor-pointer"
          style={{
            boxShadow: `0 0 ${interpolate(Math.sin(frame / 5), [-1, 1], [5, 20])}px rgba(239, 68, 68, 0.5)`,
            animation: 'pulse 1s infinite',
            outline: 'none',
          }}
        >
          <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2 animate-pulse" />
          <div className="w-5 h-5 border-2 border-red-400 rounded-full" />
        </button>
      </div>
    </div>
  );
};

const AnimatedNumber = ({ value, duration = 60, delay = 0 }: { value: number; duration?: number; delay?: number }) => {
  const frame = useCurrentFrame();
  const animatedValue = interpolate(frame - delay, [0, duration], [0, value], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  return <span>{Math.floor(animatedValue).toLocaleString()}</span>;
};

const StatCard = ({ title, value, unit, delay = 0 }: { title: string; value: string; unit?: string; delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grow = spring({
    frame: frame - 30 - delay,
    fps,
  });

  const numValue = parseFloat(value.replace(/,/g, ''));

  return (
    <div
      style={{
        background: 'rgba(30, 41, 59, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 20,
        transform: `scale(${interpolate(grow, [0, 1], [0.8, 1])})`,
        opacity: grow,
      }}
    >
      <div className="text-gray-400 text-sm mb-2">{title}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-white text-3xl font-bold">
          {isNaN(numValue) ? value : <AnimatedNumber value={numValue} delay={30 + delay} />}
        </span>
        {unit && <span className="text-gray-500 text-sm">{unit}</span>}
      </div>
    </div>
  );
};

const LeftPanel = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slideIn = spring({
    frame: frame - 20,
    fps,
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 100,
        left: 100,
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        transform: `translateX(${interpolate(slideIn, [0, 1], [-50, 0])}px)`,
        opacity: slideIn,
        zIndex: 10,
        background: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(12px)',
        padding: '24px',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
      }}
    >
      <div className="flex gap-4">
        <div className="flex-1 bg-gray-800/40 p-4 rounded-xl border border-white/5 flex justify-between items-center">
          <span className="text-gray-400 text-xs">Equipment alarm</span>
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">3</span>
        </div>
        <div className="flex-1 bg-gray-800/40 p-4 rounded-xl border border-white/5 flex justify-between items-center">
          <span className="text-gray-400 text-xs">Personnel alarm</span>
          <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full font-bold">0</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-gray-300 text-sm font-medium">Equipment Quantity</h3>
        <div className="text-5xl font-bold text-white flex items-baseline gap-2">
          <AnimatedNumber value={1208} delay={60} />
          <span className="text-blue-400 text-sm font-normal">▲ 145</span>
        </div>
        <div className="space-y-3 pt-2">
          {[
            { label: 'Wireless device', value: 7924, percent: 68, color: 'bg-blue-500' },
            { label: 'Wired device', value: 21, percent: 2, color: 'bg-purple-500' },
            { label: 'Offline', value: 2302, percent: 10, color: 'bg-gray-500' },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs text-gray-400">
                <span>{item.label}</span>
                <span>{item.value.toLocaleString()} ({item.percent}%)</span>
              </div>
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color}`} 
                  style={{ 
                    width: `${interpolate(spring({ frame: frame - 40, fps }), [0, 1], [0, item.percent])}%` 
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-gray-300 text-sm font-medium">Machine room operation</h3>
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="PUE" value="1.21" />
          <StatCard title="Total load" value="1,247" unit="kw" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-gray-300 text-sm font-medium">Environmental monitoring</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Temperature', value: '31', unit: '°C' },
            { label: 'Humidity', value: '45', unit: '%' },
            { label: 'Smoke', value: '31.8', unit: 'mg/m³' },
          ].map((item) => (
            <div key={item.label} className="bg-gray-800/40 p-3 rounded-xl border border-white/5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mb-2" />
              <div className="text-white text-xl font-bold">{item.value}</div>
              <div className="text-gray-500 text-[10px] uppercase">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RightPanel = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slideIn = spring({
    frame: frame - 30,
    fps,
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 100,
        right: 40,
        width: 48,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        background: 'rgba(30, 41, 59, 0.4)',
        padding: '12px 6px',
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transform: `translateY(${interpolate(slideIn, [0, 1], [50, 0])}px)`,
        opacity: slideIn,
        zIndex: 10,
      }}
    >
      {['All', '6F', '5F', '4F', '3F', '2F', '1F', '-1F', '-2F'].map((floor, i) => (
        <div
          key={floor}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold ${
            floor === '2F' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          {floor}
        </div>
      ))}
    </div>
  );
};

const HolographicData = ({ x, y, title, value, unit, color = '#3b82f6' }: { x: number; y: number; title: string; value: string; unit?: string; color?: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const float = Math.sin(frame / 15) * 5;
  
  const appear = spring({
    frame: frame - 100 - (x + y) * 2,
    fps,
    config: { damping: 15 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate3d(${x * 80 + 20}px, ${-180 + float}px, ${y * 80}px) scale(${appear})`,
        opacity: appear * 0.8,
        transformStyle: 'preserve-3d',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
          border: `1px solid ${color}44`,
          padding: '8px 12px',
          borderRadius: '4px',
          minWidth: '100px',
          boxShadow: `0 0 20px ${color}22`,
        }}
      >
        <div style={{ color: color, fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '2px' }}>{title}</div>
        <div className="flex items-baseline gap-1">
          <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>{value}</div>
          <div style={{ color: color, fontSize: '10px' }}>{unit}</div>
        </div>
        {/* Decorative lines */}
        <div style={{ position: 'absolute', bottom: -20, left: '50%', width: '1px', height: '20px', background: `linear-gradient(to bottom, ${color}aa, transparent)` }} />
      </div>
    </div>
  );
};

const ServerRack = ({ x, y, highlighted = false, alert = false }: { x: number; y: number; highlighted?: boolean; alert?: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const appear = spring({
    frame: frame - 60 - (x + y) * 2,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const flicker = Math.sin(frame / 5) * 0.1 + 0.9;
  const alertPulse = alert ? Math.sin(frame / 10) * 0.5 + 0.5 : 0;
  
  // Data flow light effect
  const lightTrailPos = (frame * 2) % 120;
  
  const rackWidth = 44;
  const rackHeight = 140;
  const rackDepth = 44;

  return (
    <div
      style={{
        position: 'absolute',
        transformStyle: 'preserve-3d',
        transform: `translate3d(${x * 90}px, 0, ${y * 100}px) scaleY(${appear})`,
        opacity: Math.min(1, appear * 2),
      }}
    >
      {alert && frame > 120 && (
        <Audio 
          src={staticFile("alert.mp3")} 
          startFrom={0} 
          volume={0.5} 
          loop
        />
      )}
      
      {/* Alert Glow Box */}
      {alert && (
        <div
          style={{
            position: 'absolute',
            width: rackWidth + 40,
            height: rackHeight + 40,
            background: 'rgba(239, 68, 68, 0.4)',
            filter: 'blur(30px)',
            transform: `translate3d(-20px, ${-rackHeight - 20}px, 0)`,
            opacity: alertPulse,
          }}
        />
      )}
      
      {/* Rack Main Body */}
      {/* Front Face - Premium Glass/Perforated Look */}
      <div
        style={{
          position: 'absolute',
          width: rackWidth,
          height: rackHeight,
          background: '#0f172a',
          border: '2px solid #334155',
          transform: `translate3d(0, ${-rackHeight}px, ${rackDepth / 2}px)`,
          display: 'flex',
          flexDirection: 'column',
          padding: '2px',
          boxShadow: highlighted ? '0 0 40px rgba(59, 130, 246, 0.4)' : 'inset 0 0 20px rgba(0,0,0,0.8)',
          overflow: 'hidden',
        }}
      >
        {/* Internal Units */}
        <div className="flex-1 flex flex-col gap-[2px]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                height: '8px',
                background: '#1e293b',
                borderBottom: '1px solid rgba(0,0,0,0.3)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '0 4px',
              }}
            >
              {/* LED Indicators */}
              <div className="flex gap-1">
                <div 
                  style={{ 
                    width: '2px', 
                    height: '2px', 
                    borderRadius: '50%', 
                    background: alert && i < 3 ? '#ef4444' : (Math.random() > 0.3 ? '#10b981' : '#059669'),
                    boxShadow: (alert && i < 3) ? '0 0 4px #ef4444' : 'none',
                    opacity: flicker 
                  }} 
                />
                <div style={{ width: '2px', height: '2px', borderRadius: '50%', background: '#3b82f6', opacity: Math.random() * 0.5 }} />
              </div>
              
              {/* Unit Detail */}
              <div style={{ marginLeft: 'auto', width: '12px', height: '1px', background: 'rgba(255,255,255,0.05)' }} />
            </div>
          ))}
        </div>

        {/* Glass Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, rgba(255,255,255,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            pointerEvents: 'none',
          }}
        />

        {/* Status Bar at Bottom */}
        <div className="h-4 flex items-center px-2 justify-between bg-black/40">
          <div className="flex gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${alert ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} style={{ boxShadow: alert ? '0 0 8px #ef4444' : '0 0 4px #22c55e' }} />
            <div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full" />
          </div>
          <div className="text-[6px] text-gray-500 font-mono">U{Math.floor(42 - (y * 2 + x))}</div>
        </div>
        
        {/* Scanning Light Effect */}
        <div
          style={{
            position: 'absolute',
            top: lightTrailPos,
            left: 0,
            right: 0,
            height: '30px',
            background: `linear-gradient(to bottom, transparent, ${alert ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'}, transparent)`,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Side Faces with Metal Texture */}
      {/* Back Face */}
      <div
        style={{
          position: 'absolute',
          width: rackWidth,
          height: rackHeight,
          background: '#0f172a',
          transform: `translate3d(0, ${-rackHeight}px, ${-rackDepth / 2}px) rotateY(180deg)`,
          border: '1px solid #1e293b',
        }}
      />

      {/* Left Face */}
      <div
        style={{
          position: 'absolute',
          width: rackDepth,
          height: rackHeight,
          background: '#111827',
          transform: `translate3d(${-rackDepth / 2}px, ${-rackHeight}px, 0) rotateY(-90deg)`,
          border: '1px solid #1e293b',
          backgroundImage: 'linear-gradient(90deg, transparent 95%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* Right Face */}
      <div
        style={{
          position: 'absolute',
          width: rackDepth,
          height: rackHeight,
          background: '#111827',
          transform: `translate3d(${rackWidth - rackDepth / 2}px, ${-rackHeight}px, 0) rotateY(90deg)`,
          border: '1px solid #1e293b',
          backgroundImage: 'linear-gradient(-90deg, transparent 95%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* Top Face */}
      <div
        style={{
          position: 'absolute',
          width: rackWidth,
          height: rackDepth,
          background: '#1e293b',
          transform: `translate3d(0, ${-rackHeight - rackDepth / 2}px, 0) rotateX(90deg)`,
          border: '1px solid #334155',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
        }}
      />

      {/* Alert Tooltip */}
      {alert && frame > 120 && (
        <div
          style={{
            position: 'absolute',
            top: -rackHeight - 60,
            left: rackWidth / 2,
            transform: `translate3d(-50%, 0, 40px) scale(${spring({ frame: frame - 120, fps })})`,
            background: 'rgba(239, 68, 68, 0.95)',
            backdropFilter: 'blur(4px)',
            padding: '10px 16px',
            borderRadius: 4,
            whiteSpace: 'nowrap',
            zIndex: 100,
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)',
          }}
        >
          <div className="text-white text-xs font-bold flex flex-col items-center">
            <span className="text-[10px] uppercase opacity-70 mb-1">Status Alert</span>
            <span className="text-sm tracking-tight">CRITICAL OVERHEAT</span>
          </div>
          {/* Arrow */}
          <div style={{ position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid rgba(239, 68, 68, 0.95)' }} />
        </div>
      )}
    </div>
  );
};

const Ceiling = () => {
  return (
    <div
      style={{
        position: 'absolute',
        width: 4000,
        height: 4000,
        background: '#020205',
        transform: 'translate3d(-2000px, -450px, -2000px) rotateX(90deg)',
        zIndex: -1,
      }}
    >
      {/* Structural grid lines (Solid) */}
      {[...Array(20)].map((_, i) => (
        <React.Fragment key={i}>
          <div style={{ position: 'absolute', left: i * 200, top: 0, bottom: 0, width: '2px', background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'absolute', top: i * 200, left: 0, right: 0, height: '2px', background: 'rgba(0,0,0,0.5)' }} />
        </React.Fragment>
      ))}
      
      {/* Recessed panels */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Overhead lights - more subtle and professional */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 1000 + i * 300,
            top: 1000,
            width: '4px',
            height: '2000px',
            background: 'linear-gradient(to bottom, #1e3a8a, transparent)',
            boxShadow: '0 0 30px rgba(30, 58, 138, 0.3)',
            opacity: 0.1,
          }}
        />
      ))}
    </div>
  );
};

const Cables = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ transformStyle: 'preserve-3d' }}>
      {[...Array(6)].map((_, i) => {
        const x = (i - 3) * 150;
        const z = -300;
        const swing = Math.sin(frame / 20 + i) * 2;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '300px',
              background: '#1e293b',
              transform: `translate3d(${x}px, -400px, ${z}px) rotateZ(${swing}deg)`,
              borderLeft: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Glowing connectors */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '8px',
                height: '8px',
                left: '-2px',
                background: '#3b82f6',
                borderRadius: '50%',
                boxShadow: '0 0 10px #3b82f6',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const Floor = () => {
  return (
    <div
      style={{
        position: 'absolute',
        width: 4000,
        height: 4000,
        background: '#050508',
        transform: 'translate3d(-2000px, 0, -2000px) rotateX(90deg)',
        zIndex: -1,
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)',
      }}
    >
      {/* High-tier Raised Floor Tiles */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Subtle Tile Texture and Micro-scratches */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.2,
          backgroundImage: `
            radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.01) 20px, rgba(255,255,255,0.01) 21px)
          `,
          backgroundSize: '4px 4px, 20px 20px',
        }}
      />

      {/* Floor Grid (Stronger structural lines for depth) */}
      {[...Array(40)].map((_, i) => (
        <React.Fragment key={i}>
          <div style={{ position: 'absolute', left: i * 120, top: 0, bottom: 0, width: i % 5 === 0 ? '2px' : '1px', background: i % 5 === 0 ? 'rgba(37, 99, 235, 0.15)' : 'rgba(37, 99, 235, 0.08)' }} />
          <div style={{ position: 'absolute', top: i * 120, left: 0, right: 0, height: i % 5 === 0 ? '2px' : '1px', background: i % 5 === 0 ? 'rgba(37, 99, 235, 0.15)' : 'rgba(37, 99, 235, 0.08)' }} />
          
          {/* Tile Corner Rivets */}
          {[...Array(40)].map((_, j) => (
            <div 
              key={`rivet-${i}-${j}`}
              style={{ 
                position: 'absolute', 
                left: i * 120 - 1, 
                top: j * 120 - 1, 
                width: '2px', 
                height: '2px', 
                background: '#1e293b',
                borderRadius: '50%',
                opacity: 0.5
              }} 
            />
          ))}
        </React.Fragment>
      ))}

      {/* Warning Strips for Rack Areas */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`warning-area-${i}`}
          style={{
            position: 'absolute',
            left: 1000,
            top: 2000 + (i - 1) * 300 - 60,
            width: '2000px',
            height: '120px',
            background: 'rgba(239, 68, 68, 0.02)',
            borderTop: '1px solid rgba(239, 68, 68, 0.1)',
            borderBottom: '1px solid rgba(239, 68, 68, 0.1)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Aisle Safety Markings & Numbers */}
      {[...Array(5)].map((_, i) => {
        const xPos = 2000 + (i - 2) * 400;
        return (
          <React.Fragment key={`aisle-${i}`}>
            {/* Aisle Label */}
            <div
              style={{
                position: 'absolute',
                left: xPos,
                top: 2100,
                color: 'rgba(59, 130, 246, 0.2)',
                fontSize: '40px',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                transform: 'rotate(-90deg)',
                whiteSpace: 'nowrap',
              }}
            >
              AISLE 0{i + 1}
            </div>
            {/* Ground Safety Boundaries */}
            <div 
              style={{
                position: 'absolute',
                left: xPos - 100,
                top: 1500,
                width: '200px',
                height: '1000px',
                border: '2px dashed rgba(59, 130, 246, 0.05)',
                pointerEvents: 'none',
              }}
            />
            {/* Aisle Entrance Markers */}
            <div 
              style={{
                position: 'absolute',
                left: xPos - 10,
                top: 1500,
                width: '20px',
                height: '4px',
                background: '#3b82f6',
                boxShadow: '0 0 10px #3b82f6',
                opacity: 0.3
              }}
            />
          </React.Fragment>
        );
      })}

      {/* Hazard Strips near Rack Rows */}
      {[-2, 0, 2].map((rowY) => (
        <React.Fragment key={`hazard-group-${rowY}`}>
          <div
            style={{
              position: 'absolute',
              left: 1000,
              top: 2000 + rowY * 100 + 50,
              width: '2000px',
              height: '4px',
              background: 'repeating-linear-gradient(90deg, #fbbf24, #fbbf24 10px, #000 10px, #000 20px)',
              opacity: 0.25,
            }}
          />
          {/* Floor maintenance indicators */}
          <div
            style={{
              position: 'absolute',
              left: 1500 + rowY * 100,
              top: 2000 + rowY * 100,
              width: '80px',
              height: '80px',
              border: '1px solid rgba(59, 130, 246, 0.1)',
              background: 'rgba(59, 130, 246, 0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(59, 130, 246, 0.2)',
              fontSize: '10px',
              fontFamily: 'monospace'
            }}
          >
            SEC_{rowY + 3}
          </div>
        </React.Fragment>
      ))}

      {/* Reflection / Specular Highlights - More pronounced for "polished" look */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, transparent 40%, rgba(37, 99, 235, 0.05) 100%)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Light spots from server racks */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

const FloatingHUD = ({ alert = false }: { alert?: boolean }) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame / 30) * 10;
  const themeColor = alert ? '#ef4444' : '#3b82f6';
  
  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate3d(-500px, -250px, 100px) rotateY(30deg)`,
        transformStyle: 'preserve-3d',
        pointerEvents: 'none',
        opacity: alert ? interpolate(Math.sin(frame / 10), [-1, 1], [0.6, 1]) : 0.8,
      }}
    >
      <div
        style={{
          width: '400px',
          height: '250px',
          background: alert ? 'rgba(239, 68, 68, 0.1)' : 'rgba(37, 99, 235, 0.05)',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${themeColor}66`,
          borderRadius: '12px',
          padding: '20px',
          transform: `translateY(${float}px)`,
          boxShadow: `0 0 30px ${themeColor}22`,
        }}
      >
        <div 
          style={{ color: themeColor }}
          className="text-[10px] font-bold uppercase mb-4 tracking-widest flex items-center gap-2"
        >
          {alert && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
          {alert ? 'Critical Alert: System Overheat' : 'Mainframe Status'}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-1">
              <div 
                className="flex justify-between text-[10px]"
                style={{ color: alert ? '#fca5a5' : '#93c5fd' }}
              >
                <span>{alert ? `Thermal Sensor 0${i}` : `Core Module 0${i}`}</span>
                <span>{alert ? (90 + i * 2) : (80 + i * 5)}%</span>
              </div>
              <div 
                className="h-1 rounded-full overflow-hidden"
                style={{ background: alert ? 'rgba(153, 27, 27, 0.3)' : 'rgba(30, 58, 138, 0.3)' }}
              >
                <div 
                  className="h-full" 
                  style={{ 
                    width: `${interpolate(frame, [0, 100], [0, alert ? (90 + i * 2) : (80 + i * 5)])}%`,
                    background: themeColor,
                    opacity: 0.6
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
        {/* Animated grid background inside HUD */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${themeColor}33 1px, transparent 1px)`,
            backgroundSize: '10px 10px',
            opacity: 0.5,
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
};

const Particles = () => {
  return (
    <div style={{ transformStyle: 'preserve-3d' }}>
      {[...Array(30)].map((_, i) => {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 800;
        const z = (Math.random() - 0.5) * 2000;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: '#3b82f6',
              borderRadius: '50%',
              transform: `translate3d(${x}px, ${y}px, ${z}px)`,
              opacity: 0.2,
              boxShadow: '0 0 5px #3b82f6',
            }}
          />
        );
      })}
    </div>
  );
};

const ServerRoom = ({ showHUD }: { showHUD: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Alert state timing
  const alertStartFrame = 120;
  const zoomDuration = 90; // 3 seconds at 30fps
  const restoreStartFrame = alertStartFrame + zoomDuration;
  
  const isAlertActive = frame > alertStartFrame;
  
  // Spring for smooth camera transition
  const zoomInSpring = spring({
    frame: frame - alertStartFrame,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const zoomOutSpring = spring({
    frame: frame - restoreStartFrame,
    fps,
    config: { damping: 20, stiffness: 40 },
  });

  // Combine springs for zoom cycle
  const zoomProgress = interpolate(
    zoomOutSpring,
    [0, 1],
    [zoomInSpring, 0]
  );

  // Camera Base Values
  const baseRotateY = interpolate(frame, [0, 300], [-35, -25]);
  const baseRotateX = -25;
  const baseTranslateY = 150;
  const baseTranslateX = 0;
  const baseZ = interpolate(frame, [0, 300], [0, 100]);

  // Target values for zoom-in (focusing on the alert rack at x=1, y=0)
  const targetRotateY = -10;
  const targetRotateX = -15;
  const targetTranslateX = -90; 
  const targetTranslateY = 100;  
  const targetZ = 600;          

  // Interpolated Camera Values
  const cameraRotateY = interpolate(zoomProgress, [0, 1], [baseRotateY, targetRotateY]);
  const cameraRotateX = interpolate(zoomProgress, [0, 1], [baseRotateX, targetRotateX]);
  const translateX = interpolate(zoomProgress, [0, 1], [baseTranslateX, targetTranslateX]);
  const translateY = interpolate(zoomProgress, [0, 1], [baseTranslateY, targetTranslateY]);
  const cameraZ = interpolate(zoomProgress, [0, 1], [baseZ, targetZ]);
  
  const glitch = isAlertActive && frame < alertStartFrame + 10 && Math.random() > 0.5;

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
      style={{
        perspective: '1200px',
        filter: glitch ? 'hue-rotate(90deg) contrast(1.5) blur(2px)' : 'none',
        transform: glitch ? `translate(${Math.random() * 10}px, ${Math.random() * 10}px)` : 'none',
      }}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${cameraRotateX}deg) rotateY(${cameraRotateY}deg) translate3d(${translateX}px, ${translateY}px, ${cameraZ}px)`,
        }}
      >
        <Ceiling />
        <Floor />
        
        {/* Overhead Cable Trays - Adding for more professional look */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`tray-${i}`}
            style={{
              position: 'absolute',
              width: 4000,
              height: 20,
              background: '#1e293b',
              border: '1px solid #334155',
              transform: `translate3d(-2000px, -380px, ${(i - 1) * 400}px)`,
              boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
            }}
          >
            {/* Cable details in tray */}
            <div style={{ position: 'absolute', inset: '4px', display: 'flex', gap: '4px' }}>
              {[...Array(10)].map((_, j) => (
                <div key={j} style={{ flex: 1, height: '100%', background: j % 2 === 0 ? '#3b82f6' : '#1e293b', opacity: 0.3 }} />
              ))}
            </div>
          </div>
        ))}

        <Cables />
        <Particles />
        {showHUD && <FloatingHUD alert={isAlertActive} />}
        
        {/* Background Wall (Rear) */}
        <div
          style={{
            position: 'absolute',
            width: 4000,
            height: 1200,
            background: 'linear-gradient(to bottom, #020205, #0a0a14)',
            transform: 'translate3d(-2000px, -600px, -1200px)',
            zIndex: -2,
            borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          {/* Structural Wall Panels */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: i * 350,
                top: 0,
                bottom: 0,
                width: '348px',
                borderRight: '2px solid rgba(0,0,0,0.5)',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.02))',
              }}
            >
              {/* Vertical cooling vents on wall */}
              <div style={{ position: 'absolute', top: '30%', right: '10%', width: '40px', height: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[...Array(10)].map((_, j) => (
                  <div key={j} style={{ width: '100%', height: '2px', background: 'rgba(0,0,0,0.5)' }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Rows of Racks */}
        {/* Row 1 */}
        {[...Array(10)].map((_, i) => (
          <React.Fragment key={`r1-group-${i}`}>
            <ServerRack x={i - 4} y={-2} highlighted={i === 3} />
            {i === 3 && !isAlertActive && <HolographicData x={i - 4} y={-2} title="System Load" value="84" unit="%" />}
          </React.Fragment>
        ))}
        
        {/* Row 2 */}
        {[...Array(10)].map((_, i) => (
          <React.Fragment key={`r2-group-${i}`}>
            <ServerRack x={i - 4} y={0} alert={i === 5} />
            {i === 5 && isAlertActive && (
              <HolographicData 
                x={i - 4} 
                y={0} 
                title="Node #582 - Critical" 
                value="98.4" 
                unit="°C" 
                color="#ef4444" 
              />
            )}
            {i === 1 && !isAlertActive && <HolographicData x={i - 4} y={0} title="Network" value="1.2" unit="Gbps" color="#10b981" />}
          </React.Fragment>
        ))}
        
        {/* Row 3 */}
        {[...Array(10)].map((_, i) => (
          <ServerRack key={`r3-${i}`} x={i - 4} y={2} />
        ))}

        {/* Dynamic environmental lighting */}
        <div
          style={{
            position: 'absolute',
            width: 2000,
            height: 2000,
            background: isAlertActive 
              ? 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)' 
              : 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
            transform: 'translate3d(-1000px, 0, -1000px) rotateX(90deg)',
            pointerEvents: 'none',
            transition: 'background 0.5s ease',
          }}
        />
      </div>
    </div>
  );
};

const ScanLine = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  
  const y = (frame * 5) % height;
  
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(to right, transparent, rgba(37, 99, 235, 0.2), transparent)',
        boxShadow: '0 0 10px rgba(37, 99, 235, 0.5)',
        zIndex: 50,
        pointerEvents: 'none',
        opacity: 0.3,
      }}
    />
  );
};

const LightLeak = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
        filter: 'blur(40px)',
        transform: `translate(${Math.sin(frame / 20) * 50}px, ${Math.cos(frame / 25) * 50}px)`,
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
};

const SciFiAlertPopup = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const popupStartFrame = 190;
  const appear = spring({
    frame: frame - popupStartFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const contentSlide = spring({
    frame: frame - popupStartFrame - 10,
    fps,
  });

  if (frame < popupStartFrame) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        pointerEvents: 'none',
        background: `rgba(2, 6, 23, ${interpolate(appear, [0, 1], [0, 0.4])})`,
        backdropFilter: `blur(${interpolate(appear, [0, 1], [0, 8])}px)`,
      }}
    >
      <div
        style={{
          width: '800px',
          height: '500px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(239, 68, 68, 0.5)',
          borderRadius: '24px',
          padding: '40px',
          transform: `scale(${interpolate(appear, [0, 1], [0.8, 1])})`,
          opacity: appear,
          boxShadow: '0 0 50px rgba(239, 68, 68, 0.2), inset 0 0 30px rgba(239, 68, 68, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Scanline for Popup */}
        <div 
          style={{
            position: 'absolute',
            top: (frame * 3) % 500,
            left: 0,
            right: 0,
            height: '1px',
            background: 'rgba(239, 68, 68, 0.2)',
            zIndex: 1,
          }}
        />

        {/* Header */}
        <div className="flex justify-between items-start mb-12" style={{ transform: `translateY(${interpolate(contentSlide, [0, 1], [20, 0])}px)`, opacity: contentSlide }}>
          <div>
            <div className="text-red-500 font-bold text-sm tracking-[0.2em] uppercase mb-2">Security Breach / Hardware Failure</div>
            <h2 className="text-white text-4xl font-black">NODE_ALERT: #582-X</h2>
          </div>
          <div className="px-4 py-2 border border-red-500 text-red-500 font-mono text-xs rounded-md animate-pulse">
            CRITICAL_OVERHEAT
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex gap-12 flex-1" style={{ transform: `translateY(${interpolate(contentSlide, [0, 1], [40, 0])}px)`, opacity: contentSlide }}>
          {/* Left Side: Visual Representation */}
          <div className="w-1/3 flex flex-col gap-6">
            <div className="aspect-square bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <svg className="w-24 h-24 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              {/* Spinning Ring */}
              <div 
                className="absolute inset-4 border-2 border-red-500/20 border-t-red-500/60 rounded-full"
                style={{ transform: `rotate(${frame * 5}deg)` }}
              />
            </div>
            <div className="space-y-2">
              <div className="text-[10px] text-gray-500 font-mono">LOCATION_ID</div>
              <div className="text-white font-mono">SERVER_ROOM_B / RACK_05 / U21</div>
            </div>
          </div>

          {/* Right Side: Data Metrics */}
          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'CORE_TEMP', value: '98.4', unit: '°C', status: 'DANGER' },
                { label: 'FAN_SPEED', value: '0', unit: 'RPM', status: 'FAULT' },
                { label: 'VOLTAGE', value: '1.42', unit: 'V', status: 'STABLE' },
                { label: 'LOAD_IDX', value: '94.2', unit: '%', status: 'HIGH' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-[10px] text-gray-500 font-mono mb-1">{stat.label}</div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${stat.status === 'DANGER' ? 'text-red-500' : 'text-white'}`}>{stat.value}</span>
                    <span className="text-[10px] text-gray-400">{stat.unit}</span>
                  </div>
                  <div className={`text-[8px] font-bold mt-2 ${stat.status === 'DANGER' ? 'text-red-500' : 'text-blue-400'}`}>
                    {stat.status}
                  </div>
                </div>
              ))}
            </div>
            
            {/* System Log */}
            <div className="bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-[10px] space-y-1">
              <div className="text-red-500">[11:24:52] ALERT: Thermal threshold exceeded</div>
              <div className="text-red-500">[11:24:55] ERROR: Cooling fan #2 failure detected</div>
              <div className="text-gray-500">[11:24:58] INFO: Initiating emergency shutdown sequence...</div>
              <div className="text-blue-400">[11:25:01] SYS: Rerouting critical traffic to Node #583</div>
            </div>
          </div>
        </div>

        {/* Bottom Deco */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
      </div>
    </div>
  );
};

export const IoTDashboard = () => {
  const frame = useCurrentFrame();
  const [showHUD, setShowHUD] = useState(false);
  
  const toggleHUD = useCallback(() => {
    setShowHUD((prev) => !prev);
  }, []);

  return (
    <AbsoluteFill className="bg-[#0a0a0f] text-white font-sans overflow-hidden">
      <Audio src={staticFile("freezer-hum.mp3")} loop volume={0.3} />
      <div className="w-full h-full relative">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]" />
        
        <LightLeak />
        <ScanLine />
        
        <ServerRoom showHUD={showHUD} />
        
        <Sidebar />
        <TopBar onToggleHUD={toggleHUD} />
        <LeftPanel />
        <RightPanel />
        <SciFiAlertPopup />
      </div>
    </AbsoluteFill>
  );
};
