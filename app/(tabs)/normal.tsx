import Card from '@/components/main/Card';
import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Animated,
    useWindowDimensions,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';

import data from '@/data/AchievementsData.json';
import { IAnimalInfo } from '@/components/main/CardNames';
import DataManager from '@/data/DataManager';
import { ILoc, Info } from '@/components/main/Info';
import { MedalsCount } from '@/components/main/MedalsCount';
import { ScenarioNumber } from '@/components/main/ScenarioNumber';
import { ThemedText } from '@/components/ThemedText';
import { TextWithIcons } from '@/components/main/TextWithIcons';
import { useTaskContext } from '@/hooks/configContext';
import localization from '@/data/Localization.json';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Achievement from '@/components/main/Achievement';

export interface IScenario {
    cards: string[],
    score: number,
    extra: {
        [lang: string]: string
    }[]
}

export default function NormalGame({ navigation }: any) {
    let scrollX = useRef(new Animated.Value(0)).current;
    const [xCoords, setXCoords] = useState([] as number[]);
    const [loaded, setLoaded] = useState(false);
    const [fullyLoaded, setFullyLoaded] = useState(false);
    const refScrollView = useRef(null);
    const { width: windowWidth } = useWindowDimensions();
    const [fadeAnim] = useState(new Animated.Value(1));
    const [currentMedals, setCurrentMedals] = useState(0);
    const lang = useTaskContext().lang;
    const texts: ILoc = localization;

    useEffect(() => {
        // refScrollView.current.scrollTo({x: xCoords[2], animated: false});
        updateCurrentMedals();
        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start(({ finished }) => {
                if (finished) {
                    setFullyLoaded(true);
                }
            })
        }, 200);
    }, [loaded, refScrollView]);

    const handleScroll = (event: any) => {
        const index: number = xCoords.indexOf((scrollX as any).__getValue(), 0);
        if (index !== -1) {
            DataManager.instance.setLastScenario(index);
        }
    };

    const updateCurrentMedals = () => {
        setCurrentMedals(DataManager.instance.getGoldMedals());
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('@/assets/images/background.jpg')} style={{
                width: '100%',
                height: '100%',
                justifyContent: "center",
                // alignItems: "center",
                flex: 1
            }}>
                <View style={{ height: 80 }} />
                <View style={styles.topBarContainer}>
                    <Info />
                    <MedalsCount current={currentMedals} />
                </View>
                <View style={styles.scrollContainer}>
                    <ScrollView
                        ref={refScrollView}
                        showsVerticalScrollIndicator={true}
                        onScroll={
                            Animated.event([
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: scrollX
                                        }
                                    },
                                },
                            ], {
                                useNativeDriver: false,
                                listener: handleScroll
                            })
                        }
                        scrollEventThrottle={1}>
                        <View
                            style={{
                                width: windowWidth,
                                height: 'auto',
                                marginBottom: 15,
                                marginLeft: 20
                            }}
                            onLayout={
                                event => {
                                }
                            }>

                            {(data.normal_achievements).map((text, index) => {
                                return (
                                    <View key={index}>
                                        <Achievement info={text} index={index} callback={() => { }} />
                                    </View>
                                );
                            })}
                        </View>
                        <View style={{ height: 80 }} />
                    </ScrollView>
                </View>
            </ImageBackground>
            <Animated.View style={{
                flex: 1,
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                position: 'absolute',
                opacity: fadeAnim,
                display: fullyLoaded ? 'none' : 'flex'
            }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 15,
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
        borderRadius: 20
        // opacity: .9
    },
    extraContainer: {
        flexDirection: 'row',
        margin: 2,
        marginTop: 20
    },
    checkbox: {
        marginLeft: 'auto'
    },
    scrollContainer: {
        height: 550,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        // marginBottom: 170
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: 'slategray', // or steelblue
        marginHorizontal: 4,
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -8,
        display: Platform.OS === 'web' ? 'none' : 'flex'
    },
});