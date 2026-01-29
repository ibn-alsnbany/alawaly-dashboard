import { apiService } from '../../core/apiService.js';

let inventorySearchQuery = '';

export const inventoryModule = {
    render: async () => {
        const products = await apiService.getProducts();
        const logs = await apiService.getInventoryLogs();

        let filteredProducts = products;
        if (inventorySearchQuery) {
            const q = inventorySearchQuery.toLowerCase();
            filteredProducts = products.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.sku.toLowerCase().includes(q)
            );
        }

        const totalItems = products.reduce((acc, p) => acc + (p.stock || 0), 0);
        const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length;
        const recentIn = logs.filter(l => l.type === 'in').length;
        const recentOut = logs.filter(l => l.type === 'out').length;

        return `
            <div class="mb-8">
                <h1 class="text-2xl font-bold mb-1 text-slate-800 dark:text-white">${i18n.t('inventory')}</h1>
                <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('inventorySubtitle')}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-full">
                ${statCard(i18n.t('inventoryTotal'), `<span class="font-nums">${totalItems}</span>`, `<span class="font-nums">+12%</span>`, 'bg-vision-gold', 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4')}
                ${statCard(i18n.t('lowStockItems'), `<span class="font-nums text-rose-500">${lowStockCount}</span>`, `<span class="font-nums">-2</span>`, 'bg-rose-500', 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z')}
                ${statCard(i18n.t('movementIn'), `<span class="font-nums text-emerald-500">${recentIn}</span>`, `<span class="font-nums">+5</span>`, 'bg-emerald-500', 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6')}
                ${statCard(i18n.t('movementOut'), `<span class="font-nums text-amber-500">${recentOut}</span>`, `<span class="font-nums">+3</span>`, 'bg-amber-500', 'M13 17H5m0 0V9m0 8l8-8 4 4 6-6')}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Main Stock Table -->
                <div class="lg:col-span-2 space-y-6">
                    <div class="premium-card !p-6">
                        <div class="flex items-center justify-between mb-8">
                            <div class="flex items-center gap-4">
                                <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200">${i18n.t('stockLevel')}</h3>
                                <span class="bg-vision-gold/10 text-vision-gold text-[0.8125rem] font-bold px-3 py-1 rounded-full font-nums">${filteredProducts.length}</span>
                            </div>
                            <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                <input type="text" id="inventory-search" oninput="handleInventorySearch(this.value)" value="${inventorySearchQuery}" placeholder="${i18n.t('search')}..." class="bg-transparent border-none text-[0.8125rem] focus:ring-0 w-48 text-slate-700 dark:text-slate-300 font-medium outline-none">
                            </div>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="w-full text-start">
                                <thead>
                                    <tr class="text-slate-400 text-[0.7rem] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-vision-border">
                                        <th class="pb-4 font-bold px-2">${i18n.t('productName')}</th>
                                        <th class="pb-4 font-bold px-2">${i18n.t('sku')}</th>
                                        <th class="pb-4 font-bold px-2 text-center">${i18n.t('stock')}</th>
                                        <th class="pb-4 font-bold px-2 text-end">${i18n.t('status')}</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-50 dark:divide-vision-border">
                                    ${filteredProducts.map(p => `
                                        <tr class="group hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-colors">
                                            <td class="py-4 px-2">
                                                <div class="font-bold text-slate-700 dark:text-slate-200">${p.name}</div>
                                            </td>
                                            <td class="py-4 px-2">
                                                <div class="text-[0.75rem] text-slate-500 font-nums uppercase">#${p.sku}</div>
                                            </td>
                                            <td class="py-4 px-2 text-center">
                                                <div class="font-bold font-nums ${p.stock <= 5 ? 'text-rose-500' : 'text-slate-700 dark:text-slate-200'}">${p.stock}</div>
                                            </td>
                                            <td class="py-4 px-2 text-end">
                                                <span class="px-2.5 py-1 rounded-lg text-[0.65rem] font-bold uppercase tracking-wider ${getStatusClass(p.status)}">
                                                    ${i18n.t(p.status.toLowerCase().replace(/ /g, ''))}
                                                </span>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Recent Movements Sidebar -->
                <div class="lg:col-span-1 space-y-6">
                    <div class="premium-card !p-6">
                        <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200 mb-6">${i18n.t('recentMovements')}</h3>
                        <div class="space-y-6">
                            ${logs.map(log => `
                                <div class="flex gap-4 relative">
                                    <div class="w-10 h-10 rounded-xl ${log.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} flex-shrink-0 flex items-center justify-center">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            ${log.type === 'in' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>'}
                                        </svg>
                                    </div>
                                    <div class="flex-grow min-w-0">
                                        <div class="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">${log.productName}</div>
                                        <div class="flex items-center gap-2 mt-0.5">
                                            <span class="text-[0.7rem] font-bold ${log.type === 'in' ? 'text-emerald-500' : 'text-rose-500'} font-nums">${log.type === 'in' ? '+' : '-'}${log.quantity}</span>
                                            <span class="text-[0.7rem] text-slate-400 font-medium">•</span>
                                            <span class="text-[0.7rem] text-slate-400 font-medium truncate">${i18n.t(log.reason.toLowerCase().replace(/ /g, '').replace(/#ord-\d+/, 'saleorder')) || log.reason}</span>
                                        </div>
                                        <div class="text-[0.65rem] text-slate-400 mt-1 font-nums">${new Date(log.date).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="premium-card !p-6 font-arabic bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-xl shadow-indigo-500/20">
                        <h3 class="text-[0.9375rem] font-bold mb-4">${i18n.t('inventoryHealth')}</h3>
                        <div class="space-y-4">
                            <div>
                                <div class="flex justify-between text-[0.7rem] font-bold mb-2 uppercase tracking-tighter opacity-80">
                                    <span>${i18n.t('performance')}</span>
                                    <span class="font-nums">94%</span>
                                </div>
                                <div class="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                                    <div class="h-full bg-white rounded-full transition-all" style="width: 94%"></div>
                                </div>
                            </div>
                            <p class="text-[0.75rem] leading-relaxed opacity-90">${i18n.t('systemStable')}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = change.includes('+');
    const isNegative = change.includes('-');
    const colorClasses = isPositive
        ? 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600'
        : (isNegative ? 'bg-rose-50 dark:bg-rose-400/10 text-rose-600' : 'bg-slate-50 dark:bg-slate-800/10 text-slate-500');

    return `
        <div class="premium-card !p-6 group">
            <div class="flex justify-between items-start mb-5">
                <div class="w-11 h-11 rounded-xl ${color}/10 flex items-center justify-center ${color.replace('bg-', 'text-')} transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path></svg>
                </div>
                <div class="px-2.5 py-1 rounded-lg ${colorClasses} text-[0.75rem] font-bold">
                    ${change}
                </div>
            </div>
            <div>
                <div class="text-[0.75rem] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">${title}</div>
                <div class="text-2xl font-semibold text-slate-800 dark:text-white font-nums leading-none">${value}</div>
            </div>
        </div>
    `;
}

function getStatusClass(status) {
    switch (status) {
        case 'In Stock': return 'bg-emerald-50 text-emerald-600';
        case 'Out of Stock': return 'bg-rose-50 text-rose-600';
        case 'Low Stock': return 'bg-amber-50 text-amber-600';
        default: return 'bg-slate-50 text-slate-600';
    }
}

window.handleInventorySearch = async (val) => {
    inventorySearchQuery = val;
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    if (hash === 'inventory') {
        const container = document.getElementById('module-container');
        if (container) container.innerHTML = await inventoryModule.render();
    }
};
