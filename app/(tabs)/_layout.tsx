import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2E7D32', // Green accent color
        tabBarInactiveTintColor: '#666666', // Inactive color
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
            height: 90,
            paddingBottom: 20,
            paddingTop: 10,
          },
          android: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
            height: 90,
            paddingBottom: 20,
            paddingTop: 10,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="camera.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="person.2.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
