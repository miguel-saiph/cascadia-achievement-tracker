import { View, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import { ThemedText } from "../ThemedText";
import { useEffect, useState } from "react";
import { useTaskContext } from "@/hooks/configContext";
import localization from '@/data/Localization.json';
import DataManager from "@/data/DataManager";

export interface ILoc {
    [key: string]: {
        [lang: string]: string
    }
}

const buttonColors: any = {
    ['base']: '#009688',
    ['landmarks']: '#a71730'
}

export function ExpansionButton() {
    // const [lang, setLang] = useState(useTaskContext());
    const lang = useTaskContext().lang;
    const mode = useTaskContext().mode;
    const [config] = useState(useTaskContext());
    const texts: ILoc = localization;

    const changeCurrentMode = () => {
        const newMode: string = mode === 'base' ? 'landmarks' : 'base';
        DataManager.instance.setCurrentMode(newMode);
        config.setMode(newMode);
    };

    return (
        <View>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    changeCurrentMode();
                }}
                style={[styles.appButtonContainer, { backgroundColor: buttonColors[mode] }]}
            >
                <ThemedText adjustsFontSizeToFit={true} numberOfLines={1} style={styles.appButtonText} > {mode === 'base' ? texts.expansion_1[lang] : texts.base[lang]} </ThemedText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    appButtonContainer: {
        borderRadius: 360,
        // maxWidth: 80
        width: 80
    },
    appButtonText: {
        fontFamily: 'Volkoba',
        fontSize: 12,
        color: "#fff",
        alignSelf: "center",
        textTransform: "uppercase",
        marginVertical: 1,
        marginHorizontal: 3
    },
});