import { i18n } from '../../core/i18n.js';
import { storage } from '../../core/storage.js';

let userSearchQuery = '';

export const usersModule = {
    render: () => {
        let users = storage.getUsers();

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
                    <h1 class="text-3xl font-bold text-slate-800 dark:text-white mb-2">${i18n.t('users')}</h1>
                    <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">إدارة الكوادر البشرية وتوزيع الصلاحيات البرمجية.</p>
                </div>
                <button onclick="addNewUserPrompt()" class="bg-vision-gold text-white px-6 py-3 rounded-2xl font-bold text-[0.875rem] shadow-xl shadow-vision-gold/20 hover:-translate-y-1 transition-all flex items-center gap-2 active:scale-95">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                    أضف كادر جديد
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
                <!-- User List Section (3/4) -->
                <div class="lg:col-span-3 premium-card !p-8">
                    <div class="flex items-center justify-between mb-10">
                        <div class="flex items-center gap-4">
                            <h3 class="text-xl font-bold text-slate-800 dark:text-white leading-none">قائمة الكوادر</h3>
                            <span class="bg-vision-gold/10 text-vision-gold text-[0.8125rem] font-bold px-3 py-1 rounded-full font-nums">${users.length} موظف</span>
                        </div>
                        <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                            <svg class="w-4.5 h-4.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input type="text" id="user-search" oninput="handleUserSearch(this.value)" placeholder="${i18n.t('searchUsers')}" value="${userSearchQuery}" autofocus class="bg-transparent border-none text-[0.875rem] focus:ring-0 w-48 text-slate-700 dark:text-slate-300 font-medium outline-none">
                        </div>
                    </div>

                    <div class="space-y-4">
                        ${users.length > 0 ? users.map(u => userRow(u.id, u.name, u.email, u.dept, u.role, u.status)).join('') : `
                            <div class="text-center py-20">
                                <div class="text-slate-300 mb-4 scale-150">🔍</div>
                                <div class="text-slate-400 font-bold">لا يوجد نتائج لهذا البحث</div>
                            </div>
                        `}
                    </div>
                </div>

                <!-- Sidbar Widgets (1/4) -->
                <div class="lg:col-span-1 space-y-8">
                    <div class="premium-card !p-7">
                        <h3 class="text-[0.8125rem] font-bold text-slate-500 uppercase tracking-widest mb-6">تقرير الغياب اليومي</h3>
                        <div class="space-y-5">
                            ${absenceItem('ليلى محمد', 'غير مسجل', 'bg-slate-400')}
                            ${absenceItem('بندر القحطاني', 'تأخر رسمي', 'bg-amber-500')}
                        </div>
                        <button class="w-full mt-8 py-3 rounded-2xl bg-rose-500/5 hover:bg-rose-500/10 text-[0.8125rem] font-bold text-rose-600 transition-colors border border-rose-500/10">سجل الغياب الكامل</button>
                    </div>

                    <div class="premium-card !p-7 overflow-hidden">
                        <h3 class="text-[0.8125rem] font-bold text-slate-500 uppercase tracking-widest mb-6">توزيع الأقسام</h3>
                        <div class="space-y-5">
                            ${deptStats('التقنية', `<span class="font-nums">40%</span>`, 'bg-blue-500')}
                            ${deptStats('المالية', `<span class="font-nums">25%</span>`, 'bg-emerald-500')}
                            ${deptStats('الموارد', `<span class="font-nums">35%</span>`, 'bg-vision-gold')}
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
    showModal(modalForm('أضف كادر جديد', `
        <div class="space-y-5">
            ${modalInput('الاسم الكامل', 'user-name', 'أدخل اسم الموظف...')}
            ${modalInput('البريد الإلكتروني', 'user-email', 'example@vision.sa')}
            <div class="grid grid-cols-2 gap-4">
                ${modalInput('القسم', 'user-dept', 'Marketing')}
                ${modalInput('المسمى الوظيفي', 'user-role', 'Manager')}
            </div>
        </div>
    `, 'إضافة الآن', 'submitNewUser()'));
};

window.submitNewUser = () => {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const dept = document.getElementById('user-dept').value || 'General';
    const role = document.getElementById('user-role').value || 'Staff';

    if (!name || !email) return alert('يرجى تعبئة الاسم والبريد');

    storage.addUser({ name, email, dept, role, status: 'bg-emerald-500' });
    closeModal();
    showToast('تمت إضافة الموظف بنجاح');
    navigateTo('users');
};

window.deleteUserItem = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
        storage.deleteUser(id);
        showToast('تم حذف الموظف بنجاح');
        navigateTo('users');
    }
};

function userRow(id, name, email, dept, role, statusColor) {
    return `
        <div class="p-5 border border-slate-50 dark:border-vision-border rounded-3xl hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-all flex items-center justify-between group animate-enter">
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
                <div class="hidden md:flex flex-col text-end items-end gap-1">
                    <span class="text-[0.875rem] font-bold text-slate-700 dark:text-slate-300 tracking-tight">${dept}</span>
                    <span class="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest leading-none">${role}</span>
                </div>
                <div class="w-px h-8 bg-slate-100 dark:bg-slate-800 hidden md:block"></div>
                <div class="flex gap-2">
                    <button class="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-vision-gold transition-colors" onclick="alert('تعديل: ' + '${name}')">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button onclick="deleteUserItem(${id})" class="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-rose-500 transition-colors">
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
