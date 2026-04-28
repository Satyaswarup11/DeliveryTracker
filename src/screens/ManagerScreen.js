import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { colors } from '../styles';

export default function ManagerScreen() {
  const orders = useStore(s => s.orders);
  const logout = useStore(s => s.logout);
  const select = useStore(s => s.selectOrder);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

      <View style={header}>
        <Text style={headerText}>Operations</Text>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ padding: 16 }}>
        {orders.map(o => (
          <TouchableOpacity key={o.id} onPress={() => select(o)} style={card}>
            <Ionicons name="cube-outline" size={22} color={colors.primary} />
            <View style={{ marginLeft: 10 }}>
              <Text style={title}>ORD00{o.id}</Text>
              <Text>{o.customer}</Text>
            </View>
          </TouchableOpacity>
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

const card = {
  backgroundColor: "#fff",
  padding: 16,
  borderRadius: 12,
  marginBottom: 10,
  flexDirection: "row",
  alignItems: "center"
};

const title = { fontWeight: "600" };