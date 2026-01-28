import { i18n } from '../../core/i18n.js';
import { storage } from '../../core/storage.js';

let productsSearchQuery = '';

export const productsModule = {
    render: () => {
        let products = storage.getProducts();

        if (productsSearchQuery) {
            const q = productsSearchQuery.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.sku.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        }

        const totalValue = products.reduce((acc, p) => acc + (parseFloat(p.price.replace(/,/g, '')) * (p.stock || 0)), 0);
        const outOfStock = products.filter(p => p.stock === 0).length;

        return `
            <div class="mb-8 flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold mb-1 text-slate-800 dark:text-white">${i18n.t('products')}</h1>
                    <p class="text-slate-500 text-[0.8125rem] font-medium opacity-80">${i18n.t('productsSubtitle')}</p>
                </div>
                <button onclick="addProductPrompt()" class="bg-vision-gold text-white px-6 py-3 rounded-2xl font-bold text-[0.875rem] shadow-xl shadow-vision-gold/20 hover:-translate-y-1 transition-all flex items-center gap-2 active:scale-95">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                    <span>${i18n.t('addProduct')}</span>
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-full">
                ${statCard(i18n.t('totalProducts'), `<span class="font-nums">${products.length}</span>`, `<span class="font-nums">0 +</span>`, 'bg-vision-gold', 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4')}
                ${statCard(i18n.t('outOfStock'), `<span class="font-nums text-rose-500">${outOfStock}</span>`, `<span class="font-nums">${i18n.t('stable')}</span>`, 'bg-rose-500', 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z')}
                ${statCard(i18n.t('inventoryValue'), `<span class="font-nums">${totalValue.toLocaleString()}</span> ` + currencyIcon(), `<span class="font-nums">3%+</span>`, 'bg-vision-gold', 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM17 13v-2M7 13v-2M12 5v3m0 8v3M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z')}
                ${statCard(i18n.t('category'), `<span class="font-nums">4</span>`, `<span class="font-nums">NEW</span>`, 'bg-vision-gold', 'M7 7h.01M7 11h.01M7 15h.01M13 7h.01M13 11h.01M13 15h.01M17 7h.01M17 11h.01M17 15h.01')}
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 space-y-6">
                    <div class="premium-card !p-6">
                        <div class="flex items-center justify-between mb-8">
                            <div class="flex items-center gap-4">
                                <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200">${i18n.t('productList')}</h3>
                                <span class="bg-vision-gold/10 text-vision-gold text-[0.8125rem] font-bold px-3 py-1 rounded-full font-nums">${products.length}</span>
                            </div>
                            <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                <input type="text" id="products-search" oninput="handleProductsSearch(this.value)" value="${productsSearchQuery}" placeholder="${i18n.t('search')}..." class="bg-transparent border-none text-[0.8125rem] focus:ring-0 w-48 text-slate-700 dark:text-slate-300 font-medium outline-none">
                            </div>
                        </div>
                        <div class="space-y-4">
                            ${products.length > 0 ? products.map(p => productRow(p)).join('') : `
                                <div class="text-center py-10 text-slate-400 font-bold">${i18n.t('noResults')}</div>
                            `}
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-1 space-y-6">
                    <div class="premium-card !p-6 bg-gradient-to-br from-vision-gold to-amber-600 border-none text-white">
                        <h3 class="text-lg font-bold mb-6">${i18n.t('productsSummary')}</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center opacity-90">
                                <span class="text-sm font-medium">${i18n.t('totalProducts')}</span>
                                <span class="font-nums font-bold">${products.length}</span>
                            </div>
                            <div class="flex justify-between items-center opacity-90">
                                <span class="text-sm font-medium">${i18n.t('topCategory')}</span>
                                <span class="font-bold">Electronics</span>
                            </div>
                            <div class="pt-4 border-t border-white/10 flex justify-between items-center">
                                <span class="text-sm font-bold">${i18n.t('inventoryValue')}</span>
                                <span class="text-lg font-bold font-nums">${formatCurrency(totalValue.toLocaleString())}</span>
                            </div>
                        </div>
                    </div>

                    <div class="premium-card !p-6">
                        <h3 class="text-[0.9375rem] font-bold text-slate-700 dark:text-slate-200 mb-6">${i18n.t('category')} Performance</h3>
                        <div class="space-y-5">
                            ${categoryBar('Smartphones', 85, 'bg-indigo-500')}
                            ${categoryBar('Laptops', 65, 'bg-emerald-500')}
                            ${categoryBar('Accessories', 45, 'bg-amber-500')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

function statCard(title, value, change, color, iconPath) {
    const isPositive = change.includes('+') || change.includes('NEW');
    const isNegative = change.includes('-');
    const colorClasses = isPositive
        ? 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600'
        : (isNegative ? 'bg-rose-50 dark:bg-rose-400/10 text-rose-600' : 'bg-slate-50 dark:bg-slate-800/10 text-slate-500');

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
                <div class="text-2xl font-semibold text-slate-800 dark:text-white font-nums leading-none">${value}</div>
            </div>
        </div>
    `;
}

function categoryBar(label, percentage, color) {
    return `
        <div>
            <div class="flex justify-between text-[0.75rem] font-bold mb-2 uppercase tracking-tighter">
                <span class="text-slate-700 dark:text-slate-200">${label}</span>
                <span class="text-slate-500 font-nums">${percentage}%</span>
            </div>
            <div class="w-full h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full ${color} rounded-full transition-all" style="width: ${percentage}%"></div>
            </div>
        </div>
    `;
}

function productRow(p) {
    const statusClasses = {
        'In Stock': 'bg-emerald-50 text-emerald-600',
        'Out of Stock': 'bg-rose-50 text-rose-600',
        'Low Stock': 'bg-amber-50 text-amber-600'
    };

    return `
        <div class="p-5 border border-slate-50 dark:border-vision-border rounded-3xl hover:bg-slate-50 dark:hover:bg-vision-gold/5 transition-all flex items-center justify-between group animate-enter text-start">
            <div class="flex items-center gap-6">
                <div class="w-12 h-12 rounded-2xl bg-vision-gold/5 border border-vision-gold/10 flex items-center justify-center text-vision-gold font-black text-lg transition-transform group-hover:scale-105">${p.name[0]}</div>
                <div>
                    <div class="text-[1rem] font-bold text-slate-900 dark:text-white mb-0.5">${p.name}</div>
                    <div class="text-[0.75rem] text-slate-500 font-medium uppercase tracking-tighter">${p.sku} • ${p.category}</div>
                </div>
            </div>
            <div class="flex items-center gap-8">
                <div class="text-end">
                    <div class="text-[1rem] font-bold text-slate-900 dark:text-white font-nums">${formatCurrency(p.price)}</div>
                    <span class="${statusClasses[p.status] || 'bg-slate-50'} px-2.5 py-1 rounded-lg text-[0.65rem] font-bold uppercase tracking-wider">${i18n.t(p.status.toLowerCase().replace(/ /g, '')) || p.status}</span>
                </div>
                <div class="flex gap-2">
                    <button onclick="editProductPrompt(${p.id})" class="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-vision-gold transition-all shadow-sm">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button onclick="deleteProduct(${p.id})" class="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-all shadow-sm">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.handleProductsSearch = (val) => {
    productsSearchQuery = val;
    refreshModule();
};

window.addProductPrompt = () => {
    showModal(modalForm(i18n.t('addProduct'), `
        <div class="space-y-5 text-start">
            ${modalInput(i18n.t('productName'), 'prod-name', i18n.t('enterProductName'))}
            ${modalInput(i18n.t('sku'), 'prod-sku', 'SKU-XXXX')}
            ${modalInput(i18n.t('price'), 'prod-price', '1,000')}
        </div>
    `, i18n.t('confirm'), 'submitNewProduct()'));
};

window.submitNewProduct = () => {
    const name = document.getElementById('prod-name').value.trim();
    const sku = document.getElementById('prod-sku').value.trim();
    const price = document.getElementById('prod-price').value.trim();

    if (!name || !sku || !price) {
        showToast('⚠️ Please fill all fields');
        return;
    }

    storage.addProduct({ name, sku, price, category: 'General', stock: 10, status: 'In Stock' });
    closeModal();
    logAction('add', `إضافة منتج جديد: ${name}`);
    showToast(`✅ ${i18n.t('systemUpdated')}`);
    refreshModule();
};

window.editProductPrompt = (id) => {
    const p = storage.getProducts().find(x => x.id == id);
    if (!p) return;

    showModal(modalForm(i18n.t('edit'), `
        <div class="space-y-5 text-start">
            ${modalInput(i18n.t('productName'), 'prod-name', '', 'text')}
            ${modalInput(i18n.t('price'), 'prod-price', '', 'text')}
            <input type="hidden" id="prod-id" value="${id}">
        </div>
    `, i18n.t('confirm'), 'submitUpdateProduct()'));

    document.getElementById('prod-name').value = p.name;
    document.getElementById('prod-price').value = p.price;
};

window.submitUpdateProduct = () => {
    const id = document.getElementById('prod-id').value;
    const name = document.getElementById('prod-name').value;
    const price = document.getElementById('prod-price').value;

    storage.updateProduct(id, { name, price });
    closeModal();
    refreshModule();
};

window.deleteProduct = (id) => {
    showConfirmModal(i18n.t('deleteRecord'), 'Are you sure?', `storage.deleteProduct(${id}); refreshModule();`);
};
