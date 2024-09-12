import { ImageSourcePropType, View, Image, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";

const iconsMap: { [key: string]: ImageSourcePropType } = {
    [':bear:']: require('@/assets/images/animals/bear.png'),
    [':elk:']: require('@/assets/images/animals/elk.png'),
    [':fox:']: require('@/assets/images/animals/fox.png'),
    [':hawk:']: require('@/assets/images/animals/hawk.png'),
    [':salmon:']: require('@/assets/images/animals/salmon.png'),
    [':nature:']: require('@/assets/images/nature_token.png'),
    [':ribbon:']: require('@/assets/images/ribbon.png')
}

export function TextWithIcons({ content }: { content: string }) {

    return (
        <View style={{ flexDirection: 'row' }}>
            <ThemedText>{'\u2022'} </ThemedText>
            {
                content.split(/(:.*?:)/g).map((elem, index) => {
                    if (!elem) return null;
                    if (iconsMap[elem]) {
                        return (<Image style={styles.icon} source={iconsMap[elem]} key={index} />);
                    }
                    return (
                        <ThemedText
                            key={index}
                            style={styles.text}
                        // adjustsFontSizeToFit={true}
                        // numberOfLines={1}
                        >
                            {elem}
                        </ThemedText>
                    )
                })
            }
        </View>
    )



}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        // marginTop: -1
    },
    text: {
        fontFamily: 'Mackinac',
        fontSize: 16,
        color: '#000',
        textAlign: 'left'
    },
});