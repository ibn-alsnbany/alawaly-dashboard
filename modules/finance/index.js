import { i18n } from '../../core/i18n.js';

export const financeModule = {
    render: () => {
        return `
            <div class="mb-8 flex justify-between items-end">
                <div>
                    <h1 class="text-3xl font-bold text-slate-800 dark:text-white mb-2">${i18n.t('finance')}</h1>
                    <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('financeSubtitle') || 'إدارة التدفقات المالية والميزانيات.'}</p>
                </div>
                <button class="bg-vision-gold text-white px-6 py-3 rounded-2xl font-bold text-[0.875rem] shadow-xl shadow-vision-gold/20 hover:-translate-y-1 transition-all">+ ${i18n.t('newInvoice')}</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12 w-full">
                ${statCard(i18n.t('revenue'), `<span class="font-nums">450,000</span> ` + i18n.t('sar'), `<span class="font-nums">+8%</span>`, 'bg-blue-500', 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z')}
                ${statCard(i18n.t('profit'), `<span class="font-nums">120,500</span> ` + i18n.t('sar'), `<span class="font-nums">+15%</span>`, 'bg-emerald-500', 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3')}
                ${statCard(i18n.t('expenses'), `<span class="font-nums">330,000</span> ` + i18n.t('sar'), `<span class="font-nums">-5%</span>`, 'bg-purple-500', 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z')}
                ${statCard(i18n.t('payments'), `<span class="font-nums">85</span>`, `<span class="font-nums">Stable</span>`, 'bg-orange-500', 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2')}
            </div>
            
            <div class="premium-card !p-8">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-xl font-bold text-slate-800 dark:text-white">${i18n.t('invoices')}</h3>
                    <div class="flex gap-4">
                        <button class="p-2.5 rounded-xl border border-slate-100 dark:border-vision-border text-slate-400 hover:text-vision-gold transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"></path></svg>
                        </button>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-right">
                        <thead class="text-[0.75rem] uppercase font-bold text-slate-500 border-b border-slate-50 dark:border-vision-border">
                            <tr>
                                <th class="pb-5 px-5">${i18n.t('id')}</th>
                                <th class="pb-5 px-5">${i18n.t('customer')}</th>
                                <th class="pb-5 px-5">${i18n.t('amount')}</th>
                                <th class="pb-5 px-5 font-center">${i18n.t('status')}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 dark:divide-vision-border">
                            ${row(`<span class="font-nums">#INV-001</span>`, 'فندق تيربو العالمي', `<span class="font-nums">1,500</span> ` + i18n.t('sar'), 'Paid', 'bg-green-100 text-green-600')}
                            ${row(`<span class="font-nums">#INV-002</span>`, 'مركز أمان التقني', `<span class="font-nums">2,300</span> ` + i18n.t('sar'), 'Pending', 'bg-orange-100 text-orange-600')}
                            ${row(`<span class="font-nums">#INV-003</span>`, 'شركة أوج للاستثمار', `<span class="font-nums">15,000</span> ` + i18n.t('sar'), 'Overdue', 'bg-red-100 text-red-600')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = !change.includes('-') && !change.includes('Stable');
    return `
        <div class="bg-white dark:bg-vision-surface p-7 rounded-[2rem] border border-slate-100 dark:border-vision-border shadow-soft hover:shadow-lg transition-all group">
            <div class="flex justify-between items-start mb-6">
                <div class="w-12 h-12 rounded-2xl ${color}/10 flex items-center justify-center ${color.replace('bg-', 'text-')} transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="${iconPath}"></path></svg>
                </div>
                <div class="px-2.5 py-1 rounded-lg ${isPositive ? 'bg-green-50 text-green-600' : (change.includes('Stable') ? 'bg-slate-50 text-slate-500' : 'bg-red-50 text-red-600')} text-[0.75rem] font-bold">
                    ${change}
                </div>
            </div>
            <div>
                <div class="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest mb-1">${title}</div>
                <div class="text-2xl font-bold text-slate-800 dark:text-white tracking-normal">${value}</div>
            </div>
        </div>
    `;
}

function row(id, customer, amount, status, statusClass) {
    return `
        <tr class="hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-colors">
            <td class="py-6 px-5 text-[0.875rem] font-bold text-slate-700 dark:text-slate-200">${id}</td>
            <td class="py-6 px-5 text-[0.875rem] font-medium text-slate-600 dark:text-slate-300">${customer}</td>
            <td class="py-6 px-5 text-[0.875rem] font-semibold text-vision-gold">${amount}</td>
            <td class="py-6 px-5">
                <span class="${statusClass} px-3.5 py-1.5 rounded-xl text-[0.75rem] font-bold uppercase tracking-wider">${status}</span>
            </td>
        </tr>
    `;
}
