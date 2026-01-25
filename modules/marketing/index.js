import { i18n } from '../../core/i18n.js';

export const marketingModule = {
    render: () => {
        return `
            <div class="mb-8">
                <h1 class="text-3xl font-black text-vision-text mb-2">${i18n.t('marketing')}</h1>
                <p class="text-gray-400 text-sm font-medium">${i18n.t('marketingSubtitle') || 'إدارة الحملات الإعلانية وتحليل قنوات التسويق.'}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12 w-full">
                ${statCard(i18n.t('campaigns'), '12 Active', 'Stable', 'vision-blue', 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z')}
                ${statCard(i18n.t('leads'), '450', '+22%', 'vision-purple', 'M13 10V3L4 14h7v7l9-11h-7z')}
                ${statCard(i18n.t('clicks'), '12,400', '+5%', 'vision-orange', 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5')}
                ${statCard(i18n.t('roi'), '3.4x', '+0.2', 'vision-green', 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z')}
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 bg-vision-surface p-8 rounded-[2rem] border border-gray-100 dark:border-vision-border shadow-vision">
                    <h3 class="text-xl font-bold text-vision-text mb-8">${i18n.t('performance')}</h3>
                    <div class="h-64 flex items-end justify-between gap-6 px-4">
                        ${bar(40)} ${bar(70)} ${bar(30)} ${bar(90)} ${bar(60)} ${bar(40)} ${bar(80)}
                    </div>
                </div>
                <div class="bg-vision-surface p-8 rounded-[2rem] border border-gray-100 dark:border-vision-border shadow-vision">
                    <h3 class="text-xl font-bold text-vision-text mb-8">${i18n.t('channels')}</h3>
                    <div class="space-y-6">
                        ${channel('Snapchat Ads', '55%', 'bg-yellow-400')}
                        ${channel('TikTok Business', '35%', 'bg-black')}
                        ${channel('Google Search', '25%', 'bg-vision-blue')}
                        ${channel('X Ads', '15%', 'bg-gray-800')}
                    </div>
                </div>
            </div>
        `;
    }
};

function statCard(title, value, change, color, iconPath) {
    return `
        <div class="bg-vision-surface p-8 rounded-[2rem] border border-gray-100 dark:border-vision-border shadow-vision hover:shadow-lg transition-all">
            <div class="flex justify-between items-start mb-6">
                <div class="w-14 h-14 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color}">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${iconPath}"></path></svg>
                </div>
                <div class="px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 text-[10px] font-black uppercase text-gray-400">
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

function bar(height) {
    return `
        <div class="w-full bg-gray-50 dark:bg-gray-800/50 rounded-2xl relative group h-full">
            <div class="absolute bottom-0 inset-x-0 bg-vision-gold opacity-30 rounded-2xl transition-all group-hover:opacity-60" style="height: ${height}%"></div>
        </div>
    `;
}

function channel(name, percentage, color) {
    return `
        <div>
            <div class="flex justify-between text-xs font-black mb-2 uppercase tracking-tighter">
                <span class="text-vision-text">${name}</span>
                <span class="text-gray-400">${percentage}</span>
            </div>
            <div class="w-full h-2.5 bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden">
                <div class="h-full ${color} rounded-full transition-all" style="width: ${percentage}"></div>
            </div>
        </div>
    `;
}
