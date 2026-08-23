import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { Ionicons } from "@expo/vector-icons";

import { COLORS, SPACING, RADIUS } from "../../theme";

import AuthCard from "../../components/auth/AuthCard";
import PrimaryButton from "../../components/common/PrimaryButton";
import AppScreen from "../../components/common/AppScreen";

export default function OtpScreen({ navigation, route }) {
    const phoneNumber = route?.params?.phoneNumber || "98765 43210";

    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    // Active Countdown Timer
    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer]);

    const handleResend = () => {
        if (!canResend) return;
        setTimer(30);
        setCanResend(false);
        setOtp("");
        // Resend OTP logic here
    };

    const isOtpComplete = otp.length === 6;

    return (
        <AppScreen style={styles.screen}>
            <StatusBar
                backgroundColor={COLORS.black}
                barStyle="light-content"
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                    >
                        {/* Header Navigation / Back Action */}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={22}
                                color={COLORS.white}
                            />
                        </TouchableOpacity>

                        {/* Top Decorative Icon */}
                        <View style={styles.iconBadge}>
                            <Ionicons
                                name="chatbubble-ellipses-outline"
                                size={32}
                                color={COLORS.primary}
                            />
                        </View>

                        {/* Screen Title & Target Phone Number */}
                        <Text style={styles.title}>OTP पडताळणी</Text>

                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subtitle}>
                                +91 {phoneNumber} वर ६-अंकी कोड पाठवला आहे.
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.changeNumberText}>
                                    नंबर बदला?
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Wrapped Card for Input Form */}
                        <AuthCard style={styles.cardOverride}>
                            <View style={styles.otpInputWrapper}>
                                <OtpInput
                                    numberOfDigits={6}
                                    onTextChange={setOtp}
                                    focusColor={COLORS.primary}
                                    theme={{
                                        containerStyle: styles.otpContainer,
                                        pinCodeContainerStyle: styles.box,
                                        pinCodeTextStyle: styles.boxText,
                                        focusedPinCodeContainerStyle:
                                            styles.activeBox,
                                    }}
                                />
                            </View>

                            {/* Resend & Timer Info */}
                            <View style={styles.resendContainer}>
                                {timer > 0 ? (
                                    <View style={styles.timerBadge}>
                                        <Ionicons
                                            name="time-outline"
                                            size={16}
                                            color={COLORS.primary}
                                        />
                                        <Text style={styles.timerText}>
                                            00:{timer < 10 ? `0${timer}` : timer}
                                        </Text>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={handleResend}
                                        style={styles.resendButton}
                                    >
                                        <Ionicons
                                            name="refresh-outline"
                                            size={16}
                                            color={COLORS.primary}
                                        />
                                        <Text style={styles.resendText}>
                                            OTP पुन्हा पाठवा
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* Submit Button */}
                            <PrimaryButton
                                title="पडताळणी करा"
                                disabled={!isOtpComplete}
                                onPress={() =>
                                    navigation.navigate("Language")
                                }
                            />
                        </AuthCard>

                        {/* Security Banner */}
                        <View style={styles.trustFooter}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={14}
                                color="#6B7280"
                            />
                            <Text style={styles.trustText}>
                                २-स्टेप सुरक्षित ऑटो पडताळणी प्रक्रिया
                            </Text>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.black,
    },

    keyboardView: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        padding: SPACING.lg,
        paddingVertical: SPACING.xl,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#18181B",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#27272A",
    },

    iconBadge: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: "#1F1A0E",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: "#3D3012",
    },

    title: {
        color: COLORS.white,
        fontSize: 26,
        fontWeight: "800",
        textAlign: "center",
        letterSpacing: -0.3,
    },

    subtitleContainer: {
        alignItems: "center",
        marginTop: 6,
        marginBottom: 28,
        paddingHorizontal: SPACING.sm,
    },

    subtitle: {
        color: "#9CA3AF",
        textAlign: "center",
        fontSize: 14,
        lineHeight: 20,
    },

    changeNumberText: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: "700",
        marginTop: 4,
    },

    cardOverride: {
        padding: SPACING.lg,
    },

    otpInputWrapper: {
        marginVertical: 10,
    },

    otpContainer: {
        justifyContent: "space-between",
    },

    box: {
        width: 44,
        height: 52,
        borderRadius: RADIUS.lg,
        backgroundColor: "#F9FAFB",
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
    },

    activeBox: {
        borderColor: COLORS.primary,
        backgroundColor: "#FFFDF9",
    },

    boxText: {
        color: COLORS.black,
        fontSize: 20,
        fontWeight: "800",
    },

    resendContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 18,
        marginBottom: 24,
    },

    timerBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1F1A0E",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: "#3D3012",
    },

    timerText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "800",
        marginLeft: 6,
    },

    resendButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
    },

    resendText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "700",
        marginLeft: 6,
    },

    trustFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 28,
    },

    trustText: {
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 6,
    },
});