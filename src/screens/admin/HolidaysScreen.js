import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

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

export default function HolidaysScreen({
    navigation,
    route,
}) {
    const [holidays, setHolidays] =
        useState(INITIAL_HOLIDAYS);
    useEffect(() => {
        const updatedHoliday =
            route?.params?.updatedHoliday;

        if (!updatedHoliday) {
            return;
        }

        setHolidays((current) => {
            const exists = current.some(
                (item) =>
                    item.id === updatedHoliday.id
            );

            if (exists) {
                return current.map((item) =>
                    item.id === updatedHoliday.id
                        ? updatedHoliday
                        : item
                );
            }

            return [
                ...current,
                updatedHoliday,
            ];
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
                            current.filter(
                                (holiday) =>
                                    holiday.id !== id
                            )
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
                {/* Back */}

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={20}
                        color={COLORS.black}
                    />

                    <Text style={styles.backText}>
                        Setup
                    </Text>
                </TouchableOpacity>

                {/* Header */}

                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.heading}>
                            Holidays
                        </Text>

                        <Text style={styles.subtitle}>
                            Salon holidays व्यवस्थापित करा
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.headerAdd}
                        onPress={addHoliday}
                    >
                        <Ionicons
                            name="add"
                            size={23}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>

                {/* Summary */}

                <View style={styles.summaryCard}>
                    <View style={styles.summaryIcon}>
                        <Ionicons
                            name="calendar-outline"
                            size={23}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.summaryContent}>
                        <Text style={styles.summaryTitle}>
                            Upcoming Holidays
                        </Text>

                        <Text style={styles.summarySubtitle}>
                            {holidays.length} holiday
                            {holidays.length !== 1
                                ? "s"
                                : ""}{" "}
                            scheduled
                        </Text>
                    </View>

                    <Text style={styles.summaryNumber}>
                        {holidays.length}
                    </Text>
                </View>

                {/* Upcoming */}

                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>
                            Upcoming Holidays
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            या दिवसांमध्ये bookings बंद राहतील
                        </Text>
                    </View>
                </View>

                {holidays.length === 0 ? (
                    <EmptyState onAdd={addHoliday} />
                ) : (
                    holidays.map((holiday) => (
                        <HolidayCard
                            key={holiday.id}
                            holiday={holiday}
                            onDelete={() =>
                                deleteHoliday(
                                    holiday.id
                                )
                            }
                            onEdit={() =>
                                navigation.navigate("AddHoliday", {
                                    holiday,
                                })
                            }
                        />
                    ))
                )}

                {/* Add Button */}

                <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.8}
                    onPress={addHoliday}
                >
                    <View style={styles.addIcon}>
                        <Ionicons
                            name="add"
                            size={23}
                            color={COLORS.black}
                        />
                    </View>

                    <View style={styles.addContent}>
                        <Text style={styles.addTitle}>
                            Add Holiday
                        </Text>

                        <Text style={styles.addSubtitle}>
                            नवीन holiday schedule करा
                        </Text>
                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#888"
                    />
                </TouchableOpacity>

                {/* Information */}

                <View style={styles.infoBox}>
                    <Ionicons
                        name="information-circle-outline"
                        size={20}
                        color={COLORS.primary}
                    />

                    <Text style={styles.infoText}>
                        Holiday असलेल्या दिवशी customers नवीन
                        appointments book करू शकणार नाहीत.
                    </Text>
                </View>
            </ScrollView>
        </AppScreen>
    );
}

function HolidayCard({
    holiday,
    onDelete,
    onEdit,
}) {
    return (
        <View style={styles.holidayCard}>
            {/* Date */}

            <View style={styles.dateBox}>
                <Ionicons
                    name="calendar"
                    size={20}
                    color={COLORS.primary}
                />
            </View>

            {/* Details */}

            <View style={styles.holidayContent}>
                <Text style={styles.holidayTitle}>
                    {holiday.title}
                </Text>

                <Text style={styles.holidayDate}>
                    {holiday.date}
                </Text>

                <Text style={styles.holidayDay}>
                    {holiday.day}
                </Text>
            </View>

            {/* Actions */}

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={onEdit}
                >
                    <Ionicons
                        name="create-outline"
                        size={17}
                        color={COLORS.black}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={onDelete}
                >
                    <Ionicons
                        name="trash-outline"
                        size={17}
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
                    color={COLORS.primary}
                />
            </View>

            <Text style={styles.emptyTitle}>
                No Holidays
            </Text>

            <Text style={styles.emptyText}>
                सध्या कोणताही holiday scheduled नाही.
            </Text>

            <TouchableOpacity
                style={styles.emptyButton}
                onPress={onAdd}
            >
                <Text style={styles.emptyButtonText}>
                    + Add Holiday
                </Text>
            </TouchableOpacity>
        </View>
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
    },

    headerContent: {
        flex: 1,
    },

    heading: {
        fontSize: 30,
        fontWeight: "800",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 5,
        color: "#888",
        fontSize: 12,
    },

    headerAdd: {
        width: 46,
        height: 46,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    summaryCard: {
        marginTop: 22,
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
    },

    summaryIcon: {
        width: 45,
        height: 45,
        borderRadius: 14,
        backgroundColor: "#222",
        alignItems: "center",
        justifyContent: "center",
    },

    summaryContent: {
        flex: 1,
        marginLeft: 11,
    },

    summaryTitle: {
        color: COLORS.white,
        fontSize: 13,
        fontWeight: "700",
    },

    summarySubtitle: {
        marginTop: 4,
        color: "#888",
        fontSize: 9,
    },

    summaryNumber: {
        color: COLORS.primary,
        fontSize: 28,
        fontWeight: "800",
    },

    sectionHeader: {
        marginTop: 26,
        marginBottom: 12,
    },

    sectionTitle: {
        color: COLORS.black,
        fontSize: 18,
        fontWeight: "800",
    },

    sectionSubtitle: {
        marginTop: 4,
        color: "#999",
        fontSize: 10,
    },

    holidayCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 14,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
    },

    dateBox: {
        width: 48,
        height: 48,
        borderRadius: 15,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    holidayContent: {
        flex: 1,
        marginLeft: 12,
    },

    holidayTitle: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "800",
    },

    holidayDate: {
        marginTop: 4,
        color: COLORS.primary,
        fontSize: 11,
        fontWeight: "700",
    },

    holidayDay: {
        marginTop: 2,
        color: "#999",
        fontSize: 9,
    },

    actions: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 6,
    },

    editButton: {
        width: 35,
        height: 35,
        borderRadius: 11,
        backgroundColor: "#F2F2F2",
        alignItems: "center",
        justifyContent: "center",
    },

    deleteButton: {
        width: 35,
        height: 35,
        borderRadius: 11,
        backgroundColor: "#FEECEC",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 6,
    },

    addButton: {
        marginTop: 4,
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
    },

    addIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    addContent: {
        flex: 1,
        marginLeft: 12,
    },

    addTitle: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "800",
    },

    addSubtitle: {
        marginTop: 3,
        color: "#999",
        fontSize: 10,
    },

    infoBox: {
        marginTop: 15,
        padding: 13,
        borderRadius: 15,
        backgroundColor: "#FFF7E0",
        flexDirection: "row",
        alignItems: "flex-start",
    },

    infoText: {
        flex: 1,
        marginLeft: 8,
        color: "#8A6700",
        fontSize: 10,
        lineHeight: 16,
    },

    emptyCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 25,
        alignItems: "center",
    },

    emptyIcon: {
        width: 65,
        height: 65,
        borderRadius: 20,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    emptyTitle: {
        marginTop: 12,
        color: COLORS.black,
        fontSize: 16,
        fontWeight: "800",
    },

    emptyText: {
        marginTop: 5,
        color: "#999",
        fontSize: 10,
        textAlign: "center",
    },

    emptyButton: {
        marginTop: 15,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,
    },

    emptyButtonText: {
        color: COLORS.black,
        fontSize: 11,
        fontWeight: "800",
    },
});