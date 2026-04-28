import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { colors } from '../styles';

export default function ManagerScreen() {
  const orders = useStore(s => s.orders);
  const logout = useStore(s => s.logout);
  const select = useStore(s => s.selectOrder);

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return { color: "#F59E0B", label: "PICKED" };
      case "transit":
        return { color: "#3B82F6", label: "TRANSIT" };
      case "delivered":
        return { color: "#10B981", label: "DELIVERED" };
      default:
        return { color: "#9CA3AF", label: "OPEN" };
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

      <View style={header}>
        <Text style={headerText}>Operations</Text>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ padding: 16 }}>
        {orders.map(o => {
          const status = getStatusStyle(o.status);

          return (
            <TouchableOpacity key={o.id} style={cardNew} onPress={() => select(o)}>

              <View style={{ flex: 1 }}>
                <Text style={title}>ORD00{o.id}</Text>
                <Text>{o.customer}</Text>
              </View>

              <View style={{
                backgroundColor: status.color,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 20
              }}>
                <Text style={{ color: "#fff", fontSize: 12 }}>
                  {status.label}
                </Text>
              </View>

            </TouchableOpacity>
          );
        })}
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

const cardNew = {
  backgroundColor: "#fff",
  padding: 16,
  borderRadius: 14,
  marginBottom: 12,
  flexDirection: "row",
  alignItems: "center",
  elevation: 2
};

const title = { fontWeight: "600" };