export const storage = {
    // Core Engine
    get: (key, defaultValue = null) => {
        const item = localStorage.getItem(key);
        try { return item ? JSON.parse(item) : defaultValue; } catch { return item || defaultValue; }
    },
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),

    // Generic Collection CRUD
    getAll: (key, defaults) => storage.get(key, defaults),
    add: (key, item, defaults) => {
        const items = storage.getAll(key, defaults);
        items.unshift({ id: Date.now(), ...item });
        storage.set(key, items);
    },
    update: (key, id, newData, defaults) => {
        const items = storage.getAll(key, defaults);
        const index = items.findIndex(i => i.id == id);
        if (index !== -1) {
            items[index] = { ...items[index], ...newData };
            storage.set(key, items);
        }
    },
    delete: (key, id, defaults) => {
        const items = storage.getAll(key, defaults);
        const filtered = items.filter(i => i.id != id);
        storage.set(key, filtered);
    },

    // --- Entity Specialties ---

    // USERS
    getUsers: () => storage.getAll('vision_users', [
        { id: 1, name: 'Ahmed Abdullah', email: 'ahmed@vision.sa', dept: 'IT Department', role: 'Developer', status: 'bg-emerald-500' },
        { id: 2, name: 'Sarah Mohammed', email: 'sara@vision.sa', dept: 'Marketing', role: 'Lead', status: 'bg-blue-500' },
        { id: 3, name: 'Faisal bin Ali', email: 'faisal@vision.sa', dept: 'HR Office', role: 'Manager', status: 'bg-amber-500' },
        { id: 4, name: 'Noura Al-Saad', email: 'noura@vision.sa', dept: 'Finance', role: 'Analyst', status: 'bg-amber-500' }
    ]),
    addUser: (u) => storage.add('vision_users', u, storage.getUsers()),
    updateUser: (id, u) => storage.update('vision_users', id, u, storage.getUsers()),
    deleteUser: (id) => storage.delete('vision_users', id, storage.getUsers()),

    // INVOICES (Finance)
    getInvoices: () => storage.getAll('vision_invoices', [
        { id: 'INV-001', customer: 'Al-Amal Company', amount: '12,500', date: '2023-10-01', status: 'Paid', statusClass: 'bg-emerald-50 text-emerald-600' },
        { id: 'INV-002', customer: 'Riyadh Organization', amount: '8,200', date: '2023-10-05', status: 'Pending', statusClass: 'bg-amber-50 text-amber-600' },
        { id: 'INV-003', customer: 'Al-Wafa Store', amount: '3,450', date: '2023-10-08', status: 'Overdue', statusClass: 'bg-rose-50 text-rose-600' }
    ]),
    getInvoiceById: (id) => storage.getInvoices().find(inv => inv.id === id),
    addInvoice: (inv) => storage.add('vision_invoices', inv, storage.getInvoices()),
    updateInvoice: (id, data) => storage.update('vision_invoices', id, data, storage.getInvoices()),
    deleteInvoice: (id) => storage.delete('vision_invoices', id, storage.getInvoices()),

    // ORDERS (Sales)
    getOrders: () => storage.getAll('vision_orders', [
        { id: '#ORD-441', customer: 'Ahmed Al-Salmi', amount: '500', status: 'Completed', statusClass: 'bg-green-50 text-green-600' },
        { id: '#ORD-442', customer: 'Noura Al-Otaibi', amount: '1,200', status: 'Processing', statusClass: 'bg-blue-50 text-blue-600' },
        { id: '#ORD-443', customer: 'Badr Al-Harbi', amount: '350', status: 'Completed', statusClass: 'bg-green-50 text-green-600' },
        { id: '#ORD-444', customer: 'Layla Al-Qahtani', amount: '890', status: 'Cancelled', statusClass: 'bg-red-50 text-red-600' }
    ]),
    getOrderById: (id) => storage.getOrders().find(ord => ord.id === id),
    addOrder: (ord) => storage.add('vision_orders', ord, storage.getOrders()),
    updateOrder: (id, data) => storage.update('vision_orders', id, data, storage.getOrders()),
    deleteOrder: (id) => storage.delete('vision_orders', id, storage.getOrders()),

    // NEW: Centralized Order Processor
    processOrder: (orderDetails) => {
        // 1. Add the Order
        storage.addOrder(orderDetails);

        // 2. Identify and Update Product Stock
        // For simplicity in this mock, we assume orderDetails might have a productId
        // If not, we search by name (common in this demo)
        const products = storage.getProducts();
        const product = products.find(p => p.name === orderDetails.productName) || products[0];

        if (product) {
            const newStock = Math.max(0, product.stock - (orderDetails.quantity || 1));
            storage.updateProduct(product.id, {
                stock: newStock,
                status: newStock === 0 ? 'Out of Stock' : (newStock <= 5 ? 'Low Stock' : 'In Stock')
            });

            // 3. Log Inventory Movement
            storage.addInventoryLog({
                productId: product.id,
                productName: product.name,
                type: 'out',
                quantity: orderDetails.quantity || 1,
                reason: `Sale ${orderDetails.id}`
            });
        }

        // 4. Create Finance Invoice
        storage.addInvoice({
            id: `#INV-${Date.now().toString().slice(-4)}`,
            customer: orderDetails.customer,
            amount: orderDetails.amount,
            status: 'Paid',
            date: new Date().toISOString()
        });

        // 5. Global Notification
        window.logAction('add', `طلب جديد من ${orderDetails.customer} بمبلغ ${orderDetails.amount} ر.س`);
    },

    // EMPLOYEES (HR)
    getEmployees: () => storage.getAll('vision_employees', [
        { id: 1, name: 'Khaled Mohammed', role: 'Tech Manager', status: 'Active', statusClass: 'bg-green-100 text-green-600' },
        { id: 2, name: 'Reem Al-Ali', role: 'UI Designer', status: 'On Leave', statusClass: 'bg-amber-100 text-amber-600' },
        { id: 3, name: 'Omar Fahad', role: 'Data Analyst', status: 'Active', statusClass: 'bg-green-100 text-green-600' }
    ]),
    addEmployee: (emp) => storage.add('vision_employees', emp, storage.getEmployees()),
    updateEmployee: (id, data) => storage.update('vision_employees', id, data, storage.getEmployees()),
    deleteEmployee: (id) => storage.delete('vision_employees', id, storage.getEmployees()),

    // NEW: HR-User Integration Helper
    addEmployeeWithUser: (empData) => {
        // 1. Add Employee
        const newEmpId = Date.now();
        storage.addEmployee({ id: newEmpId, ...empData });

        // 2. Add System User Account
        storage.addUser({
            id: newEmpId,
            name: empData.name,
            email: `${empData.name.toLowerCase().replace(/ /g, '.')}@vision.sa`,
            dept: 'HR Office', // Default for now
            role: empData.role === 'Manager' ? 'Manager' : 'Analyst',
            status: 'bg-emerald-500'
        });

        // 3. Log Notification
        window.logAction('add', `تم توظيف ${empData.name} وإنشاء حساب مستخدم له تلقائياً`);
    },

    // PRODUCTS
    getProducts: () => storage.getAll('vision_products', [
        { id: 1, name: 'iPhone 15 Pro', sku: 'IP15-BK-128', category: 'Smartphones', price: '4,500', stock: 15, status: 'In Stock' },
        { id: 2, name: 'MacBook Air M2', sku: 'MBA-M2-256', category: 'Laptops', price: '5,200', stock: 8, status: 'In Stock' },
        { id: 3, name: 'AirPods Pro 2', sku: 'APP-G2', category: 'Accessories', price: '999', stock: 0, status: 'Out of Stock' },
        { id: 4, name: 'iPad Pro 11"', sku: 'IPP-11-M2', category: 'Tablets', price: '3,800', stock: 3, status: 'Low Stock' }
    ]),
    addProduct: (prod) => storage.add('vision_products', prod, storage.getProducts()),
    updateProduct: (id, data) => storage.update('vision_products', id, data, storage.getProducts()),
    deleteProduct: (id) => storage.delete('vision_products', id, storage.getProducts()),

    // INVENTORY LOGS
    getInventoryLogs: () => storage.getAll('vision_inventory_logs', [
        { id: 1, productId: 1, productName: 'iPhone 15 Pro', type: 'in', quantity: 20, reason: 'Stock Arrival', date: '2023-10-25T10:30:00Z' },
        { id: 2, productId: 2, productName: 'MacBook Air M2', type: 'out', quantity: 2, reason: 'Sale #ORD-442', date: '2023-10-26T14:45:00Z' },
        { id: 3, productId: 3, productName: 'AirPods Pro 2', type: 'in', quantity: 50, reason: 'Bulk Purchase', date: '2023-10-27T09:15:00Z' },
        { id: 4, productId: 4, productName: 'iPad Pro 11"', type: 'out', quantity: 1, reason: 'Internal Use', date: '2023-10-28T16:20:00Z' }
    ]),
    addInventoryLog: (log) => {
        const logs = storage.getInventoryLogs();
        logs.unshift({ id: Date.now(), ...log, date: new Date().toISOString() });
        storage.set('vision_inventory_logs', logs.slice(0, 100)); // Keep last 100 logs
    },

    // PROFILE
    getProfile: () => storage.get('vision_profile', {
        name: 'Hamza Mohammed',
        username: '@hamza_alawaly',
        email: 'hamza@alawaly.sa',
        phone: '+966 50 XXX XXXX'
    }),
    setProfile: (profile) => storage.set('vision_profile', profile),

    // NOTIFICATIONS
    getNotifications: () => storage.getAll('vision_notifications', [
        { id: 1, type: 'info', message: 'System initialized successfully.', time: new Date().toISOString() }
    ]),
    addNotification: (type, message) => {
        const notifications = storage.getNotifications();
        notifications.unshift({
            id: Date.now(),
            type, // 'add', 'edit', 'delete', 'info'
            message,
            time: new Date().toISOString()
        });
        storage.set('vision_notifications', notifications.slice(0, 50)); // Keep last 50
    }
};
