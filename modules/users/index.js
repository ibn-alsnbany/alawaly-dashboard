import { i18n } from '../../core/i18n.js';

export const usersModule = {
    render: () => {
        return `
            <div class="mb-8 flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold text-slate-800 dark:text-white mb-2">${i18n.t('users')}</h1>
                    <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">إدارة الكوادر البشرية وتوزيع الصلاحيات البرمجية.</p>
                </div>
                <button class="bg-vision-gold text-white px-6 py-3 rounded-2xl font-bold text-[0.875rem] shadow-xl shadow-vision-gold/20 hover:-translate-y-1 transition-all flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                    ${i18n.t('addUser')}
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
                <!-- User List Section (3/4) -->
                <div class="lg:col-span-3 premium-card !p-8">
                    <div class="flex items-center justify-between mb-10">
                        <div class="flex items-center gap-4">
                            <h3 class="text-xl font-bold text-slate-800 dark:text-white leading-none">قائمة الكوادر</h3>
                            <span class="bg-vision-gold/10 text-vision-gold text-[0.8125rem] font-bold px-3 py-1 rounded-full font-nums">48 موظف</span>
                        </div>
                        <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                            <svg class="w-4.5 h-4.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input type="text" placeholder="${i18n.t('searchUsers')}" class="bg-transparent border-none text-[0.875rem] focus:ring-0 w-48 text-slate-700 dark:text-slate-300 font-medium outline-none">
                        </div>
                    </div>

                    <div class="space-y-4">
                        ${userRow('أحمد عبدالله', 'ahmed@vision.sa', 'IT Department', 'Developer', 'bg-emerald-500')}
                        ${userRow('سارة محمد', 'sara@vision.sa', 'Marketing', 'Lead', 'bg-blue-500')}
                        ${userRow('فيصل بن علي', 'faisal@vision.sa', 'HR Office', 'Manager', 'bg-amber-500')}
                        ${userRow('نورة السعد', 'noura@vision.sa', 'Finance', 'Analyst', 'bg-purple-500')}
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

function userRow(name, email, dept, role, statusColor) {
    return `
        <div class="p-5 border border-slate-50 dark:border-vision-border rounded-3xl hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-all flex items-center justify-between group">
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
                <button class="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-vision-gold transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
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
