import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
} from "react-native";

import { COLORS } from "../../theme";

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
                barStyle="light-content"
                backgroundColor={COLORS.black}
            />

            <Text style={styles.logo}>
                ✂️
            </Text>

            <Text style={styles.title}>
                न्यू फॅशन
            </Text>

            <Text style={styles.subtitle}>
                हेअर स्टाईल
            </Text>

            <Text style={styles.tagline}>
                Premium Men's Salon
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        fontSize: 70,
    },

    title: {
        marginTop: 20,
        fontSize: 34,
        color: COLORS.white,
        fontWeight: "700",
    },

    subtitle: {
        marginTop: 8,
        fontSize: 24,
        color: COLORS.primary,
        fontWeight: "600",
    },

    tagline: {
        marginTop: 16,
        color: "#AAAAAA",
        fontSize: 16,
    },

});