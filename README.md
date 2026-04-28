# 📦 DeliveryTracker Mobile App

A **React Native (Expo)** mobile application designed to simulate real-time delivery tracking between a **Driver** and a **Manager**.

---

## 🚀 Features

### 🔐 Authentication
- Driver → `driver@test.com / 123456`
- Manager → `ops@test.com / 123456`
- Persistent login using AsyncStorage

### 🚚 Driver
- View available orders
- Accept order → tracking starts
- Update status → Transit → Delivered
- Tracking stops after delivery

### 🧑‍💼 Manager
- View all orders
- Status badges (OPEN / PICKED / TRANSIT / DELIVERED)
- Order detail screen with:
  - Timeline
  - Live map (only for active orders)

---

## 📍 Real-Time Tracking
- Uses `expo-location`
- Updates every ~2 seconds
- Shared via Zustand state
- Manager reads same state → simulates live tracking

---

## 🛠️ Tech Stack
- React Native (Expo)
- Zustand
- AsyncStorage
- Expo Location
- WebView + Leaflet
- Ionicons

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Satyaswarup11/DeliveryTracker.git
cd DeliveryTracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npx expo start
```

### 4. Run on device

Scan QR using Expo Go (Android/iOS)

---

## 🧪 How to Test

1. **Login as Driver**
2. Accept an order → wait a few seconds (location starts updating)
3. Logout
4. **Login as Manager**
5. Open that order → view live tracking

---

## ⚠️ Important Notes

- This app uses in-memory state (Zustand) → no backend
- Real-time tracking works only while app session is active
- Logging out stops location updates
- Designed for demonstration purposes only

---

## 💡 Future Improvements

- Backend integration (Node.js / Django)
- Real-time sync using WebSockets
- Background tracking support
- Push notifications
- Advanced route visualization

---

## 🧠 What This Project Demonstrates

- State management using Zustand
- Role-based UI architecture
- Real-time data simulation
- Clean mobile UI design principles
- Handling lifecycle of location tracking

