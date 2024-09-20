import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ConfigProvider } from "@/hooks/configContext";

export default function TabLayout() {
    return (
        <ConfigProvider>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#0a7ea4',
                    headerShown: false
                }}>
                <Tabs.Screen
                    name="scenarios"
                    options={{
                        title: 'Scenarios',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'leaf' : 'leaf-outline'} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="normal"
                    options={{
                        title: 'Normal',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'checkbox' : 'checkbox-outline'} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="restrictions"
                    options={{
                        title: 'Restrictions',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'remove-circle' : 'remove-circle-outline'} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </ConfigProvider>

    );
}
