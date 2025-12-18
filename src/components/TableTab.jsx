import { GlassPanel } from './ui/GlassPanel';
import { useSheets, CATEGORIES } from '../hooks/useSheets';

export default function TableTab() {
    const { data, calculateCost } = useSheets();

    // Calculate totals
    const totalCost = CATEGORIES.reduce((acc, cat) => {
        return acc + (data[cat.id]?.cost || 0);
    }, 0);

    return (
        <div className="flex flex-col gap-8 pb-24">
            <div className="flex justify-between items-end">
                <h2 className="text-4xl font-display font-medium text-white">
                    Visión <span className="text-gradient-gold font-bold">Financiera</span>
                </h2>
                <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Costo Total Fiesta</p>
                    <p className="text-4xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                        {totalCost.toFixed(2)}€
                    </p>
                </div>
            </div>

            <GlassPanel className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-xs font-bold text-primary uppercase tracking-widest">
                                <th className="p-6">Tarea</th>
                                <th className="p-6">Equipo</th>
                                <th className="p-6">Detalles</th>
                                <th className="p-6 text-right">Gasto</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {CATEGORIES.map(cat => {
                                const row = data[cat.id] || { assignedTo: [], details: '', cost: 0 };

                                return (
                                    <tr key={cat.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-surface-dark border border-white/10 text-primary">
                                                    <span className="material-symbols-outlined">{cat.icon}</span>
                                                </div>
                                                <span className="font-display font-medium text-white text-lg">{cat.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex -space-x-2">
                                                {row.assignedTo.length > 0 ? row.assignedTo.map(u => (
                                                    <div key={u} className="size-8 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-xs text-gray-400 group-hover:border-primary/30 transition-colors" title={u}>
                                                        {u.charAt(0)}
                                                    </div>
                                                )) : <span className="text-gray-600 text-xs italic">Sin asignar</span>}
                                            </div>
                                        </td>
                                        <td className="p-6 max-w-xs">
                                            <div className="max-h-[80px] overflow-y-auto text-sm text-gray-400 custom-scrollbar whitespace-pre-line">
                                                {row.details || "..."}
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <span className={`font-mono font-bold ${row.cost > cat.limit ? 'text-red-400' : 'text-primary'}`}>
                                                {row.cost.toFixed(2)}€
                                            </span>
                                            <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${row.cost > cat.limit ? 'bg-red-500' : 'bg-primary'}`}
                                                    style={{ width: `${Math.min((row.cost / cat.limit) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-[10px] text-gray-600 mt-1">Límite: {cat.limit}€</p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </GlassPanel>
        </div>
    );
}
