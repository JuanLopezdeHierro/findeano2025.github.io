import { useRef } from 'react';
import { GlassPanel } from './ui/GlassPanel';

export default function EventTab() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] pb-24 text-center">
            <div className="relative mb-12 group">
                <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none"></div>
                <GlassPanel className="relative p-12 md:p-16 border-primary/30 bg-black/40 backdrop-blur-2xl">
                    <div className="flex flex-col gap-6 items-center">
                        <span className="px-3 py-1 rounded-full border border-primary/50 text-primary text-[10px] uppercase font-bold tracking-[0.3em]">Invitación Oficial</span>
                        <h1 className="text-6xl md:text-8xl font-display font-medium text-white leading-none">
                            Fin de <br />
                            <span className="text-gradient-gold italic">Año 2025</span>
                        </h1>
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent my-4"></div>
                        <p className="text-gray-300 font-light max-w-lg leading-relaxed">
                            Una velada exclusiva para nuestro círculo. Celebra el cierre de un ciclo y el comienzo de una nueva era con elegancia.
                        </p>
                    </div>
                </GlassPanel>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                <GlassPanel className="text-left group hover:-translate-y-1">
                    <span className="material-symbols-outlined text-4xl text-primary mb-4">styler</span>
                    <h3 className="font-display text-white text-xl mb-2">Dress Code</h3>
                    <p className="text-gray-400 font-light text-sm">Etiqueta Rigurosa / Black Tie.<br />Elegancia atemporal.</p>
                </GlassPanel>
                <GlassPanel className="text-left group hover:-translate-y-1">
                    <span className="material-symbols-outlined text-4xl text-primary mb-4">pin_drop</span>
                    <h3 className="font-display text-white text-xl mb-2">Ubicación</h3>
                    <p className="text-gray-400 font-light text-sm">Secret Location.<br />Se revelará 24h antes.</p>
                </GlassPanel>
                <GlassPanel className="text-left group hover:-translate-y-1">
                    <span className="material-symbols-outlined text-4xl text-primary mb-4">schedule</span>
                    <h3 className="font-display text-white text-xl mb-2">Horario</h3>
                    <p className="text-gray-400 font-light text-sm">Recepción: 21:00h<br />Uvas: 00:00h</p>
                </GlassPanel>
            </div>
        </div>
    );
}
