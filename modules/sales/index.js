import { i18n } from '../../core/i18n.js';

export const salesModule = {
    render: () => {
        return `
            <div class="mb-8">
                <h1 class="text-3xl font-black text-vision-text mb-2">${i18n.t('sales')}</h1>
                <p class="text-gray-400 text-sm font-medium">${i18n.t('salesSubtitle') || 'تتبع المبيعات والطلبات والنمو السنوي.'}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12 w-full">
                ${statCard(i18n.t('orders'), '1,840', '+10%', 'vision-blue', 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z')}
                ${statCard(i18n.t('customers'), '12,500', '+3%', 'vision-purple', 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z')}
                ${statCard(i18n.t('averageOrder'), '250 ' + i18n.t('sar'), 'Stable', 'vision-orange', 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z')}
                ${statCard(i18n.t('totalSales'), '460,000 ' + i18n.t('sar'), '+12%', 'vision-green', 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6')}
            </div>
            
            <div class="bg-vision-surface p-8 rounded-[2rem] border border-gray-100 dark:border-vision-border shadow-vision">
                <h3 class="text-xl font-bold text-vision-text mb-8">${i18n.t('recentOrders')}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${orderCard('#ORD-441', 'أحمد السلمي', '500 ' + i18n.t('sar'), 'Completed', 'bg-green-50 text-green-600')}
                    ${orderCard('#ORD-442', 'نورة العتيبي', '1,200 ' + i18n.t('sar'), 'Processing', 'bg-blue-50 text-blue-600')}
                    ${orderCard('#ORD-443', 'بدر الحربي', '350 ' + i18n.t('sar'), 'Completed', 'bg-green-50 text-green-600')}
                    ${orderCard('#ORD-444', 'ليلى القحطاني', '890 ' + i18n.t('sar'), 'Cancelled', 'bg-red-50 text-red-600')}
                </div>
            </div>
        `;
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = change.startsWith('+');
    return `
        <div class="bg-vision-surface p-8 rounded-[2rem] border border-gray-100 dark:border-vision-border shadow-vision hover:shadow-lg transition-all">
            <div class="flex justify-between items-start mb-6">
                <div class="w-14 h-14 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color}">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${iconPath}"></path></svg>
                </div>
                <div class="px-2.5 py-1 rounded-lg ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} text-xs font-black">
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

function orderCard(id, customer, amount, status, statusClass) {
    return `
        <div class="p-6 border border-gray-50 dark:border-vision-border rounded-3xl hover:bg-gray-50 dark:hover:bg-vision-gold/5 transition-all flex items-center justify-between">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-vision-text font-black">${customer[0]}</div>
                <div>
                    <div class="text-sm font-black text-vision-text">${id}</div>
                    <div class="text-xs text-gray-400 font-medium">${customer}</div>
                </div>
            </div>
            <div class="text-right">
                <div class="text-md font-black text-vision-gold mb-1">${amount}</div>
                <span class="${statusClass} px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">${status}</span>
            </div>
        </div>
    `;
}
