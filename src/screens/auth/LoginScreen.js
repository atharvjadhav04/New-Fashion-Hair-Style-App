import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
} from "react-native";

import { Image } from "expo-image";

import Images from "../../constants/Images";

import {
    COLORS,
    SPACING,
} from "../../theme";

import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import AppScreen from "../../components/common/AppScreen";
export default function LoginScreen({ navigation }) {

    const [phone, setPhone] = useState("");

    return (
        <AppScreen style={styles.container}>
            <StatusBar
                backgroundColor="#000"
                barStyle="light-content"
            />

            <Image
                source={Images.logo}
                style={styles.logo}
                contentFit="contain"
            />

            <Text style={styles.shop}>
                न्यू फॅशन हेअर स्टाईल
            </Text>

            <Text style={styles.tag}>
                Premium Grooming Experience
            </Text>

            <AuthCard>

                <Text style={styles.heading}>
                    स्वागत आहे 👋
                </Text>

                <InputField
                    label="मोबाईल नंबर"
                    placeholder="9876543210"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />

                <PrimaryButton
                    title="OTP पाठवा"
                    onPress={() => navigation.navigate("Otp")}
                />

            </AuthCard>

            <Text style={styles.bottom}>
                सुरक्षित • जलद • विश्वासार्ह
            </Text>

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

    logo: {
        width: 130,
        height: 130,
        alignSelf: "center",
    },

    shop: {
        color: COLORS.white,
        textAlign: "center",
        fontSize: 28,
        fontWeight: "700",
        marginTop: 10,
    },

    tag: {
        color: COLORS.primary,
        textAlign: "center",
        marginBottom: 35,
        marginTop: 5,
    },

    heading: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 30,
        color: COLORS.text,
    },

    bottom: {
        textAlign: "center",
        color: "#999",
        marginTop: 25,
        fontSize: 13,
    },

});