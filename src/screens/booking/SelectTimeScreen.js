import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import PrimaryButton from "../../components/common/PrimaryButton";

import { useBooking } from "../../context/BookingContext";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

const TIME_GROUPS = [
    {
        title: "सकाळ",
        icon: "sunny-outline",
        slots: [
            { time: "09:00 AM", available: true },
            { time: "09:30 AM", available: true },
            { time: "10:00 AM", available: false },
            { time: "10:30 AM", available: true },
            { time: "11:00 AM", available: true },
            { time: "11:30 AM", available: false },
        ],
    },
    {
        title: "दुपार",
        icon: "partly-sunny-outline",
        slots: [
            { time: "12:00 PM", available: true },
            { time: "12:30 PM", available: true },
            { time: "01:00 PM", available: false },
            { time: "01:30 PM", available: true },
            { time: "02:00 PM", available: true },
            { time: "02:30 PM", available: true },
        ],
    },
    {
        title: "संध्याकाळ",
        icon: "moon-outline",
        slots: [
            { time: "04:00 PM", available: true },
            { time: "04:30 PM", available: false },
            { time: "05:00 PM", available: true },
            { time: "05:30 PM", available: true },
            { time: "06:00 PM", available: true },
            { time: "06:30 PM", available: false },
            { time: "07:00 PM", available: true },
        ],
    },
];

export default function SelectTimeScreen({ navigation }) {
    const { booking, updateBooking } = useBooking();
    const [selectedTime, setSelectedTime] = useState(null);

    const handleContinue = () => {
        if (!selectedTime) return;

        updateBooking({
            time: selectedTime,
        });

        navigation.navigate("BookingSummary");
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <Text style={styles.heading}>वेळ निवडा</Text>
                <Text style={styles.subtitle}>
                    तुमच्या सोयीनुसार मोकळा स्लॉट निवडा
                </Text>

                {/* Selected Date Summary Card */}
                <View style={styles.dateCard}>
                    <View style={styles.dateIconWrapper}>
                        <Ionicons
                            name="calendar"
                            size={20}
                            color={COLORS.primary}
                        />
                    </View>
                    <View style={styles.dateInfo}>
                        <Text style={styles.dateLabel}>निवडलेली तारीख</Text>
                        <Text style={styles.dateValue}>
                            {booking.date || "तारीख निवडा"}
                        </Text>
                    </View>
                </View>

                {/* Slot Status Legend */}
                <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, styles.legendAvailable]} />
                        <Text style={styles.legendText}>उपलब्ध</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, styles.legendSelected]} />
                        <Text style={styles.legendText}>निवडलेले</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, styles.legendFull]} />
                        <Text style={styles.legendText}>फुल (Full)</Text>
                    </View>
                </View>

                {/* Time Groups & Slot Grid */}
                {TIME_GROUPS.map((group) => (
                    <View key={group.title} style={styles.group}>
                        <View style={styles.groupHeader}>
                            <Ionicons
                                name={group.icon}
                                size={18}
                                color={COLORS.black}
                            />
                            <Text style={styles.groupTitle}>{group.title}</Text>
                        </View>

                        <View style={styles.slotsGrid}>
                            {group.slots.map((slot) => {
                                const selected = selectedTime === slot.time;

                                return (
                                    <TouchableOpacity
                                        key={slot.time}
                                        disabled={!slot.available}
                                        activeOpacity={0.7}
                                        onPress={() => setSelectedTime(slot.time)}
                                        style={[
                                            styles.slot,
                                            !slot.available && styles.disabledSlot,
                                            selected && styles.selectedSlot,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.slotText,
                                                !slot.available && styles.disabledText,
                                                selected && styles.selectedText,
                                            ]}
                                        >
                                            {slot.time}
                                        </Text>

                                        {!slot.available && (
                                            <View style={styles.fullBadge}>
                                                <Text style={styles.fullText}>
                                                    फुल
                                                </Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Sticky Bottom Action Footer */}
            <View style={styles.bottomButtonContainer}>
                <PrimaryButton
                    title={selectedTime ? `${selectedTime} - बुकिंग तपासा` : "वेळ निवडा"}
                    disabled={!selectedTime}
                    onPress={handleContinue}
                />
            </View>
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
        paddingBottom: 140,
    },

    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black,
        letterSpacing: -0.4,
    },

    subtitle: {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 14,
        marginBottom: 20,
    },

    dateCard: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },

    dateIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#262626",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },

    dateInfo: {
        flex: 1,
    },

    dateLabel: {
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },

    dateValue: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: "800",
        marginTop: 2,
    },

    legendContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: RADIUS.lg,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "#F3F4F6",
    },

    legendItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },

    legendAvailable: {
        backgroundColor: "#10B981",
    },

    legendSelected: {
        backgroundColor: COLORS.primary,
    },

    legendFull: {
        backgroundColor: "#D1D5DB",
    },

    legendText: {
        fontSize: 12,
        color: "#4B5563",
        fontWeight: "600",
    },

    group: {
        marginBottom: 24,
    },

    groupHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    groupTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.black,
        marginLeft: 8,
        letterSpacing: -0.2,
    },

    slotsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },

    slot: {
        width: "31%",
        minHeight: 52,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        borderWidth: 1.5,
        borderColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 4,
            },
            android: {
                elevation: 1,
            },
        }),
    },

    selectedSlot: {
        backgroundColor: COLORS.black,
        borderColor: COLORS.primary,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 4,
            },
        }),
    },

    disabledSlot: {
        backgroundColor: "#F9FAFB",
        borderColor: "#F3F4F6",
    },

    slotText: {
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.black,
    },

    selectedText: {
        color: COLORS.primary,
    },

    disabledText: {
        color: "#D1D5DB",
    },

    fullBadge: {
        marginTop: 3,
        backgroundColor: "#FEF2F2",
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 4,
    },

    fullText: {
        fontSize: 9,
        fontWeight: "700",
        color: "#EF4444",
    },

    bottomButtonContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.lg,
        paddingTop: 12,
        paddingBottom: Platform.OS === "ios" ? 28 : SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
});