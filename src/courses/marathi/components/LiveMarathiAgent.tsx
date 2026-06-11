import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Mic, MicOff, Send, Volume2, Sparkles } from 'lucide-react';

interface LiveMarathiAgentProps {
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export const LiveMarathiAgent: React.FC<LiveMarathiAgentProps> = ({ onClose }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [statusText, setStatusText] = useState('Connecting to Marathi AI Tutor...');
  const [isAiResponding, setIsAiResponding] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<AudioWorkletNode | null>(null);
  const audioSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextPlayTimeRef = useRef<number>(0);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Load from environment variable with fallback
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCiJhSokeHNBJK3XgGPsaUCnoSDF6aYams';

  // Base64 helper
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Stop all active audio playbacks (e.g. for interruptions)
  const stopAllPlayback = () => {
    audioSourcesRef.current.forEach(source => {
      try {
        source.stop();
      } catch (e) {
        // Already stopped
      }
    });
    audioSourcesRef.current = [];
    nextPlayTimeRef.current = 0;
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Connect to Gemini Live WebSocket API
  useEffect(() => {
    const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${API_KEY}`;
    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      setStatusText('Tutor connected. Say or type something in Marathi!');
      
      // Send setup message
      const setupMsg = {
        setup: {
          model: 'models/gemini-3.1-flash-live-preview',
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: 'Aoede',
                }
              }
            }
          },
          systemInstruction: {
            parts: [
              {
                text: "You are a warm, encouraging, and friendly Marathi teacher. You teach Marathi to the student. You MUST speak entirely in Marathi (completely in Marathi language) using clean, simple vocabulary suitable for a beginner. Help them learn greetings, vocabulary, and correct pronunciation. Be encouraging!"
              }
            ]
          }
        }
      };
      ws.send(JSON.stringify(setupMsg));
    };

    ws.onmessage = async (event) => {
      try {
        const raw = event.data instanceof Blob ? await event.data.text() : event.data as string;
        const data = JSON.parse(raw);

        // Handle text/audio contents
        if (data.serverContent) {
          const { modelTurn, interrupted, outputTranscription, turnComplete } = data.serverContent;

          if (interrupted) {
            stopAllPlayback();
            setIsAiResponding(false);
            return;
          }

          if (modelTurn && modelTurn.parts) {
            setIsAiResponding(true);
            for (const part of modelTurn.parts) {
              // Text part directly in modelTurn (text-mode responses)
              if (part.text) {
                setMessages(prev => {
                  const last = prev[prev.length - 1];
                  if (last && last.role === 'model') {
                    return [...prev.slice(0, -1), { ...last, text: last.text + part.text }];
                  }
                  return [...prev, { id: Math.random().toString(), role: 'model', text: part.text, timestamp: new Date() }];
                });
              }

              // Audio PCM chunks (24 kHz mono)
              if (part.inlineData?.data) {
                playAudioChunk(part.inlineData.data);
              }
            }
          }

          // outputTranscription carries the text transcript of the model's audio response
          if (outputTranscription?.text) {
            setIsAiResponding(true);
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last && last.role === 'model') {
                return [...prev.slice(0, -1), { ...last, text: last.text + outputTranscription.text }];
              }
              return [...prev, { id: Math.random().toString(), role: 'model', text: outputTranscription.text, timestamp: new Date() }];
            });
          }

          if (turnComplete) {
            setIsAiResponding(false);
          }
        }
      } catch (err) {
        console.error('Error handling WebSocket message:', err);
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket Error:', err);
      setStatusText('Connection error. Check console logs.');
    };

    ws.onclose = (event) => {
      setIsConnected(false);
      setStatusText(`Disconnected. Code: ${event.code}. Reason: ${event.reason || 'None'}`);
      console.error('WebSocket Closed:', event.code, event.reason);
    };

    return () => {
      ws.close();
      stopAllPlayback();
      if (playbackContextRef.current) {
        playbackContextRef.current.close();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // Play audio chunk received from Gemini
  const playAudioChunk = (base64Data: string) => {
    try {
      if (!playbackContextRef.current) {
        playbackContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const ctx = playbackContextRef.current;
      const rawData = atob(base64Data);
      const buffer = new ArrayBuffer(rawData.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < rawData.length; i++) {
        view[i] = rawData.charCodeAt(i);
      }

      const pcm16 = new Int16Array(buffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 32768.0;
      }

      const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      const currentTime = ctx.currentTime;
      if (nextPlayTimeRef.current < currentTime) {
        nextPlayTimeRef.current = currentTime;
      }
      source.start(nextPlayTimeRef.current);
      nextPlayTimeRef.current += audioBuffer.duration;
      audioSourcesRef.current.push(source);

      // Remove from list when finished
      source.onended = () => {
        audioSourcesRef.current = audioSourcesRef.current.filter(s => s !== source);
      };
    } catch (err) {
      console.error('Error playing audio chunk:', err);
    }
  };

  // Start microphone capture and streaming
  const startRecording = async () => {
    try {
      stopAllPlayback();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      const source = audioContextRef.current.createMediaStreamSource(stream);

      // Inline AudioWorklet processor — no separate file needed
      const workletCode = `
        class PCMProcessor extends AudioWorkletProcessor {
          process(inputs) {
            const ch = inputs[0]?.[0];
            if (ch) this.port.postMessage(ch);
            return true;
          }
        }
        registerProcessor('pcm-processor', PCMProcessor);
      `;
      const blob = new Blob([workletCode], { type: 'application/javascript' });
      const blobUrl = URL.createObjectURL(blob);
      await audioContextRef.current.audioWorklet.addModule(blobUrl);
      URL.revokeObjectURL(blobUrl);

      const workletNode = new AudioWorkletNode(audioContextRef.current, 'pcm-processor');
      processorRef.current = workletNode;

      workletNode.port.onmessage = (e) => {
        const float32: Float32Array = e.data;
        const pcm16 = new Int16Array(float32.length);
        for (let i = 0; i < float32.length; i++) {
          const s = Math.max(-1, Math.min(1, float32[i]));
          pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        const ws = socketRef.current;
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            realtimeInput: {
              audio: { mimeType: 'audio/pcm;rate=16000', data: arrayBufferToBase64(pcm16.buffer) }
            }
          }));
        }
      };

      source.connect(workletNode);
      workletNode.connect(audioContextRef.current.destination);

      setIsRecording(true);
      setStatusText('Listening... Speak to your Marathi tutor.');
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setStatusText('Microphone access denied or error occurred.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    setIsRecording(false);
    setStatusText('Microphone paused. Say or type in Marathi!');
  };

  // Send a text message turn
  const sendTextMessage = () => {
    if (!inputText.trim()) return;
    const ws = socketRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      stopAllPlayback();
      
      const messageText = inputText.trim();
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: 'user',
        text: messageText,
        timestamp: new Date()
      }]);
      setInputText('');

      const textMsg = {
        clientContent: {
          turns: [
            {
              role: 'user',
              parts: [{ text: messageText }]
            }
          ],
          turnComplete: true
        }
      };
      ws.send(JSON.stringify(textMsg));
    }
  };

  return (
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl flex flex-col h-[85vh] border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-indigo-100 animate-pulse" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg tracking-tight">Marathi AI Live Tutor</h2>
              <p className="text-xs text-indigo-100 font-medium">Learn via real-time speech & text</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat log */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-inner">
                <Volume2 className="w-8 h-8" />
              </div>
              <div className="max-w-sm">
                <h3 className="font-bold text-slate-800 text-base">Start your Marathi Conversation!</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Activate the mic to speak to the tutor or type a message below. The tutor replies completely in Marathi.
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  <span className={`block text-[10px] mt-1 text-right ${
                    msg.role === 'user' ? 'text-white/60' : 'text-slate-400'
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          )}
          
          {isAiResponding && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 text-sm shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Bottom controls */}
        <div className="p-4 border-t border-slate-100 bg-white space-y-4">
          {/* Status bar */}
          <div className="flex justify-between items-center px-2">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} />
              {statusText}
            </span>
            {isRecording && (
              <div className="flex items-center gap-1">
                <span className="w-1 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="w-1 h-5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mic Toggle Button */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!isConnected}
              className={`p-4 rounded-2xl flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              } disabled:opacity-50 disabled:pointer-events-none`}
              title={isRecording ? 'Stop Recording' : 'Start Recording'}
            >
              {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            {/* Text Input */}
            <div className="flex-1 flex items-center gap-2 border border-slate-200 rounded-2xl px-4 py-2 bg-slate-50">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()}
                placeholder="Type in Marathi or ask a question..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder-slate-400 py-1"
                disabled={!isConnected}
              />
              <button
                onClick={sendTextMessage}
                disabled={!isConnected || !inputText.trim()}
                className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
