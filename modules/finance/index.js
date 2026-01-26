import { i18n } from '../../core/i18n.js';
import { storage } from '../../core/storage.js';

let financeSearchQuery = '';

export const financeModule = {
    render: () => {
        let invoices = storage.getInvoices();

        if (financeSearchQuery) {
            const q = financeSearchQuery.toLowerCase();
            invoices = invoices.filter(inv =>
                inv.customer.toLowerCase().includes(q) ||
                inv.id.toString().toLowerCase().includes(q)
            );
        }
        return `
            <div class="mb-8">
                <h1 class="text-2xl font-bold mb-1 text-slate-800 dark:text-white">${i18n.t('finance')}</h1>
                <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('financeSubtitle') || 'إدارة التدفقات المالية والميزانيات.'}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10 w-full">
                ${statCard(i18n.t('revenue'), `<span class="font-nums">450,000</span> ` + currencyIcon(), `<span class="font-nums">+8%</span>`, 'bg-vision-gold', 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z')}
                ${statCard(i18n.t('profit'), `<span class="font-nums">120,500</span> ` + currencyIcon(), `<span class="font-nums">+15%</span>`, 'bg-vision-gold', 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3')}
                ${statCard(i18n.t('expenses'), `<span class="font-nums">330,000</span> ` + currencyIcon(), `<span class="font-nums">-5%</span>`, 'bg-vision-gold', 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z')}
                ${statCard(i18n.t('payments'), `<span class="font-nums">85</span>`, `<span class="font-nums">Stable</span>`, 'bg-vision-gold', 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2')}
            </div>
            
            <div class="premium-card !p-6">
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center gap-4">
                        <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200">${i18n.t('invoices')}</h3>
                        <button onclick="addInvoicePrompt()" class="bg-vision-gold text-white px-5 py-2 rounded-xl font-bold text-[0.75rem] shadow-lg shadow-vision-gold/10 hover:-translate-y-0.5 active:scale-95 transition-all">+ ${i18n.t('newInvoice')}</button>
                    </div>
                    <div class="flex gap-4">
                        <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input type="text" id="finance-search" oninput="handleFinanceSearch(this.value)" value="${financeSearchQuery}" placeholder="بحث في الفواتير..." class="bg-transparent border-none text-[0.75rem] focus:ring-0 w-40 text-slate-700 dark:text-slate-300 font-medium outline-none">
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-right">
                        <thead class="text-[0.75rem] uppercase font-bold text-slate-500 border-b border-slate-50 dark:border-vision-border">
                            <tr>
                                <th class="pb-5 px-5">${i18n.t('id')}</th>
                                <th class="pb-5 px-5">${i18n.t('customer')}</th>
                                <th class="pb-5 px-5">${i18n.t('amount')}</th>
                                <th class="pb-5 px-5 font-center">${i18n.t('status')}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 dark:divide-vision-border">
                            ${invoices.length > 0 ? invoices.map(inv => row(inv.id, inv.customer, inv.amount, inv.status, inv.statusClass)).join('') : `
                                <tr><td colspan="4" class="py-12 text-center text-slate-400 font-bold">لا يوجد فواتير مطابقة</td></tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
};

window.handleFinanceSearch = (val) => {
    financeSearchQuery = val;
    const container = document.getElementById('module-container');
    if (container) {
        container.innerHTML = financeModule.render();
        const input = document.getElementById('finance-search');
        if (input) {
            input.focus();
            input.setSelectionRange(val.length, val.length);
        }
    }
};

window.addInvoicePrompt = () => {
    showModal(modalForm('فاتورة جديدة', `
        <div class="space-y-5">
            ${modalInput('اسم العميل', 'inv-customer', 'اسم الشركة أو المنشأة...')}
            <div class="grid grid-cols-2 gap-4">
                ${modalInput('المبلغ (SAR)', 'inv-amount', '0.00', 'number')}
                ${modalInput('تاريخ الاستحقاق', 'inv-date', '', 'date')}
            </div>
        </div>
    `, 'إصدار الفاتورة', 'submitNewInvoice()'));
};

window.submitNewInvoice = () => {
    const customer = document.getElementById('inv-customer').value;
    const amount = document.getElementById('inv-amount').value;
    const date = document.getElementById('inv-date').value || new Date().toISOString().split('T')[0];

    if (!customer || !amount) return alert('يرجى إكمال البيانات');

    storage.addInvoice({
        id: 'INV-' + Math.floor(100 + Math.random() * 900),
        customer,
        amount: Number(amount).toLocaleString(),
        date,
        status: 'Pending',
        statusClass: 'bg-amber-50 text-amber-600'
    });
    closeModal();
    showToast('تم إصدار الفاتورة بنجاح');
    navigateTo('finance');
};

window.deleteInvoice = (id) => {
    if (confirm('حذف الفاتورة؟')) {
        storage.deleteInvoice(id);
        showToast('تم حذف الفاتورة بنجاح');
        navigateTo('finance');
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = !change.includes('-') && !change.includes('Stable');
    return `
        <div class="premium-card !p-6 group">
            <div class="flex justify-between items-start mb-5">
                <div class="w-11 h-11 rounded-xl ${color}/10 flex items-center justify-center ${color.replace('bg-', 'text-')} transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path></svg>
                </div>
                <div class="px-2.5 py-1 rounded-lg ${isPositive ? 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600' : (change.includes('Stable') ? 'bg-slate-50 dark:bg-slate-800/10 text-slate-500' : 'bg-rose-50 dark:bg-rose-400/10 text-rose-600')} text-[0.75rem] font-bold">
                    ${change}
                </div>
            </div>
            <div>
                <div class="text-[0.75rem] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">${title}</div>
                <div class="text-2xl font-semibold text-slate-800 dark:text-white tracking-normal font-nums leading-none">${value}</div>
            </div>
        </div>
    `;
}

function row(id, customer, amount, status, statusClass) {
    return `
        <tr class="hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-colors group">
            <td class="py-6 px-5 text-[0.875rem] font-bold text-slate-700 dark:text-slate-200 font-nums">${id}</td>
            <td class="py-6 px-5 text-[0.875rem] font-medium text-slate-600 dark:text-slate-300">${customer}</td>
            <td class="py-6 px-5 text-[0.875rem] font-semibold text-vision-gold font-nums">${amount} ${currencyIcon()}</td>
            <td class="py-6 px-5 flex items-center justify-between">
                <span class="${statusClass} px-3.5 py-1.5 rounded-xl text-[0.75rem] font-bold uppercase tracking-wider">${status}</span>
                <button onclick="deleteInvoice('${id}')" class="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-rose-50 text-slate-300 hover:text-rose-500 transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </td>
        </tr>
    `;
}
