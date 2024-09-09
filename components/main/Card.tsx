import { IScenario } from "@/app/carousel";
import { ThemedText } from "@/components/ThemedText";
import { CardNames, MapType } from "@/components/main/CardNames";
import { HighScore } from "@/components/main/HighScore";
import { Medal, MedalType } from "@/components/main/Medal";
import DataManager from "@/data/DataManager";
import React, { useEffect } from "react";
import { useState } from "react";
import { ImageSourcePropType, TouchableOpacity, View, Modal, StyleSheet, TextInput, Platform, useWindowDimensions } from "react-native";
import { Image } from 'react-native';
import { CustomModal } from "./Modal";
import { Calculator } from "./Calculator";
import localization from '@/data/Localization.json';
import { ILoc } from "./Info";
import { useTaskContext } from "@/hooks/configContext";
import { Trash } from "./Trash";
import BouncyCheckbox from "react-native-bouncy-checkbox";
// Checkbox documentation
// https://github.com/WrathChaos/react-native-bouncy-checkbox

const animalsSourceMap: ImageSourcePropType[] = [
    require("@/assets/images/animals/bear.png"),
    require("@/assets/images/animals/elk.png"),
    require("@/assets/images/animals/salmon.png"),
    require("@/assets/images/animals/hawk.png"),
    require("@/assets/images/animals/fox.png"),
]

const nameColorMap: { [key: string]: string } = {
    ['rock']: "#7d7f7f",
    ['land']: "#d19f19",
    ['water']: "#2e7e8a",
    ['grass']: "#87992e",
    ['constru']: "#ba2a4b",
    ['extra']: "#c2641f"
}

export default function Card({ scenario, index, callback }: { scenario: IScenario, index: number, callback: Function }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [number, onChangeNumber] = React.useState('');
    const [highscore, onChangeHighscore] = React.useState(0);
    const { width: windowWidth } = useWindowDimensions();
    const lang = useTaskContext().lang;
    const texts: ILoc = localization;

    const onScoreSubmitted = (): void => {
        if (parseInt(number) > highscore) {
            onChangeHighscore(parseInt(number));
            DataManager.instance.setNewHighscore(index, parseInt(number));
            callback();
        }
        setModalVisible(false);
    }

    const onResetScore = (): void => {
        onChangeHighscore(0);
        DataManager.instance.setNewHighscore(index, 0);
        callback();
    }

    useEffect(() => {
        const previousHighscore: number = DataManager.instance.getHighscore(index);
        onChangeHighscore(previousHighscore);
    }, []);

    return (
        <View style={
            [
                {
                    width: Platform.OS === 'web' && windowWidth > 500 ? 500 : '90%',
                    height: Platform.OS !== 'web' ? '90%' : '43%'
                }, styles.container]
        }>
            <View style={styles.tabContainer} >
                <View style={[styles.tab, styles.tabLeft]}>
                    <ThemedText style={styles.tabText}>10.</ThemedText>
                </View>
                <View style={[styles.tab, styles.tabRight]}>
                    <BouncyCheckbox
                        style={styles.tabCheckbox}
                        size={25}
                        fillColor="green"
                        unFillColor="#FFFFFF"
                        iconStyle={{ borderColor: "green" }}
                        innerIconStyle={{ borderWidth: 3 }}
                        disableText={true}
                        onPress={(isChecked: boolean) => { console.log(isChecked) }}
                    />
                </View>
            </View>

            <View style={styles.content}>
                {/* <ThemedText adjustsFontSizeToFit={true} numberOfLines={1} style={{
                    fontFamily: 'VixarASCI',
                    fontSize: 35,
                    color: nameColorMap[scenario.type],
                    paddingTop: 25,
                    maxWidth: 260,
                    minHeight: 50
                }}>
                    {scenario.name[lang]}
                </ThemedText> */}

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: 12
                }}>
                    {animalsSourceMap.map((source, index) => {
                        return (
                            <View style={styles.animalContainer} key={index}>
                                <Image source={source} style={styles.animalImage} />
                                <View style={styles.animalLetterTab}>
                                    <ThemedText style={styles.animalLetterTabText}> 
                                        C
                                    </ThemedText>
                                </View>
                                
                            </View>
                        );
                    })}
                </View>

                {/* <CardNames animals={scenario.animals} mapType={scenario.map === 0 ? MapType.A : MapType.B}>
                </CardNames> */}
                
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    <ThemedText>
                        New content Soon
                    </ThemedText>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#e5d8c4',
        flex: 1,
        alignSelf: 'center',
        shadowColor: '#000',
        // shadowOpacity: 0.45,
        // shadowOffset: { width: 0, height: 7 },
        // shadowRadius: 9.31,
        // elevation: 7,
        borderRadius: 20,
        // opacity: .9
    },
    content: {
        backgroundColor: '#e5d8c4',
        // marginTop: 35,
        alignSelf: 'center',
        alignItems: "center",
        shadowColor: '#000',
        shadowOpacity: 0.45,
        shadowOffset: { width: 0, height: 7 },
        shadowRadius: 9.31,
        elevation: 7,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        // opacity: .9
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingLeft: 20,
        // paddingRight: 15
    },
    tab: {
        backgroundColor: '#3a180d',
        width: 'auto',
        height: 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    tabLeft: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    tabRight: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    tabText: {
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        margin: 10
    },
    tabCheckbox: {
        margin: 10
    },
    animalContainer: {
        margin: 5
    },
    animalImage: {
        width: 50,
        height: 50
    },
    animalLetterTab: {
        height: 60,
        width: 40,
        alignSelf: 'center',
        backgroundColor: '#3a180d',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        marginTop: -20,
        zIndex: -10 
    },
    animalLetterTabText: {
        margin: 10,
        marginTop: 27,
        color: '#ac9c79',
        textAlign: 'center',
        fontSize: 25
    },
    appButtonContainer: {
        backgroundColor: "#009688",
        borderRadius: 360,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 50,
        maxWidth: 80
    },
    appButtonText: {
        fontFamily: 'VixarASCI',
        fontSize: 24,
        color: "#fff",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 10,
        fontSize: 25,
        fontFamily: 'VixarASCI',
        textAlign: 'center',
        color: "black",
    },
    input: {
        height: 50,
        width: 70,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        textAlign: 'center'
    },
    inputButton: {
        backgroundColor: "#009688",
        width: 50,
        borderRadius: 360,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10
    },
});

// Button style:
// https://blog.logrocket.com/create-style-custom-buttons-react-native/