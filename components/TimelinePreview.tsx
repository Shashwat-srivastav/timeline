import React, { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { Download, QrCode, X, AlertTriangle, Copy, Check, Play } from 'lucide-react';
import QRCode from 'qrcode';
import { Moment } from '../types';
import { TimelineVideo } from '../remotion/TimelineVideo';

interface TimelinePreviewProps {
    moments: Moment[];
}

export const TimelinePreview: React.FC<TimelinePreviewProps> = ({ moments }) => {
    const [isExporting, setIsExporting] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [isLocalhost, setIsLocalhost] = useState(false);

    const durationInFrames = Math.max(1, moments.length * 90);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsLocalhost(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

            const json = JSON.stringify(moments);
            const encoded = encodeURIComponent(json);
            const url = `${window.location.origin}${window.location.pathname}?s=${encoded}`;
            setShareUrl(url);

            QRCode.toDataURL(url, { width: 300, margin: 2, color: { dark: '#2d3436', light: '#ffffff' } })
                .then(url => setQrDataUrl(url))
                .catch(err => console.error("QR Generation failed", err));
        }
    }, [moments]);

    const handleExport = () => {
        if (moments.length === 0) return;
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            alert("Render job simulated.");
        }, 2000);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const hasBlobUrl = moments.some(m => m.photoUrl.startsWith('blob:'));

    return (
        <div className="sticky top-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="bg-white/80 backdrop-blur-md border border-white/50 shadow-soft rounded-3xl p-6 relative overflow-hidden transition-all duration-500 hover:shadow-glow hover:-translate-y-1">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 px-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-sw-teal animate-pulse"></div>
                        <span className="font-body font-bold text-xs uppercase tracking-widest text-sw-sub">Live Preview</span>
                    </div>
                    <div className="font-accent italic text-sw-lavender">{(moments.length * 3).toFixed(0)}s Total</div>
                </div>

                {/* Video Container */}
                <div className="relative flex justify-center items-center py-4 rounded-2xl bg-gray-50/50 border border-gray-200 mb-6 transition-shadow duration-300 hover:shadow-inner-light">
                    <div className="aspect-[9/16] h-[500px] shadow-2xl rounded-2xl overflow-hidden bg-white relative border border-gray-100 ring-4 ring-white/50">
                        <Player
                            component={TimelineVideo}
                            inputProps={{ moments }}
                            durationInFrames={durationInFrames}
                            compositionWidth={1080}
                            compositionHeight={1920}
                            fps={30}
                            style={{ width: '100%', height: '100%' }}
                            controls
                        />
                    </div>
                </div>

                {/* Action Bar */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleExport}
                        disabled={moments.length === 0 || isExporting}
                        className={`col-span-1 py-4 font-body font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-transparent ${moments.length === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-sw-text text-white hover:bg-sw-lavender hover:shadow-glow-card hover:-translate-y-0.5'
                            }`}
                    >
                        {isExporting ? 'Processing...' : (
                            <>
                                <Download size={16} />
                                Export
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => setShowQR(true)}
                        disabled={moments.length === 0}
                        className={`col-span-1 py-4 font-body font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200 ${moments.length === 0
                                ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                : 'bg-white text-sw-text hover:border-sw-salmon hover:text-sw-salmon hover:shadow-glow-card hover:-translate-y-0.5'
                            }`}
                    >
                        <QrCode size={16} />
                        Share
                    </button>
                </div>

                {/* QR Modal Overlay */}
                {showQR && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-md p-4 animate-fade-in">
                        <div className="bg-white shadow-2xl p-8 relative w-full max-w-[360px] flex flex-col items-center rounded-3xl border border-gray-200 animate-slide-up">
                            <button
                                onClick={() => setShowQR(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-sw-text transition-colors"
                            >
                                <X size={24} strokeWidth={1} />
                            </button>

                            <h3 className="font-head font-bold text-2xl text-sw-text mb-2">Scan & Share</h3>
                            <p className="font-accent italic text-sw-sub mb-6">Open this timeline on your mobile device</p>

                            <div className="p-4 bg-white border border-gray-200 shadow-inner rounded-xl mb-6">
                                {qrDataUrl ? (
                                    <img
                                        src={qrDataUrl}
                                        alt="QR Code"
                                        className="w-48 h-48 block opacity-90"
                                    />
                                ) : (
                                    <div className="w-48 h-48 flex items-center justify-center bg-gray-50 text-xs text-gray-400">Loading...</div>
                                )}
                            </div>

                            {/* Warnings */}
                            <div className="space-y-3 w-full mb-6">
                                {isLocalhost && (
                                    <div className="bg-orange-50 p-3 flex gap-3 items-start rounded-lg border border-orange-100">
                                        <AlertTriangle size={16} className="shrink-0 mt-0.5 text-orange-400" />
                                        <p className="text-[10px] font-medium text-orange-800 leading-relaxed">
                                            Localhost detected. Mobile scan will not work.
                                        </p>
                                    </div>
                                )}

                                {hasBlobUrl && (
                                    <div className="bg-blue-50 p-3 flex gap-3 items-start rounded-lg border border-blue-100">
                                        <AlertTriangle size={16} className="shrink-0 mt-0.5 text-blue-400" />
                                        <p className="text-[10px] font-medium text-blue-800 leading-relaxed">
                                            Contains local images. These won't load on other devices.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Copy Link Button */}
                            <button
                                onClick={handleCopy}
                                className="w-full bg-sw-text text-white py-3 px-4 font-body font-medium text-sm rounded-xl hover:bg-sw-lavender transition-all flex items-center justify-center gap-2 hover:shadow-glow-card"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? "Copied" : "Copy Link"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};