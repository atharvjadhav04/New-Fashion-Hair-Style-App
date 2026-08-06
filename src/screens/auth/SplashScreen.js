import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
} from "react-native";

import { Image } from "expo-image";

import { COLORS, SPACING } from "../../theme";
import Images from "../../constants/Images";

export default function SplashScreen({ navigation }) {

    useEffect(() => {

        const timer = setTimeout(() => {
            navigation.replace("Login");
        }, 2500);

        return () => clearTimeout(timer);

    }, []);

    return (
        <View style={styles.container}>

            <StatusBar
                backgroundColor="#000"
                barStyle="light-content"
            />

            <Image
                source={Images.logo}
                style={styles.logo}
                contentFit="contain"
            />

            <Text style={styles.title}>
                NEW FASHION
            </Text>

            <Text style={styles.subtitle}>
                HAIR STYLE
            </Text>

            <Text style={styles.tagline}>
                Premium Grooming Experience
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: SPACING.lg,
    },

    logo: {
        width: 180,
        height: 180,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "700",
        marginTop: 10,
        letterSpacing: 2,
    },

    subtitle: {
        color: COLORS.primary,
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 4,
        marginTop: 5,
    },

    tagline: {
        color: "#888",
        marginTop: 25,
        fontSize: 15,
    },

});