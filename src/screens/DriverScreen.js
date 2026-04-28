import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { colors } from '../styles';
import * as Location from 'expo-location';
import { useEffect } from 'react';

export default function DriverScreen() {
  const orders = useStore(s => s.orders);
  const update = useStore(s => s.updateOrderStatus);
  const logout = useStore(s => s.logout);

  const setLocation = useStore(s => s.setLocation);
  const isTracking = useStore(s => s.isTracking);
  const startTracking = useStore(s => s.startTracking);
  const stopTracking = useStore(s => s.stopTracking);

  const active = orders.filter(o => o.status !== "pending");
  const available = orders.filter(o => o.status === "pending");

  // 📍 LOCATION TRACKING
  useEffect(() => {
    let sub;

    const start = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 2000,
          distanceInterval: 1,
        },
        (loc) => {
          console.log("📍 LOCATION:", loc.coords);
          setLocation(loc.coords);
        }
      );
    };

    if (isTracking) start();

    return () => sub && sub.remove();
  }, [isTracking]);

  // 🔥 STATUS FLOW
  const accept = (id) => {
    update(id, "accepted");
    startTracking();
    Alert.alert("Success", "Shipment assigned");
  };

  const markTransit = (id) => {
    update(id, "transit");
  };

  const markDelivered = (id) => {
    update(id, "delivered");
    stopTracking();
    Alert.alert("Completed", "Order Delivered");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

      <View style={header}>
        <Text style={headerText}>My Orders</Text>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ padding: 16 }}>

        <Text style={section}>ACTIVE SHIPMENTS</Text>

        {active.map(o => (
          <View key={o.id} style={card}>
            <Ionicons name="cube-outline" size={24} color={colors.primary} />

            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={title}>ORD00{o.id}</Text>
              <Text>{o.customer}</Text>
              <Text style={{ fontSize: 12, color: "#666" }}>
                Status: {o.status}
              </Text>

              {o.status === "accepted" && (
                <TouchableOpacity style={btn} onPress={() => markTransit(o.id)}>
                  <Text style={{ color: "#fff" }}>Start Transit</Text>
                </TouchableOpacity>
              )}

              {o.status === "transit" && (
                <TouchableOpacity style={btn} onPress={() => markDelivered(o.id)}>
                  <Text style={{ color: "#fff" }}>Mark Delivered</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <Text style={section}>AVAILABLE</Text>

        {available.map(o => (
          <View key={o.id} style={card}>
            <Text style={title}>ORD00{o.id}</Text>
            <Text>{o.customer}</Text>

            <TouchableOpacity style={btn} onPress={() => accept(o.id)}>
              <Text style={{ color: "#fff" }}>Accept Shipment</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const header = {
  backgroundColor: colors.primary,
  padding: 16,
  flexDirection: "row",
  justifyContent: "space-between"
};

const headerText = { color: "#fff", fontSize: 18 };

const section = { marginVertical: 10 };

const card = {
  backgroundColor: "#fff",
  padding: 16,
  borderRadius: 12,
  marginBottom: 10,
  flexDirection: "row",
  alignItems: "center"
};

const title = { fontWeight: "600" };

const btn = {
  marginTop: 10,
  backgroundColor: colors.primary,
  padding: 10,
  borderRadius: 10
};