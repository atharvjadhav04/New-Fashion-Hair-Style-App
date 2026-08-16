import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import { COLORS, SPACING, RADIUS } from "../../theme";

const INITIAL_HOLIDAYS = [
    {
        id: "1",
        date: "15 August 2026",
        day: "Saturday",
        title: "Independence Day",
    },
    {
        id: "2",
        date: "27 August 2026",
        day: "Thursday",
        title: "Salon Holiday",
    },
];

export default function HolidaysScreen({ navigation, route }) {
    const [holidays, setHolidays] = useState(INITIAL_HOLIDAYS);

    useEffect(() => {
        const updatedHoliday = route?.params?.updatedHoliday;

        if (!updatedHoliday) {
            return;
        }

        setHolidays((current) => {
            const exists = current.some((item) => item.id === updatedHoliday.id);

            if (exists) {
                return current.map((item) =>
                    item.id === updatedHoliday.id ? updatedHoliday : item
                );
            }

            return [...current, updatedHoliday];
        });

        navigation.setParams({
            updatedHoliday: undefined,
        });
    }, [route?.params?.updatedHoliday]);

    const deleteHoliday = (id) => {
        Alert.alert(
            "Delete Holiday",
            "हा holiday delete करायचा आहे का?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setHolidays((current) =>
                            current.filter((holiday) => holiday.id !== id)
                        );
                    },
                },
            ]
        );
    };

    const addHoliday = () => {
        navigation.navigate("AddHoliday");
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
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
                    <Text style={styles.backText}>Setup</Text>
                </TouchableOpacity>

                {/* Main Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.heading}>Holidays</Text>
                        <Text style={styles.subtitle}>
                            Salon holidays व्यवस्थापित करा
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.headerAdd}
                        onPress={addHoliday}
                        activeOpacity={0.8}
                    >
                        <Ionicons
                            name="add"
                            size={24}
                            color={COLORS.black || "#0F172A"}
                        />
                    </TouchableOpacity>
                </View>

                {/* Summary Card */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryIcon}>
                        <Ionicons
                            name="calendar"
                            size={22}
                            color={COLORS.primary || "#F59E0B"}
                        />
                    </View>

                    <View style={styles.summaryContent}>
                        <Text style={styles.summaryTitle}>
                            Upcoming Holidays
                        </Text>
                        <Text style={styles.summarySubtitle}>
                            {holidays.length} holiday
                            {holidays.length !== 1 ? "s" : ""} scheduled
                        </Text>
                    </View>

                    <Text style={styles.summaryNumber}>{holidays.length}</Text>
                </View>

                {/* Upcoming Holidays Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Scheduled Days</Text>
                    <Text style={styles.sectionSubtitle}>
                        या दिवसांमध्ये bookings बंद राहतील
                    </Text>
                </View>

                {holidays.length === 0 ? (
                    <EmptyState onAdd={addHoliday} />
                ) : (
                    holidays.map((holiday) => (
                        <HolidayCard
                            key={holiday.id}
                            holiday={holiday}
                            onDelete={() => deleteHoliday(holiday.id)}
                            onEdit={() =>
                                navigation.navigate("AddHoliday", {
                                    holiday,
                                })
                            }
                        />
                    ))
                )}

                {/* Add Holiday Button Card */}
                <TouchableOpacity
                    style={styles.addButtonCard}
                    activeOpacity={0.8}
                    onPress={addHoliday}
                >
                    <View style={styles.addIconWrap}>
                        <Ionicons
                            name="add"
                            size={22}
                            color={COLORS.black || "#0F172A"}
                        />
                    </View>

                    <View style={styles.addContent}>
                        <Text style={styles.addTitle}>Add Holiday</Text>
                        <Text style={styles.addSubtitle}>
                            नवीन holiday schedule करा
                        </Text>
                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#94A3B8"
                    />
                </TouchableOpacity>

                {/* Information Notice */}
                <View style={styles.infoBox}>
                    <Ionicons
                        name="information-circle-outline"
                        size={20}
                        color="#92400E"
                    />
                    <Text style={styles.infoText}>
                        Holiday असलेल्या दिवशी customers नवीन appointments book करू शकणार नाहीत.
                    </Text>
                </View>
            </ScrollView>
        </AppScreen>
    );
}

function HolidayCard({ holiday, onDelete, onEdit }) {
    return (
        <View style={styles.holidayCard}>
            <View style={styles.dateBox}>
                <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={COLORS.primary || "#F59E0B"}
                />
            </View>

            <View style={styles.holidayContent}>
                <Text style={styles.holidayTitle} numberOfLines={1}>
                    {holiday.title}
                </Text>
                <Text style={styles.holidayDate}>{holiday.date}</Text>
                <Text style={styles.holidayDay}>{holiday.day}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onEdit}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name="create-outline"
                        size={18}
                        color={COLORS.black || "#0F172A"}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={onDelete}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#DC2626"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function EmptyState({ onAdd }) {
    return (
        <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
                <Ionicons
                    name="calendar-outline"
                    size={32}
                    color={COLORS.primary || "#F59E0B"}
                />
            </View>

            <Text style={styles.emptyTitle}>No Holidays</Text>
            <Text style={styles.emptyText}>
                सध्या कोणताही holiday scheduled नाही.
            </Text>

            <TouchableOpacity
                style={styles.emptyButton}
                activeOpacity={0.8}
                onPress={onAdd}
            >
                <Ionicons
                    name="add"
                    size={16}
                    color={COLORS.black || "#0F172A"}
                    style={{ marginRight: 4 }}
                />
                <Text style={styles.emptyButtonText}>Add Holiday</Text>
            </TouchableOpacity>
        </View>
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

    // Back Navigation
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

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    headerContent: {
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
    headerAdd: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: COLORS.primary || "#F59E0B",
        alignItems: "center",
        justifyContent: "center",
    },

    // Summary Card
    summaryCard: {
        backgroundColor: COLORS.black || "#0F172A",
        borderRadius: RADIUS.xl || 16,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    summaryIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        alignItems: "center",
        justifyContent: "center",
    },
    summaryContent: {
        flex: 1,
        marginLeft: 14,
    },
    summaryTitle: {
        color: COLORS.white || "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
    summarySubtitle: {
        marginTop: 2,
        color: "#94A3B8",
        fontSize: 13,
        fontWeight: "500",
    },
    summaryNumber: {
        color: COLORS.primary || "#F59E0B",
        fontSize: 30,
        fontWeight: "800",
    },

    // Section Header
    sectionHeader: {
        marginBottom: 14,
    },
    sectionTitle: {
        color: COLORS.black || "#0F172A",
        fontSize: 18,
        fontWeight: "800",
    },
    sectionSubtitle: {
        marginTop: 2,
        color: "#64748B",
        fontSize: 13,
        fontWeight: "500",
    },

    // Holiday Card
    holidayCard: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.lg || 14,
        padding: 14,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    dateBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },
    holidayContent: {
        flex: 1,
        marginLeft: 12,
        marginRight: 8,
    },
    holidayTitle: {
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "700",
    },
    holidayDate: {
        marginTop: 2,
        color: COLORS.primary || "#D97706",
        fontSize: 13,
        fontWeight: "600",
    },
    holidayDay: {
        marginTop: 1,
        color: "#64748B",
        fontSize: 12,
        fontWeight: "500",
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    actionButton: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
    },
    deleteButton: {
        backgroundColor: "#FEF2F2",
    },

    // Add Button Card
    addButtonCard: {
        marginTop: 8,
        backgroundColor: COLORS.black || "#0F172A",
        borderRadius: RADIUS.lg || 14,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    addIconWrap: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: COLORS.primary || "#F59E0B",
        alignItems: "center",
        justifyContent: "center",
    },
    addContent: {
        flex: 1,
        marginLeft: 12,
    },
    addTitle: {
        color: COLORS.white || "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
    addSubtitle: {
        marginTop: 2,
        color: "#94A3B8",
        fontSize: 12,
        fontWeight: "500",
    },

    // Info Box
    infoBox: {
        padding: 14,
        borderRadius: RADIUS.lg || 14,
        backgroundColor: "#FEF3C7",
        borderWidth: 1,
        borderColor: "#FDE68A",
        flexDirection: "row",
        alignItems: "center",
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
        color: "#92400E",
        fontSize: 13,
        lineHeight: 18,
        fontWeight: "500",
    },

    // Empty State
    emptyCard: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.lg || 14,
        padding: 24,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 10,
    },
    emptyIcon: {
        width: 58,
        height: 58,
        borderRadius: 16,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },
    emptyTitle: {
        marginTop: 12,
        color: COLORS.black || "#0F172A",
        fontSize: 17,
        fontWeight: "700",
    },
    emptyText: {
        marginTop: 4,
        color: "#64748B",
        fontSize: 13,
        textAlign: "center",
    },
    emptyButton: {
        marginTop: 16,
        backgroundColor: COLORS.primary || "#F59E0B",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    emptyButtonText: {
        color: COLORS.black || "#0F172A",
        fontSize: 13,
        fontWeight: "700",
    },
});