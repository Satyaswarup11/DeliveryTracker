import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create((set) => ({
  user: null,
  role: null,

  //  Orders
  orders: [
    { id: 1, customer: "Rahul Sharma", status: "pending" },
    { id: 2, customer: "Priya Patel", status: "pending" },
    { id: 3, customer: "Amit Kumar", status: "pending" },
    { id: 4, customer: "Sneha Reddy", status: "pending" },
    { id: 5, customer: "Arjun Mehta", status: "pending" },
  ],

  selectedOrder: null,

  //  TRACKING STATE 
  currentLocation: null,
  isTracking: false,

  // Login
  login: async (email) => {
    let role = null;

    if (email === "driver@test.com") role = "driver";
    if (email === "ops@test.com") role = "manager";

    if (role) {
      try {
        await AsyncStorage.setItem("user", JSON.stringify({ email, role }));
      } catch (e) {
        console.log("AsyncStorage error:", e);
      }

      set({ user: email, role });
    }
  },

  loadUser: async () => {
    try {
      const data = await AsyncStorage.getItem("user");
      if (data) {
        const parsed = JSON.parse(data);
        set({ user: parsed.email, role: parsed.role });
      }
    } catch (e) {
      console.log("Load error:", e);
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (e) {
      console.log("Remove error:", e);
    }

    set({
      user: null,
      role: null,
      selectedOrder: null,
    });
  },

  // Order update
  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, status } : o
      ),
    })),

  selectOrder: (order) => set({ selectedOrder: order }),
  clearSelectedOrder: () => set({ selectedOrder: null }),

  // LOCATION FUNCTIONS 
  setLocation: (location) => {
    console.log(" LOCATION UPDATE:", location);
    set({ currentLocation: location });
  },

  startTracking: () => {
    console.log(" TRACKING STARTED");
    set({ isTracking: true });
  },

  stopTracking: () => {
    console.log(" TRACKING STOPPED");
    set({ isTracking: false });
  },
}));