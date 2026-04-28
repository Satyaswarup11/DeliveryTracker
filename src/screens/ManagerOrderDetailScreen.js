import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import MapView from '../components/MapView';
import { colors, spacing, typography } from '../styles';

export default function ManagerOrderDetailScreen() {
  const order = useStore((s) => s.selectedOrder);
  const location = useStore((s) => s.currentLocation);
  const back = useStore((s) => s.clearSelectedOrder);

  if (!order) return null;

  const isTrackable = order.status === "accepted" || order.status === "transit";
  const isDelivered = order.status === "delivered";

  const getStep = () => {
    if (order.status === "accepted") return 1;
    if (order.status === "transit") return 2;
    if (order.status === "delivered") return 3;
    return 0;
  };

  const step = getStep();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

      {/* Header */}
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.md,
        backgroundColor: colors.primary
      }}>
        <TouchableOpacity onPress={back}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={{
          color: "#fff",
          marginLeft: spacing.sm,
          fontSize: 18,
          fontWeight: "600"
        }}>
          Order Timeline
        </Text>
      </View>

      <View style={{ padding: spacing.lg }}>

        <Text style={typography.title}>Shipment Journey</Text>
        <Text style={typography.small}>Tracking ID: ORD00{order.id}</Text>

        {/* Customer */}
        <View style={{
          marginTop: spacing.md,
          backgroundColor: "#fff",
          padding: spacing.md,
          borderRadius: 14,
          flexDirection: "row",
          alignItems: "center"
        }}>
          <Ionicons name="person-circle-outline" size={36} color={colors.primary} />
          <View style={{ marginLeft: spacing.sm }}>
            <Text style={typography.subtitle}>{order.customer}</Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={{ marginTop: spacing.lg }}>
          <Text style={typography.subtitle}>Journey</Text>

          <Text style={{ color: step >= 1 ? "green" : "#999" }}>
            ✓ Order Picked Up
          </Text>
          <Text style={{ color: step >= 2 ? "green" : "#999" }}>
            ✓ In Transit
          </Text>
          <Text style={{ color: step >= 3 ? "green" : "#999" }}>
            ✓ Delivered
          </Text>
        </View>

        {/* Map / Status */}
        <View style={{ marginTop: spacing.lg, height: 300 }}>

          {!isTrackable && !isDelivered ? (
            <Text>No live tracking yet</Text>
          ) : isDelivered ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Ionicons name="checkmark-done-circle" size={40} color="green" />
              <Text style={{ marginTop: 10 }}>Delivery Completed</Text>
            </View>
          ) : location ? (
            <MapView
              latitude={location.latitude}
              longitude={location.longitude}
            />
          ) : (
            <Text>Waiting for live location...</Text>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
}