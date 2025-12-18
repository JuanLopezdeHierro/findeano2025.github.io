import { GlassPanel } from './ui/GlassPanel';
import { useSheets, REAL_USERS } from '../hooks/useSheets';

export default function TeamTab() {
    const { data } = useSheets();

    // Calculate stats per user
    const userStats = REAL_USERS.map(user => {
        let tasks = 0;
        let spend = 0; // Impossible to calculate individual spend accurately without line-item attribution.
        // But we can count tasks.

        Object.keys(data).forEach(catId => {
            if (data[catId]?.assignedTo?.includes(user)) {
                tasks++;
            }
        });

        return { user, tasks };
    }).sort((a, b) => b.tasks - a.tasks);

    return (
        <div className="pb-24">
            <div className="mb-10">
                <h2 className="text-4xl font-display font-medium text-white mb-2">
                    El <span className="text-primary italic">Séquito</span>
                </h2>
                <p className="text-gray-400 font-light">Reparto de responsabilidades.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userStats.map((stat, i) => (
                    <GlassPanel key={stat.user} className="flex items-center gap-4 hover:bg-white/5">
                        <div className="relative">
                            <div className={cn(
                                "size-12 rounded-full border-2 flex items-center justify-center text-lg font-bold bg-surface-dark",
                                i < 3 ? "border-primary text-primary shadow-[0_0_15px_rgba(212,175,55,0.2)]" : "border-white/10 text-gray-500"
                            )}>
                                {stat.user.charAt(0)}
                            </div>
                            {i === 0 && (
                                <div className="absolute -top-2 -right-1 bg-primary text-black text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-lg">MVP</div>
                            )}
                        </div>
                        <div>
                            <h4 className="text-white font-medium">{stat.user}</h4>
                            <p className="text-xs text-gray-400">{stat.tasks} tareas asignadas</p>
                        </div>
                    </GlassPanel>
                ))}
            </div>
        </div>
    );
}

function cn(...inputs) {
    return inputs.filter(Boolean).join(" ");
}
