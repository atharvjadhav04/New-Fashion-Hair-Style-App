import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../../context/LanguageContext";
import { COLORS, SPACING, RADIUS } from "../../theme";

import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import AppScreen from "../../components/common/AppScreen";
import { useAuth } from "../../context/AuthContext";
const GENDER_OPTIONS = [
    {
        labelKey: "male",
        value: "Male",
        icon: "male-outline",
    },
    {
        labelKey: "female",
        value: "Female",
        icon: "female-outline",
    },
    {
        labelKey: "other",
        value: "Other",
        icon: "transgender-outline",
    },
];

export default function CompleteProfileScreen({ navigation }) {
    const { t, language } = useTranslation();
    const [name, setName] = useState("");
    const [gender, setGender] = useState("Male");
    const [dob, setDob] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const { login } = useAuth();

    const isFormValid =
        name.trim().length >= 2 &&
        dob !== null;

    const formatDate = (date) => {
        if (!date) {
            return language === "mr"
                ? "जन्म तारीख निवडा"
                : "Select date of birth";
        }
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

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
                        {/* Header Badge */}
                        <View style={styles.header}>
                            <View style={styles.iconBadge}>
                                <Ionicons
                                    name="person-add-outline"
                                    size={30}
                                    color={COLORS.primary}
                                />
                            </View>
                            <Text style={styles.screenTitle}>
                                {t("completeProfile")}
                            </Text>
                            <Text style={styles.screenSubtitle}>
                                {t("profileSubtitle")}
                            </Text>
                        </View>

                        {/* Form Card */}
                        <AuthCard style={styles.cardOverride}>
                            {/* Full Name Input */}
                            <InputField
                                label={t("fullName")}
                                placeholder={
                                    language === "mr"
                                        ? "उदा. राहुल पाटील"
                                        : "e.g. Rahul Patil"
                                }
                                value={name}
                                onChangeText={setName}
                            />

                            {/* Date of Birth Picker Button */}
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>
                                    {t("dateOfBirth")}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={[
                                        styles.dateButton,
                                        dob && styles.activeDateButton,
                                    ]}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <View style={styles.dateLeft}>
                                        <Ionicons
                                            name="calendar-outline"
                                            size={18}
                                            color={
                                                dob
                                                    ? COLORS.black
                                                    : "#9CA3AF"
                                            }
                                        />
                                        <Text
                                            style={[
                                                styles.dateText,
                                                !dob && styles.placeholderText,
                                            ]}
                                        >
                                            {formatDate(dob)}
                                        </Text>
                                    </View>
                                    <Ionicons
                                        name="chevron-down-outline"
                                        size={18}
                                        color="#6B7280"
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Native Date Picker Component */}
                            {showDatePicker && (
                                <DateTimePicker
                                    value={dob || new Date(2000, 0, 1)}
                                    mode="date"
                                    display="default"
                                    maximumDate={new Date()}
                                    onChange={(event, selectedDate) => {
                                        setShowDatePicker(false);
                                        if (selectedDate) {
                                            setDob(selectedDate);
                                        }
                                    }}
                                />
                            )}

                            {/* Gender Selection */}
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>
                                    {t("gender")}
                                </Text>
                                <View style={styles.genderRow}>
                                    {GENDER_OPTIONS.map((item) => {
                                        const isSelected =
                                            gender === item.value;
                                        return (
                                            <TouchableOpacity
                                                key={item.value}
                                                activeOpacity={0.8}
                                                style={[
                                                    styles.genderButton,
                                                    isSelected &&
                                                    styles.selectedGender,
                                                ]}
                                                onPress={() =>
                                                    setGender(item.value)
                                                }
                                            >
                                                <Ionicons
                                                    name={item.icon}
                                                    size={16}
                                                    color={
                                                        isSelected
                                                            ? COLORS.primary
                                                            : "#6B7280"
                                                    }
                                                />
                                                <Text
                                                    style={[
                                                        styles.genderText,
                                                        isSelected &&
                                                        styles.selectedGenderText,
                                                    ]}
                                                >
                                                    {t(item.labelKey)}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>

                            {/* Action Button */}
                            <PrimaryButton
                                title={t("continue")}
                                disabled={!isFormValid}
                                onPress={() => {
                                    login({
                                        role: "CUSTOMER",
                                        name,
                                        dateOfBirth: dob,
                                        gender,
                                    });
                                }}
                            />
                        </AuthCard>

                        {/* Footer Guarantee */}
                        <View style={styles.privacyNote}>
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={14}
                                color="#6B7280"
                            />
                            <Text style={styles.privacyText}>
                                {t("privacyNote")}
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

    header: {
        alignItems: "center",
        marginBottom: 24,
    },

    iconBadge: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#1F1A0E",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: "#3D3012",
    },

    screenTitle: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.white,
        letterSpacing: -0.3,
        textAlign: "center",
    },

    screenSubtitle: {
        color: "#9CA3AF",
        fontSize: 13,
        marginTop: 4,
        textAlign: "center",
    },

    cardOverride: {
        padding: SPACING.lg,
    },

    fieldGroup: {
        marginBottom: 20,
    },

    fieldLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 8,
    },

    dateButton: {
        height: 52,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        borderRadius: RADIUS.xl,
        paddingHorizontal: 16,
        backgroundColor: "#F9FAFB",
    },

    activeDateButton: {
        borderColor: COLORS.black,
        backgroundColor: COLORS.white,
    },

    dateLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    dateText: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.black,
        marginLeft: 10,
    },

    placeholderText: {
        color: "#9CA3AF",
        fontWeight: "500",
    },

    genderRow: {
        flexDirection: "row",
        gap: 8,
    },

    genderButton: {
        flex: 1,
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: RADIUS.xl,
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        backgroundColor: "#F9FAFB",
    },

    selectedGender: {
        backgroundColor: COLORS.black,
        borderColor: COLORS.black,
    },

    genderText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#4B5563",
        marginLeft: 6,
    },

    selectedGenderText: {
        color: COLORS.white,
    },

    privacyNote: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
    },

    privacyText: {
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 6,
    },
});