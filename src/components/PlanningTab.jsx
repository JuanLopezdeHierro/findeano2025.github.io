import { useState } from 'react';
import { GlassPanel } from './ui/GlassPanel';
import { useSheets, CATEGORIES, USERS, REAL_USERS } from '../hooks/useSheets';

export default function PlanningTab({ currentUser, onLogin }) {
    const { data, updateTask, isSaving } = useSheets();
    const [activeTask, setActiveTask] = useState(null);
    const [newItem, setNewItem] = useState({ name: '', quantity: 1, price: '' });

    // Handle adding a new item line
    const handleAddItem = (category) => {
        if (!newItem.name || !newItem.price) return;

        // Format: • Item: Cantidad (Est. XX€)
        const line = `\n• ${newItem.name}: ${newItem.quantity} (Est. ${newItem.price}€)`;

        const currentDetails = data[category]?.details || '';
        const newDetails = currentDetails + line;
        const currentAssigned = data[category]?.assignedTo || [];

        updateTask(category, newDetails, currentAssigned);
        setNewItem({ name: '', quantity: 1, price: '' });
    };

    const handleJoin = (categoryUuid) => {
        if (!currentUser) return;
        const currentList = data[categoryUuid]?.assignedTo || [];
        let newList;
        if (currentList.includes(currentUser)) {
            newList = currentList.filter(u => u !== currentUser);
        } else {
            newList = [...currentList, currentUser];
        }
        updateTask(categoryUuid, data[categoryUuid]?.details || '', newList);
    };

    return (
        <div className="flex flex-col gap-6 pb-24">
            {/* Header & Login */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-2">
                        Centro de <span className="text-primary italic">Planificación</span>
                    </h2>
                    <p className="text-gray-400 font-light">Gestiona tareas y presupuesto en tiempo real.</p>
                </div>

                <div className="w-full md:w-64">
                    <label className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">
                        Sesión Activa
                    </label>
                    <div className="relative">
                        <select
                            value={currentUser || ''}
                            onChange={(e) => onLogin(e.target.value)}
                            className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                        >
                            <option value="">Selecciona tu nombre...</option>
                            {REAL_USERS.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-3 text-gray-500 pointer-events-none">expand_more</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-6">
                {CATEGORIES.map((cat) => {
                    const taskData = data[cat.id] || { assignedTo: [], details: '', cost: 0 };
                    const isLocked = !taskData.assignedTo.includes(currentUser);
                    const isExpanded = activeTask === cat.id;

                    return (
                        <GlassPanel key={cat.id} className={cn("relative group transition-all", isExpanded ? "ring-1 ring-primary/50" : "")}>
                            <div className="flex flex-col md:flex-row justify-between gap-6">

                                {/* Icon & Title */}
                                <div className="flex items-start gap-5">
                                    <div className={cn(
                                        "size-16 rounded-2xl flex items-center justify-center text-2xl transition-colors",
                                        isLocked ? "bg-white/5 text-gray-500" : "bg-primary/10 text-primary border border-primary/20"
                                    )}>
                                        <span className="material-symbols-outlined">{cat.icon}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-2xl font-display font-bold text-white">{cat.name}</h3>
                                            {isLocked && <span className="material-symbols-outlined text-gray-600">lock</span>}
                                        </div>
                                        <p className="text-gray-500 text-sm mt-1 mb-3">{taskData.details ? taskData.details.split('\n')[0] : "Sin detalles..."}</p>

                                        <div className="flex flex-wrap gap-2">
                                            {taskData.assignedTo.map(u => (
                                                <span key={u} className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-300 border border-white/5 flex items-center gap-1">
                                                    <div className="size-2 rounded-full bg-primary/50"></div>
                                                    {u}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-3 min-w-[140px]">
                                    <button
                                        onClick={() => handleJoin(cat.id)}
                                        disabled={!currentUser}
                                        className={cn(
                                            "px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                                            taskData.assignedTo.includes(currentUser)
                                                ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                                                : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-black"
                                        )}
                                    >
                                        {taskData.assignedTo.includes(currentUser) ? "Salir" : "Entrar / Edit"}
                                    </button>

                                    {!isLocked && (
                                        <button
                                            onClick={() => setActiveTask(isExpanded ? null : cat.id)}
                                            className="text-gray-400 text-xs hover:text-white flex items-center justify-center gap-1 mt-2"
                                        >
                                            {isExpanded ? "Cerrar Editor" : "Abrir Editor"} <span className="material-symbols-outlined text-sm">{isExpanded ? 'expand_less' : 'expand_more'}</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Smart Toolbar (Expanded) */}
                            {isExpanded && !isLocked && (
                                <div className="mt-8 pt-6 border-t border-white/5 bg-black/20 -mx-6 -mb-6 px-6 pb-6 rounded-b-xl animate-in slide-in-from-top-2">
                                    <div className="flex flex-col gap-4">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                                            <div className="md:col-span-5">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1 mb-2 block">Nuevo Item</label>
                                                <input
                                                    type="text"
                                                    placeholder="Ej: Botella Ron Barceló"
                                                    className="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary"
                                                    value={newItem.name}
                                                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <input
                                                    type="number"
                                                    placeholder="Cant."
                                                    className="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-3 text-white text-center"
                                                    value={newItem.quantity}
                                                    onChange={e => setNewItem({ ...newItem, quantity: e.target.value })}
                                                />
                                            </div>
                                            <div className="md:col-span-3 text-right relative">
                                                <span className="absolute left-3 top-3 text-gray-500">€</span>
                                                <input
                                                    type="number"
                                                    placeholder="Est. Precio"
                                                    className="w-full bg-surface-dark border border-white/10 rounded-lg pl-8 pr-4 py-3 text-white text-right"
                                                    value={newItem.price}
                                                    onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <button
                                                    onClick={() => handleAddItem(cat.id)}
                                                    className="w-full bg-primary hover:bg-primary-hover text-black font-bold h-[48px] rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                                >
                                                    <span className="material-symbols-outlined">add</span> Añadir
                                                </button>
                                            </div>
                                        </div>

                                        {/* Preview Text Area */}
                                        <div className="mt-4">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1 mb-2 block flex justify-between">
                                                <span>Detalle Completo (Editable)</span>
                                                <span className="text-primary">{isSaving ? 'Guardando...' : 'Sincronizado'}</span>
                                            </label>
                                            <textarea
                                                rows={6}
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-4 font-mono text-sm text-gray-300 focus:border-primary/50"
                                                value={taskData.details}
                                                onChange={(e) => updateTask(cat.id, e.target.value, taskData.assignedTo)}
                                            />
                                            <p className="text-[10px] text-gray-600 mt-2">* Borra líneas completas para eliminar items. El precio se recalcula automáticamente.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </GlassPanel>
                    );
                })}
            </div>
        </div>
    );
}
