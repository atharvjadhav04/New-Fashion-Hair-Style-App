import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function AddHolidayScreen({
    navigation,
    route,
}) {
    const editingHoliday = route?.params?.holiday;

    const [title, setTitle] = useState(
        editingHoliday?.title || ""
    );

    const [date, setDate] = useState(
        editingHoliday?.rawDate
            ? new Date(editingHoliday.rawDate)
            : new Date()
    );

    const [showPicker, setShowPicker] =
        useState(false);

    const isEditing = !!editingHoliday;

    const formatDate = (value) => {
        return value.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const formatDay = (value) => {
        return value.toLocaleDateString("en-IN", {
            weekday: "long",
        });
    };

    const handleDateChange = (event, selectedDate) => {
        setShowPicker(false);

        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert(
                "Holiday Name Required",
                "कृपया holiday चे नाव टाका."
            );
            return;
        }

        const holiday = {
            id:
                editingHoliday?.id ||
                Date.now().toString(),

            title: title.trim(),

            date: formatDate(date),

            day: formatDay(date),

            rawDate: date.toISOString(),
        };

        console.log(
            isEditing
                ? "UPDATE HOLIDAY:"
                : "ADD HOLIDAY:",
            holiday
        );

        Alert.alert(
            isEditing
                ? "Holiday Updated"
                : "Holiday Added",

            isEditing
                ? "Holiday successfully updated."
                : "नवीन holiday successfully add झाला.",

            [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.popTo(
                            "Holidays",
                            {
                                updatedHoliday:
                                    holiday,
                            }
                        );
                    },
                },
            ]
        );
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                {/* Back */}

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                    <Ionicons
                        name="arrow-back"
                        size={20}
                        color={COLORS.black}
                    />

                    <Text style={styles.backText}>
                        Holidays
                    </Text>
                </TouchableOpacity>

                {/* Header */}

                <View style={styles.header}>
                    <View>
                        <Text style={styles.heading}>
                            {isEditing
                                ? "Edit Holiday"
                                : "Add Holiday"}
                        </Text>

                        <Text style={styles.subtitle}>
                            Salon holiday schedule करा
                        </Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="calendar-outline"
                            size={24}
                            color={COLORS.primary}
                        />
                    </View>
                </View>

                {/* Holiday Name */}

                <Text style={styles.label}>
                    Holiday Name
                </Text>

                <View style={styles.inputContainer}>
                    <Ionicons
                        name="text-outline"
                        size={20}
                        color="#888"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="उदा. Independence Day"
                        placeholderTextColor="#999"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                {/* Date */}

                <Text style={styles.label}>
                    Holiday Date
                </Text>

                <TouchableOpacity
                    style={styles.dateSelector}
                    activeOpacity={0.8}
                    onPress={() =>
                        setShowPicker(true)
                    }
                >
                    <View style={styles.dateIcon}>
                        <Ionicons
                            name="calendar"
                            size={22}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.dateInfo}>
                        <Text style={styles.dateValue}>
                            {formatDate(date)}
                        </Text>

                        <Text style={styles.dateDay}>
                            {formatDay(date)}
                        </Text>
                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#888"
                    />
                </TouchableOpacity>

                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={
                            Platform.OS === "ios"
                                ? "spinner"
                                : "default"
                        }
                        minimumDate={new Date()}
                        onChange={
                            handleDateChange
                        }
                    />
                )}

                {/* Preview */}

                <Text style={styles.sectionTitle}>
                    Preview
                </Text>

                <View style={styles.previewCard}>
                    <View style={styles.previewIcon}>
                        <Ionicons
                            name="calendar"
                            size={22}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.previewContent}>
                        <Text style={styles.previewTitle}>
                            {title ||
                                "Holiday Name"}
                        </Text>

                        <Text style={styles.previewDate}>
                            {formatDate(date)}
                        </Text>

                        <Text style={styles.previewDay}>
                            {formatDay(date)}
                        </Text>
                    </View>

                    <View style={styles.closedBadge}>
                        <View
                            style={styles.closedDot}
                        />

                        <Text
                            style={styles.closedText}
                        >
                            Closed
                        </Text>
                    </View>
                </View>

                {/* Save */}

                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.8}
                    onPress={handleSave}
                >
                    <Ionicons
                        name={
                            isEditing
                                ? "checkmark-circle-outline"
                                : "add-circle-outline"
                        }
                        size={21}
                        color={COLORS.black}
                    />

                    <Text style={styles.saveText}>
                        {isEditing
                            ? "Update Holiday"
                            : "Add Holiday"}
                    </Text>
                </TouchableOpacity>

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
        paddingBottom: 50,
    },

    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },

    backText: {
        marginLeft: 7,
        color: "#666",
        fontSize: 12,
        fontWeight: "600",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 25,
    },

    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 5,
        color: "#888",
        fontSize: 11,
    },

    headerIcon: {
        width: 46,
        height: 46,
        borderRadius: 16,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    label: {
        color: COLORS.black,
        fontSize: 13,
        fontWeight: "700",
        marginBottom: 8,
    },

    inputContainer: {
        height: 54,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#EEEEEE",
    },

    input: {
        flex: 1,
        marginLeft: 10,
        color: COLORS.black,
        fontSize: 14,
    },

    dateSelector: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
    },

    dateIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    dateInfo: {
        flex: 1,
        marginLeft: 12,
    },

    dateValue: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "800",
    },

    dateDay: {
        marginTop: 4,
        color: "#888",
        fontSize: 10,
    },

    sectionTitle: {
        marginTop: 27,
        marginBottom: 10,
        color: COLORS.black,
        fontSize: 17,
        fontWeight: "800",
    },

    previewCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
    },

    previewIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    previewContent: {
        flex: 1,
        marginLeft: 12,
    },

    previewTitle: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "800",
    },

    previewDate: {
        marginTop: 4,
        color: COLORS.primary,
        fontSize: 10,
        fontWeight: "700",
    },

    previewDay: {
        marginTop: 2,
        color: "#999",
        fontSize: 9,
    },

    closedBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FDECEC",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 15,
    },

    closedDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#DC2626",
        marginRight: 5,
    },

    closedText: {
        color: "#DC2626",
        fontSize: 8,
        fontWeight: "700",
    },

    saveButton: {
        height: 54,
        borderRadius: RADIUS.xl,
        backgroundColor: COLORS.primary,
        marginTop: 22,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    saveText: {
        marginLeft: 7,
        color: COLORS.black,
        fontSize: 13,
        fontWeight: "800",
    },
});