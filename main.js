import { i18n } from './core/i18n.js';
import { theme } from './core/theme.js';

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

const routes = {
    'dashboard': dashboardModule,
    'finance': financeModule,
    'marketing': marketingModule,
    'sales': salesModule,
    'hr': hrModule,
    'analytics': analyticsModule,
    'system': systemModule,
    'users': usersModule,
    'settings': settingsModule
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

        // Content Injection
        container.style.opacity = 0;
        setTimeout(() => {
            container.innerHTML = module.render();
            container.style.opacity = 1;
            i18n.translatePage(); // Refresh text context
        }, 120);
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
}

// Lifecycle Listeners
document.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('hashchange', handleRoute);
window.addEventListener('langChanged', (e) => {
    i18n.apply();   // Fully refresh context
    handleRoute();  // Rerender current view
});
window.addEventListener('themeChanged', () => theme.apply());
