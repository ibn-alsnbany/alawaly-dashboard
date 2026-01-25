import { i18n } from '../../core/i18n.js';

export const usersModule = {
    render: () => {
        return `
            <div class="mb-6 flex justify-between items-end">
                <div>
                    <h1 class="text-2xl font-black mb-0.5">${i18n.t('users')}</h1>
                    <p class="text-slate-400 text-[12px] font-medium">إدارة الكوادر البشرية وتوزيع الصلاحيات البرمجية.</p>
                </div>
                <button class="bg-vision-gold text-white px-5 py-2 rounded-xl font-black text-[11px] shadow-xl shadow-vision-gold/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                    ${i18n.t('addUser')}
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
                
                <!-- Main Users Table Context (3/4) -->
                <div class="lg:col-span-3 premium-card !p-6">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <h3 class="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">قائمة الكوادر</h3>
                            <span class="bg-vision-gold/10 text-vision-gold text-[9px] font-black px-2 py-0.5 rounded-full">48 موظف</span>
                        </div>
                        <div class="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
                            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input type="text" placeholder="${i18n.t('searchUsers')}" class="bg-transparent border-none text-[11px] focus:ring-0 w-40 text-slate-600 dark:text-slate-300 font-medium outline-none">
                        </div>
                    </div>

                    <div class="space-y-2">
                        ${userDetailRow('أحمد عبدالله', 'mohammed@alawaly.sa', 'Administrator', 'التقنية', 'active', 'bg-blue-50 dark:bg-blue-500/10 text-blue-600')}
                        ${userDetailRow('سارة علي', 'sara@alawaly.sa', 'Product Manager', 'التسويق', 'active', 'bg-purple-50 dark:bg-purple-500/10 text-purple-600')}
                        ${userDetailRow('خالد الحربي', 'khaled@alawaly.sa', 'Data Analyst', 'المالية', 'away', 'bg-orange-50 dark:bg-orange-500/10 text-orange-600')}
                        ${userDetailRow('نورة السويدي', 'noura@alawaly.sa', 'HR Lead', 'الموارد', 'active', 'bg-green-50 dark:bg-green-500/10 text-green-600')}
                    </div>
                </div>

                <!-- Workforce Presence Card (1/4) -->
                <div class="lg:col-span-1 flex flex-col gap-4">
                    <div class="premium-card !p-5 bg-rose-50/10 border-rose-100/20">
                        <h3 class="text-xs font-black text-rose-500 mb-4 flex items-center gap-2">
                            <div class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                            المتغيبين عن العمل
                        </h3>
                        <div class="space-y-4">
                            ${absenceItem('فهد العتيبي', 'إجازة مرضية', 'bg-rose-500')}
                            ${absenceItem('ليلى محمد', 'غير مسجل', 'bg-slate-400')}
                            ${absenceItem('بندر القحطاني', 'تأخر رسمي', 'bg-amber-500')}
                        </div>
                        <button class="w-full mt-6 py-2 rounded-lg bg-rose-500/5 hover:bg-rose-500/10 text-[9px] font-black text-rose-600 transition-colors border border-rose-500/10 uppercase tracking-tighter">سجل الغياب الكامل</button>
                    </div>

                    <div class="premium-card !p-5 overflow-hidden">
                        <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">توزيع الأقسام</h3>
                        <div class="space-y-2">
                            ${deptStats('التقنية', 40, 'bg-blue-500')}
                            ${deptStats('المالية', 25, 'bg-emerald-500')}
                            ${deptStats('الموارد', 35, 'bg-vision-gold')}
                        </div>
                    </div>
                </div>

            </div>
        `;
    }
};

function userDetailRow(name, email, role, dept, status, roleClass) {
    const statusColor = status === 'active' ? 'bg-green-500' : 'bg-slate-300';
    return `
        <div class="flex items-center justify-between p-3 bg-slate-50/30 dark:bg-slate-800/20 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 group">
            <div class="flex items-center gap-4 flex-1">
                <div class="w-10 h-10 rounded-xl bg-vision-gold text-slate-900 flex items-center justify-center font-black text-base shadow-lg shadow-vision-gold/10 relative shrink-0">
                    ${name[0]}
                    <span class="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 border-2 border-white dark:border-slate-800 rounded-full ${statusColor}"></span>
                </div>
                <div class="flex flex-col min-w-0">
                    <div class="text-[12px] font-black group-hover:text-vision-gold transition-colors truncate">${name}</div>
                    <div class="text-[9px] text-slate-400 font-bold tracking-tight truncate">${email}</div>
                </div>
            </div>
            
            <div class="flex items-center gap-4 w-1/2 justify-end">
                <div class="hidden md:flex flex-col text-end items-end gap-1">
                    <span class="text-[10px] font-black text-slate-600 dark:text-slate-300">${dept}</span>
                    <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">${role}</span>
                </div>
                <div class="w-px h-6 bg-slate-100 dark:bg-slate-700 hidden md:block"></div>
                <button class="p-1.5 rounded-lg bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600 text-slate-400 hover:text-vision-gold transition-all">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                </button>
            </div>
        </div>
    `;
}

function absenceItem(name, reason, color) {
    return `
        <div class="flex items-center justify-between group">
            <div class="flex items-center gap-3">
                <div class="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:text-rose-500 transition-colors">${name[0]}</div>
                <div class="flex flex-col">
                    <span class="text-[11px] font-bold opacity-90">${name}</span>
                    <span class="text-[8px] font-bold text-slate-400">${reason}</span>
                </div>
            </div>
            <div class="w-1.5 h-1.5 rounded-full ${color}"></div>
        </div>
    `;
}

function deptStats(label, val, color) {
    return `
        <div class="space-y-1">
            <div class="flex justify-between text-[9px] font-bold mb-1">
                <span class="text-slate-500">${label}</span>
                <span class="font-black">${val}%</span>
            </div>
            <div class="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full ${color}" style="width: ${val}%"></div>
            </div>
        </div>
    `;
}
