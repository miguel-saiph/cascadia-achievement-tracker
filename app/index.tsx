import { useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./home";

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { ConfigProvider } from "@/hooks/configContext";
import Scenarios from "./(tabs)/scenarios";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function Index() {
    const [loaded] = useFonts({
        LocalBrewery: require('../assets/fonts/local-brewery-four.ttf'),
        Volkoba: require('../assets/fonts/mudkty-wtvolkolaksanstext-black.ttf'),
        Mackinac: require('../assets/fonts/P22MackinacProMedium.otf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>

    );
}