import { i18n } from '../../core/i18n.js';

export const systemModule = {
    render: () => {
        return `
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-slate-800 dark:text-white mb-2">${i18n.t('system')}</h1>
                <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('systemSubtitle') || 'مراقبة صحة النظام والتحديثات التقنية.'}</p>
            </div>

            <div class="premium-card !p-10">
                <div class="flex items-center justify-between mb-10">
                    <h3 class="text-xl font-bold text-slate-800 dark:text-white">نظرة عامة على النظام</h3>
                    <div class="flex gap-4">
                        <span class="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[0.75rem] font-bold">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            النظام مستقر
                        </span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    ${systemItem('حمولة المعالج', `<span class="font-nums">24%</span>`, 'bg-vision-gold', 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', 'Optimized', 'text-emerald-500')}
                    ${systemItem('التخزين السحابي', `<span class="font-nums">1.2 TB</span>`, 'bg-vision-gold', 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', 'Efficient', 'text-blue-500')}
                    ${systemItem('وقت التشغيل', `<span class="font-nums">362 Days</span>`, 'bg-vision-gold', 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', 'Continuous', 'text-purple-500')}
                    ${systemItem('زمن الاستجابة', `<span class="font-nums">12ms</span>`, 'bg-vision-gold', 'M13 10V3L4 14h7v7l9-11h-7z', 'Excellent', 'text-amber-500')}
                </div>
            </div>

            <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="premium-card !p-8">
                    <h3 class="text-xl font-bold mb-8 text-slate-800 dark:text-white">سجل التحديثات</h3>
                    <div class="space-y-6">
                        ${updateItem('v2.4.0', '25 Jan 2026', 'تحسينات أمنية شاملة وتحديث الواجهة الرسومية.')}
                        ${updateItem('v2.3.8', '12 Jan 2026', 'إصلاحات تقنية في نظام المبيعات والتقارير.')}
                    </div>
                </div>
            </div>
        `;
    }
};

function systemItem(label, value, color, iconPath, status, colorClass) {
    return `
        <div class="premium-card !p-6 group flex items-start gap-5">
            <div class="w-12 h-12 rounded-xl ${color}/10 flex items-center justify-center ${color.replace('bg-', 'text-')} transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="${iconPath}"></path></svg>
            </div>
            <div>
                <div class="text-[0.75rem] font-semibold text-slate-500 uppercase tracking-widest mb-1">${label}</div>
                <div class="text-xl font-bold text-slate-800 dark:text-white font-nums">${value}</div>
                <div class="text-[0.75rem] font-bold ${colorClass} uppercase mt-1 tracking-wider">${status}</div>
            </div>
        </div>
    `;
}

function updateItem(version, date, desc) {
    return `
        <div class="p-6 bg-slate-50/50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-vision-border hover:border-vision-gold transition-all duration-300">
            <div class="flex justify-between items-center mb-3">
                <span class="text-[0.9375rem] font-bold text-vision-gold font-nums">${version}</span>
                <span class="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest font-nums">${date}</span>
            </div>
            <div class="text-[0.875rem] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">${desc}</div>
        </div>
    `;
}
