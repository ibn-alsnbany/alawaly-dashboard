import { i18n } from '../../core/i18n.js';
import { storage } from '../../core/storage.js';

let userSearchQuery = '';

export const usersModule = {
    render: () => {
        let users = storage.getUsers();

        // Helpers
        const translateDept = (d) => {
            const map = { 'IT Department': 'itDept', 'Marketing': 'marketingDept', 'HR Office': 'hrDept', 'Finance': 'financeDept', 'التقنية': 'tech', 'المالية': 'finance', 'الموارد': 'hr' };
            return i18n.t(map[d] || d);
        };
        const translateRole = (r) => {
            const map = { 'Developer': 'developer', 'Lead': 'lead', 'Manager': 'manager', 'Analyst': 'analyst' };
            return i18n.t(map[r] || r);
        };

        if (userSearchQuery) {
            const q = userSearchQuery.toLowerCase();
            users = users.filter(u =>
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                u.dept.toLowerCase().includes(q)
            );
        }

        return `
            <div class="mb-8 flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold mb-1 text-slate-800 dark:text-white">${i18n.t('users')}</h1>
                    <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('usersSubtitle')}</p>
                </div>
                <button onclick="addNewUserPrompt()" class="bg-vision-gold text-white px-6 py-3 rounded-2xl font-bold text-[0.875rem] shadow-xl shadow-vision-gold/20 hover:-translate-y-1 transition-all flex items-center gap-2 active:scale-95">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                    ${i18n.t('addUser')}
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
                <!-- User List Section (3/4) -->
                <div class="lg:col-span-3 premium-card !p-6">
                    <div class="flex items-center justify-between mb-10">
                        <div class="flex items-center gap-4">
                            <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200">${i18n.t('userList')}</h3>
                            <span class="bg-vision-gold/10 text-vision-gold text-[0.8125rem] font-bold px-3 py-1 rounded-full font-nums">${users.length}</span>
                        </div>
                        <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input type="text" id="user-search" oninput="handleUserSearch(this.value)" placeholder="${i18n.t('searchUsers')}" value="${userSearchQuery}" autofocus class="bg-transparent border-none text-[0.8125rem] focus:ring-0 w-48 text-slate-700 dark:text-slate-300 font-medium outline-none">
                        </div>
                    </div>

                    <div class="space-y-4">
                        ${users.length > 0 ? users.map(u => userRow(u.id, u.name, u.email, u.dept, u.role, u.status)).join('') : `
                            <div class="text-center py-20">
                                <div class="text-slate-300 mb-4 scale-150">🔍</div>
                                <div class="text-slate-400 font-bold">${i18n.t('noUsersFound')}</div>
                            </div>
                        `}
                    </div>
                </div>

                <!-- Sidbar Widgets (1/4) -->
                <div class="lg:col-span-1 space-y-6">
                    <div class="premium-card !p-6">
                        <h3 class="text-[0.75rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">${i18n.t('absenceReport')}</h3>
                        <div class="space-y-5">
                            ${absenceItem('Layla Mohammed', i18n.t('notRegistered'), 'bg-slate-400')}
                            ${absenceItem('Bandar Al-Qahtani', i18n.t('late'), 'bg-amber-500')}
                        </div>
                        <button class="w-full mt-8 py-3 rounded-2xl bg-rose-500/5 hover:bg-rose-500/10 text-[0.8125rem] font-bold text-rose-600 transition-colors border border-rose-500/10">${i18n.t('fullAbsenceLog')}</button>
                    </div>

                    <div class="premium-card !p-6 overflow-hidden">
                        <h3 class="text-[0.75rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">${i18n.t('deptDistribution')}</h3>
                        <div class="space-y-5">
                            ${deptStats(i18n.t('tech'), `<span class="font-nums">40%</span>`, 'bg-blue-500')}
                            ${deptStats(i18n.t('finance'), `<span class="font-nums">25%</span>`, 'bg-emerald-500')}
                            ${deptStats(i18n.t('hr'), `<span class="font-nums">35%</span>`, 'bg-vision-gold')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

window.handleUserSearch = (val) => {
    userSearchQuery = val;
    const container = document.getElementById('module-container');
    if (container) {
        container.innerHTML = usersModule.render();
        const input = document.getElementById('user-search');
        if (input) {
            input.focus();
            input.setSelectionRange(val.length, val.length);
        }
    }
};

window.addNewUserPrompt = () => {
    showModal(modalForm(i18n.t('addUser'), `
        <div class="space-y-5 text-start">
            ${modalInput(i18n.t('fullName'), 'user-name', i18n.t('enterName'))}
            ${modalInput(i18n.t('email'), 'user-email', 'example@vision.sa')}
            <div class="grid grid-cols-2 gap-4">
                ${modalInput(i18n.t('currentDept'), 'user-dept', 'Marketing')}
                ${modalInput(i18n.t('jobTitle'), 'user-role', 'Manager')}
            </div>
        </div>
    `, i18n.t('hireUser'), 'submitNewUser()'));
};

window.submitNewUser = () => {
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const dept = document.getElementById('user-dept').value.trim();
    const role = document.getElementById('user-role').value.trim();

    if (!name) {
        showToast('⚠️ يرجى إدخال اسم الموظف');
        return;
    }
    if (!email) {
        showToast('⚠️ يرجى إدخال البريد الإلكتروني');
        return;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('⚠️ يرجى إدخال بريد إلكتروني صحيح');
        return;
    }
    if (!dept || !role) {
        showToast('⚠️ يرجى إكمال جميع الحقول');
        return;
    }

    const newUser = {
        name,
        email,
        dept,
        role,
        status: 'bg-emerald-500'
    };

    storage.addUser(newUser);
    closeModal();
    logAction('add', `تم إضافة موظف جديد: ${name}`);
    showToast(`✅ ${i18n.t('newUserAdded')}`);
    refreshModule();
};


window.editUserPrompt = (id) => {
    const user = storage.getUsers().find(u => u.id == id);
    if (!user) return;

    showModal(modalForm(i18n.t('editUserRecord'), `
    <div class="space-y-5 text-start">
        ${modalInput(i18n.t('fullName'), 'user-name', i18n.t('enterName'), 'text')}
        ${modalInput(i18n.t('email'), 'user-email', 'email@vision.sa')}
        <div class="grid grid-cols-2 gap-4">
            ${modalInput(i18n.t('currentDept'), 'user-dept', i18n.t('currentDept'))}
            ${modalInput(i18n.t('jobTitle'), 'user-role', i18n.t('jobTitle'))}
        </div>
        <input type="hidden" id="user-id" value="${id}">
    </div>
    `, i18n.t('saveChanges'), 'submitUpdateUser()'));

    // Fill values
    document.getElementById('user-name').value = user.name;
    document.getElementById('user-email').value = user.email;
    document.getElementById('user-dept').value = user.dept;
    document.getElementById('user-role').value = user.role;
};

window.submitUpdateUser = () => {
    const id = document.getElementById('user-id').value;
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const dept = document.getElementById('user-dept').value;
    const role = document.getElementById('user-role').value;

    if (!name || !email) return alert('يرجى تعبئة كافة الحقول');

    storage.updateUser(id, { name, email, dept, role });
    closeModal();
    logAction('edit', `تعديل بيانات الموظف: ${name}`);
    showToast(`✅ ${i18n.t('systemUpdated')}`);
    refreshModule();
};

window.viewUser = (id) => {
    const user = storage.getUsers().find(u => u.id == id);
    if (!user) return;

    // Helpers
    const translateDept = (d) => {
        const map = { 'IT Department': 'itDept', 'Marketing': 'marketingDept', 'HR Office': 'hrDept', 'Finance': 'financeDept' };
        return i18n.t(map[d] || d);
    };
    const translateRole = (r) => {
        const map = { 'Developer': 'developer', 'Lead': 'lead', 'Manager': 'manager', 'Analyst': 'analyst' };
        return i18n.t(map[r] || r);
    };

    showModal(`
        <div class="premium-card !p-8 md:!p-10 shadow-2xl relative w-full max-w-md mx-auto animate-enter text-start">
            <button onclick="closeModal()" class="absolute top-8 left-8 p-2 text-slate-400 hover:text-rose-500 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div class="text-center mb-8">
                <div class="w-24 h-24 rounded-3xl bg-vision-gold/10 flex items-center justify-center mx-auto mb-6 text-vision-gold text-3xl font-black shadow-inner">
                    ${user.name[0]}
                </div>
                <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">${user.name}</h3>
                <span class="px-5 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest border border-slate-100 dark:border-slate-700">${translateRole(user.role)}</span>
            </div>

            <div class="space-y-5 bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50 mb-8 text-[0.875rem]">
                <div class="flex justify-between items-center h-8">
                    <span class="text-slate-400 font-bold uppercase text-[0.7rem] tracking-widest">${i18n.t('email')}</span>
                    <span class="text-slate-700 dark:text-slate-200 font-medium">${user.email}</span>
                </div>
                <div class="w-full h-px bg-slate-100 dark:bg-slate-700/50"></div>
                <div class="flex justify-between items-center h-8">
                    <span class="text-slate-400 font-bold uppercase text-[0.7rem] tracking-widest">${i18n.t('currentDept')}</span>
                    <span class="text-slate-800 dark:text-slate-100 font-bold">${translateDept(user.dept)}</span>
                </div>
            </div>

            <div class="flex gap-4">
                <button onclick="editUserPrompt('${user.id}')" class="flex-1 bg-vision-gold text-white py-4 rounded-2xl font-bold text-[0.875rem] shadow-xl shadow-vision-gold/20 hover:brightness-110">${i18n.t('editProfile')}</button>
                <button onclick="closeModal()" class="px-8 bg-slate-100 dark:bg-slate-800 text-slate-500 py-4 rounded-2xl font-bold text-[0.875rem]">${i18n.t('close')}</button>
            </div>
        </div>
    `);
};

window.deleteUserItem = (id) => {
    const user = storage.getUsers().find(u => u.id == id);
    const name = user ? user.name : id;
    const title = i18n.t('deleteRecord');
    const message = i18n.t('confirmDeleteUser') + ' (' + name + ')';
    showConfirmModal(title, message, `storage.deleteUser(${id}); logAction('delete', 'حذف المستخدم: ${name}'); showToast('🗑️ ' + i18n.t('deleteRecord') + ': ${name}'); refreshModule();`);
};

function userRow(id, name, email, dept, role, statusColor) {
    // Helpers
    const translateDept = (d) => {
        const map = { 'IT Department': 'itDept', 'Marketing': 'marketingDept', 'HR Office': 'hrDept', 'Finance': 'financeDept' };
        return i18n.t(map[d] || d);
    };
    const translateRole = (r) => {
        const map = { 'Developer': 'developer', 'Lead': 'lead', 'Manager': 'manager', 'Analyst': 'analyst' };
        return i18n.t(map[r] || r);
    };

    return `
        <div class="p-5 border border-slate-50 dark:border-vision-border rounded-3xl hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-all flex items-center justify-between group animate-enter text-start">
            <div class="flex items-center gap-5">
                <div class="relative">
                    <div class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 font-bold text-xl">${name[0]}</div>
                    <span class="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-2 border-white dark:border-slate-800 rounded-full ${statusColor}"></span>
                </div>
                <div class="flex flex-col min-w-0">
                    <div class="text-[1rem] font-bold text-slate-800 dark:text-white group-hover:text-vision-gold transition-colors truncate">${name}</div>
                    <div class="text-[0.8125rem] text-slate-400 font-medium font-nums truncate">${email}</div>
                </div>
            </div>
            
            <div class="flex items-center gap-10">
                <div class="hidden md:flex flex-col text-start items-start gap-1">
                    <span class="text-[0.875rem] font-bold text-slate-700 dark:text-slate-300 tracking-tight">${translateDept(dept)}</span>
                    <span class="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest leading-none">${translateRole(role)}</span>
                </div>
                <div class="w-px h-8 bg-slate-100 dark:bg-slate-800 hidden md:block"></div>
                <div class="flex gap-2 transition-all">
                    <button class="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-500 hover:border-blue-200 dark:hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all" onclick="viewUser(${id})" title="${i18n.t('viewDetails')}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </button>
                    <button class="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-vision-gold hover:border-vision-gold/30 hover:bg-amber-50 dark:hover:bg-vision-gold/10 transition-all" onclick="editUserPrompt(${id})" title="${i18n.t('edit')}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button onclick="deleteUserItem(${id})" class="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-500/30 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all" title="${i18n.t('deleteRecord')}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function absenceItem(name, reason, color) {
    return `
        <div class="flex items-center justify-between group">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[0.8125rem] font-black text-slate-500 group-hover:text-rose-500 transition-colors">${name[0]}</div>
                <div class="flex flex-col">
                    <span class="text-[0.875rem] font-semibold text-slate-700 dark:text-slate-200">${name}</span>
                    <span class="text-[0.75rem] font-medium text-slate-400">${reason}</span>
                </div>
            </div>
            <div class="w-2.5 h-2.5 rounded-full ${color}"></div>
        </div>
    `;
}

function deptStats(label, val, color) {
    return `
        <div class="space-y-2">
            <div class="flex justify-between text-[0.8125rem] font-bold mb-1">
                <span class="text-slate-500">${label}</span>
                <span class="text-slate-800 dark:text-white font-nums">${val}</span>
            </div>
            <div class="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full ${color} rounded-full transition-all duration-1000" style="width: ${val.toString().replace(/[^0-9.]/g, '')}%"></div>
            </div>
        </div>
    `;
}
