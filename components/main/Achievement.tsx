import { ThemedText } from "@/components/ThemedText";
import DataManager from "@/data/DataManager";
import React, { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Platform, useWindowDimensions } from "react-native";
import { useTaskContext } from "@/hooks/configContext";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TextWithIcons } from "./TextWithIcons";

export default function Achievement({ info, index, type, callback }: { info: any, index: number, type: 'normal' | 'restriction', callback: Function }) {
    const [completed, onChangeCompleted] = React.useState(false);
    const { width: windowWidth } = useWindowDimensions();
    const lang = useTaskContext().lang;

    const onChangeAchievementState = (complete: boolean): void => {
        DataManager.instance.setAchievementCompletedState(index, type, complete);
        onChangeCompleted(complete);
        callback();
    }

    useEffect(() => {
        onChangeCompleted(DataManager.instance.getAchievementState(index, type));
    }, []);

    return (
        <View style={
            [
                {
                    width: Platform.OS === 'web' && windowWidth > 500 ? 500 : '90%',
                    height: Platform.OS !== 'web' ? '90%' : '43%'
                }, styles.container]
        }>
            <View style={{
                flexDirection: 'row',
            }}>
                <View style={styles.numberContainer}>
                    <ThemedText style={styles.numberText}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}
                    > {index + 1}. </ThemedText>
                </View>
                <View style={styles.content}>
                    <View style={{
                        display: 'flex',
                        marginTop: 10,
                        marginBottom: 10
                    }}>
                        <View style={styles.extraContainer} key={index}>
                            <TextWithIcons content={info[lang]} flex={14} />
                            <BouncyCheckbox
                                style={styles.checkbox}
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
                                        onChangeAchievementState(isChecked);
                                    }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        backgroundColor: '#e5d8c4',
        flex: 5,
        shadowColor: '#000',
        shadowOpacity: 0.45,
        shadowOffset: { width: 0, height: 7 },
        shadowRadius: 9.31,
        elevation: 7,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        marginTop: 10,
        borderStyle: 'solid',
        borderColor: '#3a180d',
        borderWidth: 2
        // opacity: .9
    },
    checkbox: {
        flex: 2,
        marginLeft: 'auto',
        paddingRight: 10,
        paddingLeft: 10
    },
    extraContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 5
    },
    numberContainer: {
        flex: 1,
        backgroundColor: '#3a180d',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberText: {
        fontFamily: 'Volkoba',
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        verticalAlign: 'middle',
        alignSelf: 'center',
        margin: 8
    }
});