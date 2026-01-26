import { i18n } from '../../core/i18n.js';
import { storage } from '../../core/storage.js';

let hrSearchQuery = '';

export const hrModule = {
    render: () => {
        let employees = storage.getEmployees();

        if (hrSearchQuery) {
            const q = hrSearchQuery.toLowerCase();
            employees = employees.filter(emp =>
                emp.name.toLowerCase().includes(q) ||
                emp.role.toLowerCase().includes(q)
            );
        }
        return `
            <div class="mb-8">
                <h1 class="text-2xl font-bold mb-1 text-slate-800 dark:text-white">${i18n.t('hr')}</h1>
                <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('hrSubtitle') || 'إدارة الكوادر البشرية والنمو الوظيفي.'}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10 w-full">
                ${statCard(i18n.t('employees'), `<span class="font-nums">154</span>`, `<span class="font-nums">+2 New</span>`, 'bg-vision-gold', 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z')}
                ${statCard(i18n.t('attendance'), `<span class="font-nums">94%</span>`, `<span class="font-nums">-1%</span>`, 'bg-vision-gold', 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2')}
                ${statCard(i18n.t('leaves'), `<span class="font-nums">8</span>`, `<span class="font-nums">Active</span>`, 'bg-vision-gold', 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z')}
                ${statCard(i18n.t('salaries'), `<span class="font-nums">480k</span>`, `<span class="font-nums">+5%</span>`, 'bg-vision-gold', 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM17 13v-2M7 13v-2M12 5v3m0 8v3M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z')}
            </div>
            
            <div class="premium-card !p-6">
                <div class="flex items-center justify-between mb-10">
                    <div class="flex items-center gap-4">
                        <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200">${i18n.t('employeeList')}</h3>
                        <span class="bg-vision-gold/10 text-vision-gold text-[0.8125rem] font-bold px-3 py-1 rounded-full font-nums">${employees.length}</span>
                    </div>
                    <div class="flex gap-4">
                        <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input type="text" id="hr-search" oninput="handleHRSearch(this.value)" value="${hrSearchQuery}" placeholder="بحث في الكوادر..." class="bg-transparent border-none text-[0.8125rem] focus:ring-0 w-44 text-slate-700 dark:text-slate-300 font-medium outline-none">
                        </div>
                        <button onclick="addEmployeePrompt()" class="bg-vision-gold text-white px-5 py-2.5 rounded-xl font-bold text-[0.8125rem] shadow-lg shadow-vision-gold/10 hover:-translate-y-0.5 active:scale-95 transition-all">إضافة موظف</button>
                    </div>
                </div>
                <div class="space-y-4">
                    ${employees.length > 0 ? employees.map(emp => employeeRow(emp.id, emp.name, emp.role, emp.status, emp.statusClass)).join('') : `
                        <div class="text-center py-10 text-slate-400 font-bold">لا يوجد نتائج</div>
                    `}
                </div>
            </div>
        `;
    }
};

window.handleHRSearch = (val) => {
    hrSearchQuery = val;
    const container = document.getElementById('module-container');
    if (container) {
        container.innerHTML = hrModule.render();
        const input = document.getElementById('hr-search');
        if (input) {
            input.focus();
            input.setSelectionRange(val.length, val.length);
        }
    }
};

window.addEmployeePrompt = () => {
    showModal(modalForm('إضافة موظف جديد', `
        <div class="space-y-5">
            ${modalInput('الاسم الثنائي', 'emp-name', 'أدخل الاسم...')}
            ${modalInput('المسمى الوظيفي', 'emp-role', 'Product Designer')}
        </div>
    `, 'توظيف الآن', 'submitNewEmployee()'));
};

window.submitNewEmployee = () => {
    const name = document.getElementById('emp-name').value;
    const role = document.getElementById('emp-role').value;

    if (!name || !role) return alert('يرجى إكمال البيانات');

    storage.addEmployee({
        name,
        role,
        status: 'نشط',
        statusClass: 'bg-green-100 text-green-600'
    });
    closeModal();
    showToast('تمت إضافة الموظف بنجاح');
    navigateTo('hr');
};

window.deleteEmployee = (id) => {
    if (confirm('حذف الموظف من السجل؟')) {
        storage.deleteEmployee(id);
        showToast('تم حذف سجل الموظف');
        navigateTo('hr');
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = change.includes('+') || change === 'Active';
    return `
        <div class="premium-card !p-6 group">
            <div class="flex justify-between items-start mb-5">
                <div class="w-11 h-11 rounded-xl ${color}/10 flex items-center justify-center ${color.replace('bg-', 'text-')} transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path></svg>
                </div>
                <div class="px-2.5 py-1 rounded-lg ${isPositive ? 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600' : 'bg-rose-50 dark:bg-rose-400/10 text-rose-600'} text-[0.75rem] font-bold">
                    ${change}
                </div>
            </div>
            <div>
                <div class="text-[0.75rem] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">${title}</div>
                <div class="text-2xl font-semibold text-slate-800 dark:text-white font-nums leading-none">${value}</div>
            </div>
        </div>
    `;
}

function employeeRow(id, name, role, status, statusClass) {
    return `
        <div class="p-6 border border-slate-50 dark:border-vision-border rounded-3xl hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-all flex items-center justify-between group animate-enter">
            <div class="flex items-center gap-6">
                <div class="w-14 h-14 rounded-2xl bg-vision-gold/5 border border-vision-gold/10 flex items-center justify-center text-vision-gold font-black text-lg transition-transform group-hover:scale-105">${name[0]}</div>
                <div>
                    <div class="text-[1.0625rem] font-bold text-slate-900 dark:text-white mb-0.5">${name}</div>
                    <div class="text-[0.8125rem] text-slate-500 font-medium uppercase tracking-tighter">${role}</div>
                </div>
            </div>
            <div class="flex items-center gap-8">
                <span class="${statusClass} px-3.5 py-1.5 rounded-xl text-[0.75rem] font-bold uppercase tracking-wider">${status}</span>
                <div class="flex gap-2">
                    <button class="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-300 hover:text-vision-gold transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button onclick="deleteEmployee(${id})" class="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-300 hover:text-rose-500 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}
