import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Switch,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import AppScreen from "../../components/common/AppScreen";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default function SalonStatusScreen() {
    const [isOpen, setIsOpen] = useState(true);
    const [openingTime, setOpeningTime] = useState(new Date(2026, 0, 1, 9, 0));
    const [closingTime, setClosingTime] = useState(new Date(2026, 0, 1, 21, 0));
    const [pickerType, setPickerType] = useState(null);

    const formatTime = (date) => {
        return date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const handleTimeChange = (event, selectedTime) => {
        if (Platform.OS === "android") {
            setPickerType(null);
        }

        if (event.type === "dismissed" || !selectedTime) {
            return;
        }

        if (pickerType === "opening") {
            setOpeningTime(selectedTime);
        } else if (pickerType === "closing") {
            setClosingTime(selectedTime);
        }
    };

    const saveSalonStatus = () => {
        const openingMinutes =
            openingTime.getHours() * 60 + openingTime.getMinutes();
        const closingMinutes =
            closingTime.getHours() * 60 + closingTime.getMinutes();

        if (openingMinutes >= closingMinutes) {
            alert("Closing time must be after opening time.");
            return;
        }

        console.log("SALON STATUS:", {
            isOpen,
            openingTime: formatTime(openingTime),
            closingTime: formatTime(closingTime),
        });

        alert("Salon status updated successfully.");
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.heading}>Salon Status</Text>
                        <Text style={styles.subtitle}>
                            Salon open, close आणि timing व्यवस्थापित करा
                        </Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="storefront-outline"
                            size={22}
                            color={COLORS.primary || "#000"}
                        />
                    </View>
                </View>

                {/* Current Status Card */}
                <View style={styles.statusCard}>
                    <View
                        style={[
                            styles.statusIconBg,
                            { backgroundColor: isOpen ? "#DCFCE7" : "#FEE2E2" },
                        ]}
                    >
                        <Ionicons
                            name={isOpen ? "storefront" : "lock-closed"}
                            size={24}
                            color={isOpen ? "#16A34A" : "#DC2626"}
                        />
                    </View>

                    <View style={styles.statusInfo}>
                        <View style={styles.statusRow}>
                            <Text style={styles.statusTitle}>Salon is</Text>
                            <View
                                style={[
                                    styles.badge,
                                    { backgroundColor: isOpen ? "#DCFCE7" : "#FEE2E2" },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.badgeText,
                                        { color: isOpen ? "#15803D" : "#B91C1C" },
                                    ]}
                                >
                                    {isOpen ? "OPEN" : "CLOSED"}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.statusSubtitle}>
                            {isOpen
                                ? "Customers can book appointments"
                                : "New bookings are currently disabled"}
                        </Text>
                    </View>

                    <Switch
                        value={isOpen}
                        onValueChange={setIsOpen}
                        trackColor={{
                            false: "#E2E8F0",
                            true: COLORS.primary || "#000",
                        }}
                        thumbColor="#FFF"
                    />
                </View>

                {/* Today's Timing Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Today's Timing</Text>
                    <Text style={styles.sectionSubtitle}>
                        Salon आज किती वेळ open राहील set करा
                    </Text>
                </View>

                <View style={styles.timeRow}>
                    {/* Opening Time Card */}
                    <View style={styles.timeCard}>
                        <View style={styles.timeHeader}>
                            <View style={styles.timeIcon}>
                                <Ionicons
                                    name="sunny-outline"
                                    size={20}
                                    color={COLORS.primary || "#000"}
                                />
                            </View>
                            <Text style={styles.timeLabel}>Opening</Text>
                        </View>

                        <Text style={styles.timeValue}>{formatTime(openingTime)}</Text>

                        <TouchableOpacity
                            style={styles.changeButton}
                            activeOpacity={0.7}
                            onPress={() => setPickerType("opening")}
                        >
                            <Ionicons name="time-outline" size={14} color="#475569" />
                            <Text style={styles.changeText}>Change</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Closing Time Card */}
                    <View style={styles.timeCard}>
                        <View style={styles.timeHeader}>
                            <View style={styles.timeIcon}>
                                <Ionicons
                                    name="moon-outline"
                                    size={20}
                                    color={COLORS.primary || "#000"}
                                />
                            </View>
                            <Text style={styles.timeLabel}>Closing</Text>
                        </View>

                        <Text style={styles.timeValue}>{formatTime(closingTime)}</Text>

                        <TouchableOpacity
                            style={styles.changeButton}
                            activeOpacity={0.7}
                            onPress={() => setPickerType("closing")}
                        >
                            <Ionicons name="time-outline" size={14} color="#475569" />
                            <Text style={styles.changeText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIcon}>
                        <Ionicons
                            name="information-circle"
                            size={20}
                            color="#D97706"
                        />
                    </View>
                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>Important Note</Text>
                        <Text style={styles.infoText}>
                            Salon बंद असल्यास customers नवीन appointment book करू शकणार नाहीत.
                            Existing appointments मात्र admin कडून manage करता येतील.
                        </Text>
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.85}
                    onPress={saveSalonStatus}
                >
                    <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#FFF"
                    />
                    <Text style={styles.saveText}>Save Salon Status</Text>
                </TouchableOpacity>

                {/* Date Time Picker Modal / Sheet */}
                {pickerType && (
                    <DateTimePicker
                        value={pickerType === "opening" ? openingTime : closingTime}
                        mode="time"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={handleTimeChange}
                    />
                )}
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
        padding: SPACING.lg || 20,
        paddingBottom: 40,
    },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    headerTextContainer: {
        flex: 1,
        marginRight: 12,
    },
    heading: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
        letterSpacing: -0.5,
    },
    subtitle: {
        marginTop: 4,
        color: "#64748B",
        fontSize: 13,
        lineHeight: 18,
    },
    headerIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
    },

    // Status Card
    statusCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: RADIUS.xl || 20,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F1F5F9",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    statusIconBg: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    statusInfo: {
        flex: 1,
        marginLeft: 14,
        marginRight: 8,
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    statusTitle: {
        color: COLORS.black || "#0F172A",
        fontSize: 16,
        fontWeight: "700",
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 0.5,
    },
    statusSubtitle: {
        marginTop: 3,
        color: "#64748B",
        fontSize: 12,
    },

    // Section Headers
    sectionHeader: {
        marginTop: 28,
        marginBottom: 12,
    },
    sectionTitle: {
        color: COLORS.black || "#0F172A",
        fontSize: 18,
        fontWeight: "700",
    },
    sectionSubtitle: {
        marginTop: 2,
        color: "#64748B",
        fontSize: 13,
    },

    // Time Cards
    timeRow: {
        flexDirection: "row",
        gap: 12,
    },
    timeCard: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: RADIUS.xl || 20,
        padding: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    timeHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    timeIcon: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
    },
    timeLabel: {
        color: "#64748B",
        fontSize: 12,
        fontWeight: "600",
    },
    timeValue: {
        marginTop: 12,
        marginBottom: 14,
        color: COLORS.black || "#0F172A",
        fontSize: 18,
        fontWeight: "800",
    },
    changeButton: {
        height: 38,
        borderRadius: 10,
        backgroundColor: "#F1F5F9",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    changeText: {
        color: "#334155",
        fontSize: 12,
        fontWeight: "600",
    },

    // Info Card
    infoCard: {
        marginTop: 24,
        padding: 14,
        borderRadius: 16,
        backgroundColor: "#FFFBEB",
        borderWidth: 1,
        borderColor: "#FDE68A",
        flexDirection: "row",
        alignItems: "flex-start",
    },
    infoIcon: {
        marginTop: 2,
    },
    infoContent: {
        flex: 1,
        marginLeft: 10,
    },
    infoTitle: {
        color: "#92400E",
        fontSize: 13,
        fontWeight: "700",
    },
    infoText: {
        marginTop: 2,
        color: "#B45309",
        fontSize: 12,
        lineHeight: 18,
    },

    // Save Button
    saveButton: {
        height: 52,
        borderRadius: RADIUS.xl || 16,
        backgroundColor: COLORS.black || "#0F172A",
        marginTop: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    saveText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
});