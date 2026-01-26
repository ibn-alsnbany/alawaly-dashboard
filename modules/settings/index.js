import { i18n } from '../../core/i18n.js';
import { storage } from '../../core/storage.js';

export const settingsModule = {
    render: () => {
        const profile = storage.getProfile();

        return `
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-slate-800 dark:text-white mb-2">${i18n.t('settings')}</h1>
                <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">تخصيص الهوية الرقمية وإعدادات الحماية.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                
                <!-- Main Configuration (2/3) -->
                <div class="lg:col-span-2 space-y-6">
                    <div class="premium-card !p-8">
                        <h3 class="text-[0.8125rem] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">${i18n.t('profile')}</h3>
                        
                        <div class="flex flex-col md:flex-row items-start gap-10 mb-10">
                            <div class="relative group">
                                <div class="w-24 h-24 rounded-3xl bg-vision-gold/5 flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden group-hover:border-vision-gold transition-colors">
                                    <span class="text-3xl font-bold text-vision-gold font-nums">${profile.name ? profile.name.split(' ').map(n => n[0]).join('') : 'AT'}</span>
                                    <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z m5 0a3 3 0 110 6 3 3 0 010-6z"></path></svg>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                ${settingsInput(i18n.t('fullName'), 'profile-name', profile.name)}
                                ${settingsInput('اسم المستخدم', 'profile-username', profile.username)}
                                ${settingsInput('البريد الإلكتروني', 'profile-email', profile.email)}
                                ${settingsInput('رقم الهاتف', 'profile-phone', profile.phone, true)}
                            </div>
                        </div>

                        <div class="flex justify-end pt-6 border-t border-slate-50 dark:border-slate-800">
                             <button onclick="saveProfile()" class="bg-vision-gold text-white px-8 py-3 rounded-2xl font-bold text-[0.875rem] shadow-lg shadow-vision-gold/10 transition-all hover:-translate-y-1 active:scale-95">${i18n.t('saveChanges')}</button>
                        </div>
                    </div>

                    <div class="premium-card !p-8">
                        <h3 class="text-[0.8125rem] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">إعدادات الأمان</h3>
                        <div class="space-y-6">
                            ${toggleItem('التحقق الثنائي (2FA)', 'حماية إضافية لحسابك عبر الهاتف.', true)}
                            ${toggleItem('إشعارات تسجيل الدخول', 'تنبيهك عند دخول الحساب من جهاز جديد.', false)}
                        </div>
                    </div>
                </div>

                <!-- Side Info (1/3) -->
                <!-- ... remains same ... -->
            </div>
        `;
    }
};

window.saveProfile = () => {
    const newProfile = {
        name: document.getElementById('profile-name').value,
        username: document.getElementById('profile-username').value,
        email: document.getElementById('profile-email').value,
        phone: document.getElementById('profile-phone').value
    };
    storage.setProfile(newProfile);

    // Quick notification animation
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'تم الحفظ!';
    btn.classList.replace('bg-vision-gold', 'bg-emerald-500');

    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.replace('bg-emerald-500', 'bg-vision-gold');
        // Refresh page contexts (e.g. top bar)
        window.dispatchEvent(new Event('profileChanged'));
    }, 2000);
};

function settingsInput(label, id, value, isPhone = false) {
    return `
        <div class="space-y-2.5 w-full">
            <label class="text-[0.75rem] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ps-1">${label}</label>
            <input type="text" id="${id}" value="${value}" ${isPhone ? 'dir="ltr"' : ''} class="w-full bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50 rounded-2xl px-5 py-3.5 text-[0.875rem] font-semibold text-slate-700 dark:text-slate-200 transition-all outline-none focus:border-vision-gold/40 focus:ring-4 focus:ring-vision-gold/5 ${isPhone ? 'font-nums text-start' : ''}">
        </div>
    `;
}

function toggleItem(title, desc, active) {
    return `
        <div class="flex items-center justify-between group">
            <div>
                <div class="text-[0.875rem] font-bold text-slate-700 dark:text-slate-200">${title}</div>
                <div class="text-[0.75rem] text-slate-400 font-medium">${desc}</div>
            </div>
            <button class="w-12 h-6 ${active ? 'bg-emerald-500/20' : 'bg-slate-200 dark:bg-slate-700'} rounded-full relative transition-colors">
                <div class="absolute inset-y-1 ${active ? 'right-1 bg-emerald-500' : 'left-1 bg-slate-400 dark:bg-slate-500'} w-4 h-4 rounded-full transition-all shadow-sm"></div>
            </button>
        </div>
    `;
}
