import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { COLORS } from '@/constants/theme';

const icons = {
  index: ['home', 'home-outline'],
  scan: ['scan', 'scan-outline'],
  history: ['list', 'list-outline'],
  events: ['qr-code', 'qr-code-outline'],
  profile: ['person', 'person-outline'],
} as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: '#D8CBEF',
        tabBarStyle: {
          backgroundColor: COLORS.primaryStrong,
          borderTopColor: COLORS.primary,
          borderTopWidth: 0,
          height: 72,
          paddingTop: 6,
          paddingBottom: 10,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '800' },
        tabBarIcon: ({ color, focused, size }) => {
          const names = icons[route.name as keyof typeof icons] ?? icons.index;
          return <Ionicons name={names[focused ? 0 : 1]} size={Math.max(size, 22)} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="scan" options={{ title: 'Scan' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
      <Tabs.Screen name="events" options={{ title: 'Events' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
