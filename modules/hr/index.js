import { i18n } from '../../core/i18n.js';

export const hrModule = {
    render: () => {
        return `
            <div>
                <h1 class="text-3xl font-black text-vision-text mb-2 text-slate-900 dark:text-white">${i18n.t('hr')}</h1>
                <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('hrSubtitle') || 'إدارة الكوادر البشرية والنمو الوظيفي.'}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12 mt-8 w-full">
                ${statCard(i18n.t('employees'), `<span class="font-nums">154</span>`, `<span class="font-nums">+2 New</span>`, 'vision-blue', 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z')}
                ${statCard(i18n.t('attendance'), `<span class="font-nums">94%</span>`, `<span class="font-nums">-1%</span>`, 'vision-orange', 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2')}
                ${statCard(i18n.t('leaves'), `<span class="font-nums">8</span>`, `<span class="font-nums">Active</span>`, 'vision-purple', 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z')}
                ${statCard(i18n.t('salaries'), `<span class="font-nums">480k</span>`, `<span class="font-nums">+5%</span>`, 'vision-green', 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM17 13v-2M7 13v-2M12 5v3m0 8v3M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z')}
            </div>
            
            <div class="bg-white dark:bg-vision-surface p-8 rounded-[2rem] border border-slate-100 dark:border-vision-border shadow-soft">
                <h3 class="text-xl font-bold text-vision-text mb-8 text-slate-900 dark:text-white">${i18n.t('employeeList')}</h3>
                <div class="space-y-4">
                    ${employeeRow('خالد محمد', 'مدير تقني', 'نشط', 'bg-green-100 text-green-600')}
                    ${employeeRow('ريم علي', 'مصممة واجهات', 'نشط', 'bg-green-100 text-green-600')}
                    ${employeeRow('عمر فاروق', 'مطور فرونت إند', 'في إجازة', 'bg-orange-100 text-orange-600')}
                </div>
            </div>
        `;
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = change.includes('+') || change === 'Active';
    return `
        <div class="bg-white dark:bg-vision-surface p-7 rounded-[2rem] border border-slate-100 dark:border-vision-border shadow-soft hover:shadow-lg transition-all">
            <div class="flex justify-between items-start mb-6">
                <div class="w-13 h-13 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color}">
                    <svg class="w-6.5 h-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="${iconPath}"></path></svg>
                </div>
                <div class="px-2.5 py-1 rounded-lg ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} text-[0.75rem] font-bold uppercase">
                    ${change}
                </div>
            </div>
            <div>
                <div class="text-[0.75rem] font-semibold text-slate-500 uppercase tracking-widest mb-1">${title}</div>
                <div class="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">${value}</div>
            </div>
        </div>
    `;
}

function employeeRow(name, role, status, statusClass) {
    return `
        <div class="p-6 border border-slate-50 dark:border-vision-border rounded-3xl hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-all flex items-center justify-between group">
            <div class="flex items-center gap-6">
                <div class="w-14 h-14 rounded-2xl bg-vision-gold/5 border border-vision-gold/10 flex items-center justify-center text-vision-gold font-black text-lg transition-transform">${name[0]}</div>
                <div>
                    <div class="text-[1.0625rem] font-bold text-slate-900 dark:text-white mb-0.5">${name}</div>
                    <div class="text-[0.8125rem] text-slate-500 font-medium uppercase tracking-tighter">${role}</div>
                </div>
            </div>
            <div class="flex items-center gap-8">
                <span class="${statusClass} px-3.5 py-1.5 rounded-xl text-[0.75rem] font-bold uppercase tracking-wider">${status}</span>
                <button class="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </div>
    `;
}
