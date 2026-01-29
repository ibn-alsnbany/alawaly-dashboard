import { storage } from './storage.js';

// Simulated delay to mimic real network requests
const simulateLatency = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * ApiService: Centralized Data Access Layer
 * All methods return Promises to ensure future compatibility with real REST APIs
 */
export const apiService = {
    // --- Users ---
    getUsers: async () => {
        await simulateLatency();
        return storage.getUsers();
    },
    addUser: async (u) => {
        await simulateLatency(150);
        return storage.addUser(u);
    },
    updateUser: async (id, u) => {
        await simulateLatency(150);
        return storage.updateUser(id, u);
    },
    deleteUser: async (id) => {
        await simulateLatency(150);
        return storage.deleteUser(id);
    },

    // --- Invoices (Finance) ---
    getInvoices: async () => {
        await simulateLatency();
        return storage.getInvoices();
    },
    addInvoice: async (inv) => {
        await simulateLatency(150);
        return storage.addInvoice(inv);
    },
    updateInvoice: async (id, data) => {
        await simulateLatency(150);
        return storage.updateInvoice(id, data);
    },
    deleteInvoice: async (id) => {
        await simulateLatency(150);
        return storage.deleteInvoice(id);
    },

    // --- Orders (Sales) ---
    getOrders: async () => {
        await simulateLatency();
        return storage.getOrders();
    },
    processOrder: async (orderDetails) => {
        await simulateLatency(200);
        return storage.processOrder(orderDetails);
    },
    deleteOrder: async (id) => {
        await simulateLatency(150);
        return storage.deleteOrder(id);
    },

    // --- Products ---
    getProducts: async () => {
        await simulateLatency();
        return storage.getProducts();
    },
    addProduct: async (prod) => {
        await simulateLatency(150);
        return storage.addProduct(prod);
    },
    updateProduct: async (id, data) => {
        await simulateLatency(150);
        return storage.updateProduct(id, data);
    },
    deleteProduct: async (id) => {
        await simulateLatency(150);
        return storage.deleteProduct(id);
    },

    // --- Inventory ---
    getInventoryLogs: async () => {
        await simulateLatency();
        return storage.getInventoryLogs();
    },

    // --- HR (Employees) ---
    getEmployees: async () => {
        await simulateLatency();
        return storage.getEmployees();
    },
    addEmployeeWithUser: async (empData) => {
        await simulateLatency(200);
        return storage.addEmployeeWithUser(empData);
    },
    deleteEmployee: async (id) => {
        await simulateLatency(150);
        return storage.deleteEmployee(id);
    },

    // --- Profile & Misc ---
    getProfile: async () => {
        await simulateLatency();
        return storage.getProfile();
    },
    setProfile: async (profile) => {
        await simulateLatency(150);
        return storage.setProfile(profile);
    },
    getNotifications: async () => {
        await simulateLatency();
        return storage.getNotifications();
    }
};
