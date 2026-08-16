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
    Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default function AddHolidayScreen({ navigation, route }) {
    const editingHoliday = route?.params?.holiday;

    const [title, setTitle] = useState(editingHoliday?.title || "");
    const [date, setDate] = useState(
        editingHoliday?.rawDate
            ? new Date(editingHoliday.rawDate)
            : new Date()
    );
    const [showPicker, setShowPicker] = useState(false);

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
        if (Platform.OS === "android") {
            setShowPicker(false);
        }
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert("Holiday Name Required", "कृपया holiday चे नाव टाका.");
            return;
        }

        const holiday = {
            id: editingHoliday?.id || Date.now().toString(),
            title: title.trim(),
            date: formatDate(date),
            day: formatDay(date),
            rawDate: date.toISOString(),
        };

        Alert.alert(
            isEditing ? "Holiday Updated" : "Holiday Added",
            isEditing
                ? "Holiday successfully updated."
                : "नवीन holiday successfully add झाला.",
            [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.popTo("Holidays", {
                            updatedHoliday: holiday,
                        });
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
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color={COLORS.black || "#0F172A"}
                    />
                    <Text style={styles.backText}>Holidays</Text>
                </TouchableOpacity>

                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.headerTextGroup}>
                        <Text style={styles.heading}>
                            {isEditing ? "Edit Holiday" : "Add Holiday"}
                        </Text>
                        <Text style={styles.subtitle}>
                            Salon holiday schedule करा
                        </Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="calendar-outline"
                            size={22}
                            color={COLORS.primary || "#F59E0B"}
                        />
                    </View>
                </View>

                {/* Holiday Name Input */}
                <Text style={styles.label}>Holiday Name</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="text-outline" size={20} color="#64748B" />
                    <TextInput
                        style={styles.input}
                        placeholder="उदा. Independence Day"
                        placeholderTextColor="#94A3B8"
                        value={title}
                        onChangeText={setTitle}
                        autoCapitalize="words"
                    />
                </View>

                {/* Holiday Date Selector */}
                <Text style={styles.label}>Holiday Date</Text>
                <TouchableOpacity
                    style={styles.dateSelector}
                    activeOpacity={0.8}
                    onPress={() => setShowPicker(true)}
                >
                    <View style={styles.dateIcon}>
                        <Ionicons
                            name="calendar"
                            size={20}
                            color={COLORS.primary || "#F59E0B"}
                        />
                    </View>

                    <View style={styles.dateInfo}>
                        <Text style={styles.dateValue}>{formatDate(date)}</Text>
                        <Text style={styles.dateDay}>{formatDay(date)}</Text>
                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#94A3B8"
                    />
                </TouchableOpacity>

                {/* Date Picker (Platform specific handling) */}
                {showPicker && Platform.OS === "ios" && (
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={showPicker}
                        onRequestClose={() => setShowPicker(false)}
                    >
                        <View style={styles.iosModalOverlay}>
                            <View style={styles.iosPickerContainer}>
                                <View style={styles.iosPickerHeader}>
                                    <TouchableOpacity
                                        onPress={() => setShowPicker(false)}
                                    >
                                        <Text style={styles.iosDoneText}>
                                            Done
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="spinner"
                                    minimumDate={new Date()}
                                    onChange={handleDateChange}
                                />
                            </View>
                        </View>
                    </Modal>
                )}

                {showPicker && Platform.OS === "android" && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        minimumDate={new Date()}
                        onChange={handleDateChange}
                    />
                )}

                {/* Live Card Preview */}
                <Text style={styles.sectionTitle}>Preview</Text>
                <View style={styles.previewCard}>
                    <View style={styles.previewIcon}>
                        <Ionicons
                            name="calendar-sharp"
                            size={22}
                            color={COLORS.primary || "#F59E0B"}
                        />
                    </View>

                    <View style={styles.previewContent}>
                        <Text style={styles.previewTitle} numberOfLines={1}>
                            {title || "Holiday Name"}
                        </Text>
                        <Text style={styles.previewDate}>
                            {formatDate(date)}
                        </Text>
                        <Text style={styles.previewDay}>{formatDay(date)}</Text>
                    </View>

                    <View style={styles.closedBadge}>
                        <View style={styles.closedDot} />
                        <Text style={styles.closedText}>Closed</Text>
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.85}
                    onPress={handleSave}
                >
                    <Ionicons
                        name={
                            isEditing
                                ? "checkmark-circle-outline"
                                : "add-circle-outline"
                        }
                        size={22}
                        color={COLORS.black || "#0F172A"}
                    />
                    <Text style={styles.saveText}>
                        {isEditing ? "Update Holiday" : "Add Holiday"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background || "#F8FAFC",
    },
    content: {
        padding: SPACING.lg || 16,
        paddingBottom: 40,
    },

    // Back Header
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        alignSelf: "flex-start",
    },
    backText: {
        marginLeft: 4,
        color: "#64748B",
        fontSize: 14,
        fontWeight: "600",
    },

    // Screen Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    headerTextGroup: {
        flex: 1,
        marginRight: 12,
    },
    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
        letterSpacing: -0.5,
    },
    subtitle: {
        marginTop: 4,
        color: "#64748B",
        fontSize: 13,
        fontWeight: "500",
    },
    headerIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },

    // Form Inputs & Selectors
    label: {
        color: COLORS.black || "#0F172A",
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 8,
        marginTop: 6,
    },
    inputContainer: {
        height: 52,
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.lg || 14,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "500",
    },
    dateSelector: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.lg || 14,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 24,
    },
    dateIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },
    dateInfo: {
        flex: 1,
        marginLeft: 12,
    },
    dateValue: {
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "700",
    },
    dateDay: {
        marginTop: 2,
        color: "#64748B",
        fontSize: 12,
        fontWeight: "500",
    },

    // Preview Card
    sectionTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
        marginBottom: 12,
    },
    previewCard: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 28,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
            },
            android: {
                elevation: 1.5,
            },
        }),
    },
    previewIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },
    previewContent: {
        flex: 1,
        marginLeft: 14,
        marginRight: 8,
    },
    previewTitle: {
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "700",
    },
    previewDate: {
        marginTop: 3,
        color: "#0284C7",
        fontSize: 13,
        fontWeight: "600",
    },
    previewDay: {
        marginTop: 2,
        color: "#64748B",
        fontSize: 12,
    },
    closedBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FEE2E2",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    closedDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#DC2626",
        marginRight: 6,
    },
    closedText: {
        color: "#DC2626",
        fontSize: 12,
        fontWeight: "700",
    },

    // iOS Picker Modal
    iosModalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(15, 23, 42, 0.4)",
    },
    iosPickerContainer: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 30,
    },
    iosPickerHeader: {
        padding: 16,
        alignItems: "flex-end",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    iosDoneText: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.primary || "#F59E0B",
    },

    // Save Button
    saveButton: {
        height: 54,
        borderRadius: RADIUS.xl || 16,
        backgroundColor: COLORS.primary || "#F59E0B",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.12,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    saveText: {
        marginLeft: 8,
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "800",
    },
});