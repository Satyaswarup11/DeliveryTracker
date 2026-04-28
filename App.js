import { useEffect } from 'react';
import { useStore } from './src/store/useStore';
import LoginScreen from './src/screens/LoginScreen';
import DriverScreen from './src/screens/DriverScreen';
import ManagerScreen from './src/screens/ManagerScreen';
import OrderTrackScreen from './src/screens/OrderTrackScreen';

export default function App() {
  const role = useStore((s) => s.role);
  const loadUser = useStore((s) => s.loadUser);
  const selectedOrder = useStore((s) => s.selectedOrder);

  useEffect(() => {
    loadUser();
  }, []);

  if (!role) return <LoginScreen />;
  if (selectedOrder) return <OrderTrackScreen />;
  if (role === "driver") return <DriverScreen />;
  if (role === "manager") return <ManagerScreen />;
}