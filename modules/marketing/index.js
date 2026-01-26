import { i18n } from '../../core/i18n.js';

export const marketingModule = {
    render: () => {
        return `
            <div class="mb-8">
                <h1 class="text-2xl font-bold mb-1 text-slate-800 dark:text-white">${i18n.t('marketing')}</h1>
                <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('marketingSubtitle') || 'إدارة الحملات الإعلانية وتحليل الوصول الرقمي.'}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-full">
                ${statCard(i18n.t('activeCampaigns'), `<span class="font-nums">12</span>`, `<span class="font-nums">Stable</span>`, 'bg-vision-gold', 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z')}
                ${statCard(i18n.t('leads'), `<span class="font-nums">450</span>`, `<span class="font-nums">+22%</span>`, 'bg-vision-gold', 'M13 10V3L4 14h7v7l9-11h-7z')}
                ${statCard(i18n.t('clicks'), `<span class="font-nums">12,400</span>`, `<span class="font-nums">+5%</span>`, 'bg-vision-gold', 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5')}
                ${statCard(i18n.t('roi'), `<span class="font-nums">3.4x</span>`, `<span class="font-nums">+0.2</span>`, 'bg-vision-gold', 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z')}
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 premium-card !p-6">
                    <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200 mb-8">${i18n.t('performance')}</h3>
                    <div class="h-64 flex items-end justify-between gap-6 px-4">
                        ${bar(40)} ${bar(70)} ${bar(30)} ${bar(90)} ${bar(60)} ${bar(40)} ${bar(80)}
                    </div>
                </div>
                <div class="premium-card !p-6">
                    <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200 mb-8">${i18n.t('channels')}</h3>
                    <div class="space-y-7">
                        ${channel('Snapchat Ads', `<span class="font-nums">55%</span>`, 'bg-yellow-400')}
                        ${channel('TikTok Business', `<span class="font-nums">35%</span>`, 'bg-black')}
                        ${channel('Google Search', `<span class="font-nums">25%</span>`, 'bg-blue-500')}
                        ${channel('X Ads', `<span class="font-nums">15%</span>`, 'bg-neutral-800')}
                    </div>
                </div>
            </div>
        `;
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = !change.includes('-') && !change.includes('Stable');
    return `
        <div class="premium-card !p-6 group">
            <div class="flex justify-between items-start mb-5">
                <div class="w-11 h-11 rounded-xl ${color}/10 flex items-center justify-center ${color.replace('bg-', 'text-')} transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path></svg>
                </div>
                <div class="px-2.5 py-1 rounded-lg ${isPositive ? 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600' : (change.includes('Stable') ? 'bg-slate-50 dark:bg-slate-800/10 text-slate-500' : 'bg-rose-50 dark:bg-rose-400/10 text-rose-600')} text-[0.75rem] font-bold">
                    ${change}
                </div>
            </div>
            <div>
                <div class="text-[0.75rem] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">${title}</div>
                <div class="text-2xl font-semibold text-slate-800 dark:text-white tracking-normal font-nums leading-none">${value}</div>
            </div>
        </div>
    `;
}

function bar(height) {
    return `
        <div class="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl relative group h-full">
            <div class="absolute bottom-0 inset-x-0 bg-vision-gold opacity-40 rounded-2xl transition-opacity group-hover:opacity-70" style="height: ${height}%"></div>
        </div>
    `;
}

function channel(name, percentage, color) {
    return `
        <div>
            <div class="flex justify-between text-[0.75rem] font-bold mb-2 uppercase tracking-tighter">
                <span class="text-slate-700 dark:text-slate-200">${name}</span>
                <span class="text-slate-500 font-nums">${percentage}</span>
            </div>
            <div class="w-full h-2.5 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full ${color} rounded-full transition-all" style="width: ${percentage.replace(/[^0-9.]/g, '')}%"></div>
            </div>
        </div>
    `;
}
