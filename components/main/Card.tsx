import { IScenario } from "@/app/(tabs)/scenarios";
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
import { Ribbon } from "./Ribbon";
import { TextWithIcons } from "./TextWithIcons";


const animalsSourceMap: ImageSourcePropType[] = [
    require("@/assets/images/animals/bear.png"),
    require("@/assets/images/animals/elk.png"),
    require("@/assets/images/animals/salmon.png"),
    require("@/assets/images/animals/hawk.png"),
    require("@/assets/images/animals/fox.png"),
]

export default function Card({ scenario, index, callback }: { scenario: IScenario, index: number, callback: Function }) {
    const [completed, onChangeCompleted] = React.useState(false);
    const { width: windowWidth } = useWindowDimensions();
    const lang = useTaskContext().lang;
    const texts: ILoc = localization;
    
    const onChangeScenarioState = (complete: boolean): void => {
        DataManager.instance.setScenarioCompletedState(index, complete);
        onChangeCompleted(complete);
    }

    useEffect(() => {
        onChangeCompleted(DataManager.instance.isScenarioCompleted(index));
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
                    <ThemedText style={styles.tabText}> {index + 1}. </ThemedText>
                    <Ribbon content={scenario.score.toString()} />
                </View>
                <View style={[styles.tab, styles.tabRight]}>
                    <BouncyCheckbox
                        style={styles.tabCheckbox}
                        size={30}
                        fillColor="#408c80"
                        unFillColor="#FFFFFF"
                        iconStyle={{ borderColor: "#408c80" }}
                        innerIconStyle={{ borderWidth: 3 }}
                        disableText={true}
                        // disabled={completed}
                        isChecked={completed}
                        onPress={
                            (isChecked: boolean) => {
                                onChangeScenarioState(isChecked);
                            }}
                    />
                </View>
            </View>

            <View style={styles.content}>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: 12
                }}>
                    {scenario.cards.map((card, index) => {
                        return (
                            <View style={styles.animalContainer} key={index}>
                                <Image source={animalsSourceMap[index]} style={styles.animalImage} />
                                <View style={styles.animalLetterTab}>
                                    <ThemedText style={styles.animalLetterTabText}>
                                        {card}
                                    </ThemedText>
                                </View>

                            </View>
                        );
                    })}
                </View>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    <View style={styles.extraContainer}>
                        {scenario.extra.map((info, index) => {
                            return (
                                <View key={index}>
                                    <TextWithIcons content={info[lang]} />
                                </View>
                            );
                        })}
                    </View>
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
        height: 45,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        display: 'flex',
        flexDirection: 'row',
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
        fontFamily: 'Volkoba',
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    tabCheckbox: {
        margin: 10,
        alignSelf: 'center'
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
        fontFamily: 'LocalBrewery',
        fontSize: 28,
        lineHeight: 30,
        margin: 10,
        marginTop: 30,
        color: '#ac9c79',
        textAlign: 'center'
    },
    extraContainer: {
        margin: 2
    },
    extraText: {
        fontFamily: 'Mackinac',
        fontSize: 16,
        color: '#000',
        textAlign: 'left'
    },
    appButtonContainer: {
        backgroundColor: "#009688",
        borderRadius: 360,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 50,
        maxWidth: 80
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
        fontFamily: 'LocalBrewery',
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