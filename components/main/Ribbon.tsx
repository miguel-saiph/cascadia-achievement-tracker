import { ImageSourcePropType, View, Image, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";

const imagePath: ImageSourcePropType = require('@/assets/images/ribbon.png');

export function Ribbon({ content }: { content: string }) {

    return (
        <View style={styles.container}>
            <Image source={imagePath} style={styles.image} />
            <ThemedText style={[styles.text, {
                fontSize: content.length >= 3 ? 12 : 15,
                left: content.length >= 3 ? 5 : 6
            }]}>
                {content}
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 3,
        left: -5,
        width: 40
    },
    image: {
        width: 38,
        height: 38,
        alignSelf: 'center',
        alignContent: 'center',
        marginLeft: -5
    },
    text: {
        fontFamily: 'Volkoba',
        fontSize: 15,
        color: '#fff',
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 10,
        left: 7,
        // overflow: 'hidden',
        width: 40
    },
});