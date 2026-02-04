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
      <div className="w-12 h-12 bg-blue-600 rounded-xl mb-12 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white rounded-full" />
      </div>
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div
          key={i}
          className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${
            i === 6 ? 'bg-blue-600/30 border border-blue-500' : 'text-gray-400 hover:bg-white/10'
          }`}
        >
          <div className={`w-6 h-6 border-2 ${i === 6 ? 'border-blue-400' : 'border-gray-500'} rounded`} />
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
  
  const rackWidth = 40;
  const rackHeight = 120;
  const rackDepth = 40;

  return (
    <div
      style={{
        position: 'absolute',
        transformStyle: 'preserve-3d',
        transform: `translate3d(${x * 80}px, 0, ${y * 80}px) scaleY(${appear})`,
        opacity: Math.min(1, appear * 2),
      }}
    >
      {alert && frame > 120 && (
        <Audio 
          src={staticFile("alert-modern.mp3")} 
          startFrom={0} 
          volume={0.5} 
        />
      )}
      {/* Alert Glow Box */}
      {alert && (
        <div
          style={{
            position: 'absolute',
            width: rackWidth + 20,
            height: rackHeight + 20,
            background: 'rgba(239, 68, 68, 0.3)',
            filter: 'blur(20px)',
            transform: `translate3d(-10px, ${-rackHeight - 10}px, 0)`,
            opacity: alertPulse,
          }}
        />
      )}
      {/* Front Face */}
      <div
        style={{
          position: 'absolute',
          width: rackWidth,
          height: rackHeight,
          background: highlighted ? '#3b82f6' : '#1e293b',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transform: `translate3d(0, ${-rackHeight}px, ${rackDepth / 2}px)`,
          display: 'flex',
          flexDirection: 'column',
          padding: '4px',
          boxShadow: highlighted ? '0 0 40px rgba(59, 130, 246, 0.6)' : 'none',
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`w-full h-1.5 my-1 ${highlighted ? 'bg-white/40' : 'bg-blue-500/20'}`}
            style={{ opacity: highlighted ? 1 : flicker }}
          />
        ))}
        <div className="mt-auto flex gap-1">
          <div className={`w-2 h-2 rounded-full ${alert ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
          <div className="w-2 h-2 bg-blue-400 rounded-full" />
        </div>
        
        {/* Animated Light Trail */}
        <div
          style={{
            position: 'absolute',
            top: lightTrailPos,
            left: 0,
            right: 0,
            height: '20px',
            background: `linear-gradient(to bottom, transparent, ${highlighted ? '#60a5fa' : '#3b82f6'}44, transparent)`,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Back Face */}
      <div
        style={{
          position: 'absolute',
          width: rackWidth,
          height: rackHeight,
          background: '#0f172a',
          transform: `translate3d(0, ${-rackHeight}px, ${-rackDepth / 2}px) rotateY(180deg)`,
        }}
      />

      {/* Left Face */}
      <div
        style={{
          position: 'absolute',
          width: rackDepth,
          height: rackHeight,
          background: highlighted ? '#2563eb' : '#0f172a',
          transform: `translate3d(${-rackDepth / 2}px, ${-rackHeight}px, 0) rotateY(-90deg)`,
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      />

      {/* Right Face */}
      <div
        style={{
          position: 'absolute',
          width: rackDepth,
          height: rackHeight,
          background: highlighted ? '#2563eb' : '#0f172a',
          transform: `translate3d(${rackWidth - rackDepth / 2}px, ${-rackHeight}px, 0) rotateY(90deg)`,
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      />

      {/* Top Face */}
      <div
        style={{
          position: 'absolute',
          width: rackWidth,
          height: rackDepth,
          background: highlighted ? '#60a5fa' : '#334155',
          transform: `translate3d(0, ${-rackHeight - rackDepth / 2}px, 0) rotateX(90deg)`,
        }}
      />

      {/* Alert Tooltip (facing camera) */}
      {alert && frame > 120 && (
        <div
          style={{
            position: 'absolute',
            top: -rackHeight - 40,
            left: rackWidth / 2,
            transform: `translate3d(-50%, 0, 20px) scale(${spring({ frame: frame - 120, fps })})`,
            background: 'rgba(239, 68, 68, 0.9)',
            padding: '8px 12px',
            borderRadius: 8,
            whiteSpace: 'nowrap',
            zIndex: 100,
          }}
        >
          <div className="text-white text-xs font-bold flex items-center gap-2">
            Abnormal temperature
          </div>
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
        background: '#050510',
        transform: 'translate3d(-2000px, -400px, -2000px) rotateX(90deg)',
        zIndex: -1,
      }}
    >
      {/* Structural grid lines (Solid) */}
      {[...Array(20)].map((_, i) => (
        <React.Fragment key={i}>
          <div style={{ position: 'absolute', left: i * 200, top: 0, bottom: 0, width: '1px', background: 'rgba(37, 99, 235, 0.05)' }} />
          <div style={{ position: 'absolute', top: i * 200, left: 0, right: 0, height: '1px', background: 'rgba(37, 99, 235, 0.05)' }} />
        </React.Fragment>
      ))}
      {/* Overhead lights */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 1800 + i * 100,
            top: 1500,
            width: '2px',
            height: '1000px',
            background: 'linear-gradient(to bottom, #3b82f6, transparent)',
            boxShadow: '0 0 20px #3b82f6',
            opacity: 0.2,
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
        background: '#0a0a14',
        transform: 'translate3d(-2000px, 0, -2000px) rotateX(90deg)',
        zIndex: -1,
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)',
      }}
    >
      {/* Polished Concrete / Raised Tile Texture */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at center, rgba(37, 99, 235, 0.05) 0%, transparent 80%)
          `,
          backgroundSize: '100px 100px, 100px 100px, 100% 100%',
        }}
      />

      {/* Floor Grid (Subtle Structural lines) */}
      {[...Array(40)].map((_, i) => (
        <React.Fragment key={i}>
          <div style={{ position: 'absolute', left: i * 100, top: 0, bottom: 0, width: '1px', background: 'rgba(37, 99, 235, 0.12)', boxShadow: '0 0 5px rgba(37,99,235,0.2)' }} />
          <div style={{ position: 'absolute', top: i * 100, left: 0, right: 0, height: '1px', background: 'rgba(37, 99, 235, 0.12)', boxShadow: '0 0 5px rgba(37,99,235,0.2)' }} />
        </React.Fragment>
      ))}

      {/* Reflection / Specular Highlights */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)',
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
  const cameraRotateY = interpolate(frame, [0, 300], [-35, -25]);
  const cameraRotateX = -25;
  const cameraZ = interpolate(frame, [0, 300], [0, 100]);
  
  const glitch = frame > 120 && frame < 130 && Math.random() > 0.5;

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
      style={{
        perspective: '1200px',
        filter: glitch ? 'hue-rotate(90deg) contrast(1.5)' : 'none',
        transform: glitch ? `translate(${Math.random() * 5}px, ${Math.random() * 5}px)` : 'none',
      }}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${cameraRotateX}deg) rotateY(${cameraRotateY}deg) translate3d(0, 150px, ${cameraZ}px)`,
        }}
      >
        <Ceiling />
        <Floor />
        <Cables />
        <Particles />
        {showHUD && <FloatingHUD alert />}
        
        {/* Background Wall (Rear) */}
        <div
          style={{
            position: 'absolute',
            width: 4000,
            height: 1200,
            background: 'linear-gradient(to bottom, #050510, #0a0a14)',
            transform: 'translate3d(-2000px, -600px, -1000px)',
            zIndex: -2,
            borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          {/* Structural Wall Panels */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: i * 400,
                top: 0,
                bottom: 0,
                width: '398px',
                borderRight: '2px solid rgba(0,0,0,0.3)',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.01))',
              }}
            >
              {/* Horizontal detail lines */}
              <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.02)' }} />
              <div style={{ position: 'absolute', top: '60%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.02)' }} />
              
              {/* Status light on panel */}
              <div style={{ position: 'absolute', top: '15%', left: '10%', width: '4px', height: '4px', borderRadius: '50%', background: '#3b82f6', opacity: 0.3, boxShadow: '0 0 10px #3b82f6' }} />
            </div>
          ))}

          {/* Glowing conduit on wall */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'rgba(59, 130, 246, 0.1)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' }} />
        </div>

        {/* Side Wall (Left) */}
        <div
          style={{
            position: 'absolute',
            width: 2000,
            height: 1200,
            background: '#070712',
            transform: 'translate3d(-2000px, -600px, 0) rotateY(90deg)',
            zIndex: -2,
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))' }} />
        </div>

        {/* Side Wall (Right) */}
        <div
          style={{
            position: 'absolute',
            width: 2000,
            height: 1200,
            background: '#070712',
            transform: 'translate3d(2000px, -600px, 0) rotateY(-90deg)',
            zIndex: -2,
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))' }} />
        </div>

        {/* Row 1 */}
        {[...Array(10)].map((_, i) => (
          <React.Fragment key={`r1-group-${i}`}>
            <ServerRack x={i - 4} y={-2} highlighted={i === 3} />
            {i === 3 && <HolographicData x={i - 4} y={-2} title="System Load" value="84" unit="%" />}
          </React.Fragment>
        ))}
        
        {/* Row 2 */}
        {[...Array(10)].map((_, i) => (
          <React.Fragment key={`r2-group-${i}`}>
            <ServerRack x={i - 4} y={0} alert={i === 5} />
            {i === 5 && <HolographicData x={i - 4} y={0} title="Temp Critical" value="42" unit="°C" color="#ef4444" />}
            {i === 1 && <HolographicData x={i - 4} y={0} title="Network" value="1.2" unit="Gbps" color="#10b981" />}
          </React.Fragment>
        ))}
        
        {/* Row 3 */}
        {[...Array(10)].map((_, i) => (
          <ServerRack key={`r3-${i}`} x={i - 4} y={2} />
        ))}

        {/* Environmental Glow */}
        <div
          style={{
            position: 'absolute',
            width: 1200,
            height: 1200,
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
            transform: 'translate3d(-600px, 0, -600px) rotateX(90deg)',
            pointerEvents: 'none',
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

export const IoTDashboard = () => {
  const frame = useCurrentFrame();
  const [showHUD, setShowHUD] = useState(false);
  
  const toggleHUD = useCallback(() => {
    setShowHUD((prev) => !prev);
  }, []);

  return (
    <AbsoluteFill className="bg-[#0a0a0f] text-white font-sans overflow-hidden">
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
      </div>
    </AbsoluteFill>
  );
};
