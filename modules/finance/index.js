import { i18n } from '../../core/i18n.js';
import { storage } from '../../core/storage.js';

let financeSearchQuery = '';

export const financeModule = {
    render: () => {
        let invoices = storage.getInvoices();

        // Helpers
        const translateStatus = (s) => {
            const map = { 'Paid': 'paid', 'Pending': 'pending', 'Overdue': 'overdue' };
            return i18n.t(map[s] || s);
        };
        const translateCustomer = (c) => {
            const map = { 'Al-Amal Company': 'hopeCompany', 'Riyadh Organization': 'riyadhOrg', 'Al-Wafa Store': 'wafaStore' };
            return i18n.t(map[c] || c);
        };

        if (financeSearchQuery) {
            const q = financeSearchQuery.toLowerCase();
            invoices = invoices.filter(inv =>
                inv.customer.toLowerCase().includes(q) ||
                inv.id.toString().toLowerCase().includes(q)
            );
        }
        return `
            <div class="mb-8 flex justify-between items-end">
                <div>
                    <h1 class="text-2xl font-bold mb-1 text-slate-800 dark:text-white">${i18n.t('finance')}</h1>
                    <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('financeSubtitle')}</p>
                </div>
                <button onclick="addInvoicePrompt()" class="bg-vision-gold text-white px-6 py-3 rounded-2xl font-bold text-[0.875rem] shadow-xl shadow-vision-gold/20 hover:-translate-y-1 active:scale-95 transition-all">+ ${i18n.t('newInvoice')}</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10 w-full">
                ${statCard(i18n.t('revenue'), `<span class="font-nums">${formatCurrency('450,000')}</span>`, `<span class="font-nums">-8%</span>`, 'bg-vision-gold', 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z')}
                ${statCard(i18n.t('profit'), `<span class="font-nums">${formatCurrency('120,500')}</span>`, `<span class="font-nums">+15%</span>`, 'bg-vision-gold', 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3')}
                ${statCard(i18n.t('expenses'), `<span class="font-nums">${formatCurrency('330,000')}</span>`, `<span class="font-nums">-5%</span>`, 'bg-vision-gold', 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z')}
                ${statCard(i18n.t('payments'), `<span class="font-nums">85</span>`, `<span class="font-nums">${i18n.t('stable')}</span>`, 'bg-vision-gold', 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2')}
            </div>
            
            <div class="premium-card !p-6">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200">${i18n.t('invoices')}</h3>
                    <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input type="text" id="finance-search" oninput="handleFinanceSearch(this.value)" value="${financeSearchQuery}" placeholder="${i18n.t('searchInvoices')}" class="bg-transparent border-none text-[0.8125rem] focus:ring-0 w-48 text-slate-700 dark:text-slate-300 font-medium outline-none">
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-start">
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
                                <tr><td colspan="4" class="py-12 text-center text-slate-400 font-bold">${i18n.t('noInvoices')}</td></tr>
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
    const customer = document.getElementById('inv-customer').value.trim();
    const amount = document.getElementById('inv-amount').value;
    const date = document.getElementById('inv-date').value;

    if (!customer) {
        showToast('⚠️ يرجى إدخال اسم العميل');
        return;
    }
    if (!amount || Number(amount) <= 0) {
        showToast('⚠️ يرجى إدخال مبلغ صحيح');
        return;
    }

    const newInvoice = {
        id: `INV-${Date.now()}`,
        customer,
        amount: Number(amount).toLocaleString(),
        date: date || new Date().toISOString().split('T')[0],
        status: 'Pending',
        statusClass: 'bg-amber-50 text-amber-600'
    };

    storage.addInvoice(newInvoice);
    closeModal();
    showToast('✅ تم إصدار الفاتورة بنجاح');
    refreshModule();
};


window.editInvoicePrompt = (id) => {
    const inv = storage.getInvoices().find(i => i.id === id);
    if (!inv) return;

    showModal(modalForm(i18n.t('editInvoice'), `
    <div class="space-y-5 text-start">
        ${modalInput(i18n.t('customerName'), 'inv-customer', i18n.t('enterCompanyName'), 'text')}
        <div class="grid grid-cols-2 gap-4">
            ${modalInput(`${i18n.t('amount')} (SAR)`, 'inv-amount', '0.00', 'number')}
            ${modalInput(i18n.t('dueDate'), 'inv-date', '', 'date')}
        </div>
        <input type="hidden" id="inv-id" value="${id}">
    </div>
    `, i18n.t('saveChanges'), 'submitUpdateInvoice()'));

    // Fill values
    document.getElementById('inv-customer').value = inv.customer;
    document.getElementById('inv-amount').value = inv.amount.replace(/,/g, '');
    document.getElementById('inv-date').value = inv.date;
};

window.submitUpdateInvoice = () => {
    const id = document.getElementById('inv-id').value;
    const customer = document.getElementById('inv-customer').value;
    const amount = document.getElementById('inv-amount').value;
    const date = document.getElementById('inv-date').value;

    if (!customer || !amount) return alert('يرجى إكمال البيانات');

    storage.updateInvoice(id, {
        customer,
        amount: Number(amount).toLocaleString(),
        date
    });
    closeModal();
    showToast(`✅ ${i18n.t('invoiceUpdated')}`);
    refreshModule();
};

window.viewInvoice = (id) => {
    const inv = storage.getInvoices().find(i => i.id === id);
    if (!inv) return;

    // Helpers
    const translateCustomer = (c) => {
        const map = { 'Al-Amal Company': 'hopeCompany', 'Riyadh Organization': 'riyadhOrg', 'Al-Wafa Store': 'wafaStore' };
        return i18n.t(map[c] || c);
    };

    showModal(`
        <div class="premium-card !p-8 md:!p-10 shadow-2xl relative w-full max-w-lg mx-auto animate-enter text-start">
            <button onclick="closeModal()" class="absolute top-8 left-8 p-2 text-slate-400 hover:text-rose-500 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div class="mb-10 text-center">
                <div class="w-20 h-20 bg-vision-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-vision-gold">
                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <h3 class="text-2xl font-bold text-slate-800 dark:text-white capitalize">${inv.id}</h3>
                <p class="text-slate-500 font-medium">${i18n.t('invoiceDetails')}</p>
            </div>
            
            <div class="space-y-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50 mb-8">
                <div class="flex justify-between">
                    <span class="text-slate-400 font-bold uppercase text-[0.75rem] tracking-widest">${i18n.t('customer')}</span>
                    <span class="text-slate-700 dark:text-slate-200 font-bold">${translateCustomer(inv.customer)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-slate-400 font-bold uppercase text-[0.75rem] tracking-widest">${i18n.t('dueDate')}</span>
                    <span class="text-slate-700 dark:text-slate-200 font-nums font-bold">${inv.date}</span>
                </div>
                <div class="flex justify-between border-t border-slate-100 dark:border-slate-700 pt-4">
                    <span class="text-slate-400 font-bold uppercase text-[0.75rem] tracking-widest">${i18n.t('amount')}</span>
                    <span class="text-vision-gold font-bold text-xl font-nums">${formatCurrency(inv.amount)}</span>
                </div>
            </div>

            <div class="flex gap-4">
                <button onclick="editInvoicePrompt('${inv.id}')" class="flex-1 bg-vision-gold text-white py-4 rounded-2xl font-bold text-[0.875rem] shadow-xl shadow-vision-gold/20 hover:brightness-110">${i18n.t('editData')}</button>
                <button onclick="closeModal()" class="px-8 bg-slate-100 dark:bg-slate-800 text-slate-500 py-4 rounded-2xl font-bold text-[0.875rem]">${i18n.t('close')}</button>
            </div>
        </div>
    `);
};

window.deleteInvoice = (id) => {
    if (confirm(i18n.t('confirmDeleteUser') || 'هل أنت متأكد من حذف هذه الفاتورة؟')) {
        storage.deleteInvoice(id);
        showToast('🗑️ تم حذف الفاتورة');
        refreshModule();
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = change.includes('+');
    const isNegative = change.includes('-');
    const colorClasses = isPositive
        ? 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600'
        : (isNegative ? 'bg-rose-50 dark:bg-rose-400/10 text-rose-600' : 'bg-amber-50 dark:bg-amber-400/10 text-amber-600');

    return `
        <div class="premium-card !p-6 group">
            <div class="flex justify-between items-start mb-5">
                <div class="w-11 h-11 rounded-xl ${color}/10 flex items-center justify-center ${color.replace('bg-', 'text-')} transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path></svg>
                </div>
                <div class="px-2.5 py-1 rounded-lg ${colorClasses} text-[0.75rem] font-bold">
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
    const translateStatus = (s) => {
        const map = { 'Paid': 'paid', 'Pending': 'pending', 'Overdue': 'overdue' };
        return i18n.t(map[s] || s);
    };
    const translateCustomer = (c) => {
        const map = { 'Al-Amal Company': 'hopeCompany', 'Riyadh Organization': 'riyadhOrg', 'Al-Wafa Store': 'wafaStore' };
        return i18n.t(map[c] || c);
    };
    return `
        <tr class="hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-colors group text-start">
            <td class="py-6 px-5 text-[0.875rem] font-bold text-slate-700 dark:text-slate-200 font-nums">${id}</td>
            <td class="py-6 px-5 text-[0.875rem] font-medium text-slate-600 dark:text-slate-300">${translateCustomer(customer)}</td>
            <td class="py-6 px-5 text-[0.875rem] font-semibold text-vision-gold font-nums">${formatCurrency(amount)}</td>
            <td class="py-6 px-5">
                <div class="flex items-center justify-between">
                    <span class="${statusClass} px-3.5 py-1.5 rounded-xl text-[0.75rem] font-bold uppercase tracking-wider">${translateStatus(status)}</span>
                    <div class="flex items-center gap-2 transition-all">
                        <button onclick="viewInvoice('${id}')" class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-500 hover:border-blue-200 dark:hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all shadow-sm" title="${i18n.t('viewDetails')}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </button>
                        <button onclick="editInvoicePrompt('${id}')" class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-vision-gold hover:border-vision-gold/30 hover:bg-amber-50 dark:hover:bg-vision-gold/10 transition-all shadow-sm" title="${i18n.t('edit')}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button onclick="deleteInvoice('${id}')" class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-500/30 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all shadow-sm" title="حذف">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    `;
}
