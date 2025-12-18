import { useState, useEffect } from 'react';
import PlanningTab from './components/PlanningTab';
import TableTab from './components/TableTab';
import EventTab from './components/EventTab';
import TeamTab from './components/TeamTab';

function App() {
    const [activeTab, setActiveTab] = useState('planning');
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || '');

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', currentUser);
        }
    }, [currentUser]);

    const renderContent = () => {
        switch (activeTab) {
            case 'planning': return <PlanningTab currentUser={currentUser} onLogin={setCurrentUser} />;
            case 'table': return <TableTab />;
            case 'event': return <EventTab />;
            case 'team': return <TeamTab />;
            default: return <PlanningTab />;
        }
    };

    return (
        <div className="min-h-screen bg-background-dark font-sans text-gray-200 selection:bg-primary selection:text-black overflow-x-hidden">
            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2938&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
            </div>

            <nav className="fixed top-0 w-full z-50 glass-nav px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-3xl">celebration</span>
                    <span className="text-xl font-bold font-display tracking-tight text-white">FDA <span className="text-primary">2025</span></span>
                </div>
                {currentUser && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                        <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{currentUser}</span>
                    </div>
                )}
            </nav>

            <main className="relative z-10 pt-28 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
                {renderContent()}
            </main>

            {/* Bottom Navigation */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                <div className="glass-panel p-2 rounded-full flex gap-1 shadow-2xl bg-black/80 backdrop-blur-xl border border-white/10">
                    <NavButton
                        active={activeTab === 'planning'}
                        onClick={() => setActiveTab('planning')}
                        icon="calendar_month"
                        label="Planning"
                    />
                    <NavButton
                        active={activeTab === 'table'}
                        onClick={() => setActiveTab('table')}
                        icon="table_view"
                        label="Tabla"
                    />
                    <NavButton
                        active={activeTab === 'event'}
                        onClick={() => setActiveTab('event')}
                        icon="diamond"
                        label="Evento"
                    />
                    <NavButton
                        active={activeTab === 'team'}
                        onClick={() => setActiveTab('team')}
                        icon="groups"
                        label="Equipo"
                    />
                </div>
            </div>
        </div>
    );
}

function NavButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`
            relative px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300
            ${active ? 'text-black bg-primary shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/10'}
          `}
        >
            <span className={`material-symbols-outlined ${active ? 'filled' : ''}`}>{icon}</span>
            {active && <span className="text-xs font-bold uppercase tracking-wide animate-in fade-in slide-in-from-right-2 duration-300">{label}</span>}
        </button>
    );
}

export default App;
