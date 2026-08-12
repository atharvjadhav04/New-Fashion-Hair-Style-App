import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

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
        if (!selectedTime) {
            return;
        }

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
                <Text style={styles.heading}>
                    वेळ निवडा
                </Text>

                <Text style={styles.subtitle}>
                    तुमच्यासाठी योग्य वेळ निवडा
                </Text>

                <View style={styles.dateCard}>
                    <Text style={styles.dateLabel}>
                        निवडलेली तारीख
                    </Text>

                    <Text style={styles.dateValue}>
                        {booking.date || "तारीख निवडा"}
                    </Text>
                </View>

                {TIME_GROUPS.map((group) => (
                    <View
                        key={group.title}
                        style={styles.group}
                    >
                        <Text style={styles.groupTitle}>
                            {group.title}
                        </Text>

                        <View style={styles.slots}>
                            {group.slots.map((slot) => {
                                const selected =
                                    selectedTime === slot.time;

                                return (
                                    <TouchableOpacity
                                        key={slot.time}
                                        disabled={!slot.available}
                                        activeOpacity={0.8}
                                        onPress={() =>
                                            setSelectedTime(slot.time)
                                        }
                                        style={[
                                            styles.slot,
                                            !slot.available &&
                                            styles.disabledSlot,
                                            selected &&
                                            styles.selectedSlot,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.slotText,
                                                !slot.available &&
                                                styles.disabledText,
                                                selected &&
                                                styles.selectedText,
                                            ]}
                                        >
                                            {slot.time}
                                        </Text>

                                        {!slot.available && (
                                            <Text style={styles.fullText}>
                                                Full
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.bottomButton}>
                <PrimaryButton
                    title="बुकिंग तपासा"
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
        paddingBottom: 120,
    },

    heading: {
        fontSize: 30,
        fontWeight: "700",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 8,
        color: "#777",
        fontSize: 15,
    },

    dateCard: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 25,
    },

    dateLabel: {
        color: "#AAA",
        fontSize: 13,
    },

    dateValue: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: "700",
        marginTop: 5,
    },

    group: {
        marginTop: 28,
    },

    groupTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.black,
        marginBottom: 14,
    },

    slots: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },

    slot: {
        width: "31%",
        minHeight: 52,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        alignItems: "center",
        justifyContent: "center",
    },

    selectedSlot: {
        backgroundColor: COLORS.black,
        borderColor: COLORS.primary,
    },

    disabledSlot: {
        backgroundColor: "#EEEEEE",
        borderColor: "#EEEEEE",
    },

    slotText: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.black,
    },

    selectedText: {
        color: COLORS.primary,
    },

    disabledText: {
        color: "#AAAAAA",
        textDecorationLine: "line-through",
    },

    fullText: {
        fontSize: 9,
        color: "#999",
        marginTop: 2,
    },

    bottomButton: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.lg,
        paddingTop: 8,
        backgroundColor: COLORS.background,
    },
});