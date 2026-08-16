import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    FlatList,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import { COLORS, SPACING, RADIUS } from "../../theme";

const INITIAL_STAFF = [
    { id: "1", barber: "Rajesh", chair: 1, available: true },
    { id: "2", barber: "Suresh", chair: 2, available: true },
    { id: "3", barber: "Amit", chair: 3, available: true },
];

const StaffCard = React.memo(({ item, onToggle, onDelete, onEdit }) => {
    return (
        <View style={styles.staffCard}>
            <View style={styles.staffTop}>
                <View style={styles.staffLeft}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {item.barber.charAt(0)}
                        </Text>
                        {item.available && <View style={styles.onlineDot} />}
                    </View>

                    <View style={styles.staffInfo}>
                        <Text style={styles.barberName}>{item.barber}</Text>
                        <View style={styles.chairRow}>
                            <Ionicons
                                name="barber-shop"
                                size={14}
                                color={COLORS.textSecondary || "#666666"}
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
                        {item.available ? "Available" : "Unavailable"}
                    </Text>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.actionButton}
                    onPress={onEdit}
                >
                    <Ionicons
                        name="create-outline"
                        size={18}
                        color={COLORS.black}
                    />
                    <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.actionButton}
                    onPress={onToggle}
                >
                    <Ionicons
                        name={
                            item.available
                                ? "pause-circle-outline"
                                : "play-circle-outline"
                        }
                        size={18}
                        color={item.available ? "#B45309" : "#15803D"}
                    />
                    <Text
                        style={[
                            styles.actionText,
                            { color: item.available ? "#B45309" : "#15803D" },
                        ]}
                    >
                        {item.available ? "Make Unavailable" : "Make Available"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.deleteButton}
                    onPress={onDelete}
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
});

export default function SalonSetupScreen({ navigation, route }) {
    const [staff, setStaff] = useState(INITIAL_STAFF);

    React.useEffect(() => {
        const updatedStaff = route?.params?.updatedStaff;
        if (!updatedStaff) return;

        setStaff((current) => {
            const exists = current.some((item) => item.id === updatedStaff.id);
            if (exists) {
                return current.map((item) =>
                    item.id === updatedStaff.id ? updatedStaff : item
                );
            }
            return [...current, updatedStaff];
        });

        navigation.setParams({ updatedStaff: undefined });
    }, [route?.params?.updatedStaff, navigation]);

    const toggleAvailability = useCallback((id) => {
        setStaff((current) =>
            current.map((item) =>
                item.id === id ? { ...item, available: !item.available } : item
            )
        );
    }, []);

    const deleteStaff = useCallback((item) => {
        Alert.alert(
            "Remove Barber & Chair",
            `Remove ${item.barber} and Chair ${item.chair}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => {
                        setStaff((current) =>
                            current.filter((staffItem) => staffItem.id !== item.id)
                        );
                    },
                },
            ]
        );
    }, []);

    const availableCount = staff.filter((item) => item.available).length;

    const renderHeader = () => (
        <View>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.heading}>Salon Setup</Text>
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

            <View style={styles.summaryCard}>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>{staff.length}</Text>
                    <Text style={styles.summaryLabel}>BARBERS</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>{staff.length}</Text>
                    <Text style={styles.summaryLabel}>CHAIRS</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>{availableCount}</Text>
                    <Text style={styles.summaryLabel}>AVAILABLE TODAY</Text>
                </View>
            </View>

            <View style={styles.todayCard}>
                <View style={styles.todayIcon}>
                    <Ionicons
                        name="calendar-outline"
                        size={22}
                        color={COLORS.primary}
                    />
                </View>
                <View style={styles.todayContent}>
                    <Text style={styles.todayTitle}>आजची उपलब्धता</Text>
                    <Text style={styles.todaySubtitle}>
                        {availableCount} / {staff.length} barbers available
                    </Text>
                </View>
                <View style={styles.openBadge}>
                    <View style={styles.greenDot} />
                    <Text style={styles.openText}>Open</Text>
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <View>
                    <Text style={styles.sectionTitle}>Barbers & Chairs</Text>
                    <Text style={styles.sectionSubtitle}>
                        प्रत्येक barber ला एक chair
                    </Text>
                </View>
                <Text style={styles.countText}>{staff.length} Total</Text>
            </View>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.footerContainer}>
            <TouchableOpacity
                activeOpacity={0.85}
                style={styles.addButton}
                onPress={() => navigation.navigate("AddBarberChair")}
            >
                <View style={styles.addIcon}>
                    <Ionicons name="add" size={24} color={COLORS.black} />
                </View>

                <View style={styles.addContent}>
                    <Text style={styles.addTitle}>Barber & Chair जोडा</Text>
                    <Text style={styles.addSubtitle}>
                        नवीन barber आणि chair एकत्र add करा
                    </Text>
                </View>

                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#A3A3A3"
                />
            </TouchableOpacity>

            <View style={styles.infoBox}>
                <Ionicons
                    name="information-circle-outline"
                    size={20}
                    color="#B45309"
                />
                <Text style={styles.infoText}>
                    Barber unavailable असल्यास त्याला आजच्या queue मध्ये assign
                    केले जाणार नाही.
                </Text>
            </View>
        </View>
    );

    return (
        <AppScreen style={styles.screen}>
            <FlatList
                data={staff}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                renderItem={({ item }) => (
                    <StaffCard
                        item={item}
                        onToggle={() => toggleAvailability(item.id)}
                        onDelete={() => deleteStaff(item)}
                        onEdit={() =>
                            navigation.navigate("AddBarberChair", { item })
                        }
                    />
                )}
            />
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
        paddingBottom: 40,
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
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black,
        letterSpacing: -0.5,
    },
    subtitle: {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 13,
    },
    setupIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },
    summaryCard: {
        marginTop: 20,
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        paddingVertical: 18,
        flexDirection: "row",
        alignItems: "center",

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
    summaryItem: {
        flex: 1,
        alignItems: "center",
    },
    summaryValue: {
        color: COLORS.primary,
        fontSize: 24,
        fontWeight: "800",
    },
    summaryLabel: {
        marginTop: 4,
        color: "#9CA3AF",
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    summaryDivider: {
        width: 1,
        height: 32,
        backgroundColor: "#374151",
    },
    todayCard: {
        marginTop: 14,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",

        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    todayIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },
    todayContent: {
        flex: 1,
        marginLeft: 12,
    },
    todayTitle: {
        color: COLORS.black,
        fontSize: 15,
        fontWeight: "700",
    },
    todaySubtitle: {
        marginTop: 2,
        color: "#6B7280",
        fontSize: 12,
    },
    openBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
    },
    greenDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#16A34A",
        marginRight: 6,
    },
    openText: {
        color: "#15803D",
        fontSize: 12,
        fontWeight: "700",
    },
    sectionHeader: {
        marginTop: 24,
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    sectionTitle: {
        color: COLORS.black,
        fontSize: 18,
        fontWeight: "800",
    },
    sectionSubtitle: {
        marginTop: 2,
        color: "#6B7280",
        fontSize: 12,
    },
    countText: {
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "600",
    },
    staffCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 16,
        marginBottom: 12,

        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
            },
            android: {
                elevation: 2,
            },
        }),
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
        width: 48,
        height: 48,
        borderRadius: 24,
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
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#22C55E",
        right: 0,
        bottom: 0,
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
        marginTop: 4,
    },
    chairText: {
        marginLeft: 6,
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "500",
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
    },
    availableBadge: {
        backgroundColor: "#DCFCE7",
    },
    unavailableBadge: {
        backgroundColor: "#F3F4F6",
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    availableDot: {
        backgroundColor: "#16A34A",
    },
    unavailableDot: {
        backgroundColor: "#9CA3AF",
    },
    statusText: {
        fontSize: 11,
        fontWeight: "700",
    },
    availableText: {
        color: "#15803D",
    },
    unavailableText: {
        color: "#4B5563",
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
    },
    actionButton: {
        flex: 1,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    actionText: {
        marginLeft: 6,
        color: COLORS.black,
        fontSize: 12,
        fontWeight: "600",
    },
    deleteButton: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#FEE2E2",
        alignItems: "center",
        justifyContent: "center",
    },
    footerContainer: {
        marginTop: 8,
    },
    addButton: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    addIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
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
        fontSize: 15,
        fontWeight: "700",
    },
    addSubtitle: {
        marginTop: 2,
        color: "#9CA3AF",
        fontSize: 12,
    },
    infoBox: {
        marginTop: 14,
        padding: 14,
        borderRadius: RADIUS.lg || 14,
        backgroundColor: "#FEF3C7",
        flexDirection: "row",
        alignItems: "center",
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
        color: "#92400E",
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "500",
    },
});