import { i18n } from '../../core/i18n.js';
import { storage } from '../../core/storage.js';

export const notificationsModule = {
    render: () => {
        const notifications = storage.getNotifications();

        return `
            <div class="mb-8 flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold mb-1 text-slate-800 dark:text-white">${i18n.t('notifications')}</h1>
                    <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('notificationsSubtitle')}</p>
                </div>
                <button onclick="clearNotifications()" class="text-slate-400 hover:text-rose-500 text-[0.8125rem] font-bold transition-colors flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    ${i18n.t('clearAll')}
                </button>
            </div>

            <div class="premium-card !p-0 overflow-hidden">
                <div class="divide-y divide-slate-50 dark:divide-vision-border">
                    ${notifications.length > 0 ? notifications.map(notif => notificationItem(notif)).join('') : `
                        <div class="py-20 text-center">
                            <div class="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                            </div>
                            <p class="text-slate-400 font-bold">${i18n.t('noNotifications')}</p>
                        </div>
                    `}
                </div>
            </div>
        `;
    }
};

function notificationItem(notif) {
    const icons = {
        add: { bg: 'bg-emerald-50 dark:bg-emerald-400/10', text: 'text-emerald-500', svg: 'M12 4v16m8-8H4' },
        edit: { bg: 'bg-amber-50 dark:bg-amber-400/10', text: 'text-amber-500', svg: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
        delete: { bg: 'bg-rose-50 dark:bg-rose-400/10', text: 'text-rose-500', svg: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
        info: { bg: 'bg-blue-50 dark:bg-blue-400/10', text: 'text-blue-500', svg: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
    };
    const style = icons[notif.type] || icons.info;
    const time = new Date(notif.time).toLocaleTimeString(i18n.lang === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    const date = new Date(notif.time).toLocaleDateString(i18n.lang === 'ar' ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric' });

    return `
        <div class="p-6 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-colors group animate-enter">
            <div class="w-12 h-12 shrink-0 rounded-2xl ${style.bg} ${style.text} flex items-center justify-center transition-transform group-hover:scale-105">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${style.svg}"></path></svg>
            </div>
            <div class="flex-grow min-w-0">
                <p class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200 mb-1 leading-tight">${notif.message}</p>
                <div class="flex items-center gap-3 text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest">
                    <span>${date}</span>
                    <div class="w-1 h-1 rounded-full bg-slate-300"></div>
                    <span class="font-nums">${time}</span>
                </div>
            </div>
        </div>
    `;
}

window.clearNotifications = () => {
    storage.set('vision_notifications', []);
    showToast('🗑️ تم إفراغ سجل الإشعارات');
    refreshModule();
};
