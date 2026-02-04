import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

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

const TopBar = () => {
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
        <div className="w-10 h-10 bg-red-500/20 border border-red-500/50 rounded-full flex items-center justify-center relative">
          <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2 animate-pulse" />
          <div className="w-5 h-5 border-2 border-red-400 rounded-full" />
        </div>
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

const ServerRack = ({ x, y, z, highlighted = false, alert = false }: { x: number; y: number; z: number; highlighted?: boolean; alert?: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const appear = spring({
    frame: frame - 60 - (x + y) * 2,
    fps,
    config: { damping: 10 },
  });

  const flicker = Math.sin(frame / 5) * 0.1 + 0.9;

  return (
    <div
      style={{
        position: 'absolute',
        left: 400 + x * 60 - y * 60,
        top: 300 + x * 30 + y * 30 - z * 80,
        width: 50,
        height: 80,
        transform: `scale(${appear})`,
        opacity: appear,
      }}
    >
      {/* Rack Body */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: highlighted ? '#3b82f6' : '#1e293b',
          boxShadow: highlighted ? '0 0 40px rgba(59, 130, 246, 0.5)' : 'none',
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Rack Lights */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`w-full h-0.5 my-2 ${highlighted ? 'bg-white/50' : 'bg-blue-500/30'}`}
            style={{ opacity: highlighted ? 1 : flicker }}
          />
        ))}
        
        {/* Status Indicators */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          <div className={`w-1 h-1 rounded-full ${alert ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
          <div className="w-1 h-1 bg-blue-500 rounded-full" />
        </div>
      </div>

      {/* Alert Tooltip */}
      {alert && frame > 120 && (
        <div
          style={{
            position: 'absolute',
            top: -60,
            left: '50%',
            transform: `translateX(-50%) scale(${spring({ frame: frame - 120, fps })})`,
            background: 'rgba(239, 68, 68, 0.9)',
            padding: '8px 12px',
            borderRadius: 8,
            whiteSpace: 'nowrap',
            zIndex: 20,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}
        >
          <div className="text-white text-xs font-bold flex items-center gap-2">
            <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">!</div>
            Abnormal temperature
          </div>
          <div 
            style={{
              position: 'absolute',
              bottom: -6,
              left: '50%',
              transform: 'translateX(-50%)',
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid rgba(239, 68, 68, 0.9)',
            }}
          />
        </div>
      )}
    </div>
  );
};

const ServerRoom = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className="relative w-full h-full"
        style={{
          transform: 'scale(1.2) translateY(50px)',
        }}
      >
        {/* Left Block */}
        {[...Array(6)].map((_, x) => (
          [...Array(4)].map((_, y) => (
            <ServerRack 
              key={`left-${x}-${y}`} 
              x={x} 
              y={y + 8} 
              z={0} 
              highlighted={x === 2 && y === 1}
            />
          ))
        ))}
        
        {/* Right Block */}
        {[...Array(8)].map((_, x) => (
          [...Array(6)].map((_, y) => (
            <ServerRack 
              key={`right-${x}-${y}`} 
              x={x + 8} 
              y={y} 
              z={0} 
              alert={x === 3 && y === 2}
            />
          ))
        ))}
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
  
  const panX = interpolate(frame, [0, 300], [0, -20]);

  return (
    <AbsoluteFill className="bg-[#0a0a0f] text-white font-sans overflow-hidden">
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: ` translateX(${panX}px)`,
        }}
      >
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]" />
        
        <LightLeak />
        <ScanLine />
        
        <ServerRoom />
        
        <Sidebar />
        <TopBar />
        <LeftPanel />
        <RightPanel />
      </div>
    </AbsoluteFill>
  );
};
