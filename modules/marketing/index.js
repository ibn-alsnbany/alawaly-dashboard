import { i18n } from '../../core/i18n.js';

export const marketingModule = {
    render: () => {
        return `
            <div class="mb-8 flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold mb-1 text-slate-800 dark:text-white">${i18n.t('marketing')}</h1>
                    <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('marketingSubtitle')}</p>
                </div>
                 <button onclick="addEmployeePrompt()" class="bg-vision-gold text-white px-6 py-3 rounded-2xl font-bold text-[0.875rem] shadow-xl shadow-vision-gold/20 hover:-translate-y-1 transition-all flex items-center gap-2 active:scale-95">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                    <span>${i18n.t('addCampaign')}</span>
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-full">
                ${statCard(i18n.t('activeCampaigns'), `<span class="font-nums">12</span>`, `<span class="font-nums">${i18n.t('stable')}</span>`, 'bg-vision-gold', 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z')}
                ${statCard(i18n.t('leads'), `<span class="font-nums">450</span>`, `<span class="font-nums">22%+</span>`, 'bg-vision-gold', 'M13 10V3L4 14h7v7l9-11h-7z')}
                ${statCard(i18n.t('clicks'), `<span class="font-nums">12,400</span>`, `<span class="font-nums">5%+</span>`, 'bg-vision-gold', 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5')}
                ${statCard(i18n.t('roiLabel'), `<span class="font-nums">3.4x</span>`, `<span class="font-nums">0.2+</span>`, 'bg-vision-gold', 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z')}
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 space-y-6">
                    <div class="premium-card !p-6">
                        <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200 mb-8">${i18n.t('campaignsPerformance')}</h3>
                        <div class="h-64 flex items-end justify-between gap-6 px-4">
                            ${bar(40)} ${bar(70)} ${bar(30)} ${bar(90)} ${bar(60)} ${bar(40)} ${bar(80)}
                        </div>
                    </div>
                    <div class="premium-card !p-8">
                        <div class="flex flex-col mb-10">
                            <h3 class="text-[1rem] font-black text-slate-800 dark:text-white tracking-tight">${i18n.t('adsChannels')}</h3>
                            <div class="w-12 h-1.5 bg-vision-gold rounded-full mt-2 opacity-50"></div>
                        </div>
                        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                            ${channel(i18n.t('snapchatAds'), 55, 'text-yellow-400')}
                            ${channel(i18n.t('tiktokAds'), 35, 'text-slate-900 dark:text-white')}
                            ${channel(i18n.t('googleAds'), 25, 'text-blue-500')}
                            ${channel(i18n.t('xAds'), 15, 'text-slate-800 dark:text-slate-400')}
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-1 space-y-6">
                    <div class="premium-card !p-6 bg-gradient-to-br from-indigo-600 to-blue-700 border-none text-white">
                        <h3 class="text-lg font-bold mb-6">${i18n.t('marketingSummary')}</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center opacity-90">
                                <span class="text-sm font-medium">${i18n.t('totalReach')}</span>
                                <span class="font-nums font-bold">1.2M</span>
                            </div>
                            <div class="flex justify-between items-center opacity-90">
                                <span class="text-sm font-medium">${i18n.t('conversionGoal')}</span>
                                <span class="font-nums font-bold">85%</span>
                            </div>
                            <div class="pt-4 border-t border-white/10 flex justify-between items-center">
                                <span class="text-sm font-bold">${i18n.t('adSpend')}</span>
                                <span class="text-lg font-bold font-nums">${formatCurrency('45,000')}</span>
                            </div>
                        </div>
                    </div>

                    <div class="premium-card !p-6">
                        <h3 class="text-[0.9375rem] font-bold mb-4 text-slate-700 dark:text-slate-200">${i18n.lang === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}</h3>
                        <div class="grid grid-cols-1 gap-3">
                            <button onclick="showToast('🚀 الميزة قادمة قريباً')" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10 transition-all group border border-transparent hover:border-indigo-500/20">
                                <div class="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                                </div>
                                <span class="text-[0.8125rem] font-bold text-slate-600 dark:text-slate-300">${i18n.t('addCampaign') || 'حملة جديدة'}</span>
                            </button>
                            <button onclick="navigateTo('analytics')" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-amber-500/5 dark:hover:bg-amber-500/10 transition-all group border border-transparent hover:border-amber-500/20">
                                <div class="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                </div>
                                <span class="text-[0.8125rem] font-bold text-slate-600 dark:text-slate-300">${i18n.t('analytics')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = change.includes('+');
    const isNegative = change.includes('-');
    const colorClasses = isPositive
        ? 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600'
        : (isNegative ? 'bg-rose-50 dark:bg-rose-400/10 text-rose-600' : 'bg-slate-50 dark:bg-slate-800/10 text-slate-500');

    return `
        <div class="premium-card !p-6 group">
            <div class="flex justify-between items-start mb-5">
                <div class="w-11 h-11 rounded-xl ${color}/10 flex items-center justify-center ${color.replace('bg-', 'text-')} transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path></svg>
                </div>
                <div class="px-2.5 py-1 rounded-lg ${colorClasses} text-[0.75rem] font-bold overflow-hidden whitespace-nowrap">
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
    const radius = 33;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    // Extract color for the glow effect
    const glowColor = color.includes('yellow') ? 'rgba(234, 179, 8, 0.3)' :
        color.includes('blue') ? 'rgba(59, 130, 246, 0.3)' :
            color.includes('slate-900') ? 'rgba(15, 23, 42, 0.3)' : 'rgba(100, 116, 139, 0.3)';

    return `
        <div class="flex flex-col items-center group relative p-4 rounded-3xl transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
            <div class="relative w-24 h-24 mb-4">
                <svg class="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_8px_${glowColor}]" viewBox="0 0 96 96">
                    <!-- Base Track (Glass Effect) -->
                    <circle cx="48" cy="48" r="${radius}" stroke="currentColor" stroke-width="7" fill="transparent" 
                        class="text-slate-100 dark:text-slate-800/50" />
                    
                    <!-- Glow Layer (Blurred) -->
                    <circle cx="48" cy="48" r="${radius}" stroke="currentColor" stroke-width="8" fill="transparent" 
                        stroke-dasharray="${circumference}" 
                        stroke-dashoffset="${offset}" 
                        stroke-linecap="round"
                        class="${color} opacity-20 blur-[2px] transition-all duration-1000 ease-out" />

                    <!-- Main Progress Stroke -->
                    <circle cx="48" cy="48" r="${radius}" stroke="currentColor" stroke-width="6" fill="transparent" 
                        stroke-dasharray="${circumference}" 
                        stroke-dashoffset="${offset}" 
                        stroke-linecap="round"
                        class="${color} transition-all duration-1000 ease-out drop-shadow-md" />
                </svg>
                
                <!-- Inner Percentage Label -->
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-[1.125rem] font-black text-slate-800 dark:text-white font-nums leading-none">${percentage}%</span>
                </div>
            </div>
            
            <!-- Label with modern typography -->
            <div class="text-center">
                <p class="text-[0.7rem] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.1em] mb-1 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors line-clamp-2 px-1">${name}</p>
                <div class="w-4 h-1 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto group-hover:w-8 group-hover:bg-vision-gold transition-all"></div>
            </div>
        </div>
    `;
}
