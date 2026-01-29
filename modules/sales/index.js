import { apiService } from '../../core/apiService.js';

let salesSearchQuery = '';

// Helper function to translate status labels
function translateStatus(status) {
    const s = status.toLowerCase();
    const statusMap = {
        'processing': 'processing',
        'completed': 'completed',
        'cancelled': 'cancelled',
        'paid': 'paid',
        'pending': 'pending',
        'overdue': 'overdue'
    };
    return i18n.t(statusMap[s] || s);
}

export const salesModule = {
    render: async () => {
        let orders = await apiService.getOrders();

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
                    <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('salesSubtitle')}</p>
                </div>
                <button onclick="addOrderPrompt()" class="bg-vision-gold text-white px-6 py-3 rounded-2xl font-bold text-[0.875rem] shadow-xl shadow-vision-gold/20 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                    <span>${i18n.t('newOrder')}</span>
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10 w-full">
                ${await (async () => {
                const allOrders = await apiService.getOrders();
                const totalQty = allOrders.reduce((acc, o) => acc + (o.quantity || 1), 0);
                return statCard(i18n.t('orders'), `<span class="font-nums">${allOrders.length}</span>`, `<span class="font-nums">+${totalQty} items</span>`, 'bg-vision-gold', 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z');
            })()}
                ${await (async () => {
                const allOrders = await apiService.getOrders();
                const customers = new Set(allOrders.map(o => o.customer)).size;
                return statCard(i18n.t('customers'), `<span class="font-nums">${customers}</span>`, `<span class="font-nums">Loyal</span>`, 'bg-vision-gold', 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z');
            })()}
                ${await (async () => {
                const allOrders = await apiService.getOrders();
                const total = allOrders.reduce((acc, o) => acc + parseFloat(o.amount.replace(/,/g, '')), 0);
                const avg = allOrders.length > 0 ? total / allOrders.length : 0;
                return statCard(i18n.t('averageOrder'), `<span class="font-nums">${formatCurrency(Math.round(avg).toLocaleString())}</span>`, `<span class="font-nums">${i18n.t('stable')}</span>`, 'bg-vision-gold', 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z');
            })()}
                ${await (async () => {
                const allOrders = await apiService.getOrders();
                const total = allOrders.reduce((acc, o) => acc + parseFloat(o.amount.replace(/,/g, '')), 0);
                return statCard(i18n.t('totalSales'), `<span class="font-nums">${formatCurrency(total.toLocaleString())}</span>`, `<span class="font-nums">Dynamic</span>`, 'bg-vision-gold', 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6');
            })()}
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 premium-card !p-6">
                    <div class="flex items-center justify-between mb-8">
                        <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200">${i18n.t('recentOrders')}</h3>
                        <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input type="text" id="sales-search" oninput="handleSalesSearch(this.value)" value="${salesSearchQuery}" placeholder="${i18n.t('searchOrders')}" class="bg-transparent border-none text-[0.8125rem] focus:ring-0 w-48 text-slate-700 dark:text-slate-300 font-medium outline-none">
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-start">
                            <thead class="text-[0.75rem] uppercase font-bold text-slate-500 border-b border-slate-50 dark:border-vision-border">
                                <tr>
                                    <th class="pb-5 px-5 text-start">${i18n.t('id')}</th>
                                    <th class="pb-5 px-5 text-start">${i18n.t('customer')}</th>
                                    <th class="pb-5 px-5 text-start">${i18n.t('amount')}</th>
                                    <th class="pb-5 px-5 text-start">${i18n.t('status')}</th>
                                    <th class="pb-5 px-5 text-end">${i18n.lang === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-50 dark:divide-vision-border">
                                ${orders.length > 0 ? orders.map(ord => orderRow(ord.id, ord.customer, ord.amount, ord.status, ord.statusClass)).join('') : `
                                    <tr><td colspan="5" class="py-12 text-center text-slate-400 font-bold">${i18n.t('noResults')}</td></tr>
                                `}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="lg:col-span-1 space-y-6">
                    <div class="premium-card !p-6 bg-gradient-to-br from-emerald-600 to-teal-700 border-none text-white">
                        <h3 class="text-lg font-bold mb-6">${i18n.lang === 'ar' ? 'ملخص المبيعات' : 'Sales Summary'}</h3>
                        <div class="space-y-4">
                            ${await (async () => {
                const allOrders = await apiService.getOrders();
                const processingCount = allOrders.filter(o => o.status === 'Processing').length;
                const completedCount = allOrders.filter(o => o.status === 'Completed').length;
                const totalRevenue = allOrders.reduce((acc, o) => acc + parseFloat(o.amount.replace(/,/g, '')), 0);

                return `
                                    <div class="flex justify-between items-center opacity-90">
                                        <span class="text-sm font-medium">${i18n.lang === 'ar' ? 'طلبات قيد المعالجة' : 'Orders Processing'}</span>
                                        <span class="font-nums font-bold">${processingCount}</span>
                                    </div>
                                    <div class="flex justify-between items-center opacity-90">
                                        <span class="text-sm font-medium">${i18n.lang === 'ar' ? 'طلبات مكتملة' : 'Orders Completed'}</span>
                                        <span class="font-nums font-bold">${completedCount}</span>
                                    </div>
                                    <div class="pt-4 border-t border-white/10 flex justify-between items-center">
                                        <span class="text-sm font-bold">${i18n.lang === 'ar' ? 'إجمالي المبيعات' : 'Total Revenue'}</span>
                                        <span class="text-lg font-bold font-nums">${formatCurrency(totalRevenue.toLocaleString())}</span>
                                    </div>
                                `;
            })()}
                        </div>
                    </div>

                    <div class="premium-card !p-6">
                        <h3 class="text-[0.9375rem] font-bold mb-4 text-slate-700 dark:text-slate-200">${i18n.lang === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}</h3>
                        <div class="grid grid-cols-1 gap-3">
                            <button onclick="addOrderPrompt()" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-vision-gold/5 dark:hover:bg-vision-gold/10 transition-all group border border-transparent hover:border-vision-gold/20">
                                <div class="w-10 h-10 rounded-lg bg-vision-gold/10 flex items-center justify-center text-vision-gold group-hover:scale-110 transition-transform">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                                </div>
                                <span class="text-[0.8125rem] font-bold text-slate-600 dark:text-slate-300">${i18n.t('newOrder')}</span>
                            </button>
                            <button onclick="navigateTo('analytics')" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10 transition-all group border border-transparent hover:border-indigo-500/20">
                                <div class="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                </div>
                                <span class="text-[0.8125rem] font-bold text-slate-600 dark:text-slate-300">${i18n.t('analytics')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

window.handleSalesSearch = async (val) => {
    salesSearchQuery = val;
    const container = document.getElementById('module-container');
    if (container) {
        container.innerHTML = await salesModule.render();
        const input = document.getElementById('sales-search');
        if (input) {
            input.focus();
            input.setSelectionRange(val.length, val.length);
        }
    }
};

window.addOrderPrompt = async () => {
    const products = await apiService.getProducts();
    const productOptions = products.map(p => `<option value="${p.id}" data-price="${p.price.replace(/,/g, '')}">${p.name} (${p.price} SAR)</option>`).join('');

    showModal(modalForm(i18n.t('createNewOrder'), `
        <div class="space-y-5 text-start">
            ${modalInput(i18n.t('customerName'), 'ord-customer', i18n.t('enterCustomerName'))}
            <div class="space-y-2">
                <label class="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest ps-1">${i18n.t('productName')}</label>
                <div class="relative">
                    <select id="ord-product" onchange="updateOrderAmount(this)" class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl px-5 py-4 text-[0.875rem] font-semibold text-slate-700 dark:text-slate-200 focus:border-vision-gold/40 focus:ring-4 focus:ring-vision-gold/5 transition-all outline-none appearance-none cursor-pointer">
                        <option value="">${i18n.t('select')}...</option>
                        ${productOptions}
                    </select>
                    <svg class="w-4 h-4 absolute end-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
            ${modalInput(i18n.t('quantity'), 'ord-qty', '1', 'number')}
            ${modalInput(i18n.t('orderTotal'), 'ord-amount', '0.00', 'text')}
        </div>
    `, i18n.t('confirmOrder'), 'submitNewOrder()'));

    // Set default values
    document.getElementById('ord-qty').value = 1;
};

window.updateOrderAmount = (select) => {
    const option = select.options[select.selectedIndex];
    const price = option.getAttribute('data-price') || 0;
    const qty = document.getElementById('ord-qty').value || 1;
    document.getElementById('ord-amount').value = (parseFloat(price) * parseInt(qty)).toLocaleString();
};

window.submitNewOrder = async () => {
    const customer = document.getElementById('ord-customer').value.trim();
    const productId = document.getElementById('ord-product').value;
    const productText = document.getElementById('ord-product').options[document.getElementById('ord-product').selectedIndex].text.split('(')[0].trim();
    const qty = document.getElementById('ord-qty').value;
    const amount = document.getElementById('ord-amount').value;

    if (!customer || !productId || !amount) {
        showToast('⚠️ يرجى إكمال كافة البيانات');
        return;
    }

    const orderId = `#ORD-${Date.now().toString().slice(-4)}`;
    await apiService.processOrder({
        id: orderId,
        customer,
        productName: productText,
        quantity: parseInt(qty),
        amount: amount,
        status: 'Completed',
        statusClass: 'bg-emerald-50 text-emerald-600'
    });

    closeModal();
    showToast(`✅ تم تأكيد الطلب ${orderId}`);
    refreshModule();
};


window.editOrderPrompt = (id) => {
    const ord = storage.getOrders().find(o => o.id === id);
    if (!ord) return;

    showModal(modalForm('تعديل الطلب', `
    <div class="space-y-5">
        ${modalInput('اسم العميل', 'ord-customer', 'اسم العميل...', 'text')}
        ${modalInput('اجمالي الطلب (SAR)', 'ord-amount', '0.00', 'number')}
        <input type="hidden" id="ord-id" value="${id}">
    </div>
    `, 'حفظ التعديلات', 'submitUpdateOrder()'));

    // Fill values
    document.getElementById('ord-customer').value = ord.customer;
    document.getElementById('ord-amount').value = ord.amount.replace(/,/g, '');
};

window.submitUpdateOrder = () => {
    const id = document.getElementById('ord-id').value;
    const customer = document.getElementById('ord-customer').value;
    const amount = document.getElementById('ord-amount').value;

    if (!customer || !amount) return alert('يرجى تعبئة كافة الحقول');

    storage.updateOrder(id, {
        customer,
        amount: Number(amount).toLocaleString()
    });
    closeModal();
    logAction('edit', `تحديث بيانات الطلب: ${id}`);
    showToast('تم تحديث الطلب وتحديث السجل');
    refreshModule();
};

window.viewOrder = (id) => {
    const ord = storage.getOrders().find(o => o.id === id);
    if (!ord) return;

    showModal(`
        <div class="premium-card !p-8 md:!p-10 shadow-2xl relative w-full max-w-lg mx-auto animate-enter text-right">
            <button onclick="closeModal()" class="absolute top-8 left-8 p-2 text-slate-400 hover:text-rose-500 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div class="mb-10 text-center">
                <div class="w-20 h-20 bg-emerald-50 dark:bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500">
                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </div>
                <h3 class="text-2xl font-bold text-slate-800 dark:text-white font-nums tracking-tight">${ord.id}</h3>
                <p class="text-slate-500 font-medium">سجل المبيعات والطلبات</p>
            </div>
            
            <div class="space-y-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50 mb-8">
                <div class="flex justify-between items-center">
                    <span class="text-slate-400 font-bold uppercase text-[0.7rem] tracking-widest">${i18n.t('customer')}</span>
                    <span class="text-slate-800 dark:text-slate-100 font-bold">${ord.customer}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-slate-400 font-bold uppercase text-[0.7rem] tracking-widest">${i18n.t('status')}</span>
                    <span class="${ord.statusClass} px-3 py-1 rounded-lg text-[0.75rem] font-bold">${ord.status}</span>
                </div>
                <div class="flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-4">
                    <span class="text-slate-400 font-bold uppercase text-[0.7rem] tracking-widest">${i18n.t('amount')}</span>
                    <span class="text-vision-gold font-bold text-xl font-nums">${ord.amount} SAR</span>
                </div>
            </div>

            <div class="flex gap-4">
                <button onclick="editOrderPrompt('${ord.id}')" class="flex-1 bg-vision-gold text-white py-4 rounded-2xl font-bold text-[0.875rem] shadow-xl shadow-vision-gold/20 hover:brightness-110">تحرير المسودة</button>
                <button onclick="closeModal()" class="px-8 bg-slate-100 dark:bg-slate-800 text-slate-500 py-4 rounded-2xl font-bold text-[0.875rem]">إغلاق</button>
            </div>
        </div>
    `);
};

window.deleteOrderItem = async (id) => {
    const title = i18n.t('deleteRecord') || 'حذف السجل';
    const message = (i18n.t('confirmDeleteUser') || 'هل أنت متأكد من حذف هذا الطلب؟') + ' (' + id + ')';
    showConfirmModal(title, message, `(async () => { await apiService.deleteOrder('${id}'); logAction('delete', 'تم إلغاء الطلب: ${id}'); showToast('🗑️ تم حذف الطلب ${id}'); refreshModule(); })()`);
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
                <div class="text-2xl font-semibold text-slate-800 dark:text-white tracking-tight font-nums leading-none">${value}</div>
            </div>
        </div>
    `;
}

function orderRow(id, customer, amount, status, statusClass) {
    return `
        <tr class="hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-colors group text-start">
            <td class="py-6 px-5 text-[0.875rem] font-bold text-slate-700 dark:text-slate-200 font-nums">${id}</td>
            <td class="py-6 px-5 text-[0.875rem] font-medium text-slate-600 dark:text-slate-300">${customer}</td>
            <td class="py-6 px-5 text-[0.875rem] font-semibold text-vision-gold font-nums">${formatCurrency(amount)}</td>
            <td class="py-6 px-5">
                <span class="${statusClass} px-3.5 py-1.5 rounded-xl text-[0.75rem] font-bold uppercase tracking-wider">${translateStatus(status)}</span>
            </td>
            <td class="py-6 px-5">
                <div class="flex items-center gap-2 justify-end">
                    <button onclick="viewOrder('${id}')" class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-500 hover:border-blue-200 dark:hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all shadow-sm" title="${i18n.t('viewDetails')}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </button>
                    <button onclick="editOrderPrompt('${id}')" class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-vision-gold hover:border-vision-gold/30 hover:bg-amber-50 dark:hover:bg-vision-gold/10 transition-all shadow-sm" title="${i18n.t('edit')}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button onclick="deleteOrderItem('${id}')" class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-500/30 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all shadow-sm" title="حذف">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </td>
        </tr>
    `;
}
