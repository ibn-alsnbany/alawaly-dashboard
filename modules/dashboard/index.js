import { i18n } from '../../core/i18n.js';

export const dashboardModule = {
    render: () => {
        return `
            <!-- Welcome Header -->
            <div class="mb-6">
                <h1 class="text-2xl font-black mb-0.5">${i18n.t('welcomeBack')}</h1>
                <p class="text-slate-400 text-[12px] font-medium">${i18n.t('dashboardSubtitle')}</p>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
                ${statCard(i18n.t('totalSales'), '450,000 ' + i18n.t('sar'), '+12.5%', 'bg-emerald-500', 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6')}
                ${statCard(i18n.t('newUsers'), '2,350', '+3.4%', 'bg-blue-500', 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z')}
                ${statCard(i18n.t('expenses'), '320,000 ' + i18n.t('sar'), '-2.1%', 'bg-rose-500', 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z')}
                ${statCard(i18n.t('conversionRate'), '4.8%', '+16%', 'bg-amber-500', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z')}
            </div>
            
            <!-- Bottom Data Section (Optimized 3-Pillar Layout) -->
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 w-full">
                
                <!-- Pillar 1: Activity (2/5) -->
                <div class="lg:col-span-2 premium-card !p-5 flex flex-col">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-black text-slate-700 dark:text-slate-200">${i18n.t('recentActivity')}</h3>
                        <button class="text-[9px] font-bold text-vision-gold hover:underline">المزيد</button>
                    </div>
                    <div class="space-y-2.5 flex-1">
                        ${activityItem(i18n.t('newUserAdded'), i18n.t('5minsAgo'), 'bg-blue-500')}
                        ${activityItem(i18n.t('saleCompleted'), i18n.t('15minsAgo'), 'bg-emerald-500')}
                        ${activityItem(i18n.t('systemUpdated'), i18n.t('1hourAgo'), 'bg-amber-500')}
                        ${activityItem('تحديث الأسعار المالية', 'منذ يومين', 'bg-purple-500')}
                    </div>
                </div>

                <!-- Pillar 2: Distribution Chart (1/5) -->
                <div class="lg:col-span-1 premium-card !p-5 flex flex-col items-center justify-center text-center">
                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 w-full text-center">الإحصائيات</h3>
                    
                    <div class="relative w-32 h-32 flex items-center justify-center mb-4">
                        <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="16" fill="none" class="stroke-slate-100 dark:stroke-slate-800/50" stroke-width="2.5"></circle>
                            <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="30" class="text-vision-gold opacity-80"></circle>
                            <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="85" class="text-blue-500 opacity-80"></circle>
                        </svg>
                        <div class="absolute flex flex-col items-center">
                            <span class="text-lg font-black leading-none">82%</span>
                        </div>
                    </div>

                    <div class="space-y-2 w-full">
                        <div class="flex items-center justify-between">
                            <span class="text-[9px] font-bold text-slate-400">Sales</span>
                            <span class="text-[10px] font-black">65%</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-[9px] font-bold text-slate-400">Users</span>
                            <span class="text-[10px] font-black">17%</span>
                        </div>
                    </div>
                </div>

                <!-- Pillar 3: System Status / Quick Actions (2/5) -->
                <div class="lg:col-span-2 premium-card !p-5">
                    <h3 class="text-sm font-black mb-5 text-slate-700 dark:text-slate-200">حالة النظام والأداء</h3>
                    <div class="space-y-5">
                        ${performanceItem('سرعة المعالجة', '98%', 'bg-emerald-500')}
                        ${performanceItem('استخدام الذاكرة', '42%', 'bg-blue-500')}
                        ${performanceItem('قوة الاتصال', '94%', 'bg-amber-500')}
                        <div class="pt-2 grid grid-cols-2 gap-2">
                            <button class="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700 text-[10px] font-bold transition-all hover:border-vision-gold hover:text-vision-gold">تقرير شهري</button>
                            <button class="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700 text-[10px] font-bold transition-all hover:border-vision-gold hover:text-vision-gold">إعدادات الأمان</button>
                        </div>
                    </div>
                </div>

            </div>
        `;
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = !change.startsWith('-');
    return `
        <div class="premium-card !p-4 group">
            <div class="flex justify-between items-start mb-4">
                <div class="w-10 h-10 rounded-xl ${color}/10 flex items-center justify-center text-${color.replace('bg-', 'text-')} transition-all group-hover:scale-110">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" d="${iconPath}"></path></svg>
                </div>
                <div class="px-2 py-0.5 rounded-lg ${isPositive ? 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600' : 'bg-rose-50 dark:bg-rose-400/10 text-rose-600'} text-[10px] font-black">
                    ${change}
                </div>
            </div>
            <div>
                <div class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">${title}</div>
                <div class="text-xl font-black tracking-tight flex items-center gap-1">${value}</div>
            </div>
        </div>
    `;
}

function activityItem(text, time, color) {
    return `
        <div class="flex items-center gap-3 p-2 rounded-xl group transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
            <div class="w-2 h-2 rounded-full ${color} ring-4 ring-${color.split('-')[1]}-500/10"></div>
            <div class="flex-1">
                <div class="text-[12px] font-bold opacity-90 group-hover:text-vision-gold transition-colors">${text}</div>
                <div class="text-[9px] opacity-40 font-medium">${time}</div>
            </div>
        </div>
    `;
}

function performanceItem(label, value, color) {
    return `
        <div>
            <div class="flex justify-between mb-1.5 px-0.5">
                <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400">${label}</span>
                <span class="text-[11px] font-black">${value}</span>
            </div>
            <div class="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full ${color} rounded-full transition-all duration-1000" style="width: ${value}"></div>
            </div>
        </div>
    `;
}
