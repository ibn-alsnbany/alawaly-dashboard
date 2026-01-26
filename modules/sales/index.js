import { i18n } from '../../core/i18n.js';
import { storage } from '../../core/storage.js';

let salesSearchQuery = '';

export const salesModule = {
    render: () => {
        let orders = storage.getOrders();

        if (salesSearchQuery) {
            const q = salesSearchQuery.toLowerCase();
            orders = orders.filter(ord =>
                ord.customer.toLowerCase().includes(q) ||
                ord.id.toString().toLowerCase().includes(q)
            );
        }
        return `
            <div class="mb-8 flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold mb-1 text-slate-800 dark:text-white">${i18n.t('sales')}</h1>
                    <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('salesSubtitle') || 'تتبع المبيعات والطلبات والنمو السنوي.'}</p>
                </div>
                <button onclick="addOrderPrompt()" class="bg-vision-gold text-white px-6 py-3 rounded-2xl font-bold text-[0.875rem] shadow-xl shadow-vision-gold/20 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                    <span>طلب جديد</span>
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10 w-full">
                ${statCard(i18n.t('orders'), `<span class="font-nums">1,840</span>`, `<span class="font-nums">+10%</span>`, 'bg-vision-gold', 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z')}
                ${statCard(i18n.t('customers'), `<span class="font-nums">12,500</span>`, `<span class="font-nums">+3%</span>`, 'bg-vision-gold', 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z')}
                ${statCard(i18n.t('averageOrder'), `<span class="font-nums">250</span> ` + currencyIcon(), `<span class="font-nums">Stable</span>`, 'bg-vision-gold', 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z')}
                ${statCard(i18n.t('totalSales'), `<span class="font-nums">460,000</span> ` + currencyIcon(), `<span class="font-nums">+12%</span>`, 'bg-vision-gold', 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6')}
            </div>
            
            <div class="premium-card !p-6">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200">${i18n.t('recentOrders')}</h3>
                    <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                        <svg class="w-4.5 h-4.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input type="text" id="sales-search" oninput="handleSalesSearch(this.value)" value="${salesSearchQuery}" placeholder="بحث في الطلبات..." class="bg-transparent border-none text-[0.8125rem] focus:ring-0 w-48 text-slate-700 dark:text-slate-300 font-medium outline-none">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    ${orders.map(ord => orderCard(ord.id, ord.customer, ord.amount, ord.status, ord.statusClass)).join('')}
                    ${orders.length === 0 ? `<div class="col-span-2 text-center py-10 text-slate-400 font-bold">لا يوجد نتائج</div>` : ''}
                </div>
            </div>
        `;
    }
};

window.handleSalesSearch = (val) => {
    salesSearchQuery = val;
    const container = document.getElementById('module-container');
    if (container) {
        container.innerHTML = salesModule.render();
        const input = document.getElementById('sales-search');
        if (input) {
            input.focus();
            input.setSelectionRange(val.length, val.length);
        }
    }
};

window.addOrderPrompt = () => {
    showModal(modalForm('إنشاء طلب جديد', `
        <div class="space-y-5">
            ${modalInput('اسم العميل', 'ord-customer', 'أدخل اسم العميل...')}
            ${modalInput('اجمالي الطلب', 'ord-amount', '0.00', 'number')}
        </div>
    `, 'تأكيد الطلب', 'submitNewOrder()'));
};

window.submitNewOrder = () => {
    const customer = document.getElementById('ord-customer').value;
    const amount = document.getElementById('ord-amount').value;

    if (!customer || !amount) return alert('يرجى إدخال كافة البيانات لإتمام عملية التسجيل');

    storage.addOrder({
        id: '#ORD-' + Math.floor(400 + Math.random() * 100),
        customer,
        amount: Number(amount).toLocaleString(),
        status: 'قيد المعالجة',
        statusClass: 'bg-blue-50 text-blue-600'
    });
    closeModal();
    showToast('تم تسجيل الطلب في النظام وتحديث القائمة');
    refreshModule();
};

window.deleteOrderItem = (id) => {
    if (confirm('حذف هذا الطلب؟')) {
        storage.deleteOrder(id);
        showToast('تم إلغاء الطلب بنجاح');
        refreshModule();
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = change.includes('+');
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
                <div class="text-2xl font-semibold text-slate-800 dark:text-white tracking-tight font-nums leading-none">${value}</div>
            </div>
        </div>
    `;
}

function orderCard(id, customer, amount, status, statusClass) {
    return `
        <div class="p-6 border border-slate-50 dark:border-vision-border rounded-3xl hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-all flex items-center justify-between group animate-enter">
            <div class="flex items-center gap-5">
                <div class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 font-bold text-lg">${customer[0]}</div>
                <div>
                    <div class="text-[0.875rem] font-bold text-slate-900 dark:text-white font-nums">${id}</div>
                    <div class="text-[0.75rem] text-slate-500 font-medium">${customer}</div>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="text-right">
                    <div class="text-[1.0625rem] font-bold text-vision-gold mb-1 font-nums">${amount} ${currencyIcon()}</div>
                    <span class="${statusClass} px-3.5 py-1.5 rounded-xl text-[0.75rem] font-bold uppercase tracking-wider">${status}</span>
                </div>
                <button onclick="deleteOrderItem('${id}')" class="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-rose-50 text-slate-300 hover:text-rose-500 transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </div>
    `;
}
