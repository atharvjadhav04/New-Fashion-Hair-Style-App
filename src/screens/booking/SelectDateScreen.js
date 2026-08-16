import React, { useMemo, useState } from "react";
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
                isToday: i === 0,
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
                    तुमच्या अपॉइंटमेंटसाठी सोयीस्कर तारीख निवडा
                </Text>

                {/* Section Header */}
                <View style={styles.monthHeader}>
                    <Ionicons
                        name="calendar-outline"
                        size={18}
                        color={COLORS.primary}
                    />
                    <Text style={styles.monthText}>
                        {selectedDate.month} 2026
                    </Text>
                </View>

                {/* Date Selection Carousel */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.dateList}
                >
                    {dates.map((item) => {
                        const selected = item.iso === selectedDate.iso;

                        return (
                            <TouchableOpacity
                                key={item.iso}
                                activeOpacity={0.7}
                                onPress={() => setSelectedDate(item)}
                                style={[
                                    styles.dateCard,
                                    selected && styles.selectedDateCard,
                                ]}
                            >
                                {item.isToday && (
                                    <View
                                        style={[
                                            styles.todayBadge,
                                            selected && styles.selectedTodayBadge,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.todayText,
                                                selected && styles.selectedTodayText,
                                            ]}
                                        >
                                            आज
                                        </Text>
                                    </View>
                                )}

                                <Text
                                    style={[
                                        styles.day,
                                        selected && styles.selectedDayText,
                                    ]}
                                >
                                    {item.day}
                                </Text>

                                <Text
                                    style={[
                                        styles.dateNumber,
                                        selected && styles.selectedNumberText,
                                    ]}
                                >
                                    {item.dateNumber}
                                </Text>

                                <Text
                                    style={[
                                        styles.monthSmall,
                                        selected && styles.selectedMonthText,
                                    ]}
                                >
                                    {item.month.slice(0, 3)}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Active Choice Overview Card */}
                <View style={styles.selectedInfo}>
                    <View style={styles.selectedHeader}>
                        <View style={styles.selectedIconWrapper}>
                            <Ionicons
                                name="checkmark-circle-outline"
                                size={22}
                                color={COLORS.primary}
                            />
                        </View>
                        <View style={styles.selectedTextContainer}>
                            <Text style={styles.selectedLabel}>
                                निवडलेली तारीख
                            </Text>
                            <Text style={styles.selectedDate}>
                                {selectedDate.day}, {selectedDate.dateNumber}{" "}
                                {selectedDate.month}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Tip/Notice Banner */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIconWrapper}>
                        <Ionicons
                            name="information-circle-outline"
                            size={20}
                            color="#B45309"
                        />
                    </View>
                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>लक्षात ठेवा</Text>
                        <Text style={styles.infoText}>
                            निवडलेल्या तारखेनुसार उपलब्ध वेळा आणि बार्बरचे स्लॉट्स
                            पुढील स्क्रीनवर बदलू शकतात.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Bottom Footer */}
            <View style={styles.bottomButtonContainer}>
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
        paddingBottom: 150,
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

    monthHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    monthText: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.black,
        marginLeft: 8,
        letterSpacing: -0.2,
    },

    dateList: {
        paddingVertical: 6,
        paddingRight: SPACING.lg,
    },

    dateCard: {
        width: 72,
        height: 104,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: "#F3F4F6",
        paddingTop: 8,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.03,
                shadowRadius: 6,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    selectedDateCard: {
        backgroundColor: COLORS.black,
        borderColor: COLORS.primary,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
            },
            android: {
                elevation: 5,
            },
        }),
    },

    todayBadge: {
        position: "absolute",
        top: 6,
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },

    selectedTodayBadge: {
        backgroundColor: "#262626",
    },

    todayText: {
        fontSize: 9,
        fontWeight: "700",
        color: "#4B5563",
    },

    selectedTodayText: {
        color: COLORS.primary,
    },

    day: {
        fontSize: 12,
        color: "#9CA3AF",
        fontWeight: "600",
        marginTop: 8,
    },

    selectedDayText: {
        color: "#D1D5DB",
    },

    dateNumber: {
        marginTop: 2,
        fontSize: 24,
        fontWeight: "800",
        color: COLORS.black,
    },

    selectedNumberText: {
        color: COLORS.primary,
    },

    monthSmall: {
        marginTop: 2,
        fontSize: 11,
        color: "#6B7280",
        fontWeight: "500",
    },

    selectedMonthText: {
        color: "#9CA3AF",
    },

    selectedInfo: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 24,
        borderWidth: 1,
        borderColor: "#F3F4F6",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.03,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    selectedHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    selectedIconWrapper: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#FFFDF9",
        borderWidth: 1,
        borderColor: "#FEF3C7",
        alignItems: "center",
        justifyContent: "center",
    },

    selectedTextContainer: {
        marginLeft: 14,
        flex: 1,
    },

    selectedLabel: {
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },

    selectedDate: {
        marginTop: 2,
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.black,
    },

    infoCard: {
        backgroundColor: "#FEF3C7",
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 14,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#FDE68A",
    },

    infoIconWrapper: {
        marginTop: 2,
    },

    infoContent: {
        marginLeft: 10,
        flex: 1,
    },

    infoTitle: {
        fontWeight: "700",
        fontSize: 13,
        color: "#92400E",
    },

    infoText: {
        marginTop: 3,
        color: "#B45309",
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "500",
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