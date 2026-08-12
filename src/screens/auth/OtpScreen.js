import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
} from "react-native";

import { OtpInput } from "react-native-otp-entry";

import {
    COLORS,
    SPACING,
} from "../../theme";

import PrimaryButton from "../../components/common/PrimaryButton";
import AppScreen from "../../components/common/AppScreen";
export default function OtpScreen({ navigation }) {

    const [otp, setOtp] = useState("");

    return (

        <AppScreen style={styles.container}>

            <StatusBar
                backgroundColor={COLORS.black}
                barStyle="light-content"
            />

            <Text style={styles.title}>
                OTP पडताळणी
            </Text>

            <Text style={styles.subtitle}>
                9876543210 वर OTP पाठवला आहे.
            </Text>

            <OtpInput
                numberOfDigits={6}
                onTextChange={setOtp}
                theme={{
                    pinCodeContainerStyle: styles.box,
                    pinCodeTextStyle: styles.boxText,
                }}
            />

            <Text style={styles.timer}>
                00 : 30
            </Text>

            <Text style={styles.resend}>
                OTP पुन्हा पाठवा
            </Text>

            <PrimaryButton
                title="पडताळणी करा"
                onPress={() =>
                    navigation.navigate("CompleteProfile")
                }
            />

        </AppScreen>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        justifyContent: "center",
        padding: SPACING.lg,
    },

    title: {
        color: COLORS.white,
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
    },

    subtitle: {
        color: "#BBBBBB",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 35,
        fontSize: 15,
    },

    box: {
        width: 50,
        height: 60,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        borderWidth: 0,
    },

    boxText: {
        color: COLORS.black,
        fontSize: 22,
        fontWeight: "700",
    },

    timer: {
        textAlign: "center",
        color: COLORS.primary,
        marginTop: 35,
        fontSize: 18,
        fontWeight: "700",
    },

    resend: {
        textAlign: "center",
        color: "#BBBBBB",
        marginVertical: 30,
    },

});