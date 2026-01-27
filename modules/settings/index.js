import { i18n } from '../../core/i18n.js';
import { storage } from '../../core/storage.js';

export const settingsModule = {
    render: () => {
        const profile = storage.getProfile();

        return `
            <div class="mb-8">
                <h1 class="text-2xl font-bold mb-1 text-slate-800 dark:text-white">${i18n.t('settings')}</h1>
                <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('settingsSubtitle')}</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                <!-- Profile Section -->
                <div class="lg:col-span-2 premium-card !p-6">
                    <div class="flex items-center gap-6 mb-10 pb-10 border-b border-slate-50 dark:border-vision-border">
                        <div class="relative group">
                            <div class="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-4xl font-bold text-vision-gold border-4 border-white dark:border-slate-700 shadow-xl overflow-hidden">
                                <span class="profile-initials group-hover:scale-110 transition-transform">${profile.name[0]}</span>
                            </div>
                            <button class="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-vision-gold text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </button>
                        </div>
                        <div>
                            <h3 class="text-[1.0625rem] font-bold text-slate-800 dark:text-white mb-1">${profile.name}</h3>
                            <p class="text-[0.8125rem] text-slate-500 font-medium">${i18n.t('adminRole')}</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${settingsInput(i18n.t('fullName'), 'profile-name', storage.getProfile().name)}
                        ${settingsInput(i18n.t('username'), 'profile-username', storage.getProfile().username)}
                        ${settingsInput(i18n.t('emailAddress'), 'profile-email', storage.getProfile().email)}
                        ${settingsInput(i18n.t('phoneNumber'), 'profile-phone', storage.getProfile().phone)}
                    </div>
                </div>

                <div class="flex justify-end pt-6 border-t border-slate-50 dark:border-slate-800">
                     <button onclick="saveProfile()" class="bg-vision-gold text-white px-8 py-3 rounded-2xl font-bold text-[0.875rem] shadow-lg shadow-vision-gold/10 transition-all hover:-translate-y-1 active:scale-95">${i18n.t('saveChanges')}</button>
                </div>

                <div class="premium-card !p-8">
                    <h3 class="text-[0.8125rem] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8 text-start">${i18n.t('securitySettings')}</h3>
                    <div class="space-y-6 text-start">
                        ${toggleItem(i18n.t('twoFactorAuth'), i18n.t('twoFactorDesc'), true)}
                        ${toggleItem(i18n.t('loginNotifications'), i18n.t('loginNotifDesc'), false)}
                    </div>
                </div>
            </div>

            <!-- Side Info (1/3) -->
            <!-- ... remains same ... -->
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
    btn.textContent = i18n.t('profileUpdated');
    btn.classList.replace('bg-vision-gold', 'bg-emerald-500');

    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.replace('bg-emerald-500', 'bg-vision-gold');
        // Refresh page contexts (e.g. top bar)
        window.dispatchEvent(new Event('profileChanged'));
    }, 2000);
};

function settingsInput(label, id, value) {
    return `
        <div class="space-y-2">
            <label class="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest ps-1">${label}</label>
            <input type="text" id="${id}" value="${value}" class="w-full bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50 rounded-2xl px-5 py-4 text-[0.875rem] font-semibold text-slate-700 dark:text-slate-200 focus:border-vision-gold/40 focus:ring-4 focus:ring-vision-gold/5 transition-all outline-none">
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
