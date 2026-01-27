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

    // EMPLOYEES (HR)
    getEmployees: () => storage.getAll('vision_employees', [
        { id: 1, name: 'Khaled Mohammed', role: 'Tech Manager', status: 'Active', statusClass: 'bg-green-100 text-green-600' },
        { id: 2, name: 'Reem Al-Ali', role: 'UI Designer', status: 'On Leave', statusClass: 'bg-amber-100 text-amber-600' },
        { id: 3, name: 'Omar Fahad', role: 'Data Analyst', status: 'Active', statusClass: 'bg-green-100 text-green-600' }
    ]),
    addEmployee: (emp) => storage.add('vision_employees', emp, storage.getEmployees()),
    updateEmployee: (id, data) => storage.update('vision_employees', id, data, storage.getEmployees()),
    deleteEmployee: (id) => storage.delete('vision_employees', id, storage.getEmployees()),

    // PROFILE
    getProfile: () => storage.get('vision_profile', {
        name: 'محمد علي',
        username: '@mohammed_alawaly',
        email: 'mohammed@alawaly.sa',
        phone: '+966 50 XXX XXXX'
    }),
    setProfile: (profile) => storage.set('vision_profile', profile)
};
