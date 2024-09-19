import { StyleSheet, Image, Platform, SafeAreaView, ImageBackground, View, Animated } from 'react-native';
import { Info } from './Info';
import { AchievementsCount } from './AchievementsCount';

interface IAchievementsCount {
    current: number,
    total: number
}

export default function MainScreen({ children, data }: {children: any, data: IAchievementsCount}) {
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
                    <AchievementsCount current={data.current} total={data.total} />
                </View>

                {children}
            </ImageBackground>
            {/* <Animated.View style={{
                flex: 1,
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                position: 'absolute',
                opacity: fadeAnim,
                display: fullyLoaded ? 'none' : 'flex'
            }} /> */}
        </SafeAreaView>
    );
}

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
});