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

const INITIAL_SERVICES = [
    {
        id: "1",
        name: "Hair Cut",
        marathi: "हेअर कट",
        price: 200,
        duration: "30 min",
        active: true,
    },
    {
        id: "2",
        name: "Hair + Beard",
        marathi: "हेअर कट + दाढी",
        price: 300,
        duration: "40 min",
        active: true,
    },
    {
        id: "3",
        name: "Hair Spa",
        marathi: "हेअर स्पा",
        price: 500,
        duration: "45 min",
        active: true,
    },
];

export default function ServicesScreen({ navigation, route }) {
    const [services, setServices] = useState(INITIAL_SERVICES);

    useEffect(() => {
        const updatedService = route?.params?.updatedService;
        if (!updatedService) return;

        setServices((current) => {
            const exists = current.some((item) => item.id === updatedService.id);
            if (exists) {
                return current.map((item) =>
                    item.id === updatedService.id ? updatedService : item
                );
            }
            return [...current, updatedService];
        });

        navigation.setParams({ updatedService: undefined });
    }, [route?.params?.updatedService]);

    const deleteService = (service) => {
        Alert.alert(
            "Delete Service",
            `"${service.name}" नक्की delete करायची आहे का?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setServices((current) =>
                            current.filter((item) => item.id !== service.id)
                        );
                    },
                },
            ]
        );
    };

    const toggleService = (id) => {
        setServices((current) =>
            current.map((item) =>
                item.id === id ? { ...item, active: !item.active } : item
            )
        );
    };

    // Calculate Summary Stats
    const activeCount = services.filter((item) => item.active).length;
    const prices = services.map((item) => item.price);
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;
    const priceDisplay =
        prices.length === 0
            ? "₹0"
            : minPrice === maxPrice
                ? `₹${minPrice}`
                : `₹${minPrice} - ₹${maxPrice}`;

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerTextGroup}>
                        <Text style={styles.heading}>Services</Text>
                        <Text style={styles.subtitle}>
                            Salon services आणि prices व्यवस्थापित करा
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.headerAddBtn}
                        onPress={() => navigation.navigate("AddService")}
                    >
                        <Ionicons
                            name="add-outline"
                            size={22}
                            color={COLORS.primary || "#F59E0B"}
                        />
                    </TouchableOpacity>
                </View>

                {/* Summary Metrics */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>{services.length}</Text>
                        <Text style={styles.summaryLabel}>TOTAL SERVICES</Text>
                    </View>

                    <View style={styles.summaryDivider} />

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>{activeCount}</Text>
                        <Text style={styles.summaryLabel}>ACTIVE</Text>
                    </View>

                    <View style={styles.summaryDivider} />

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>{priceDisplay}</Text>
                        <Text style={styles.summaryLabel}>PRICE RANGE</Text>
                    </View>
                </View>

                {/* Section Header */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>All Services</Text>
                        <Text style={styles.sectionSubtitle}>
                            Customer booking मध्ये हे services दिसतील
                        </Text>
                    </View>
                    <View style={styles.countBadge}>
                        <Text style={styles.countText}>{services.length} Total</Text>
                    </View>
                </View>

                {/* Services List / Empty State */}
                {services.length === 0 ? (
                    <EmptyState onAdd={() => navigation.navigate("AddService")} />
                ) : (
                    services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onEdit={() =>
                                navigation.navigate("AddService", { service })
                            }
                            onDelete={() => deleteService(service)}
                            onToggle={() => toggleService(service.id)}
                        />
                    ))
                )}

                {/* Add Service Button Banner */}
                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.addButton}
                    onPress={() => navigation.navigate("AddService")}
                >
                    <View style={styles.addIcon}>
                        <Ionicons
                            name="add"
                            size={22}
                            color={COLORS.black || "#0F172A"}
                        />
                    </View>
                    <View style={styles.addContent}>
                        <Text style={styles.addTitle}>Add New Service</Text>
                        <Text style={styles.addSubtitle}>
                            नवीन service आणि price add करा
                        </Text>
                    </View>
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#64748B"
                    />
                </TouchableOpacity>
            </ScrollView>
        </AppScreen>
    );
}

function ServiceCard({ service, onEdit, onDelete, onToggle }) {
    return (
        <View style={[styles.serviceCard, !service.active && styles.dimmedCard]}>
            {/* Card Header & Main Info */}
            <View style={styles.serviceTop}>
                <View style={styles.serviceIcon}>
                    <Ionicons
                        name="cut-outline"
                        size={22}
                        color={COLORS.primary || "#F59E0B"}
                    />
                </View>

                <View style={styles.serviceInfo}>
                    <View style={styles.titleRow}>
                        <Text style={styles.serviceName}>{service.name}</Text>
                        <Text style={styles.serviceMarathi}>
                            ({service.marathi})
                        </Text>
                    </View>

                    {/* Metadata Pills */}
                    <View style={styles.metaRow}>
                        <View style={styles.metaPill}>
                            <Ionicons
                                name="time-outline"
                                size={13}
                                color="#64748B"
                            />
                            <Text style={styles.metaText}>{service.duration}</Text>
                        </View>

                        <View style={styles.metaPill}>
                            <Ionicons
                                name="cash-outline"
                                size={13}
                                color="#16A34A"
                            />
                            <Text style={styles.priceText}>₹{service.price}</Text>
                        </View>
                    </View>
                </View>

                {/* Status Pill */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onToggle}
                    style={[
                        styles.statusBadge,
                        service.active ? styles.activeBadge : styles.inactiveBadge,
                    ]}
                >
                    <View
                        style={[
                            styles.statusDot,
                            service.active ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                    <Text
                        style={[
                            styles.statusText,
                            service.active ? styles.activeText : styles.inactiveText,
                        ]}
                    >
                        {service.active ? "Active" : "Hidden"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Action Bar */}
            <View style={styles.actions}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.actionButton}
                    onPress={onEdit}
                >
                    <Ionicons
                        name="create-outline"
                        size={16}
                        color={COLORS.black || "#0F172A"}
                    />
                    <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                        styles.actionButton,
                        service.active ? styles.hideBtn : styles.showBtn,
                    ]}
                    onPress={onToggle}
                >
                    <Ionicons
                        name={service.active ? "eye-off-outline" : "eye-outline"}
                        size={16}
                        color={service.active ? "#B45309" : "#16A34A"}
                    />
                    <Text
                        style={[
                            styles.actionText,
                            { color: service.active ? "#B45309" : "#16A34A" },
                        ]}
                    >
                        {service.active ? "Hide" : "Activate"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.deleteButton}
                    onPress={onDelete}
                >
                    <Ionicons
                        name="trash-outline"
                        size={16}
                        color="#DC2626"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function EmptyState({ onAdd }) {
    return (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBg}>
                <Ionicons
                    name="cut-outline"
                    size={36}
                    color="#94A3B8"
                />
            </View>
            <Text style={styles.emptyTitle}>कोणतीही Service उपलब्ध नाही</Text>
            <Text style={styles.emptySubtitle}>
                तुमच्या salon साठी पहिली service जोडण्यासाठी खालील बटनावर क्लिक करा.
            </Text>
            <TouchableOpacity style={styles.emptyBtn} onPress={onAdd}>
                <Text style={styles.emptyBtnText}>+ Add First Service</Text>
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

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    headerTextGroup: {
        flex: 1,
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
    headerAddBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 12,
    },

    // Summary Card
    summaryCard: {
        backgroundColor: COLORS.black || "#0F172A",
        borderRadius: RADIUS.xl || 16,
        paddingVertical: 18,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 8,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    summaryItem: {
        flex: 1,
        alignItems: "center",
    },
    summaryValue: {
        color: COLORS.primary || "#F59E0B",
        fontSize: 18,
        fontWeight: "800",
    },
    summaryLabel: {
        marginTop: 4,
        color: "#94A3B8",
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    summaryDivider: {
        width: 1,
        height: 30,
        backgroundColor: "#334155",
    },

    // Section Header
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
        fontSize: 12,
    },
    countBadge: {
        backgroundColor: "#E2E8F0",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    countText: {
        color: "#475569",
        fontSize: 11,
        fontWeight: "700",
    },

    // Service Card
    serviceCard: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 16,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#F1F5F9",
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
    dimmedCard: {
        opacity: 0.75,
        backgroundColor: "#F8FAFC",
    },
    serviceTop: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    serviceIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },
    serviceInfo: {
        flex: 1,
        marginLeft: 12,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "baseline",
        flexWrap: "wrap",
    },
    serviceName: {
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "700",
    },
    serviceMarathi: {
        marginLeft: 6,
        color: "#64748B",
        fontSize: 12,
        fontWeight: "500",
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        gap: 8,
    },
    metaPill: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    metaText: {
        marginLeft: 4,
        color: "#475569",
        fontSize: 11,
        fontWeight: "600",
    },
    priceText: {
        marginLeft: 4,
        color: "#16A34A",
        fontSize: 11,
        fontWeight: "700",
    },

    // Status Pill
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 6,
    },
    activeBadge: {
        backgroundColor: "#DCFCE7",
    },
    inactiveBadge: {
        backgroundColor: "#E2E8F0",
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 5,
    },
    activeDot: {
        backgroundColor: "#16A34A",
    },
    inactiveDot: {
        backgroundColor: "#64748B",
    },
    statusText: {
        fontSize: 10,
        fontWeight: "700",
    },
    activeText: {
        color: "#15803D",
    },
    inactiveText: {
        color: "#475569",
    },

    // Action Bar
    actions: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        gap: 8,
    },
    actionButton: {
        flex: 1,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#F1F5F9",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    hideBtn: {
        backgroundColor: "#FEF3C7",
    },
    showBtn: {
        backgroundColor: "#DCFCE7",
    },
    actionText: {
        marginLeft: 6,
        color: COLORS.black || "#0F172A",
        fontSize: 12,
        fontWeight: "700",
    },
    deleteButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#FEE2E2",
        alignItems: "center",
        justifyContent: "center",
    },

    // Add Banner Button
    addButton: {
        backgroundColor: COLORS.black || "#0F172A",
        borderRadius: RADIUS.xl || 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    addIcon: {
        width: 40,
        height: 40,
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
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
    addSubtitle: {
        marginTop: 2,
        color: "#94A3B8",
        fontSize: 11,
    },

    // Empty State
    emptyContainer: {
        alignItems: "center",
        paddingVertical: 36,
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: RADIUS.xl || 16,
        marginBottom: 14,
    },
    emptyIconBg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    emptyTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.black || "#0F172A",
    },
    emptySubtitle: {
        fontSize: 12,
        color: "#64748B",
        textAlign: "center",
        marginTop: 4,
        marginBottom: 16,
    },
    emptyBtn: {
        backgroundColor: COLORS.primary || "#F59E0B",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
    },
    emptyBtnText: {
        color: COLORS.black || "#0F172A",
        fontWeight: "700",
        fontSize: 13,
    },
});