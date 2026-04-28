import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';

export default function LoginScreen() {
  const login = useStore((s) => s.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (
      (email === "driver@test.com" && password === "123456") ||
      (email === "ops@test.com" && password === "123456")
    ) {
      await login(email);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

      <View style={header}>
        <Ionicons name="cube-outline" size={40} color="#fff" />
        <Text style={title}>DeliveryTracker</Text>
      </View>

      <View style={card}>
        <View style={inputBox}>
          <Ionicons name="mail-outline" size={20} color="#999" />
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={input} />
        </View>

        <View style={inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#999" />
          <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={input} />
        </View>

        <TouchableOpacity style={btn} onPress={handleLogin}>
          <Text style={{ color: "#fff", textAlign: "center" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const header = {
  backgroundColor: colors.primary,
  padding: 30,
  alignItems: "center"
};

const title = {
  color: "#fff",
  fontSize: 22,
  marginTop: 10
};

const card = {
  margin: 20,
  padding: 20,
  backgroundColor: "#fff",
  borderRadius: 20
};

const inputBox = {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#ddd",
  padding: 10,
  borderRadius: 10,
  marginBottom: 15
};

const input = { marginLeft: 10, flex: 1 };

const btn = {
  backgroundColor: colors.primary,
  padding: 14,
  borderRadius: 10
};