import { i18n } from '../../core/i18n.js';
import { storage } from '../../core/storage.js';

export const dashboardModule = {
    render: () => {
        return `
            <!-- Welcome Header -->
            <div class="mb-8">
                <h1 class="text-2xl font-bold mb-1 text-slate-800 dark:text-white">${i18n.t('welcomeBack')}</h1>
                <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('dashboardSubtitle')}</p>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
                ${(() => {
                const completedTotal = storage.getOrders().filter(o => o.status === 'Completed').reduce((acc, o) => acc + parseFloat(o.amount.replace(/,/g, '')), 0);
                return statCard(i18n.t('totalSales'), `<span class="font-nums">${completedTotal.toLocaleString()}</span> ` + currencyIcon(), `<span class="font-nums">12.5%+</span>`, 'bg-vision-gold', 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', "navigateTo('sales')");
            })()}
                ${(() => {
                const usersCount = storage.getUsers().length;
                return statCard(i18n.t('newUsers'), `<span class="font-nums">${usersCount.toLocaleString()}</span>`, `<span class="font-nums">3.4%+</span>`, 'bg-vision-gold', 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', "navigateTo('users')");
            })()}
                ${(() => {
                const paidExpenses = storage.getInvoices().filter(inv => inv.status === 'Paid').reduce((acc, inv) => acc + parseFloat(inv.amount.replace(/,/g, '')), 0);
                return statCard(i18n.t('expenses'), `<span class="font-nums">${paidExpenses.toLocaleString()}</span> ` + currencyIcon(), `<span class="font-nums">2.1%-</span>`, 'bg-vision-gold', 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', "navigateTo('finance')");
            })()}
                ${statCard(i18n.t('conversionRate'), `<span class="font-nums">4.8%</span>`, `<span class="font-nums">16%+</span>`, 'bg-vision-gold', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', "navigateTo('analytics')")}
            </div>
            
            <!-- Bottom Data Section (Optimized 3-Pillar Layout) -->
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full">
                
                <!-- Pillar 1: Activity (2/5) -->
                <div class="lg:col-span-2 premium-card !p-6 flex flex-col">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200">${i18n.t('recentActivity')}</h3>
                        <button class="text-[0.75rem] font-semibold text-vision-gold hover:underline">${i18n.t('viewMore')}</button>
                    </div>
                    <div class="space-y-4 flex-1">
                        ${storage.getNotifications().slice(0, 5).map(notif => {
                const colors = { add: 'bg-emerald-500', edit: 'bg-amber-500', delete: 'bg-rose-500', info: 'bg-blue-500' };
                const timeStr = new Date(notif.time).toLocaleTimeString(i18n.lang === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' });
                return activityItem(notif.message, timeStr, colors[notif.type] || colors.info);
            }).join('')}
                    </div>
                </div>

                <!-- Pillar 2: Distribution Chart (1/5) -->
                <div class="lg:col-span-1 premium-card !p-6 flex flex-col items-center justify-center text-center">
                    <h3 class="text-[0.75rem] font-semibold text-slate-500 uppercase tracking-widest mb-6 w-full text-center">${i18n.t('statistics')}</h3>
                    
                    <div class="relative w-32 h-32 flex items-center justify-center mb-6">
                        <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="16" fill="none" class="stroke-slate-100 dark:stroke-slate-800/50" stroke-width="2.5"></circle>
                            <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="30" class="text-vision-gold opacity-80"></circle>
                            <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="85" class="text-blue-500 opacity-80"></circle>
                        </svg>
                        <div class="absolute flex flex-col items-center">
                            <span class="text-xl font-bold font-nums leading-none text-slate-800 dark:text-white">82%</span>
                        </div>
                    </div>

                    <div class="space-y-3 w-full">
                        <div class="flex items-center justify-between">
                            <span class="text-[0.75rem] font-semibold text-slate-500">${i18n.t('sales')}</span>
                            <span class="text-[0.8125rem] font-semibold font-nums text-slate-700 dark:text-slate-200">65%</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-[0.75rem] font-semibold text-slate-500">${i18n.t('users')}</span>
                            <span class="text-[0.8125rem] font-semibold font-nums text-slate-700 dark:text-slate-200">17%</span>
                        </div>
                    </div>
                </div>

                <!-- Pillar 3: System Status / Quick Actions (2/5) -->
                <div class="lg:col-span-2 premium-card !p-6">
                    <h3 class="text-[0.9375rem] font-bold mb-6 text-slate-700 dark:text-slate-200">${i18n.t('systemPerformance')}</h3>
                    <div class="space-y-6">
                        ${performanceItem(i18n.t('processingSpeed'), `<span class="font-nums">98%</span>`, 'bg-emerald-500')}
                        ${performanceItem(i18n.t('memoryUsage'), `<span class="font-nums">42%</span>`, 'bg-blue-500')}
                        ${performanceItem(i18n.t('connectionStrength'), `<span class="font-nums">94%</span>`, 'bg-amber-500')}
                        <div class="pt-4 grid grid-cols-2 gap-3">
                            <button class="bg-slate-50 dark:bg-slate-800/50 py-2.5 rounded-xl border border-slate-100 dark:border-slate-700 text-[0.75rem] font-bold transition-all hover:border-vision-gold hover:text-vision-gold">${i18n.t('monthlyReport')}</button>
                            <button class="bg-slate-50 dark:bg-slate-800/50 py-2.5 rounded-xl border border-slate-100 dark:border-slate-700 text-[0.75rem] font-bold transition-all hover:border-vision-gold hover:text-vision-gold">${i18n.t('securitySettings')}</button>
                        </div>
                    </div>
                </div>

            </div>
        `;
    }
};

function statCard(title, value, change, color, iconPath, onClick = '') {
    const isPositive = change.includes('+');
    const isNegative = change.includes('-');
    const colorClasses = isPositive
        ? 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600'
        : (isNegative ? 'bg-rose-50 dark:bg-rose-400/10 text-rose-600' : 'bg-amber-50 dark:bg-amber-400/10 text-amber-600');

    return `
        <div class="premium-card !p-6 group ${onClick ? 'cursor-pointer' : ''}" ${onClick ? `onclick="${onClick}"` : ''}>
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
                <div class="text-2xl font-semibold flex items-center gap-1 text-slate-800 dark:text-white leading-none">${value}</div>
            </div>
        </div>
    `;
}

function activityItem(text, time, color) {
    return `
        <div class="flex items-center gap-4 p-2 rounded-xl group transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
            <div class="w-2.5 h-2.5 rounded-full ${color} ring-4 ring-${color.split('-')[1]}-500/10"></div>
            <div class="flex-1 min-w-0">
                <div class="text-[0.8125rem] font-semibold text-slate-700 dark:text-slate-200 group-hover:text-vision-gold transition-colors truncate">${text}</div>
                <div class="text-[0.75rem] text-slate-400 font-medium">${time}</div>
            </div>
        </div>
    `;
}

function performanceItem(label, value, color) {
    return `
        <div>
            <div class="flex justify-between mb-2 px-0.5">
                <span class="text-[0.75rem] font-bold text-slate-500 dark:text-slate-400">${label}</span>
                <span class="text-[0.8125rem] font-semibold text-slate-800 dark:text-slate-200">${value}</span>
            </div>
            <div class="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full ${color} rounded-full transition-all duration-1000" style="width: ${value.toString().replace(/[^0-9.]/g, '')}%"></div>
            </div>
        </div>
    `;
}
