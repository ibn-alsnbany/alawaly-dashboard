import { i18n } from '../../core/i18n.js';

export const settingsModule = {
    render: () => {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-black mb-0.5">${i18n.t('settings')}</h1>
                <p class="text-slate-400 text-[12px] font-medium">تخصيص الهوية الرقمية وإعدادات الحماية.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                
                <!-- Main Configuration (2/3) -->
                <div class="lg:col-span-2 space-y-4">
                    <div class="premium-card !p-6">
                        <h3 class="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">${i18n.t('profile')}</h3>
                        
                        <div class="flex flex-col md:flex-row items-start gap-8 mb-8">
                            <div class="relative group">
                                <div class="w-20 h-20 rounded-2xl bg-vision-gold/5 flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden group-hover:border-vision-gold transition-all">
                                    <span class="text-2xl font-black text-vision-gold">AT</span>
                                    <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z m5 0a3 3 0 110 6 3 3 0 010-6z"></path></svg>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                ${settingsInput(i18n.t('fullName'), 'محمد علي')}
                                ${settingsInput('اسم المستخدم', '@mohammed_alawaly')}
                                ${settingsInput('البريد الإلكتروني', 'mohammed@alawaly.sa')}
                                ${settingsInput('رقم الهاتف', '+966 50 XXX XXXX')}
                            </div>
                        </div>

                        <div class="flex justify-end pt-4 border-t border-slate-50 dark:border-slate-800">
                             <button class="bg-vision-gold text-white px-6 py-2 rounded-xl font-black text-[11px] shadow-lg shadow-vision-gold/10 hover:-translate-y-0.5 transition-all active:scale-95">${i18n.t('saveChanges')}</button>
                        </div>
                    </div>

                    <div class="premium-card !p-6">
                        <h3 class="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">إعدادات الأمان</h3>
                        <div class="space-y-4">
                            ${toggleItem('التحقق الثنائي (2FA)', 'حماية إضافية لحسابك عبر الهاتف.', true)}
                            ${toggleItem('إشعارات تسجيل الدخول', 'تنبيهك عند دخول الحساب من جهاز جديد.', false)}
                        </div>
                    </div>
                </div>

                <!-- Side Info (1/3) -->
                <div class="lg:col-span-1 space-y-4">
                    <div class="premium-card !p-5">
                        <h3 class="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">${i18n.t('appearance')}</h3>
                        <div class="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-lg bg-vision-gold/10 flex items-center justify-center text-vision-gold">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                                </div>
                                <span class="text-[11px] font-bold text-slate-700 dark:text-slate-200">تبديل المظهر العام</span>
                            </div>
                            <button onclick="toggleTheme()" class="w-10 h-5 bg-slate-200 dark:bg-slate-700 rounded-full relative transition-colors shadow-inner">
                                <div class="absolute inset-y-1 left-1 w-3 h-3 bg-white dark:bg-vision-gold rounded-full transition-all dark:translate-x-5 shadow-sm"></div>
                            </button>
                        </div>
                    </div>

                    <div class="premium-card !p-5 bg-emerald-50/10 border-emerald-100/20">
                        <h3 class="text-xs font-black text-emerald-600 mb-4 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                             سلامة الحساب
                        </h3>
                        <div class="text-center py-2">
                            <div class="text-2xl font-black text-emerald-600 mb-1">94%</div>
                            <p class="text-[10px] text-slate-500 font-medium lowercase tracking-tighter">الحساب مؤمن بشكل ممتاز</p>
                        </div>
                        <div class="mt-4 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full bg-emerald-500" style="width: 94%"></div>
                        </div>
                    </div>
                </div>

            </div>
        `;
    }
};

function settingsInput(label, value) {
    return `
        <div class="space-y-1.5 w-full">
            <label class="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ps-1">${label}</label>
            <input type="text" value="${value}" class="w-full bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50 rounded-xl px-3 py-2 text-[12px] font-bold text-slate-700 dark:text-slate-200 focus:border-vision-gold/40 focus:ring-4 focus:ring-vision-gold/5 transition-all outline-none">
        </div>
    `;
}

function toggleItem(title, desc, active) {
    return `
        <div class="flex items-center justify-between group">
            <div>
                <div class="text-[12px] font-black text-slate-700 dark:text-slate-200">${title}</div>
                <div class="text-[9px] text-slate-400 font-medium">${desc}</div>
            </div>
            <button class="w-10 h-5 ${active ? 'bg-emerald-500/20' : 'bg-slate-200 dark:bg-slate-700'} rounded-full relative transition-colors">
                <div class="absolute inset-y-1 ${active ? 'right-1 bg-emerald-500' : 'left-1 bg-slate-400 dark:bg-slate-500'} w-3 h-3 rounded-full transition-all shadow-sm"></div>
            </button>
        </div>
    `;
}
