import { i18n } from './core/i18n.js';
import { theme } from './core/theme.js';
import { storage } from './core/storage.js';

// Module Dynamic Imports logic
import { dashboardModule } from './modules/dashboard/index.js';
import { financeModule } from './modules/finance/index.js';
import { marketingModule } from './modules/marketing/index.js';
import { salesModule } from './modules/sales/index.js';
import { hrModule } from './modules/hr/index.js';
import { analyticsModule } from './modules/analytics/index.js';
import { systemModule } from './modules/system/index.js';
import { usersModule } from './modules/users/index.js';
import { settingsModule } from './modules/settings/index.js';
import { notificationsModule } from './modules/notifications/index.js';

// Expose Core to Global Scope for HTML Event Handlers
window.storage = storage;
window.i18n = i18n;
window.theme = theme;

window.logAction = (type, message) => {
    storage.addNotification(type, message);
    const bell = document.querySelector('.topbar-bell-badge');
    if (bell) bell.classList.remove('hidden');
};

const routes = {
    'dashboard': dashboardModule,
    'finance': financeModule,
    'marketing': marketingModule,
    'sales': salesModule,
    'hr': hrModule,
    'analytics': analyticsModule,
    'system': systemModule,
    'users': usersModule,
    'settings': settingsModule,
    'notifications': notificationsModule
};

// Global Navigation Helper
window.navigateTo = (route) => {
    window.location.hash = route;
};

// Global UI Helpers: Modal & Toast
window.showModal = (html) => {
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    content.innerHTML = html;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
};

window.closeModal = () => {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
};

window.showToast = (message) => {
    const toast = document.getElementById('toast-container');
    const msgEl = document.getElementById('toast-message');
    msgEl.textContent = message;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
};

window.refreshModule = () => {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    const container = document.getElementById('module-container');
    if (container) {
        const module = routes[hash] || dashboardModule;
        container.innerHTML = module.render();
    }
};

// Unified Modal UI Helpers
window.modalForm = (title, content, submitLabel, submitAction) => {
    return `
        <div class="premium-card !p-8 md:!p-10 shadow-[0_30px_100px_rgba(0,0,0,0.25)] border-vision-gold/10 animate-enter relative w-full max-w-lg mx-auto">
            <button onclick="closeModal()" class="absolute top-8 left-8 p-2 text-slate-400 hover:text-rose-500 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div class="mb-8 pb-6 border-b border-slate-50 dark:border-vision-border">
                <h3 class="text-xl font-bold text-slate-800 dark:text-white">${title}</h3>
            </div>
            <div class="space-y-6">
                ${content}
            </div>
            <div class="mt-10 flex gap-4">
                <button onclick="${submitAction}" class="flex-1 bg-vision-gold text-white py-4 rounded-2xl font-bold text-[0.875rem] transition-all shadow-xl shadow-vision-gold/20 hover:brightness-110 active:scale-[0.98]">${submitLabel}</button>
                <button onclick="closeModal()" class="px-8 bg-slate-100 dark:bg-slate-800 text-slate-500 py-4 rounded-2xl font-bold text-[0.875rem] transition-all hover:bg-slate-200 dark:hover:bg-slate-700">${i18n.lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
            </div>
        </div>
    `;
};

window.showConfirmModal = (title, message, confirmAction) => {
    const isAr = i18n.lang === 'ar';
    showModal(`
        <div class="premium-card !p-8 md:!p-10 shadow-[0_30px_100px_rgba(0,0,0,0.25)] border-vision-gold/10 animate-enter relative w-full max-w-md mx-auto text-center">
            <button onclick="closeModal()" class="absolute top-8 left-8 p-2 text-slate-400 hover:text-rose-500 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div class="mb-6">
                <div class="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">${title}</h3>
                <p class="text-slate-500 font-medium">${message}</p>
            </div>
            <div class="flex gap-4">
                <button onclick="${confirmAction}; closeModal();" class="flex-1 bg-rose-500 text-white py-4 rounded-2xl font-bold text-[0.875rem] transition-all shadow-xl shadow-rose-500/20 hover:brightness-110 active:scale-[0.98]">${isAr ? 'حذف' : 'Delete'}</button>
                <button onclick="closeModal()" class="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-500 py-4 rounded-2xl font-bold text-[0.875rem] transition-all hover:bg-slate-200 dark:hover:bg-slate-700">${isAr ? 'إلغاء' : 'Cancel'}</button>
            </div>
        </div>
    `);
};

window.modalInput = (label, id, placeholder, type = 'text') => {
    return `
        <div class="space-y-2">
            <label class="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest ps-1">${label}</label>
            <input type="${type}" id="${id}" placeholder="${placeholder}" class="w-full bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50 rounded-2xl px-5 py-4 text-[0.875rem] font-semibold text-slate-700 dark:text-slate-200 focus:border-vision-gold/40 focus:ring-4 focus:ring-vision-gold/5 transition-all outline-none">
        </div>
    `;
};

// Global Currency Helper
window.currencyIcon = () => {
    return `
        <svg class="rial-icon w-3.5 h-3.5 inline-block align-baseline mb-0.5" viewBox="0 0 1124.14 1256.39" fill="currentColor">
            <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
            <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
        </svg>
    `;
};

window.formatCurrency = (amount) => {
    const icon = currencyIcon();
    return i18n.lang === 'ar' ? `${icon} ${amount}` : `${amount} ${icon}`;
};

// Application Context Handler
function handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    const module = routes[hash];
    const container = document.getElementById('module-container');

    if (module && container) {
        // Handle Sidebar Highlighting (Contextual)
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('data-nav') === hash) {
                link.classList.add('active-nav-link');
            } else {
                link.classList.remove('active-nav-link');
            }
        });

        // Content Injection with Smooth Transition
        container.classList.add('module-exit');

        setTimeout(() => {
            container.innerHTML = module.render();
            container.classList.remove('module-exit');
            container.classList.add('module-enter');

            // Cleanup enter class after animation
            setTimeout(() => {
                container.classList.remove('module-enter');
            }, 400);

            i18n.translatePage(); // Refresh text context
        }, 150);
    }
}

// Sidebar Visibility Toggle (Mobile Mode)
window.toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    const isVisible = sidebar.classList.toggle('mobile-visible');
    overlay.classList.toggle('active', isVisible);
    overlay.classList.toggle('hidden', !isVisible);
};

// Sidebar Collapse Toggle (Desktop Mode)
window.toggleSidebarCollapse = () => {
    const sidebar = document.getElementById('sidebar');
    const isCollapsed = sidebar.classList.toggle('sidebar-collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
    updateDynamicLabels(); // Refresh text for toggles
};

// Initialize Sidebar Layout State
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) sidebar.classList.add('sidebar-collapsed');
    updateDynamicLabels();
}

// Dynamic Toggle Labels Manager
function updateDynamicLabels() {
    const sidebar = document.getElementById('sidebar');
    const isCollapsed = sidebar.classList.contains('sidebar-collapsed');
    const lang = i18n.lang;
    const isDark = document.documentElement.classList.contains('dark');

    // Language Toggle logic
    const langText = document.getElementById('lang-text');
    if (langText) {
        if (isCollapsed) {
            // Short names: ar -> EN | en -> عر
            langText.textContent = lang === 'ar' ? 'EN' : 'عر';
        } else {
            // Full names: ar -> English | en -> العربية
            langText.textContent = lang === 'ar' ? 'English' : 'العربية';
        }
    }

    // Theme Toggle logic (Show the target state)
    const themeText = document.getElementById('theme-text');
    const themeIcon = document.getElementById('theme-icon');
    if (themeText && themeIcon) {
        // If dark, show "Day/نهار" + Sun. If light, show "Night/ليلي" + Moon.
        if (isDark) {
            themeText.textContent = lang === 'ar' ? 'نهار' : 'Day';
            themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>`;
        } else {
            themeText.textContent = lang === 'ar' ? 'ليلي' : 'Night';
            themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>`;
        }
    }
}

// Global State Toggles
window.toggleLanguage = () => {
    i18n.toggle();
    updateDynamicLabels();
};

window.toggleTheme = () => {
    theme.toggle();
    updateDynamicLabels();
};

// Initial Setup
function initApp() {
    i18n.apply();   // Language Context
    theme.apply();  // Theme Context
    initSidebar();  // Sidebar Context
    handleRoute();  // Routing Context
    window.dispatchEvent(new Event('profileChanged')); // Apply stored profile info
}

// Lifecycle Listeners
document.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('hashchange', handleRoute);
window.addEventListener('langChanged', (e) => {
    i18n.apply();   // Fully refresh context
    handleRoute();  // Rerender current view
});
window.addEventListener('themeChanged', () => theme.apply());

// Dynamic Profile Update Listener
window.addEventListener('profileChanged', () => {
    const profile = storage.getProfile();
    const topBarName = document.querySelector('[data-i18n="userName"]');
    if (topBarName) topBarName.textContent = profile.name;

    // Update initials in circle
    const avatarCircle = topBarName.parentElement.previousElementSibling;
    if (avatarCircle && profile.name) {
        avatarCircle.textContent = profile.name.split(' ').map(n => n[0]).join('');
    }
});
