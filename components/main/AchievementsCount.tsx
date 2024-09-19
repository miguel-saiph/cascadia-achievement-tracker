import { ImageSourcePropType, View, Image } from "react-native";
import { ThemedText } from "../ThemedText";
import DataManager from "@/data/DataManager";

export function AchievementsCount({ current, total }: { current: number, total: number }) {

    return (
        <View>
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('@/assets/images/completed.png')} style={{
                        width: 30,
                        height: 30,
                        marginRight: 4,
                        top: -4
                    }} />
                    <ThemedText style={{
                        fontSize: 20,
                        fontFamily: 'LocalBrewery',
                        color: "black",
                    }}>{current} / {total} </ThemedText>
                </View>
            </View>
        </View>
    );
}