import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  Hand,
  PhoneOff,
  MessageSquare,
  PenTool,
  Users,
  Clock,
  Sparkles,
  Send,
  Trash2,
  Maximize2,
  ShieldCheck,
  ChevronRight,
  Settings
} from 'lucide-react';

interface VideoClassroomPageProps {
  sessionId: string;
}

export const VideoClassroomPage: React.FC<VideoClassroomPageProps> = ({ sessionId }) => {
  const { user, navigate } = useApp();

  // Classroom controls state
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'whiteboard'>('video');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Ahsan Rahman (Educator)',
      isEdu: true,
      text: 'Welcome to the session Nafisa! Today we are working through Rotational Dynamics problem sets.',
      time: '8:01 PM'
    },
    {
      id: 2,
      sender: 'Nafisa Ahmed',
      isEdu: false,
      text: 'Good evening Ahsan bhai! I had questions regarding question 4 on torque on an inclined plane.',
      time: '8:02 PM'
    }
  ]);

  // Session timer
  const [seconds, setSeconds] = useState(240); // 4 minutes in
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Whiteboard canvas state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#6366f1');
  const [lineWidth, setLineWidth] = useState(3);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [activeTab]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: user.name || 'You',
        isEdu: user.role === 'educator',
        text: chatInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setChatInput('');
  };

  const handleEndCall = () => {
    if (user.role === 'educator') {
      navigate('/dashboard/educator');
    } else {
      navigate('/dashboard/student');
    }
  };

  return (
    <div id="classroom-page-root" className="min-h-screen bg-[#0A0E1A] text-white flex flex-col">
      {/* Top Classroom Bar */}
      <header className="h-16 px-4 sm:px-6 bg-[#0D1527] border-b border-slate-800 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
              Physics 1-on-1: Rotational Dynamics & Moment of Inertia
            </h1>
            <p className="text-[10px] text-slate-400">
              Instructor: Ahsan Rahman · Pirate Chai Encrypted Video Room
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-md text-xs font-mono text-emerald-400 border border-slate-700">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(seconds)}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>2 Participants</span>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg border transition cursor-pointer ${
              sidebarOpen
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Toggle Chat & Notes"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Classroom Workspace: Video/Whiteboard + Chat Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Stage */}
        <div className="flex-1 flex flex-col p-4 relative">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'video'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video Classroom</span>
            </button>
            <button
              onClick={() => setActiveTab('whiteboard')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'whiteboard'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Interactive Whiteboard</span>
            </button>
          </div>

          {/* TAB 1: VIDEO STAGE */}
          {activeTab === 'video' && (
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Educator Main Feed */}
              <div className="md:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=80"
                  alt="Educator Stream"
                  className="w-full h-full object-cover"
                />

                {/* Status Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-white">Ahsan Rahman (Speaking)</span>
                </div>

                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-xl text-xs text-slate-200">
                  Topic: Conservation of Angular Momentum & Moment of Inertia Matrix
                </div>
              </div>

              {/* Student Self-View Feed */}
              <div className="md:col-span-1 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
                {cameraOn ? (
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80"
                    alt="Student Self-View"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <VideoOff className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Camera Turned Off</p>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs">
                  <span className="font-semibold text-white truncate max-w-[100px]">
                    {user.name || 'Nafisa Ahmed'}
                  </span>
                  {micOn ? (
                    <Mic className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <MicOff className="w-3 h-3 text-red-400" />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE WHITEBOARD */}
          {activeTab === 'whiteboard' && (
            <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 relative flex flex-col overflow-hidden">
              {/* Whiteboard Toolbar */}
              <div className="h-12 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-300">Live Whiteboard:</span>
                  <div className="flex items-center gap-1.5">
                    {['#6366f1', '#38bdf8', '#4ade80', '#ffffff'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setDrawColor(c)}
                        style={{ backgroundColor: c }}
                        className={`w-6 h-6 rounded-full border-2 transition cursor-pointer ${
                          drawColor === c ? 'border-white scale-110' : 'border-transparent'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 ml-2">
                    <span className="text-slate-400 text-[10px]">Thickness:</span>
                    {[2, 4, 8].map((w) => (
                      <button
                        key={w}
                        onClick={() => setLineWidth(w)}
                        className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                          lineWidth === w ? 'bg-white text-slate-900 font-bold' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {w}px
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={clearCanvas}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>

              {/* Whiteboard Drawing Canvas */}
              <div className="flex-1 relative bg-slate-950 cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  width={1000}
                  height={600}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* In-Call Chat & Questions Sidebar */}
        {sidebarOpen && (
          <aside className="w-80 bg-[#0D1527] border-l border-slate-800 flex flex-col h-full flex-shrink-0">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Session Chat & Doubts
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                Live
              </span>
            </div>

            {/* Chat message stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-xl ${
                    msg.isEdu
                      ? 'bg-slate-800/80 border border-slate-700 text-slate-200'
                      : 'bg-indigo-950/60 border border-indigo-700/50 text-slate-100'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-[11px] text-indigo-400">{msg.sender}</span>
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a question or paste formula..."
                className="flex-1 bg-slate-800 text-xs rounded-lg px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-slate-700"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </aside>
        )}
      </div>

      {/* Bottom Floating Call Controls */}
      <footer className="h-20 bg-slate-900 border-t border-slate-800 px-6 flex items-center justify-center gap-3 flex-shrink-0">
        {/* Mic toggle */}
        <button
          onClick={() => setMicOn(!micOn)}
          className={`p-3 rounded-xl transition cursor-pointer ${
            micOn ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' : 'bg-red-600 text-white'
          }`}
          title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
        >
          {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>

        {/* Video camera toggle */}
        <button
          onClick={() => setCameraOn(!cameraOn)}
          className={`p-3 rounded-xl transition cursor-pointer ${
            cameraOn ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' : 'bg-red-600 text-white'
          }`}
          title={cameraOn ? 'Stop Camera' : 'Turn On Camera'}
        >
          {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        {/* Screen share toggle */}
        <button
          onClick={() => setScreenSharing(!screenSharing)}
          className={`p-3 rounded-xl transition cursor-pointer ${
            screenSharing ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
          }`}
          title="Share Screen"
        >
          <ScreenShare className="w-5 h-5" />
        </button>

        {/* Raise hand */}
        <button
          onClick={() => setHandRaised(!handRaised)}
          className={`p-3 rounded-xl transition cursor-pointer ${
            handRaised ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
          }`}
          title="Raise Hand"
        >
          <Hand className="w-5 h-5" />
        </button>

        {/* Whiteboard quick switch */}
        <button
          onClick={() => setActiveTab(activeTab === 'whiteboard' ? 'video' : 'whiteboard')}
          className={`p-3 rounded-xl transition cursor-pointer ${
            activeTab === 'whiteboard' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
          }`}
          title="Toggle Whiteboard"
        >
          <PenTool className="w-5 h-5" />
        </button>

        {/* Leave / End Call */}
        <button
          id="end-session-btn"
          onClick={handleEndCall}
          className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition flex items-center gap-2 cursor-pointer ml-2 shadow-xs"
        >
          <PhoneOff className="w-4 h-4" />
          <span>Leave Session</span>
        </button>
      </footer>
    </div>
  );
};
