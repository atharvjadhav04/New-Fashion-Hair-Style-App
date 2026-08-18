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
                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>तारीख निवडा</Text>
                    <Text style={styles.subtitle}>
                        तुमच्या अपॉइंटमेंटसाठी सोयीस्कर तारीख निवडा
                    </Text>
                </View>

                {/* Section Header */}
                <View style={styles.monthHeader}>
                    <Ionicons
                        name="calendar-outline"
                        size={18}
                        color={COLORS.primary || "#F59E0B"}
                    />
                    <Text style={styles.monthText}>
                        {selectedDate.month} {selectedDate.date.getFullYear()}
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
                                activeOpacity={0.8}
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
                                name="calendar"
                                size={20}
                                color={COLORS.primary || "#F59E0B"}
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
                            name="information-circle"
                            size={20}
                            color="#D97706"
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
        backgroundColor: COLORS.background || "#F9FAFB",
    },

    content: {
        paddingHorizontal: SPACING.lg || 16,
        paddingTop: SPACING.md || 12,
        paddingBottom: 160,
    },

    headerContainer: {
        marginBottom: 16,
    },

    heading: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.black || "#111827",
        letterSpacing: -0.3,
    },

    subtitle: {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 13.5,
        lineHeight: 18,
    },

    monthHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    monthText: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.black || "#1F2937",
        marginLeft: 6,
        letterSpacing: -0.2,
    },

    dateList: {
        paddingVertical: 4,
        paddingRight: SPACING.lg || 16,
    },

    dateCard: {
        width: 72,
        height: 108,
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 18,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        paddingTop: 12,
        paddingBottom: 8,
        position: "relative",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 5,
            },
            android: {
                elevation: 1.5,
            },
        }),
    },

    selectedDateCard: {
        backgroundColor: COLORS.black || "#111827",
        borderColor: COLORS.primary || "#F59E0B",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.18,
                shadowRadius: 10,
            },
            android: {
                elevation: 6,
            },
        }),
    },

    todayBadge: {
        position: "absolute",
        top: 6,
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 8,
    },

    selectedTodayBadge: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
    },

    todayText: {
        fontSize: 9,
        fontWeight: "700",
        color: "#4B5563",
    },

    selectedTodayText: {
        color: COLORS.primary || "#F59E0B",
    },

    day: {
        fontSize: 11.5,
        color: "#6B7280",
        fontWeight: "600",
        marginTop: 6,
    },

    selectedDayText: {
        color: "#9CA3AF",
    },

    dateNumber: {
        marginTop: 2,
        fontSize: 24,
        fontWeight: "800",
        color: COLORS.black || "#111827",
    },

    selectedNumberText: {
        color: COLORS.primary || "#F59E0B",
    },

    monthSmall: {
        marginTop: 2,
        fontSize: 10.5,
        color: "#9CA3AF",
        fontWeight: "600",
    },

    selectedMonthText: {
        color: "#D1D5DB",
    },

    selectedInfo: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 18,
        padding: 16,
        marginTop: 22,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
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
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        alignItems: "center",
        justifyContent: "center",
    },

    selectedTextContainer: {
        marginLeft: 12,
        flex: 1,
    },

    selectedLabel: {
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    selectedDate: {
        marginTop: 2,
        fontSize: 16.5,
        fontWeight: "800",
        color: COLORS.black || "#111827",
    },

    infoCard: {
        backgroundColor: "#FEF3C7",
        borderRadius: RADIUS.xl || 16,
        padding: 14,
        marginTop: 14,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#FDE68A",
    },

    infoIconWrapper: {
        marginTop: 1,
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
        marginTop: 2,
        color: "#B45309",
        fontSize: 12,
        lineHeight: 17,
        fontWeight: "500",
    },

    bottomButtonContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.white || "#FFFFFF",
        paddingHorizontal: SPACING.lg || 16,
        paddingTop: 14,
        paddingBottom: Platform.OS === "ios" ? 30 : 16,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -6 },
                shadowOpacity: 0.06,
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            },
        }),
    },
});