import React, { useState } from "react";
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

const INITIAL_STAFF = [
    {
        id: "1",
        barber: "Rajesh",
        chair: 1,
        available: true,
    },
    {
        id: "2",
        barber: "Suresh",
        chair: 2,
        available: true,
    },
    {
        id: "3",
        barber: "Amit",
        chair: 3,
        available: true,
    },
];

export default function SalonSetupScreen({
    navigation,
    route,
}) {
    const [staff, setStaff] = useState(INITIAL_STAFF);
    React.useEffect(() => {
        const updatedStaff = route?.params?.updatedStaff;

        if (!updatedStaff) {
            return;
        }

        setStaff((current) => {
            const exists = current.some(
                (item) => item.id === updatedStaff.id
            );

            if (exists) {
                return current.map((item) =>
                    item.id === updatedStaff.id
                        ? updatedStaff
                        : item
                );
            }

            return [...current, updatedStaff];
        });

        navigation.setParams({
            updatedStaff: undefined,
        });
    }, [route?.params?.updatedStaff]);
    const toggleAvailability = (id) => {
        setStaff((current) =>
            current.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        available: !item.available,
                    }
                    : item
            )
        );
    };

    const deleteStaff = (item) => {
        Alert.alert(
            "Remove Barber & Chair",
            `Remove ${item.barber} and Chair ${item.chair}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => {
                        setStaff((current) =>
                            current.filter(
                                (staffItem) =>
                                    staffItem.id !==
                                    item.id
                            )
                        );
                    },
                },
            ]
        );
    };

    const availableCount = staff.filter(
        (item) => item.available
    ).length;

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}

                <View style={styles.header}>
                    <View style={styles.headerContent}>

                        <Text style={styles.heading}>
                            Salon Setup
                        </Text>

                        <Text style={styles.subtitle}>
                            Barbers आणि Chairs व्यवस्थापित करा
                        </Text>
                    </View>

                    <View style={styles.setupIcon}>
                        <Ionicons
                            name="business-outline"
                            size={24}
                            color={COLORS.primary}
                        />
                    </View>
                </View>

                {/* Summary */}

                <View style={styles.summaryCard}>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>
                            {staff.length}
                        </Text>

                        <Text style={styles.summaryLabel}>
                            Barbers
                        </Text>
                    </View>

                    <View style={styles.summaryDivider} />

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>
                            {staff.length}
                        </Text>

                        <Text style={styles.summaryLabel}>
                            Chairs
                        </Text>
                    </View>

                    <View style={styles.summaryDivider} />

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>
                            {availableCount}
                        </Text>

                        <Text style={styles.summaryLabel}>
                            Available Today
                        </Text>
                    </View>
                </View>

                {/* Today's Status */}

                <View style={styles.todayCard}>
                    <View style={styles.todayIcon}>
                        <Ionicons
                            name="calendar-outline"
                            size={21}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.todayContent}>
                        <Text style={styles.todayTitle}>
                            आजची उपलब्धता
                        </Text>

                        <Text style={styles.todaySubtitle}>
                            {availableCount} / {staff.length} barbers
                            available
                        </Text>
                    </View>

                    <View style={styles.openBadge}>
                        <View style={styles.greenDot} />

                        <Text style={styles.openText}>
                            Open
                        </Text>
                    </View>
                </View>

                {/* Staff */}

                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>
                            Barbers & Chairs
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            प्रत्येक barber ला एक chair
                        </Text>
                    </View>

                    <Text style={styles.countText}>
                        {staff.length} total
                    </Text>
                </View>

                {staff.map((item) => (
                    <StaffCard
                        key={item.id}
                        item={item}
                        onToggle={() =>
                            toggleAvailability(item.id)
                        }
                        onDelete={() =>
                            deleteStaff(item)
                        }
                        onEdit={() =>
                            navigation.navigate("AddBarberChair", {
                                item,
                            })
                        }
                    />
                ))}

                {/* Add */}

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.addButton}
                    onPress={() =>
                        navigation.navigate("AddBarberChair")
                    }
                >
                    <View style={styles.addIcon}>
                        <Ionicons
                            name="add"
                            size={24}
                            color={COLORS.black}
                        />
                    </View>

                    <View style={styles.addContent}>
                        <Text style={styles.addTitle}>
                            Barber & Chair जोडा
                        </Text>

                        <Text style={styles.addSubtitle}>
                            नवीन barber आणि chair एकत्र add करा
                        </Text>
                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#888"
                    />
                </TouchableOpacity>

                {/* Info */}

                <View style={styles.infoBox}>
                    <Ionicons
                        name="information-circle-outline"
                        size={19}
                        color={COLORS.primary}
                    />

                    <Text style={styles.infoText}>
                        Barber unavailable असल्यास त्याला आजच्या
                        queue मध्ये assign केले जाणार नाही.
                    </Text>
                </View>
            </ScrollView>
        </AppScreen>
    );
}

function StaffCard({
    item,
    onToggle,
    onDelete,
    onEdit,
}) {
    return (
        <View style={styles.staffCard}>
            {/* Top */}

            <View style={styles.staffTop}>
                <View style={styles.staffLeft}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {item.barber.charAt(0)}
                        </Text>

                        {item.available && (
                            <View style={styles.onlineDot} />
                        )}
                    </View>

                    <View style={styles.staffInfo}>
                        <Text style={styles.barberName}>
                            {item.barber}
                        </Text>

                        <View style={styles.chairRow}>
                            <Ionicons
                                name="business-outline"
                                size={13}
                                color="#888"
                            />

                            <Text style={styles.chairText}>
                                Chair {item.chair}
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        item.available
                            ? styles.availableBadge
                            : styles.unavailableBadge,
                    ]}
                >
                    <View
                        style={[
                            styles.statusDot,
                            item.available
                                ? styles.availableDot
                                : styles.unavailableDot,
                        ]}
                    />

                    <Text
                        style={[
                            styles.statusText,
                            item.available
                                ? styles.availableText
                                : styles.unavailableText,
                        ]}
                    >
                        {item.available
                            ? "Available"
                            : "Unavailable"}
                    </Text>
                </View>
            </View>

            {/* Actions */}

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onEdit}
                >
                    <Ionicons
                        name="create-outline"
                        size={17}
                        color={COLORS.black}
                    />

                    <Text style={styles.actionText}>
                        Edit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onToggle}
                >
                    <Ionicons
                        name={
                            item.available
                                ? "pause-circle-outline"
                                : "play-circle-outline"
                        }
                        size={17}
                        color={
                            item.available
                                ? "#A16207"
                                : "#16A34A"
                        }
                    />

                    <Text
                        style={[
                            styles.actionText,
                            {
                                color: item.available
                                    ? "#A16207"
                                    : "#16A34A",
                            },
                        ]}
                    >
                        {item.available
                            ? "Unavailable"
                            : "Available"}
                    </Text>
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

    setupIcon: {
        width: 46,
        height: 46,
        borderRadius: 16,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    summaryCard: {
        marginTop: 22,
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        paddingVertical: 18,
        flexDirection: "row",
        alignItems: "center",
    },

    summaryItem: {
        flex: 1,
        alignItems: "center",
    },

    summaryValue: {
        color: COLORS.primary,
        fontSize: 23,
        fontWeight: "800",
    },

    summaryLabel: {
        marginTop: 3,
        color: "#888",
        fontSize: 9,
        textAlign: "center",
    },

    summaryDivider: {
        width: 1,
        height: 32,
        backgroundColor: "#333",
    },

    todayCard: {
        marginTop: 14,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
    },

    todayIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    todayContent: {
        flex: 1,
        marginLeft: 11,
    },

    todayTitle: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "700",
    },

    todaySubtitle: {
        marginTop: 3,
        color: "#888",
        fontSize: 10,
    },

    openBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EAF8EF",
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 15,
    },

    greenDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#22C55E",
        marginRight: 5,
    },

    openText: {
        color: "#16A34A",
        fontSize: 9,
        fontWeight: "700",
    },

    sectionHeader: {
        marginTop: 26,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    sectionTitle: {
        color: COLORS.black,
        fontSize: 18,
        fontWeight: "800",
    },

    sectionSubtitle: {
        marginTop: 3,
        color: "#999",
        fontSize: 11,
    },

    countText: {
        color: "#999",
        fontSize: 11,
    },

    staffCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 15,
        marginBottom: 12,
    },

    staffTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    staffLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    avatarText: {
        color: COLORS.primary,
        fontSize: 20,
        fontWeight: "800",
    },

    onlineDot: {
        position: "absolute",
        width: 11,
        height: 11,
        borderRadius: 6,
        backgroundColor: "#22C55E",
        right: 0,
        bottom: 1,
        borderWidth: 2,
        borderColor: COLORS.white,
    },

    staffInfo: {
        marginLeft: 12,
    },

    barberName: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: "700",
    },

    chairRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    chairText: {
        marginLeft: 5,
        color: "#888",
        fontSize: 11,
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 15,
    },

    availableBadge: {
        backgroundColor: "#EAF8EF",
    },

    unavailableBadge: {
        backgroundColor: "#F1F1F1",
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 5,
    },

    availableDot: {
        backgroundColor: "#22C55E",
    },

    unavailableDot: {
        backgroundColor: "#999",
    },

    statusText: {
        fontSize: 9,
        fontWeight: "700",
    },

    availableText: {
        color: "#16A34A",
    },

    unavailableText: {
        color: "#777",
    },

    actions: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#EEEEEE",
    },

    actionButton: {
        flex: 1,
        height: 38,
        borderRadius: 11,
        backgroundColor: "#F5F5F5",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 7,
    },

    actionText: {
        marginLeft: 5,
        color: COLORS.black,
        fontSize: 10,
        fontWeight: "700",
    },

    deleteButton: {
        width: 38,
        height: 38,
        borderRadius: 11,
        backgroundColor: "#FEECEC",
        alignItems: "center",
        justifyContent: "center",
    },

    addButton: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
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
        borderRadius: 14,
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
});