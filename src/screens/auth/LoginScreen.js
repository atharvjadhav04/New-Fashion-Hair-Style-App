import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import Images from "../../constants/Images";
import { COLORS, SPACING, RADIUS } from "../../theme";
import {
    useTranslation,
} from "../../context/LanguageContext";
import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import AppScreen from "../../components/common/AppScreen";

export default function LoginScreen({ navigation }) {
    const [phone, setPhone] = useState("");
    const { t } = useTranslation();
    const isPhoneValid = phone.trim().length === 10;

    return (
        <AppScreen style={styles.screen}>
            <StatusBar backgroundColor={COLORS.black} barStyle="light-content" />

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
                        {/* Brand Header */}
                        <View style={styles.header}>
                            <View style={styles.logoWrapper}>
                                <Image
                                    source={Images.logo}
                                    style={styles.logo}
                                    contentFit="contain"
                                />
                            </View>

                            <Text style={styles.shopName}>
                                न्यू फॅशन हेअर स्टाईल
                            </Text>

                            <View style={styles.tagBadge}>
                                <Ionicons
                                    name="sparkles"
                                    size={12}
                                    color={COLORS.primary}
                                />
                                <Text style={styles.tagText}>
                                    PREMIUM GROOMING EXPERIENCE
                                </Text>
                            </View>
                        </View>

                        {/* Login Form Card */}
                        <AuthCard style={styles.cardOverride}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.heading}>
                                    {t("loginWelcome")}
                                </Text>
                                <Text style={styles.subheading}>
                                    {t("loginSubtitle")}
                                </Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <InputField
                                    label={t("mobileNumber")}
                                    placeholder="98765 43210"
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    value={phone}
                                    onChangeText={setPhone}
                                    leftIcon={
                                        <Text style={styles.countryCode}>
                                            +91
                                        </Text>
                                    }
                                />
                            </View>

                            <PrimaryButton
                                title={t("sendOtp")}
                                disabled={!isPhoneValid}
                                onPress={() => navigation.navigate("Otp")}
                            />
                        </AuthCard>

                        {/* Footer Badges */}
                        <View style={styles.footerContainer}>
                            <View style={styles.trustItem}>
                                <Ionicons
                                    name="shield-checkmark-outline"
                                    size={14}
                                    color="#6B7280"
                                />
                                <Text style={styles.trustText}>
                                    {t("secure")}
                                </Text>
                            </View>
                            <Text style={styles.dotSeparator}>•</Text>
                            <View style={styles.trustItem}>
                                <Ionicons
                                    name="flash-outline"
                                    size={14}
                                    color="#6B7280"
                                />
                                <Text style={styles.trustText}>
                                    {t("fast")}
                                </Text>
                            </View>
                            <Text style={styles.dotSeparator}>•</Text>
                            <View style={styles.trustItem}>
                                <Ionicons
                                    name="ribbon-outline"
                                    size={14}
                                    color="#6B7280"
                                />
                                <Text style={styles.trustText}>
                                    {t("trusted")}
                                </Text>
                            </View>
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

    header: {
        alignItems: "center",
        marginBottom: 28,
    },

    logoWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#18181B",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.primary,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.25,
                shadowRadius: 12,
            },
            android: {
                elevation: 6,
            },
        }),
    },

    logo: {
        width: 68,
        height: 68,
    },

    shopName: {
        color: COLORS.white,
        textAlign: "center",
        fontSize: 26,
        fontWeight: "800",
        letterSpacing: -0.3,
    },

    tagBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1F1A0E",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: RADIUS.lg,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#3D3012",
    },

    tagText: {
        color: COLORS.primary,
        fontSize: 10,
        fontWeight: "700",
        marginLeft: 6,
        letterSpacing: 0.8,
    },

    cardOverride: {
        padding: SPACING.lg,
    },

    cardHeader: {
        marginBottom: 20,
    },

    heading: {
        fontSize: 22,
        fontWeight: "800",
        color: COLORS.text,
        letterSpacing: -0.3,
    },

    subheading: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 4,
        fontWeight: "500",
    },

    inputContainer: {
        marginBottom: 20,
    },

    countryCode: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.black,
        marginRight: 8,
    },

    footerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 28,
    },

    trustItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    trustText: {
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 4,
    },

    dotSeparator: {
        color: "#4B5563",
        marginHorizontal: 10,
        fontSize: 12,
    },
});