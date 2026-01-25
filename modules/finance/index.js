import { i18n } from '../../core/i18n.js';

export const financeModule = {
    render: () => {
        return `
            <div class="mb-8 flex justify-between items-end">
                <div>
                    <h1 class="text-3xl font-black text-vision-text mb-2">${i18n.t('finance')}</h1>
                    <p class="text-gray-400 text-sm font-medium">${i18n.t('financeSubtitle') || 'إدارة التدفقات المالية والميزانيات.'}</p>
                </div>
                <button class="bg-vision-gold text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl shadow-vision-gold/20 hover:-translate-y-1 transition-all">+ ${i18n.t('newInvoice')}</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12 w-full">
                ${statCard(i18n.t('revenue'), '450,000 ' + i18n.t('sar'), '+8%', 'vision-blue', 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z')}
                ${statCard(i18n.t('profit'), '120,500 ' + i18n.t('sar'), '+15%', 'vision-green', 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3')}
                ${statCard(i18n.t('expenses'), '330,000 ' + i18n.t('sar'), '-5%', 'vision-purple', 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z')}
                ${statCard(i18n.t('payments'), '85', 'Stable', 'vision-orange', 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2')}
            </div>
            
            <div class="bg-vision-surface p-8 rounded-[2rem] border border-gray-100 dark:border-vision-border shadow-vision">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-xl font-bold text-vision-text">${i18n.t('invoices')}</h3>
                    <div class="flex gap-2">
                        <button class="p-2.5 rounded-xl border border-gray-100 dark:border-vision-border text-gray-400 hover:text-vision-gold transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"></path></svg>
                        </button>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-right">
                        <thead class="text-[10px] uppercase font-black text-gray-400 border-b border-gray-50 dark:border-vision-border">
                            <tr>
                                <th class="pb-4 px-4">${i18n.t('id')}</th>
                                <th class="pb-4 px-4">${i18n.t('customer')}</th>
                                <th class="pb-4 px-4">${i18n.t('amount')}</th>
                                <th class="pb-4 px-4 font-center">${i18n.t('status')}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50 dark:divide-vision-border">
                            ${row('#INV-001', 'فندق تيربو العالمي', '1,500 ' + i18n.t('sar'), 'Paid', 'bg-green-100 text-green-600')}
                            ${row('#INV-002', 'مركز أمان التقني', '2,300 ' + i18n.t('sar'), 'Pending', 'bg-orange-100 text-orange-600')}
                            ${row('#INV-003', 'شركة أوج للاستثمار', '15,000 ' + i18n.t('sar'), 'Overdue', 'bg-red-100 text-red-600')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = change.startsWith('+');
    return `
        <div class="bg-vision-surface p-8 rounded-[2rem] border border-gray-100 dark:border-vision-border shadow-vision hover:shadow-lg transition-all group">
            <div class="flex justify-between items-start mb-6">
                <div class="w-14 h-14 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color} transition-transform group-hover:scale-110">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${iconPath}"></path></svg>
                </div>
                <div class="px-2.5 py-1 rounded-lg ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} text-xs font-bold">
                    ${change}
                </div>
            </div>
            <div>
                <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">${title}</div>
                <div class="text-2xl font-black text-vision-text tracking-tight">${value}</div>
            </div>
        </div>
    `;
}

function row(id, customer, amount, status, statusClass) {
    return `
        <tr class="hover:bg-gray-50 dark:hover:bg-vision-gold/5 transition-colors">
            <td class="py-5 px-4 text-sm font-black text-vision-text">${id}</td>
            <td class="py-5 px-4 text-sm font-medium">${customer}</td>
            <td class="py-5 px-4 text-sm font-black text-vision-gold">${amount}</td>
            <td class="py-5 px-4">
                <span class="${statusClass} px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider">${status}</span>
            </td>
        </tr>
    `;
}
