import React, { useMemo, useState } from "react";
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

const DAY_NAMES = [
    "रवि",
    "सोम",
    "मंगळ",
    "बुध",
    "गुरु",
    "शुक्र",
    "शनि",
];

const MONTH_NAMES = [
    "जानेवारी",
    "फेब्रुवारी",
    "मार्च",
    "एप्रिल",
    "मे",
    "जून",
    "जुलै",
    "ऑगस्ट",
    "सप्टेंबर",
    "ऑक्टोबर",
    "नोव्हेंबर",
    "डिसेंबर",
];

export default function SelectDateScreen({ navigation }) {
    const { updateBooking } = useBooking();

    const dates = useMemo(() => {
        const result = [];
        const today = new Date();

        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            result.push({
                date,
                day: DAY_NAMES[date.getDay()],
                dateNumber: date.getDate(),
                month: MONTH_NAMES[date.getMonth()],
                iso: date.toISOString().split("T")[0],
            });
        }

        return result;
    }, []);

    const [selectedDate, setSelectedDate] = useState(dates[0]);

    const handleContinue = () => {
        updateBooking({
            date: selectedDate.iso,
        });

        navigation.navigate("SelectTime");
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <Text style={styles.heading}>
                    तारीख निवडा
                </Text>

                <Text style={styles.subtitle}>
                    तुमच्या अपॉइंटमेंटसाठी तारीख निवडा
                </Text>

                <Text style={styles.month}>
                    {selectedDate.month}
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.dateList}
                >
                    {dates.map((item) => {
                        const selected =
                            item.iso === selectedDate.iso;

                        return (
                            <TouchableOpacity
                                key={item.iso}
                                activeOpacity={0.8}
                                onPress={() => setSelectedDate(item)}
                                style={[
                                    styles.dateCard,
                                    selected && styles.selectedDateCard,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.day,
                                        selected && styles.selectedText,
                                    ]}
                                >
                                    {item.day}
                                </Text>

                                <Text
                                    style={[
                                        styles.dateNumber,
                                        selected && styles.selectedText,
                                    ]}
                                >
                                    {item.dateNumber}
                                </Text>

                                <Text
                                    style={[
                                        styles.monthSmall,
                                        selected && styles.selectedText,
                                    ]}
                                >
                                    {item.month.slice(0, 3)}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <View style={styles.selectedInfo}>
                    <Text style={styles.selectedLabel}>
                        निवडलेली तारीख
                    </Text>

                    <Text style={styles.selectedDate}>
                        {selectedDate.day}, {selectedDate.dateNumber}{" "}
                        {selectedDate.month}
                    </Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>
                        💡 लक्षात ठेवा
                    </Text>

                    <Text style={styles.infoText}>
                        उपलब्ध वेळ तुमच्या निवडलेल्या सेवा आणि
                        बार्बरच्या उपलब्धतेनुसार बदलू शकतो.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.bottomButton}>
                <PrimaryButton
                    title="वेळ निवडा"
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

    month: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.black,
    },

    dateList: {
        paddingVertical: 18,
    },

    dateCard: {
        width: 72,
        height: 92,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#EEEEEE",
    },

    selectedDateCard: {
        backgroundColor: COLORS.black,
        borderColor: COLORS.primary,
    },

    day: {
        fontSize: 13,
        color: "#777",
        fontWeight: "600",
    },

    dateNumber: {
        marginTop: 6,
        fontSize: 25,
        fontWeight: "700",
        color: COLORS.black,
    },

    monthSmall: {
        marginTop: 3,
        fontSize: 11,
        color: "#888",
    },

    selectedText: {
        color: COLORS.primary,
    },

    selectedInfo: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 10,
    },

    selectedLabel: {
        color: "#888",
        fontSize: 13,
    },

    selectedDate: {
        marginTop: 6,
        fontSize: 19,
        fontWeight: "700",
        color: COLORS.black,
    },

    infoCard: {
        backgroundColor: "#FFF8E5",
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 16,
    },

    infoTitle: {
        fontWeight: "700",
        color: COLORS.black,
    },

    infoText: {
        marginTop: 7,
        color: "#666",
        lineHeight: 20,
    },

    bottomButton: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.lg,
        paddingTop: 8,
        backgroundColor: COLORS.background,
    },
});