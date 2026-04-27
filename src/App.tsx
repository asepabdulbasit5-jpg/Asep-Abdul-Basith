import { 
  Shield, 
  Zap, 
  Menu, 
  Settings,
  MoreVertical, 
  Plus, 
  X, 
  Terminal, 
  Check,
  ChevronDown,
  Lock,
  Globe,
  HardDrive,
  Cpu,
  RefreshCw,
  Hash,
  Download,
  Save,
  FileDown,
  FileUp
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const PlusMenu = ({ isOpen, onClose, onSelect }: { isOpen: boolean, onClose: () => void, onSelect: (menu: string) => void }) => {
  const menus = [
    { id: 'import_config', name: 'Import Config', icon: <FileUp className="w-4 h-4" />, sub: 'From file or clipboard' },
    { id: 'save_config', name: 'Save Config', icon: <FileDown className="w-4 h-4" />, sub: 'Export to .zivpn' },
  ];

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm bg-surface-800 border border-surface-700 rounded-lg shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-700">
          <h2 className="text-sm font-bold text-gray-200 uppercase tracking-widest">Config Manager</h2>
          <button onClick={onClose} className="p-1 hover:bg-surface-700 rounded transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="p-2 space-y-1">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => {
                onSelect(menu.id);
                onClose();
              }}
              className="w-full flex items-center gap-4 px-4 py-4 hover:bg-surface-700 transition-colors group rounded-lg text-left"
            >
              <div className="p-2 bg-surface-900 rounded-lg text-gray-500 group-hover:text-brand-primary group-hover:bg-brand-primary/10 transition-all">
                {menu.icon}
              </div>
              <div className="flex-1">
                <span className="block text-sm font-bold text-gray-200 group-hover:text-brand-primary">{menu.name}</span>
                <span className="block text-[10px] text-gray-500 uppercase font-medium">{menu.sub}</span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) => (
  <label className="flex items-center gap-3 group cursor-pointer">
    <div 
      onClick={() => onChange(!checked)}
      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
        checked ? 'bg-brand-primary border-brand-primary' : 'border-surface-600 group-hover:border-surface-500'
      }`}
    >
      {checked && <Check className="w-4 h-4 text-black stroke-[3.5px]" />}
    </div>
    <span className="text-[14px] text-gray-300 select-none font-medium">{label}</span>
  </label>
);

const UDPTweakModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm bg-surface-800 border border-surface-700 rounded-lg shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-700">
          <h2 className="text-sm font-bold text-gray-200">UDP Zivpn Core Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-surface-700 rounded transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="p-5 space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-500 uppercase">Buffer size</label>
            <input 
              type="text" 
              defaultValue="64"
              className="w-full bg-transparent border-b border-surface-600 focus:border-brand-primary py-1 text-sm outline-none transition-colors font-mono"
            />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 rounded-sm border border-brand-primary flex items-center justify-center bg-brand-primary">
                <Check className="w-3 h-3 text-black" />
              </div>
              <span className="text-[12px] text-gray-300 font-medium">Mbit</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 rounded-sm border border-surface-600 flex items-center justify-center"></div>
              <span className="text-[12px] text-gray-400 font-medium">MByte</span>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">TX (Transfer)</label>
              <input 
                type="text" 
                defaultValue="1"
                className="w-full bg-transparent border-b border-surface-600 focus:border-brand-primary py-1 text-sm outline-none transition-colors font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">RX (Receive)</label>
              <input 
                type="text" 
                defaultValue="1"
                className="w-full bg-transparent border-b border-surface-600 focus:border-brand-primary py-1 text-sm outline-none transition-colors font-mono"
              />
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-black text-[13px] font-bold uppercase tracking-widest rounded-sm transition-all mt-4"
          >
            Apply
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const SettingsHub = ({ isOpen, onClose, onSelect }: { isOpen: boolean, onClose: () => void, onSelect: (menu: string) => void }) => {
  const menus = [
    { id: 'zivpn', name: 'ZiVPN Setting' },
    { id: 'psiphon', name: 'Psiphon Setting' },
    { id: 'v2ray', name: 'V2ray Setting' },
    { id: 'slowdns', name: 'SlowDNS Setting' },
    { id: 'udprequest', name: 'UDP Request Setting' },
    { id: 'udptweak', name: 'UDP Tweak Setting' },
  ];

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm bg-surface-800 border border-surface-700 rounded-lg shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-700">
          <h2 className="text-sm font-bold text-gray-200 uppercase tracking-widest">Protocol Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-surface-700 rounded transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="p-2">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => onSelect(menu.id)}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-surface-700 transition-colors group rounded-lg"
            >
              <span className="text-sm text-gray-300 group-hover:text-brand-primary">{menu.name}</span>
              <div className="p-1.5 bg-surface-900 rounded-full">
                <Settings className="w-3.5 h-3.5 text-gray-500 group-hover:text-brand-primary" />
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const MoreMenu = ({ isOpen, onClose, onSelect }: { isOpen: boolean, onClose: () => void, onSelect: (menu: string) => void }) => {
  const menus = [
    { id: 'sharevpn', name: 'Share VPN / Hotspot', icon: <Zap className="w-4 h-4" /> },
    { id: 'autoping', name: 'Auto Ping Tool', icon: <Terminal className="w-4 h-4" /> },
    { id: 'wakelock', name: 'Wakelock', icon: <Shield className="w-4 h-4" /> },
  ];

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-sm bg-surface-800 border border-surface-700 rounded-lg shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-700">
          <h2 className="text-sm font-bold text-gray-200 uppercase tracking-widest">Utilities</h2>
          <button onClick={onClose} className="p-1 hover:bg-surface-700 rounded transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="p-2">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => onSelect(menu.id)}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-surface-700 transition-colors group rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-500 group-hover:text-brand-primary">{menu.icon}</span>
                <span className="text-sm text-gray-300 group-hover:text-brand-primary">{menu.name}</span>
              </div>
              <div className="p-1.5 bg-surface-900 rounded-full">
                <Check className="w-3.5 h-3.5 text-transparent" />
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose, onSelect }: { isOpen: boolean, onClose: () => void, onSelect: (menu: string) => void }) => {
  const menus = [
    { id: 'payload_proxy', name: 'Payload & Proxy', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'sni', name: 'SNI Setting', icon: <Lock className="w-4 h-4" /> },
    { id: 'ssh', name: 'SSH Setting', icon: <Terminal className="w-4 h-4" /> },
    { id: 'vpn', name: 'VPN Setting', icon: <Shield className="w-4 h-4" /> },
    { id: 'dns_custom', name: 'DNS Custom', icon: <Globe className="w-4 h-4" /> },
    { id: 'udpgw', name: 'UDPGW SSH', icon: <Cpu className="w-4 h-4" /> },
    { id: 'ip_hunter', name: 'Mobile IP Hunter', icon: <Zap className="w-4 h-4" /> },
    { id: 'hwid', name: 'Device HWID', icon: <Hash className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] z-[80] bg-surface-900 border-r border-surface-800 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-surface-800">
              <h2 className="text-xl font-bold text-brand-primary tracking-tighter italic">ZiVPN PRO</h2>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Premium Edition</p>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              {menus.map((menu) => (
                <button
                  key={menu.id}
                  onClick={() => {
                    onSelect(menu.id);
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-surface-800 transition-colors text-gray-300 hover:text-brand-primary group"
                >
                  <span className="text-gray-500 group-hover:text-brand-primary">{menu.icon}</span>
                  <span className="text-sm font-medium">{menu.name}</span>
                </button>
              ))}
            </div>
            <div className="p-6 border-t border-surface-800 opacity-40">
              <p className="text-[10px] text-center text-gray-500 font-mono">v4.8.2-stable (64-bit)</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const GenericSettingModal = ({ isOpen, title, onClose, children }: { isOpen: boolean, title: string, onClose: () => void, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-sm bg-surface-800 border border-surface-700 rounded-lg shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-700">
          <h2 className="text-sm font-bold text-gray-200">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-surface-700 rounded transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {children}
          <button 
            onClick={onClose}
            className="w-full py-3 bg-brand-primary text-black text-[13px] font-bold uppercase rounded transition-all mt-4"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'SSH' | 'LOG'>('SSH');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showSettingsHub, setShowSettingsHub] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showPayload, setShowPayload] = useState(false);
  
  // --- Global Application State ---
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [logs, setLogs] = useState<{ id: number, time: string, msg: string, type: 'info' | 'error' | 'success' }[]>([
    { id: 1, time: new Date().toLocaleTimeString(), msg: 'Welcome to ZiVPN Custom Pro Edition', type: 'info' },
    { id: 2, time: new Date().toLocaleTimeString(), msg: 'Ready to tunnel. Tap connect to start.', type: 'info' },
  ]);

  const [payload, setPayload] = useState('GET / HTTP/1.1\nHost: [host]\nConnection: Keep-Alive\nUpgrade: websocket\n\n');
  const [sshDetails, setSshDetails] = useState({ host: '', user: '', pass: '', port: '443' });
  const [zivpnSettings, setZivpnSettings] = useState({ host: '', pass: '', autoReconnect: true });
  const [psiphonSettings, setPsiphonSettings] = useState({ region: 'Singapore', headers: 'X-Custom-Header: value\nUser-Agent: ZiVPN-Pro', splitTunnel: false });
  const [v2rayMode, setV2rayMode] = useState<'qr' | 'manual' | 'json'>('qr');
  const [v2rayConfig, setV2rayConfig] = useState({
    json: '',
    link: '',
    manual: { host: '', port: '', uuid: '', transport: 'WS', security: 'TLS' },
    core: 'Xray Core',
    concurrency: 8,
    allowInsecure: true,
    enableMux: false
  });
  
  const [sni, setSni] = useState('');
  const [dns, setDns] = useState({ primary: '8.8.8.8', secondary: '8.8.4.4', doh: false });
  const [vpn, setVpn] = useState({ dnsForwarding: true, ipv6: false, udpForwarding: true, mtu: 1500 });
  const [udpgw, setUdpgw] = useState({ port: '7300', autoConnect: true });
  const [slowDns, setSlowDns] = useState({ ns: '', key: '' });
  const [udpRequest, setUdpRequest] = useState({ type: 'Normal', remotePort: '53' });
  const [ipHunter, setIpHunter] = useState({ target: '10.100.*.*', isHunting: false });
  const [hwid] = useState('8A7E-9F2B-CC01-4D62-11AA-55BB');

  const [config, setConfig] = useState({
    usePayload: false,
    enhanced: false,
    enableDns: true,
    psiphon: false,
    ssl: false,
    slowDns: false,
    udpCustom: false,
    udpZivpn: false,
    v2ray: false,
    udpRequest: false,
  });

  const addLog = (msg: string, type: 'info' | 'error' | 'success' = 'info') => {
    setLogs(prev => [...prev, { 
      id: Date.now(), 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }), 
      msg, 
      type 
    }].slice(-100));
  };

  const clearLogs = () => {
    setLogs([{ id: 1, time: new Date().toLocaleTimeString(), msg: 'Logs cleared.', type: 'info' }]);
  };

  const handleConnect = () => {
    if (connectionStatus === 'connected') {
      setConnectionStatus('disconnected');
      addLog('Disconnected from tunnel.', 'error');
      return;
    }

    setConnectionStatus('connecting');
    addLog('Starting Zivpn Tunnel Service...');
    addLog('Initializing handshake protocol...');
    
    setTimeout(() => {
      if (config.v2ray) addLog(`Switching to V2ray Core (${v2rayConfig.core})...`);
      if (config.ssl) addLog(`Establishing SSL/TLS with SNI: ${sni || 'none'}...`);
      
      setTimeout(() => {
        setConnectionStatus('connected');
        addLog('Connection Established Successfully!', 'success');
        addLog('Local IP: 10.0.0.18', 'info');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-gray-200">
      {/* External Branding Label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-0 hidden lg:flex flex-col items-center">
        <h1 className="text-6xl font-medium text-white/90 tracking-tight">ZiVPN Custom</h1>
      </div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full bg-surface-900 relative shadow-2xl lg:mt-32 lg:mb-10 lg:rounded-[40px] lg:border-8 lg:border-[#121212] lg:h-[800px] overflow-hidden ring-1 ring-surface-800">
        
        {/* App Bar */}
        <header className="px-4 py-5 flex items-center justify-between border-b border-surface-800">
          <div className="flex items-center gap-5">
            <button onClick={() => setShowSidebar(true)} className="hover:text-brand-primary transition-colors">
              <Menu className="w-6 h-6 text-gray-300" />
            </button>
            <h2 className="text-xl font-medium text-brand-primary tracking-wide">ZiVPN Custom</h2>
          </div>
          <div className="flex items-center gap-5 text-gray-300">
            <button onClick={() => setShowPlusMenu(true)} className="hover:text-brand-primary transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            <button onClick={() => setShowSettingsHub(true)} className="hover:text-brand-primary transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button onClick={() => setShowMoreMenu(true)} className="hover:text-brand-primary transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Tab Switcher */}
        <div className="flex border-b border-surface-800 bg-surface-900/50 overflow-x-auto no-scrollbar">
          {(['SSH', 'LOG'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-fit px-6 py-4 text-[12px] font-bold uppercase tracking-widest relative transition-colors whitespace-nowrap ${
                activeTab === tab ? 'text-brand-primary' : 'text-gray-500'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="tabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'SSH' && (
              <motion.div
                key="ssh"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-10"
              >
                {/* Account Config Input */}
                <div className="space-y-1 group">
                  <input 
                    type="text" 
                    placeholder="ip:port@user:pass"
                    className="w-full bg-transparent border-b border-surface-700 group-focus-within:border-brand-primary py-2 text-md outline-none transition-all placeholder:text-surface-700 font-mono tracking-tight"
                  />
                </div>

                {/* Main Settings Grid */}
                <div className="bg-surface-800/40 rounded-2xl p-6 border border-surface-800/50">
                  <div className="grid grid-cols-2 gap-y-7 gap-x-4">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => {
                      setConfig({ ...config, usePayload: !config.usePayload });
                      if (!config.usePayload) setShowPayload(true);
                    }}>
                      <div 
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          config.usePayload ? 'bg-brand-primary border-brand-primary' : 'border-surface-600 group-hover:border-surface-500'
                        }`}
                      >
                        {config.usePayload && <Check className="w-3.5 h-3.5 text-black stroke-[3.5px]" />}
                      </div>
                      <span className="text-[14px] text-gray-300 select-none font-medium">Use Payload</span>
                    </div>
                    <Checkbox 
                      label="SSL" 
                      checked={config.ssl} 
                      onChange={(v) => setConfig({ ...config, ssl: v })} 
                    />
                    <Checkbox 
                      label="Enhanced" 
                      checked={config.enhanced} 
                      onChange={(v) => setConfig({ ...config, enhanced: v })} 
                    />
                    <Checkbox 
                      label="SlowDns" 
                      checked={config.slowDns} 
                      onChange={(v) => setConfig({ ...config, slowDns: v })} 
                    />
                    <Checkbox 
                      label="Enable DNS" 
                      checked={config.enableDns} 
                      onChange={(v) => setConfig({ ...config, enableDns: v })} 
                    />
                    <Checkbox 
                      label="UDP Custom" 
                      checked={config.udpCustom} 
                      onChange={(v) => setConfig({ ...config, udpCustom: v })} 
                    />
                    <Checkbox 
                      label="Psiphon" 
                      checked={config.psiphon} 
                      onChange={(v) => setConfig({ ...config, psiphon: v })} 
                    />
                    <Checkbox 
                      label="V2ray" 
                      checked={config.v2ray} 
                      onChange={(v) => setConfig({ ...config, v2ray: v })} 
                    />
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => {
                      if (!config.udpZivpn) {
                        setActiveModal('udptweak');
                        setConfig({ ...config, udpZivpn: true });
                      } else {
                        setConfig({ ...config, udpZivpn: false });
                      }
                    }}>
                      <div 
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          config.udpZivpn ? 'bg-brand-primary border-brand-primary' : 'border-surface-600 group-hover:border-surface-500'
                        }`}
                      >
                        {config.udpZivpn && <Check className="w-3.5 h-3.5 text-black stroke-[3.5px]" />}
                      </div>
                      <span className="text-[14px] text-gray-300 select-none font-medium">UDP Zivpn</span>
                    </div>
                    <Checkbox 
                      label="UDP Request" 
                      checked={config.udpRequest} 
                      onChange={(v) => setConfig({ ...config, udpRequest: v })} 
                    />
                  </div>
                </div>

                {/* Connection Controls Block */}
                <div className="pt-2 space-y-4">
                  <button 
                    onClick={handleConnect}
                    className={`w-full py-4.5 bg-transparent border-2 ${
                      connectionStatus === 'connected' 
                        ? 'border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black' 
                        : 'border-brand-primary/60 text-brand-primary hover:bg-brand-primary hover:text-black'
                    } text-base font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3`}
                  >
                    {connectionStatus === 'connecting' ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : null}
                    {connectionStatus === 'connecting' ? 'Connecting...' : connectionStatus === 'connected' ? 'Disconnect' : 'Connect'}
                  </button>
                  <button 
                    onClick={() => {
                      setPayload('GET / HTTP/1.1\nHost: [host]\nConnection: Keep-Alive\nUpgrade: websocket\n\n');
                      setSni('');
                      setSshDetails({ host: '', user: '', pass: '', port: '443' });
                      setConfig({
                        usePayload: false,
                        enhanced: false,
                        enableDns: true,
                        psiphon: false,
                        ssl: false,
                        slowDns: false,
                        udpCustom: false,
                        udpZivpn: false,
                        v2ray: false,
                        udpRequest: false,
                      });
                      addLog('Configuration has been reset to defaults.', 'info');
                    }}
                    className="w-full py-3 bg-surface-800/50 hover:bg-red-500/10 border border-surface-700 hover:border-red-500/50 text-gray-500 hover:text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
                  >
                    Reset / Clear Config
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'LOG' && (
              <motion.div
                key="log"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-[11px] space-y-1 h-full overflow-y-auto no-scrollbar"
              >
                {logs.map((log) => (
                  <div key={log.id} className="text-gray-500 flex gap-2">
                    <span className="opacity-40">[{log.time}]</span>
                    <span className={
                      log.type === 'success' ? 'text-emerald-500' : 
                      log.type === 'error' ? 'text-red-500' : 
                      log.type === 'info' && log.msg.includes('Connect') ? 'text-brand-primary' :
                      'text-gray-300'
                    }>
                      {log.msg}
                    </span>
                  </div>
                ))}
                <div className="pt-4 flex justify-end">
                  <button onClick={clearLogs} className="text-[9px] uppercase font-bold text-gray-500 hover:text-gray-300">Clear Logs</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>



        {/* Settings Hub and Modals */}
        <Sidebar 
          isOpen={showSidebar} 
          onClose={() => setShowSidebar(false)} 
          onSelect={(menu) => setActiveModal(menu)} 
        />

        <PlusMenu 
          isOpen={showPlusMenu} 
          onClose={() => setShowPlusMenu(false)} 
          onSelect={(menu) => setActiveModal(menu)} 
        />

        <SettingsHub 
          isOpen={showSettingsHub} 
          onClose={() => setShowSettingsHub(false)} 
          onSelect={(menu) => {
            setShowSettingsHub(false);
            setActiveModal(menu);
          }} 
        />

        <MoreMenu 
          isOpen={showMoreMenu} 
          onClose={() => setShowMoreMenu(false)} 
          onSelect={(menu) => {
            setShowMoreMenu(false);
            setActiveModal(menu);
          }} 
        />

        <GenericSettingModal 
          isOpen={activeModal === 'zivpn'} 
          title="ZiVPN Setting" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Server Host / IP</label>
              <input 
                type="text" 
                value={zivpnSettings.host}
                onChange={(e) => setZivpnSettings({ ...zivpnSettings, host: e.target.value })}
                placeholder="server.zivpn.com"
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-primary font-mono text-emerald-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                value={zivpnSettings.pass}
                onChange={(e) => setZivpnSettings({ ...zivpnSettings, pass: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-primary font-mono text-emerald-400"
              />
            </div>
            <div className="pt-2 border-t border-surface-700 mt-2">
              <Checkbox label="Auto Reconnect" checked={zivpnSettings.autoReconnect} onChange={(v) => setZivpnSettings({ ...zivpnSettings, autoReconnect: v })} />
            </div>
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'psiphon'} 
          title="Psiphon Setting" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Region</label>
              <select 
                value={psiphonSettings.region}
                onChange={(e) => setPsiphonSettings({ ...psiphonSettings, region: e.target.value })}
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none"
              >
                <option>United States</option>
                <option>Singapore</option>
                <option>Netherlands</option>
                <option>Japan</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Custom Headers</label>
              <textarea 
                rows={4}
                value={psiphonSettings.headers}
                onChange={(e) => setPsiphonSettings({ ...psiphonSettings, headers: e.target.value })}
                placeholder="X-Custom-Header: value&#10;User-Agent: Mozilla/5.0"
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-xs outline-none focus:border-brand-primary font-mono text-emerald-400 resize-none"
              />
              <p className="text-[10px] text-gray-500 italic">One header per line (Header: Value)</p>
            </div>
            <Checkbox label="Split Tunnel" checked={psiphonSettings.splitTunnel} onChange={(v) => setPsiphonSettings({ ...psiphonSettings, splitTunnel: v })} />
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'v2ray'} 
          title="V2ray Setting" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 no-scrollbar">
            {/* Method Tabs */}
            <div className="flex bg-surface-900 rounded p-1 mb-2">
              <button 
                onClick={() => setV2rayMode('qr')}
                className={`flex-1 py-1.5 text-[10px] font-bold rounded uppercase transition-all ${v2rayMode === 'qr' ? 'bg-surface-700 text-brand-primary' : 'text-gray-500'}`}
              >
                QR / Link
              </button>
              <button 
                onClick={() => setV2rayMode('manual')}
                className={`flex-1 py-1.5 text-[10px] font-bold rounded uppercase transition-all ${v2rayMode === 'manual' ? 'bg-surface-700 text-brand-primary' : 'text-gray-500'}`}
              >
                Manual
              </button>
              <button 
                onClick={() => setV2rayMode('json')}
                className={`flex-1 py-1.5 text-[10px] font-bold rounded uppercase transition-all ${v2rayMode === 'json' ? 'bg-surface-700 text-brand-primary' : 'text-gray-500'}`}
              >
                JSON
              </button>
            </div>

            {/* JSON Mode Section */}
            {v2rayMode === 'json' && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-1 duration-300">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Raw JSON Configuration</label>
                <textarea 
                  rows={6}
                  value={v2rayConfig.json}
                  onChange={(e) => setV2rayConfig({ ...v2rayConfig, json: e.target.value })}
                  placeholder='{ "inbounds": [...], "outbounds": [...] }'
                  className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-[10px] outline-none focus:border-brand-primary font-mono text-emerald-400 resize-none"
                />
                <div className="flex justify-end">
                  <button className="text-[9px] text-brand-primary uppercase font-bold hover:underline">Format JSON</button>
                </div>
              </div>
            )}

            {/* QR / Clipboard Section */}
            {v2rayMode === 'qr' && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-1 duration-300">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Paste Config (VLESS/VMess/Trojan)</label>
                  <textarea 
                    rows={3}
                    value={v2rayConfig.link}
                    onChange={(e) => setV2rayConfig({ ...v2rayConfig, link: e.target.value })}
                    placeholder="vmess://... or vless://..."
                    className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-xs outline-none focus:border-brand-primary font-mono text-emerald-400 resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-surface-700 border border-surface-600 rounded text-[10px] font-bold uppercase text-gray-300 hover:bg-surface-600">
                    <Plus className="w-3 h-3" /> Clipboard
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-surface-700 border border-surface-600 rounded text-[10px] font-bold uppercase text-gray-300 hover:bg-surface-600">
                    <Shield className="w-3 h-3" /> QR Code
                  </button>
                </div>
              </div>
            )}

            {/* Manual Config Section */}
            {v2rayMode === 'manual' && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-1 duration-300">
                <p className="text-[9px] text-gray-500 uppercase font-bold text-center">-- Manual Configuration --</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Host / IP</label>
                    <input 
                      type="text" 
                      value={v2rayConfig.manual.host} 
                      onChange={(e) => setV2rayConfig({ ...v2rayConfig, manual: { ...v2rayConfig.manual, host: e.target.value } })}
                      placeholder="1.2.3.4" 
                      className="w-full bg-surface-900 border border-surface-700 rounded px-2 py-1.5 text-xs outline-none font-mono" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Port</label>
                    <input 
                      type="text" 
                      value={v2rayConfig.manual.port}
                      onChange={(e) => setV2rayConfig({ ...v2rayConfig, manual: { ...v2rayConfig.manual, port: e.target.value } })}
                      placeholder="443" 
                      className="w-full bg-surface-900 border border-surface-700 rounded px-2 py-1.5 text-xs outline-none font-mono" 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase font-bold">UUID / ID</label>
                  <input 
                    type="text" 
                    value={v2rayConfig.manual.uuid}
                    onChange={(e) => setV2rayConfig({ ...v2rayConfig, manual: { ...v2rayConfig.manual, uuid: e.target.value } })}
                    placeholder="00000000-0000-..." 
                    className="w-full bg-surface-900 border border-surface-700 rounded px-2 py-1.5 text-xs outline-none font-mono" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Transport</label>
                    <select 
                      value={v2rayConfig.manual.transport}
                      onChange={(e) => setV2rayConfig({ ...v2rayConfig, manual: { ...v2rayConfig.manual, transport: e.target.value } })}
                      className="w-full bg-surface-900 border border-surface-700 rounded px-2 py-1.5 text-xs outline-none"
                    >
                      <option>WS</option>
                      <option>gRPC</option>
                      <option>TCP</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Security</label>
                    <select 
                      value={v2rayConfig.manual.security}
                      onChange={(e) => setV2rayConfig({ ...v2rayConfig, manual: { ...v2rayConfig.manual, security: e.target.value } })}
                      className="w-full bg-surface-900 border border-surface-700 rounded px-2 py-1.5 text-xs outline-none"
                    >
                      <option>TLS</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="h-[1px] bg-surface-700 my-2" />

            {/* Core Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Core Version</label>
                <select 
                  value={v2rayConfig.core}
                  onChange={(e) => setV2rayConfig({ ...v2rayConfig, core: e.target.value })}
                  className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-xs outline-none"
                >
                  <option>Xray Core</option>
                  <option>V2ray Core</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Concurrency</label>
                <input 
                  type="number" 
                  value={v2rayConfig.concurrency}
                  onChange={(e) => setV2rayConfig({ ...v2rayConfig, concurrency: parseInt(e.target.value) })}
                  className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-xs outline-none" 
                />
              </div>
            </div>
            
            <div className="pt-2 flex flex-col gap-3">
              <Checkbox label="Allow Insecure" checked={v2rayConfig.allowInsecure} onChange={(v) => setV2rayConfig({ ...v2rayConfig, allowInsecure: v })} />
              <Checkbox label="Enable Mux" checked={v2rayConfig.enableMux} onChange={(v) => setV2rayConfig({ ...v2rayConfig, enableMux: v })} />
            </div>
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'slowdns'} 
          title="SlowDNS Setting" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Nameserver (NS)</label>
              <input 
                type="text" 
                value={slowDns.ns}
                onChange={(e) => setSlowDns({ ...slowDns, ns: e.target.value })}
                placeholder="dns.example.com" 
                className="w-full bg-transparent border-b border-surface-600 focus:border-brand-primary py-1 text-sm outline-none font-mono" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Public Key</label>
              <input 
                type="text" 
                value={slowDns.key}
                onChange={(e) => setSlowDns({ ...slowDns, key: e.target.value })}
                placeholder="key..." 
                className="w-full bg-transparent border-b border-surface-600 focus:border-brand-primary py-1 text-sm outline-none font-mono" 
              />
            </div>
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'udprequest'} 
          title="UDP Request Setting" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Request Type</label>
              <select 
                value={udpRequest.type}
                onChange={(e) => setUdpRequest({ ...udpRequest, type: e.target.value })}
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none"
              >
                <option>Normal</option>
                <option>Aggressive</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Remote Port</label>
              <input 
                type="text" 
                value={udpRequest.remotePort}
                onChange={(e) => setUdpRequest({ ...udpRequest, remotePort: e.target.value })}
                className="w-full bg-transparent border-b border-surface-600 focus:border-brand-primary py-1 text-sm outline-none font-mono" 
              />
            </div>
          </div>
        </GenericSettingModal>

        <UDPTweakModal 
          isOpen={activeModal === 'udptweak'} 
          onClose={() => setActiveModal(null)} 
        />

        <GenericSettingModal 
          isOpen={activeModal === 'sharevpn'} 
          title="Share VPN / Hotspot" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <div className="p-4 bg-surface-900 rounded-xl border border-surface-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500 uppercase font-bold">Proxy IP</span>
                <span className="text-sm font-mono text-brand-primary">192.168.43.1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500 uppercase font-bold">Proxy Port</span>
                <span className="text-sm font-mono text-brand-primary">10808</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-[12px] font-bold text-gray-300">Instructions:</h3>
              <ul className="text-[11px] text-gray-400 space-y-1 list-disc pl-4 leading-relaxed">
                <li>Turn on Hotspot on this device.</li>
                <li>Connect other devices to this Hotspot.</li>
                <li>Set Manual Proxy on connected devices.</li>
                <li>Use the IP and Port shown above.</li>
              </ul>
            </div>
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'autoping'} 
          title="Auto Ping & Diagnostics" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Ping Target (Host/IP)</label>
              <div className="flex gap-2">
                <input type="text" defaultValue="google.com" className="flex-1 bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none font-mono" />
                <button className="px-4 bg-brand-primary text-black font-bold py-2 rounded text-xs uppercase">Test</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Interval (sec)</label>
                <input type="number" defaultValue="5" className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none" />
              </div>
              <div className="flex items-end pb-1.5">
                <Checkbox label="Keep-Alive" checked={true} onChange={() => {}} />
              </div>
            </div>
            <div className="h-36 bg-black rounded border border-surface-700 p-3 font-mono text-[10px] text-emerald-500 overflow-y-auto whitespace-pre">
{`AUTO PING STARTED:
64 bytes from 172.217.161.46: seq=1 time=18.4ms
64 bytes from 172.217.161.46: seq=2 time=19.2ms
64 bytes from 172.217.161.46: seq=3 time=17.8ms
64 bytes from 172.217.161.46: seq=4 time=20.1ms
Monitoring connectivity...`}
            </div>
          </div>
        </GenericSettingModal>
        
        <GenericSettingModal 
          isOpen={activeModal === 'wakelock'} 
          title="Wakelock Setting" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-6">
            <div className="p-4 bg-brand-primary/5 rounded-xl border border-brand-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <Shield className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-200">CPU Wakelock</h4>
                  <p className="text-[10px] text-gray-500 uppercase">Prevent system sleep</p>
                </div>
              </div>
              <div className="w-10 h-5 bg-brand-primary rounded-full relative shadow-inner shadow-black/20">
                <div className="absolute top-1 right-1 w-3 h-3 bg-black rounded-full" />
              </div>
            </div>
            
            <div className="space-y-4">
              <Checkbox label="Keep Screen On" checked={true} onChange={() => {}} />
              <Checkbox label="Wi-Fi High Perf Mode" checked={false} onChange={() => {}} />
            </div>

            <p className="text-[10px] text-gray-500 leading-relaxed italic border-l-2 border-surface-700 pl-3">
              Note: Enabling these options may increase battery consumption but will improve connection stability on some devices.
            </p>
          </div>
        </GenericSettingModal>

        {/* --- Sidebar Modals --- */}
        <GenericSettingModal 
          isOpen={activeModal === 'payload_proxy'} 
          title="Payload & Proxy Setting" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Payload Editor</label>
              <textarea 
                rows={5}
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-xs outline-none focus:border-brand-primary font-mono text-emerald-400 resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Proxy Host/IP</label>
              <input type="text" placeholder="10.1.1.1" className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Proxy Port</label>
                <input type="text" placeholder="8080" className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none" />
              </div>
              <div className="flex items-end pb-2">
                <Checkbox label="Proxy Auth" checked={false} onChange={() => {}} />
              </div>
            </div>
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'sni'} 
          title="SNI Setting" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Server Name Indication (SNI)</label>
              <input 
                type="text" 
                value={sni}
                onChange={(e) => setSni(e.target.value)}
                placeholder="m.facebook.com" 
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none font-mono text-brand-primary" 
              />
            </div>
            <p className="text-[10px] text-gray-500">Configure your SNI Host / Bug host here for SSL/TLS connections.</p>
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'ssh'} 
          title="SSH Setting" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">SSH Host</label>
              <input 
                type="text" 
                value={sshDetails.host}
                onChange={(e) => setSshDetails({ ...sshDetails, host: e.target.value })}
                placeholder="sg-ssh.zipvn.net" 
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none" 
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1 space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Port</label>
                <input 
                  type="text" 
                  value={sshDetails.port}
                  onChange={(e) => setSshDetails({ ...sshDetails, port: e.target.value })}
                  className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none" 
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Username</label>
                <input 
                  type="text" 
                  value={sshDetails.user}
                  onChange={(e) => setSshDetails({ ...sshDetails, user: e.target.value })}
                  placeholder="user1" 
                  className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none" 
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Password</label>
              <input 
                type="password" 
                value={sshDetails.pass}
                onChange={(e) => setSshDetails({ ...sshDetails, pass: e.target.value })}
                placeholder="••••••••" 
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none" 
              />
            </div>
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'vpn'} 
          title="VPN Setting" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <Checkbox label="DNS Forwarding" checked={vpn.dnsForwarding} onChange={(v) => setVpn({ ...vpn, dnsForwarding: v })} />
            <Checkbox label="IPv6 Support" checked={vpn.ipv6} onChange={(v) => setVpn({ ...vpn, ipv6: v })} />
            <Checkbox label="UDP Forwarding" checked={vpn.udpForwarding} onChange={(v) => setVpn({ ...vpn, udpForwarding: v })} />
            <div className="space-y-1.5 pt-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase">MTU Size</label>
              <input 
                type="number" 
                value={vpn.mtu}
                onChange={(e) => setVpn({ ...vpn, mtu: parseInt(e.target.value) })}
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none" 
              />
            </div>
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'dns_custom'} 
          title="DNS Custom Setting" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Primary DNS</label>
              <input 
                type="text" 
                value={dns.primary}
                onChange={(e) => setDns({ ...dns, primary: e.target.value })}
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Secondary DNS</label>
              <input 
                type="text" 
                value={dns.secondary}
                onChange={(e) => setDns({ ...dns, secondary: e.target.value })}
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none" 
              />
            </div>
            <Checkbox label="DNS over HTTPS (DoH)" checked={dns.doh} onChange={(v) => setDns({ ...dns, doh: v })} />
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'udpgw'} 
          title="UDPGW SSH Setting" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">UDPGW Port</label>
              <input 
                type="text" 
                value={udpgw.port}
                onChange={(e) => setUdpgw({ ...udpgw, port: e.target.value })}
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none font-mono" 
              />
            </div>
            <Checkbox label="Auto Connect UDPGW" checked={udpgw.autoConnect} onChange={(v) => setUdpgw({ ...udpgw, autoConnect: v })} />
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'ip_hunter'} 
          title="Mobile IP Hunter" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4 text-center py-4">
            <div className="inline-flex items-center justify-center p-6 bg-brand-primary/10 rounded-full mb-2">
              <Zap className={`w-12 h-12 text-brand-primary ${ipHunter.isHunting ? 'animate-bounce' : 'animate-pulse'}`} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-none">Target IP Range</h3>
              <input 
                type="text" 
                value={ipHunter.target}
                onChange={(e) => setIpHunter({ ...ipHunter, target: e.target.value })}
                className="text-2xl font-mono text-brand-primary font-bold tracking-widest bg-transparent border-none text-center outline-none w-full"
              />
            </div>
            <button 
              onClick={() => {
                setIpHunter(prev => ({ ...prev, isHunting: !prev.isHunting }));
                if (!ipHunter.isHunting) addLog(`Started IP Hunter targeting ${ipHunter.target}...`);
              }}
              className={`w-full py-4 ${ipHunter.isHunting ? 'bg-red-500/20 text-red-500' : 'bg-surface-700 text-gray-200'} hover:opacity-80 rounded-lg text-sm font-bold uppercase transition-colors`}
            >
              {ipHunter.isHunting ? 'Stop Hunting' : 'Start Hunting'}
            </button>
            <p className="text-[10px] text-gray-500 italic mt-4 uppercase font-bold tracking-widest">Note: Plane mode trick might be required</p>
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'hwid'} 
          title="Device HWID" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Your Hardware ID</label>
              <div className="p-4 bg-surface-900 border border-surface-700 rounded-lg font-mono text-sm break-all text-brand-primary/80 select-all">
                {hwid}
              </div>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(hwid);
                addLog('HWID copied to clipboard!', 'success');
              }}
              className="w-full py-2.5 bg-surface-700 hover:bg-surface-600 rounded text-[10px] font-bold uppercase transition-colors"
            >
              Copy to Clipboard
            </button>
            <p className="text-[10px] text-gray-500 text-center leading-relaxed italic">Used for identification and server access validation.</p>
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'import_config'} 
          title="Import Configuration" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-surface-700 rounded-xl p-8 hover:border-brand-primary/50 transition-colors cursor-pointer bg-surface-900/30">
              <Plus className="w-8 h-8 text-gray-600 mb-2" />
              <p className="text-xs text-gray-400 font-bold uppercase">Select .zivpn file</p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase">Max size: 10KB</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Or Paste Encrypted String</label>
              <textarea 
                rows={3}
                placeholder="ZiVPN://..."
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-xs outline-none focus:border-brand-primary font-mono text-brand-primary resize-none"
              />
            </div>
            <button 
              onClick={() => {
                setActiveModal(null);
                addLog('Importing configuration zip-gaming-sg.zivpn...', 'info');
                setTimeout(() => addLog('Config imported successfully!', 'success'), 800);
              }}
              className="w-full py-4 bg-brand-primary text-black font-bold uppercase rounded-xl tracking-widest text-xs shadow-lg shadow-brand-primary/20"
            >
              Import Now
            </button>
          </div>
        </GenericSettingModal>

        <GenericSettingModal 
          isOpen={activeModal === 'save_config'} 
          title="Save Configuration" 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Config File Name</label>
              <input type="text" placeholder="my_gaming_config" className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-sm outline-none font-bold text-brand-primary" />
            </div>
            <div className="p-4 bg-surface-900/50 rounded-xl border border-surface-700 space-y-3">
              <Checkbox label="Lock Configuration" checked={true} onChange={() => {}} />
              <Checkbox label="Show Notes/Messages" checked={false} onChange={() => {}} />
              <Checkbox label="Set Expiry Date" checked={false} onChange={() => {}} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Provider Note</label>
              <textarea 
                rows={2}
                placeholder="Message for users..."
                className="w-full bg-surface-900 border border-surface-700 rounded px-3 py-2 text-xs outline-none focus:border-brand-primary"
              />
            </div>
            <button 
              onClick={() => {
                setActiveModal(null);
                addLog('Exporting configuration to my_gaming_config.zivpn...', 'info');
                setTimeout(() => addLog('Config saved to /storage/ZiVPN/configs/', 'success'), 800);
              }}
              className="w-full py-4 bg-brand-primary text-black font-bold uppercase rounded-xl tracking-widest text-xs shadow-lg shadow-brand-primary/20"
            >
              Export Config
            </button>
          </div>
        </GenericSettingModal>
        
        {/* Payload Modal */}
        {showPayload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm bg-surface-800 border border-surface-700 rounded-lg shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-surface-700">
                <h2 className="text-sm font-bold text-gray-200">Payload Editor</h2>
                <button onClick={() => setShowPayload(false)} className="p-1 hover:bg-surface-700 rounded transition-colors">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <textarea 
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  className="w-full h-48 bg-black/40 border border-surface-700 rounded p-3 text-emerald-400 font-mono text-xs focus:border-brand-primary outline-none transition-all resize-none custom-scrollbar"
                />
                <div className="flex gap-2">
                  <button onClick={() => setShowPayload(false)} className="flex-1 py-2 bg-brand-primary text-black text-xs font-bold uppercase rounded">Save</button>
                  <button onClick={() => setPayload('')} className="px-4 py-2 bg-surface-700 text-gray-300 text-xs font-bold uppercase rounded">Clear</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        
      </div>
    </div>
  );
}
