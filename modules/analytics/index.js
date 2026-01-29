import { i18n } from '../../core/i18n.js';
import { apiService } from '../../core/apiService.js';

export const analyticsModule = {
    render: async () => {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold mb-1 text-slate-800 dark:text-white">${i18n.t('analytics')}</h1>
                <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('analyticsSubtitle')}</p>
            </div>

            <!-- Stats Grid: 4 Columns for better density -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
                ${await (async () => {
                const users = await apiService.getUsers();
                const userBase = users.length * 1200 + 145000;
                return analyticsStatCard(i18n.t('visitors'), `<span class="font-nums">${(userBase / 1000).toFixed(1)}k</span>`, `<span class="font-nums">18%+</span>`, 'bg-vision-gold', 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z');
            })()}
                ${analyticsStatCard(i18n.t('bounceRate'), `<span class="font-nums">32%</span>`, `<span class="font-nums">5%-</span>`, 'bg-vision-gold', 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6')}
                ${analyticsStatCard(i18n.t('sessionDuration'), `<span class="font-nums">4m 32s</span>`, `<span class="font-nums">12%+</span>`, 'bg-vision-gold', 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z')}
                ${await (async () => {
                const orders = await apiService.getOrders();
                const users = await apiService.getUsers();
                const conversion = Math.round(orders.length / (users.length || 1) * 10);
                return analyticsStatCard(i18n.t('avgClickRate'), `<span class="font-nums">${conversion}%</span>`, `<span class="font-nums">2.1%+</span>`, 'bg-vision-gold', 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5');
            })()}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                <!-- Compact Bar Chart (2/3) -->
                <div class="lg:col-span-2 premium-card !p-8">
                    <div class="flex items-center justify-between mb-8">
                        <div>
                            <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200">${i18n.t('weeklyGrowthAnalysis')}</h3>
                            <p class="text-[0.75rem] text-slate-500 font-medium opactiy-80">${i18n.t('comparePerformance')}</p>
                        </div>
                        <div class="flex gap-4">
                             <span class="flex items-center gap-1.5 text-[0.75rem] font-bold text-slate-500"><div class="w-2 h-2 rounded-full bg-vision-gold"></div> ${i18n.t('current')}</span>
                             <span class="flex items-center gap-1.5 text-[0.75rem] font-bold text-slate-500"><div class="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div> ${i18n.t('previous')}</span>
                        </div>
                    </div>
                    <div class="h-40 flex items-end justify-between gap-4 px-2">
                        ${analyticsBar(35)} ${analyticsBar(65)} ${analyticsBar(45)} ${analyticsBar(95)} ${analyticsBar(75)} ${analyticsBar(50)} ${analyticsBar(85)}
                    </div>
                    <div class="flex justify-between mt-6 px-2 text-[0.75rem] font-bold text-slate-400 uppercase font-nums">
                        <span>${i18n.t('saturday')}</span><span>${i18n.t('sunday')}</span><span>${i18n.t('monday')}</span><span>${i18n.t('tuesday')}</span><span>${i18n.t('wednesday')}</span><span>${i18n.t('thursday')}</span><span>${i18n.t('friday')}</span>
                    </div>
                </div>

                <!-- Workforce / Staff Analytics (1/3) -->
                <div class="lg:col-span-1 premium-card !p-6">
                    <h3 class="text-[0.9375rem] font-bold mb-6 text-slate-700 dark:text-slate-200">${i18n.t('teamPerformance')}</h3>
                    <div class="space-y-5">
                        ${(await apiService.getEmployees()).slice(0, 4).map((emp, i) => {
                const scores = [98, 92, 85, 79];
                const colors = ['bg-emerald-500', 'bg-emerald-400', 'bg-amber-400', 'bg-blue-400'];
                return staffItem(emp.name, `<span class="font-nums">${scores[i] || 80}%</span>`, colors[i] || 'bg-slate-400');
            }).join('')}
                    </div>
                    <button onclick="navigateTo('hr')" class="w-full mt-6 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[0.75rem] font-bold text-slate-500 hover:text-vision-gold transition-colors border border-slate-100 dark:border-slate-700">${i18n.t('fullStaffReport')}</button>
                </div>
            </div>
        `;
    }
};

function analyticsStatCard(title, value, change, color, iconPath) {
    const isPositive = change.includes('+');
    const isNegative = change.includes('-');
    const colorClasses = isPositive
        ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-400/10 px-2 py-0.5 rounded-lg'
        : (isNegative ? 'text-rose-500 bg-rose-50 dark:bg-rose-400/10 px-2 py-0.5 rounded-lg' : 'text-amber-500 bg-amber-50 dark:bg-amber-400/10 px-2 py-0.5 rounded-lg');

    return `
        <div class="premium-card !p-5 group">
            <div class="flex justify-between items-start mb-4">
                <div class="w-10 h-10 rounded-xl ${color}/10 flex items-center justify-center ${color.replace('bg-', 'text-')} transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path></svg>
                </div>
                <span class="text-[0.75rem] font-bold ${colorClasses} font-nums">${change}</span>
            </div>
            <div>
                <div class="text-[0.75rem] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">${title}</div>
                <div class="text-2xl font-bold text-slate-800 dark:text-white font-nums">${value}</div>
            </div>
        </div>
    `;
}

function analyticsBar(height) {
    return `
        <div class="flex-1 flex flex-col justify-end gap-1.5 h-full group cursor-pointer">
            <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg transition-colors group-hover:bg-slate-200 dark:group-hover:bg-slate-700" style="height: ${Math.max(10, height - 20)}%"></div>
            <div class="w-full bg-vision-gold opacity-80 rounded-t-lg transition-opacity group-hover:opacity-100" style="height: ${height}%"></div>
        </div>
    `;
}

function staffItem(name, score, color) {
    return `
        <div class="flex items-center gap-4">
            <div class="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[0.8125rem] font-black text-vision-gold">${name[0]}</div>
            <div class="flex-1">
                <div class="flex justify-between mb-2">
                    <span class="text-[0.8125rem] font-semibold text-slate-700 dark:text-slate-200">${name}</span>
                    <span class="text-[0.75rem] font-bold text-slate-800 dark:text-white font-nums">${score}</span>
                </div>
                <div class="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full ${color} rounded-full" style="width: ${score.toString().replace(/[^0-9.]/g, '')}%"></div>
                </div>
            </div>
        </div>
    `;
}
