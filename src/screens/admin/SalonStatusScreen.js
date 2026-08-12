import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Switch,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function SalonStatusScreen() {
    const [isOpen, setIsOpen] = useState(true);

    const [openingTime, setOpeningTime] =
        useState(new Date(2026, 0, 1, 9, 0));

    const [closingTime, setClosingTime] =
        useState(new Date(2026, 0, 1, 21, 0));

    const [pickerType, setPickerType] =
        useState(null);

    const formatTime = (date) => {
        return date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const handleTimeChange = (event, selectedTime) => {
        setPickerType(null);

        if (!selectedTime) {
            return;
        }

        if (pickerType === "opening") {
            setOpeningTime(selectedTime);
        }

        if (pickerType === "closing") {
            setClosingTime(selectedTime);
        }
    };
    const saveSalonStatus = () => {
        const openingMinutes =
            openingTime.getHours() * 60 +
            openingTime.getMinutes();

        const closingMinutes =
            closingTime.getHours() * 60 +
            closingTime.getMinutes();

        if (openingMinutes >= closingMinutes) {
            alert(
                "Closing time must be after opening time."
            );
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

                    <View>
                        <Text style={styles.heading}>
                            Salon Status
                        </Text>

                        <Text style={styles.subtitle}>
                            Salon open, close आणि timing व्यवस्थापित करा
                        </Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="storefront-outline"
                            size={24}
                            color={COLORS.primary}
                        />
                    </View>

                </View>

                {/* Current Status */}

                <View style={styles.statusCard}>

                    <View style={styles.statusIcon}>
                        <Ionicons
                            name={
                                isOpen
                                    ? "checkmark-circle"
                                    : "close-circle"
                            }
                            size={28}
                            color={
                                isOpen
                                    ? "#22C55E"
                                    : "#EF4444"
                            }
                        />
                    </View>

                    <View style={styles.statusInfo}>

                        <Text style={styles.statusTitle}>
                            Salon is{" "}
                            {isOpen
                                ? "Open"
                                : "Closed"}
                        </Text>

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
                            false: "#DDD",
                            true: COLORS.primary,
                        }}
                        thumbColor="#FFF"
                    />

                </View>

                {/* Today's Timing */}

                <Text style={styles.sectionTitle}>
                    Today's Timing
                </Text>

                <Text style={styles.sectionSubtitle}>
                    Salon आज किती वेळ open राहील
                </Text>

                <View style={styles.timeRow}>

                    {/* Opening */}

                    <View style={styles.timeCard}>

                        <View style={styles.timeIcon}>
                            <Ionicons
                                name="sunny-outline"
                                size={22}
                                color={COLORS.primary}
                            />
                        </View>

                        <Text style={styles.timeLabel}>
                            Opening Time
                        </Text>

                        <Text style={styles.timeValue}>
                            {formatTime(openingTime)}
                        </Text>

                        <TouchableOpacity
                            style={styles.changeButton}
                            onPress={() =>
                                setPickerType("opening")
                            }
                        >
                            <Text style={styles.changeText}>
                                Change
                            </Text>
                        </TouchableOpacity>

                    </View>

                    {/* Closing */}

                    <View style={styles.timeCard}>

                        <View style={styles.timeIcon}>
                            <Ionicons
                                name="moon-outline"
                                size={22}
                                color={COLORS.primary}
                            />
                        </View>

                        <Text style={styles.timeLabel}>
                            Closing Time
                        </Text>

                        <Text style={styles.timeValue}>
                            {formatTime(closingTime)}
                        </Text>

                        <TouchableOpacity
                            style={styles.changeButton}
                            onPress={() =>
                                setPickerType("closing")
                            }
                        >
                            <Text style={styles.changeText}>
                                Change
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.8}
                    onPress={saveSalonStatus}
                >
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={21}
                        color={COLORS.black}
                    />

                    <Text style={styles.saveText}>
                        Save Salon Status
                    </Text>
                </TouchableOpacity>

                {/* Information */}

                <View style={styles.infoCard}>

                    <View style={styles.infoIcon}>
                        <Ionicons
                            name="information-circle-outline"
                            size={21}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.infoContent}>

                        <Text style={styles.infoTitle}>
                            Important
                        </Text>

                        <Text style={styles.infoText}>
                            Salon बंद असल्यास customers नवीन
                            appointment book करू शकणार नाहीत.
                            Existing appointments मात्र admin
                            कडून manage करता येतील.
                        </Text>

                    </View>

                </View>
                {pickerType && (
                    <DateTimePicker
                        value={
                            pickerType === "opening"
                                ? openingTime
                                : closingTime
                        }
                        mode="time"
                        display="default"
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
        backgroundColor: COLORS.background,
    },

    content: {
        padding: SPACING.lg,
        paddingBottom: 50,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    heading: {
        fontSize: 30,
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

    statusCard: {
        marginTop: 24,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
    },

    statusIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    statusInfo: {
        flex: 1,
        marginLeft: 12,
    },

    statusTitle: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: "800",
    },

    statusSubtitle: {
        marginTop: 4,
        color: "#888",
        fontSize: 10,
    },

    sectionTitle: {
        marginTop: 28,
        color: COLORS.black,
        fontSize: 18,
        fontWeight: "800",
    },

    sectionSubtitle: {
        marginTop: 4,
        marginBottom: 12,
        color: "#999",
        fontSize: 10,
    },

    timeRow: {
        flexDirection: "row",
        gap: 10,
    },

    timeCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 15,
    },

    timeIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    timeLabel: {
        marginTop: 12,
        color: "#888",
        fontSize: 10,
    },

    timeValue: {
        marginTop: 5,
        color: COLORS.black,
        fontSize: 19,
        fontWeight: "800",
    },

    changeButton: {
        marginTop: 12,
        height: 34,
        borderRadius: 10,
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "center",
    },

    changeText: {
        color: COLORS.black,
        fontSize: 10,
        fontWeight: "700",
    },

    infoCard: {
        marginTop: 20,
        padding: 14,
        borderRadius: 16,
        backgroundColor: "#FFF7E0",
        flexDirection: "row",
        alignItems: "flex-start",
    },

    infoIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    infoContent: {
        flex: 1,
        marginLeft: 10,
    },

    infoTitle: {
        color: COLORS.black,
        fontSize: 12,
        fontWeight: "800",
    },

    infoText: {
        marginTop: 4,
        color: "#8A6700",
        fontSize: 10,
        lineHeight: 16,
    },
    saveButton: {
        height: 54,
        borderRadius: RADIUS.xl,
        backgroundColor: COLORS.primary,
        marginTop: 20,
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