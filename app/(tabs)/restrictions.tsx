import React, { useEffect, useRef, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Animated,
    useWindowDimensions,
    Platform
} from 'react-native';

import externalData from '@/data/AchievementsData.json';
import DataManager from '@/data/DataManager';
import Achievement from '@/components/main/Achievement';
import MainScreen from '@/components/main/MainScreensLayout';
import { useTaskContext } from '@/hooks/configContext';

const data: any = externalData;

export default function Restrictions({ navigation }: any) {
    let scrollX = useRef(new Animated.Value(0)).current;
    const [xCoords, setXCoords] = useState([] as number[]);
    const [loaded, setLoaded] = useState(false);
    const [fullyLoaded, setFullyLoaded] = useState(false);
    const refScrollView = useRef(null);
    const { width: windowWidth } = useWindowDimensions();
    const [fadeAnim] = useState(new Animated.Value(1));
    const mode = useTaskContext().mode;
    const [currentCompletedAchievements, setCurrentCompletedAchievements] = useState(0);

    useEffect(() => {
        updateCurrentAchievementsCount();
    }, [mode]);

    const updateCurrentAchievementsCount = () => {
        setCurrentCompletedAchievements(DataManager.instance.getCompletedAchievementsCount('restriction'));
    };

    return (
        <MainScreen children={
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
                            // listener: handleScroll
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

                        {(data[mode].restrictions).map((text:string, index: number) => {
                            return (
                                <View key={index}>
                                    <Achievement info={text} index={index} type={'restriction'} callback={updateCurrentAchievementsCount} />
                                </View>
                            );
                        })}
                    </View>
                    <View style={{ height: 80 }} />
                </ScrollView>
            </View>
        } data={{
            current: currentCompletedAchievements,
            total: DataManager.instance.getTotalAchievements('restriction')
        }}>
        </MainScreen>
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
