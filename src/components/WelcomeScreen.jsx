import { useState } from 'react';
import { cn } from './ui/GlassPanel';
import { useSheets, REAL_USERS } from '../hooks/useSheets';

export default function WelcomeScreen({ onLogin }) {
    const [selectedUser, setSelectedUser] = useState('');

    const handleLogin = () => {
        if (selectedUser) {
            onLogin(selectedUser);
        }
    };

    return (
        <div className="font-body bg-background-light dark:bg-background-dark text-slate-900 dark:text-gray-200 min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-background-dark">
            {/* Background */}
            <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
                <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-background-dark/95 to-background-dark"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 glass-nav px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform duration-300">celebration</span>
                        <span className="text-xl font-bold font-display tracking-tight text-white">FDA <span className="text-primary">2025</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400 font-body">
                        <a className="hover:text-primary transition-colors" href="#">Planificación</a>
                        <a className="hover:text-primary transition-colors" href="#">Inventario</a>
                        <a className="hover:text-primary transition-colors" href="#">Ayuda</a>
                    </div>
                    <div className="hidden md:block text-xs text-gray-500 uppercase tracking-widest font-bold">
                        Acceso Privado
                    </div>
                </div>
            </nav>

            {/* Main */}
            <main className="relative z-10 flex-grow flex flex-col pt-24 pb-12 px-4 md:px-8">
                <div className="flex-grow flex flex-col items-center justify-center max-w-7xl mx-auto w-full mb-16 md:mb-24">
                    <div className="w-full max-w-3xl relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-transparent rounded-xl blur-2xl opacity-40"></div>
                        <div className="glass-panel p-8 md:p-12 rounded-xl md:rounded-[2rem] text-center relative overflow-hidden">
                            <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-widest mb-2 font-body">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                    Grupo Exclusivo
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.1] tracking-tight text-white">
                                    Bienvenida a <br />
                                    <span className="text-primary italic font-semibold text-glow">Fin de Año 2025</span>
                                </h1>
                                <p className="text-lg text-gray-400 font-normal max-w-xl leading-relaxed font-body">
                                    Selecciona tu nombre para acceder al panel de organización. Gestionemos juntos las tareas, el inventario y el presupuesto para la mejor fiesta del año.
                                </p>
                                <div className="w-full max-w-sm mt-8 mx-auto">
                                    <div className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative p-6 bg-[#0f1216] ring-1 ring-white/10 rounded-lg shadow-xl">
                                            <label className="block text-sm font-medium text-gray-400 mb-3 text-left" htmlFor="user-select">¿Quién eres?</label>
                                            <div className="relative">
                                                <select
                                                    className="block w-full rounded-md border-0 bg-white/5 py-3 pl-4 pr-10 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 font-body appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                                                    id="user-select"
                                                    value={selectedUser}
                                                    onChange={(e) => setSelectedUser(e.target.value)}
                                                >
                                                    <option disabled value="">Selecciona tu nombre...</option>
                                                    {REAL_USERS.map(user => (
                                                        <option key={user} value={user}>{user}</option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                                    <span className="material-symbols-outlined text-xl">expand_more</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleLogin}
                                                className="w-full mt-4 h-12 rounded-md bg-primary hover:bg-primary-hover text-background-dark font-bold font-body text-sm uppercase tracking-wide transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center justify-center gap-2"
                                                type="button"
                                            >
                                                Entrar al Evento
                                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-xs mt-4 font-body">Acceso restringido a miembros del grupo.</p>
                                </div>
                            </div>
                            <div className="absolute -top-10 -right-10 p-12 opacity-5 pointer-events-none rotate-12">
                                <span className="material-symbols-outlined text-9xl text-primary">celebration</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 group hover:bg-white/5 transition-all duration-300 border-white/5">
                        <div className="w-10 h-10 rounded-full bg-background-dark/50 border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:text-primary transition-all duration-300">
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">account_balance_wallet</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-primary transition-colors">Presupuesto Real</h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-body">Divide los gastos automáticamente y mantén las cuentas claras entre todos.</p>
                        </div>
                    </div>
                    <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 group hover:bg-white/5 transition-all duration-300 border-white/5">
                        <div className="w-10 h-10 rounded-full bg-background-dark/50 border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:text-primary transition-all duration-300">
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">checklist</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-primary transition-colors">Tareas del Grupo</h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-body">Asigna quién compra qué o quién se encarga de la música y la decoración.</p>
                        </div>
                    </div>
                    <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 group hover:bg-white/5 transition-all duration-300 border-white/5">
                        <div className="w-10 h-10 rounded-full bg-background-dark/50 border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:text-primary transition-all duration-300">
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">wine_bar</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-primary transition-colors">Inventario</h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-body">Control de bebidas y comida en tiempo real para que no falte nada en la fiesta.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-600 text-lg">celebration</span>
                        <span className="text-xs font-bold text-gray-500 font-display tracking-widest uppercase">Fin de Año 2025</span>
                    </div>
                    <div className="text-xs text-gray-600 font-body">
                        © 2024 Party Planner App. Solo para uso privado.
                    </div>
                </div>
            </footer>
        </div>
    );
}
