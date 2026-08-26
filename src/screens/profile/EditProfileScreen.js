import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";

import { useAuth } from "../../context/AuthContext";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default function EditProfileScreen({ navigation }) {

    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user?.name || "");

    const [gender, setGender] = useState(
        user?.gender || "Male"
    );

    const [dob, setDob] = useState(
        user?.dateOfBirth
            ? new Date(user.dateOfBirth)
            : null
    );

    const [showDatePicker, setShowDatePicker] =
        useState(false);

    const formatDate = (date) => {

        if (!date) {
            return "जन्मतारीख निवडा";
        }

        const day = date
            .getDate()
            .toString()
            .padStart(2, "0");

        const month = (date.getMonth() + 1)
            .toString()
            .padStart(2, "0");

        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const handleSave = () => {

        if (name.trim().length < 2) {
            return;
        }

        updateProfile({
            name: name.trim(),
            gender,
            dateOfBirth: dob,
        });

        navigation.goBack();
    };

    return (
        <AppScreen style={styles.screen}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                {/* Header */}

                <View style={styles.header}>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={22}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>

                    <View>

                        <Text style={styles.heading}>
                            प्रोफाइल एडिट करा
                        </Text>

                        <Text style={styles.subtitle}>
                            तुमची माहिती अपडेट करा
                        </Text>

                    </View>

                </View>


                {/* Form Card */}

                <View style={styles.card}>

                    <InputField
                        label="पूर्ण नाव"
                        value={name}
                        onChangeText={setName}
                        placeholder="तुमचे पूर्ण नाव"
                    />


                    {/* DOB */}

                    <View style={styles.fieldGroup}>

                        <Text style={styles.label}>
                            जन्मतारीख
                        </Text>

                        <TouchableOpacity
                            style={styles.dateButton}
                            onPress={() =>
                                setShowDatePicker(true)
                            }
                        >

                            <View style={styles.dateLeft}>

                                <Ionicons
                                    name="calendar-outline"
                                    size={20}
                                    color={COLORS.primary}
                                />

                                <Text style={styles.dateText}>
                                    {formatDate(dob)}
                                </Text>

                            </View>

                            <Ionicons
                                name="chevron-down"
                                size={18}
                                color="#6B7280"
                            />

                        </TouchableOpacity>

                    </View>


                    {showDatePicker && (

                        <DateTimePicker
                            value={
                                dob ||
                                new Date(2000, 0, 1)
                            }
                            mode="date"
                            maximumDate={new Date()}
                            onChange={(
                                event,
                                selectedDate
                            ) => {

                                setShowDatePicker(
                                    Platform.OS === "ios"
                                );

                                if (selectedDate) {
                                    setDob(selectedDate);
                                }

                            }}
                        />

                    )}


                    {/* Gender */}

                    <Text style={styles.label}>
                        लिंग
                    </Text>

                    <View style={styles.genderRow}>

                        {["Male", "Female", "Other"].map(
                            (item) => (

                                <TouchableOpacity
                                    key={item}
                                    style={[
                                        styles.genderButton,

                                        gender === item &&
                                        styles.selectedGender,
                                    ]}
                                    onPress={() =>
                                        setGender(item)
                                    }
                                >

                                    <Text
                                        style={[
                                            styles.genderText,

                                            gender === item &&
                                            styles.selectedGenderText,
                                        ]}
                                    >
                                        {item === "Male"
                                            ? "पुरुष"
                                            : item === "Female"
                                                ? "महिला"
                                                : "इतर"}
                                    </Text>

                                </TouchableOpacity>

                            )
                        )}

                    </View>

                </View>


                {/* Save Button */}

                <PrimaryButton
                    title="बदल सेव्ह करा"
                    onPress={handleSave}
                />

            </ScrollView>

        </AppScreen>
    );
}


const styles = StyleSheet.create({

    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        padding: SPACING.lg,
        paddingBottom: 40,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 28,
    },

    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    heading: {
        fontSize: 24,
        fontWeight: "800",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 3,
        fontSize: 13,
        color: "#6B7280",
    },

    card: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        marginBottom: 24,
    },

    fieldGroup: {
        marginTop: 20,
        marginBottom: 20,
    },

    label: {
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.black,
        marginBottom: 8,
    },

    dateButton: {
        height: 52,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    dateLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    dateText: {
        marginLeft: 10,
        fontSize: 14,
        color: COLORS.black,
        fontWeight: "600",
    },

    genderRow: {
        flexDirection: "row",
        gap: 8,
    },

    genderButton: {
        flex: 1,
        height: 48,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
    },

    selectedGender: {
        backgroundColor: COLORS.black,
        borderColor: COLORS.black,
    },

    genderText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#4B5563",
    },

    selectedGenderText: {
        color: COLORS.white,
    },

});