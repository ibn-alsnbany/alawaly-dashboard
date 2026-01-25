import { i18n } from '../../core/i18n.js';

export const analyticsModule = {
    render: () => {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-black mb-0.5">${i18n.t('analytics')}</h1>
                <p class="text-slate-400 text-[12px] font-medium">قراءة وتحليل البيانات في الوقت الحقيقي.</p>
            </div>

            <!-- Stats Grid: 4 Columns for better density -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
                ${analyticsStatCard(i18n.t('visitors'), '145.2k', '+18%', 'bg-blue-500', 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z')}
                ${analyticsStatCard(i18n.t('bounceRate'), '32%', '-5%', 'bg-amber-500', 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6')}
                ${analyticsStatCard(i18n.t('sessionDuration'), '4m 32s', '+12%', 'bg-emerald-500', 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z')}
                ${analyticsStatCard('متوسط النقر', '12.4%', '+2.1%', 'bg-purple-500', 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5')}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                <!-- Compact Bar Chart (2/3) -->
                <div class="lg:col-span-2 premium-card !p-6">
                    <div class="flex items-center justify-between mb-8">
                        <div>
                            <h3 class="text-sm font-black text-slate-700 dark:text-slate-200">تحليل النمو الأسبوعي</h3>
                            <p class="text-[10px] text-slate-400 font-medium">مقارنة أداء الزيارات والتحويلات</p>
                        </div>
                        <div class="flex gap-2">
                             <span class="flex items-center gap-1.5 text-[9px] font-bold text-slate-400"><div class="w-2 h-2 rounded-full bg-vision-gold"></div> الحالي</span>
                             <span class="flex items-center gap-1.5 text-[9px] font-bold text-slate-400"><div class="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div> السابق</span>
                        </div>
                    </div>
                    <div class="h-40 flex items-end justify-between gap-3 px-2">
                        ${analyticsBar(35)} ${analyticsBar(65)} ${analyticsBar(45)} ${analyticsBar(95)} ${analyticsBar(75)} ${analyticsBar(50)} ${analyticsBar(85)}
                    </div>
                    <div class="flex justify-between mt-4 px-2 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                        <span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
                    </div>
                </div>

                <!-- Workforce / Staff Analytics (1/3) -->
                <div class="lg:col-span-1 premium-card !p-5">
                    <h3 class="text-sm font-black mb-4 text-slate-700 dark:text-slate-200">أداء الفريق</h3>
                    <div class="space-y-4">
                        ${staffItem('أحمد عبدالله', '98%', 'bg-emerald-500')}
                        ${staffItem('سارة علي', '92%', 'bg-emerald-400')}
                        ${staffItem('خالد الحربي', '85%', 'bg-amber-400')}
                        ${staffItem('نورة السويدي', '79%', 'bg-blue-400')}
                    </div>
                    <button class="w-full mt-5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-500 hover:text-vision-gold transition-colors border border-slate-100 dark:border-slate-700">تقرير الموظفين الكامل</button>
                </div>
            </div>
        `;
    }
};

function analyticsStatCard(title, value, change, color, iconPath) {
    const isPositive = !change.startsWith('-');
    return `
        <div class="premium-card !p-4 group">
            <div class="flex justify-between items-start mb-3">
                <div class="w-9 h-9 rounded-xl ${color}/10 flex items-center justify-center text-${color.replace('bg-', 'text-')} transition-all group-hover:scale-110">
                    <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" d="${iconPath}"></path></svg>
                </div>
                <span class="text-[9px] font-black ${isPositive ? 'text-emerald-500' : 'text-rose-500'}">${change}</span>
            </div>
            <div>
                <div class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-0.5">${title}</div>
                <div class="text-lg font-black">${value}</div>
            </div>
        </div>
    `;
}

function analyticsBar(height) {
    return `
        <div class="flex-1 flex flex-col justify-end gap-1.5 h-full group cursor-pointer">
            <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg transition-all group-hover:bg-slate-200 dark:group-hover:bg-slate-700" style="height: ${Math.max(10, height - 20)}%"></div>
            <div class="w-full bg-vision-gold opacity-80 rounded-t-lg transition-all group-hover:opacity-100 group-hover:scale-x-105" style="height: ${height}%"></div>
        </div>
    `;
}

function staffItem(name, score, color) {
    return `
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[11px] font-black text-vision-gold">${name[0]}</div>
            <div class="flex-1">
                <div class="flex justify-between mb-1">
                    <span class="text-[11px] font-bold opacity-80">${name}</span>
                    <span class="text-[10px] font-black">${score}</span>
                </div>
                <div class="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full ${color} rounded-full" style="width: ${score}"></div>
                </div>
            </div>
        </div>
    `;
}
