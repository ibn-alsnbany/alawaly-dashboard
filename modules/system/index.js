import { i18n } from '../../core/i18n.js';

export const systemModule = {
    render: () => {
        return `
            <div class="mb-8">
                <h1 class="text-3xl font-black text-vision-text mb-2">${i18n.t('system')}</h1>
                <p class="text-gray-400 text-sm font-medium">${i18n.t('systemSubtitle') || 'مراقبة صحة النظام والتحديثات التقنية.'}</p>
            </div>

            <div class="bg-vision-surface p-10 rounded-[2.5rem] border border-gray-100 dark:border-vision-border shadow-vision">
                <h3 class="text-xl font-bold text-vision-text mb-10">${i18n.t('systemStatus')}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    ${statusItem('Server Load', '24%', 'Excellent', 'text-green-500', 'M5 12h14M5 12a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v3a2 2 0 01-2 2 M5 12a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-2-2')}
                    ${statusItem('Memory Usage', '4.2GB / 16GB', 'Steady', 'text-blue-500', 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z')}
                    ${statusItem('Database', 'Online', 'Perfect', 'text-purple-500', 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4')}
                    ${statusItem('API Latency', '45ms', 'Ultra Fast', 'text-orange-500', 'M13 10V3L4 14h7v7l9-11h-7z')}
                </div>
            </div>

            <div class="mt-8 bg-vision-surface p-8 rounded-[2.5rem] border border-gray-100 dark:border-vision-border shadow-vision">
                <h3 class="text-xl font-bold text-vision-text mb-8">${i18n.t('recentUpdates')}</h3>
                <div class="space-y-4">
                    ${updateItem('v2.4.0 Premium', 'Implemented ultra-high-end design system based on Cubic Saudi tokens.', '2024-05-24')}
                    ${updateItem('v2.3.9 Core', 'Enhanced routing performance and multi-language engine stability.', '2024-05-22')}
                </div>
            </div>
        `;
    }
};

function statusItem(label, value, status, colorClass, iconPath) {
    return `
        <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${iconPath}"></path></svg>
            </div>
            <div>
                <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">${label}</div>
                <div class="text-lg font-black text-vision-text">${value}</div>
                <div class="text-[10px] font-black ${colorClass} uppercase">${status}</div>
            </div>
        </div>
    `;
}

function updateItem(version, desc, date) {
    return `
        <div class="p-6 bg-gray-50 dark:bg-gray-800/40 rounded-3xl border border-gray-100 dark:border-vision-border hover:border-vision-gold transition-all">
            <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-black text-vision-gold">${version}</span>
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${date}</span>
            </div>
            <div class="text-sm text-vision-text opacity-70 font-medium">${desc}</div>
        </div>
    `;
}
