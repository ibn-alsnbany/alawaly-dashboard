import { i18n } from '../../core/i18n.js';

export const salesModule = {
    render: () => {
        return `
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-slate-800 dark:text-white mb-2">${i18n.t('sales')}</h1>
                <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('salesSubtitle') || 'تتبع المبيعات والطلبات والنمو السنوي.'}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12 w-full">
                ${statCard(i18n.t('orders'), `<span class="font-nums">1,840</span>`, `<span class="font-nums">+10%</span>`, 'bg-vision-gold', 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z')}
                ${statCard(i18n.t('customers'), `<span class="font-nums">12,500</span>`, `<span class="font-nums">+3%</span>`, 'bg-vision-gold', 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z')}
                ${statCard(i18n.t('averageOrder'), `<span class="font-nums">250</span> ` + i18n.t('sar'), `<span class="font-nums">Stable</span>`, 'bg-vision-gold', 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z')}
                ${statCard(i18n.t('totalSales'), `<span class="font-nums">460,000</span> ` + i18n.t('sar'), `<span class="font-nums">+12%</span>`, 'bg-vision-gold', 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6')}
            </div>
            
            <div class="premium-card !p-8">
                <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-8">${i18n.t('recentOrders')}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    ${orderCard(`<span class="font-nums">#ORD-441</span>`, 'أحمد السلمي', `<span class="font-nums">500</span> ` + i18n.t('sar'), 'Completed', 'bg-green-50 text-green-600')}
                    ${orderCard(`<span class="font-nums">#ORD-442</span>`, 'نورة العتيبي', `<span class="font-nums">1,200</span> ` + i18n.t('sar'), 'Processing', 'bg-blue-50 text-blue-600')}
                    ${orderCard(`<span class="font-nums">#ORD-443</span>`, 'بدر الحربي', `<span class="font-nums">350</span> ` + i18n.t('sar'), 'Completed', 'bg-green-50 text-green-600')}
                    ${orderCard(`<span class="font-nums">#ORD-444</span>`, 'ليلى القحطاني', `<span class="font-nums">890</span> ` + i18n.t('sar'), 'Cancelled', 'bg-red-50 text-red-600')}
                </div>
            </div>
        `;
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = change.includes('+');
    return `
        <div class="premium-card !p-6 group">
            <div class="flex justify-between items-start mb-6">
                <div class="w-12 h-12 rounded-xl ${color}/10 flex items-center justify-center ${color.replace('bg-', 'text-')} transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="${iconPath}"></path></svg>
                </div>
                <div class="px-2.5 py-1 rounded-lg ${isPositive ? 'bg-green-50 text-green-600' : (change.includes('Stable') ? 'bg-slate-50 text-slate-500' : 'bg-red-50 text-red-600')} text-[0.75rem] font-bold">
                    ${change}
                </div>
            </div>
            <div>
                <div class="text-[0.75rem] font-semibold text-slate-500 uppercase tracking-widest mb-1">${title}</div>
                <div class="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">${value}</div>
            </div>
        </div>
    `;
}

function orderCard(id, customer, amount, status, statusClass) {
    return `
        <div class="p-6 border border-slate-50 dark:border-vision-border rounded-3xl hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-all flex items-center justify-between">
            <div class="flex items-center gap-5">
                <div class="w-13 h-13 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 font-bold text-lg">${customer[0]}</div>
                <div>
                    <div class="text-[0.875rem] font-bold text-slate-900 dark:text-white">${id}</div>
                    <div class="text-[0.75rem] text-slate-500 font-medium">${customer}</div>
                </div>
            </div>
            <div class="text-right">
                <div class="text-[1.0625rem] font-semibold text-vision-gold mb-1">${amount}</div>
                <span class="${statusClass} px-3 py-1.5 rounded-xl text-[0.75rem] font-bold uppercase tracking-wider">${status}</span>
            </div>
        </div>
    `;
}
