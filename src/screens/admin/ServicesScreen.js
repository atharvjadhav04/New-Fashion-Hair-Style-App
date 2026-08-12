import React, {
    useEffect,
    useState,
} from "react";
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

export default function ServicesScreen({
    navigation,
    route,
}) {

    const [services, setServices] =
        useState(INITIAL_SERVICES);

    useEffect(() => {
        const updatedService =
            route?.params?.updatedService;

        if (!updatedService) {
            return;
        }

        setServices((current) => {

            const exists = current.some(
                (item) =>
                    item.id === updatedService.id
            );

            if (exists) {

                return current.map((item) =>
                    item.id === updatedService.id
                        ? updatedService
                        : item
                );

            }

            return [
                ...current,
                updatedService,
            ];
        });

        navigation.setParams({
            updatedService: undefined,
        });

    }, [route?.params?.updatedService]);

    const deleteService = (service) => {
        Alert.alert(
            "Delete Service",
            `${service.name} delete करायची आहे का?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setServices((current) =>
                            current.filter(
                                (item) =>
                                    item.id !== service.id
                            )
                        );
                    },
                },
            ]
        );
    };

    const toggleService = (id) => {
        setServices((current) =>
            current.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        active: !item.active,
                    }
                    : item
            )
        );
    };

    return (
        <AppScreen style={styles.screen}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                {/* Header */}

                <View style={styles.header}>

                    <View>
                        <Text style={styles.heading}>
                            Services
                        </Text>

                        <Text style={styles.subtitle}>
                            Salon services आणि prices व्यवस्थापित करा
                        </Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="cut-outline"
                            size={24}
                            color={COLORS.primary}
                        />
                    </View>

                </View>

                {/* Summary */}

                <View style={styles.summaryCard}>

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>
                            {services.length}
                        </Text>

                        <Text style={styles.summaryLabel}>
                            Services
                        </Text>
                    </View>

                    <View style={styles.summaryDivider} />

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>
                            {
                                services.filter(
                                    (item) => item.active
                                ).length
                            }
                        </Text>

                        <Text style={styles.summaryLabel}>
                            Active
                        </Text>
                    </View>

                    <View style={styles.summaryDivider} />

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>
                            ₹
                        </Text>

                        <Text style={styles.summaryLabel}>
                            Pricing
                        </Text>
                    </View>

                </View>

                {/* Section */}

                <View style={styles.sectionHeader}>

                    <View>
                        <Text style={styles.sectionTitle}>
                            All Services
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            Customer booking मध्ये हे services दिसतील
                        </Text>
                    </View>

                    <Text style={styles.countText}>
                        {services.length} total
                    </Text>

                </View>

                {/* Services */}

                {services.map((service) => (

                    <ServiceCard
                        key={service.id}
                        service={service}
                        onEdit={() =>
                            navigation.navigate(
                                "AddService",
                                {
                                    service,
                                }
                            )
                        }
                        onDelete={() =>
                            deleteService(service)
                        }
                        onToggle={() =>
                            toggleService(service.id)
                        }
                    />

                ))}

                {/* Add */}

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.addButton}
                    onPress={() =>
                        navigation.navigate(
                            "AddService"
                        )
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
                            Add Service
                        </Text>

                        <Text style={styles.addSubtitle}>
                            नवीन service आणि price add करा
                        </Text>

                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#888"
                    />

                </TouchableOpacity>

            </ScrollView>

        </AppScreen>
    );
}

function ServiceCard({
    service,
    onEdit,
    onDelete,
    onToggle,
}) {
    return (
        <View style={styles.serviceCard}>

            {/* Main */}

            <View style={styles.serviceTop}>

                <View style={styles.serviceIcon}>
                    <Ionicons
                        name="cut-outline"
                        size={22}
                        color={COLORS.primary}
                    />
                </View>

                <View style={styles.serviceInfo}>

                    <Text style={styles.serviceName}>
                        {service.name}
                    </Text>

                    <Text style={styles.serviceMarathi}>
                        {service.marathi}
                    </Text>

                    <View style={styles.metaRow}>

                        <View style={styles.metaItem}>
                            <Ionicons
                                name="time-outline"
                                size={13}
                                color="#888"
                            />

                            <Text style={styles.metaText}>
                                {service.duration}
                            </Text>
                        </View>

                        <View style={styles.metaItem}>
                            <Ionicons
                                name="cash-outline"
                                size={13}
                                color="#888"
                            />

                            <Text style={styles.metaText}>
                                ₹{service.price}
                            </Text>
                        </View>

                    </View>

                </View>

                <View
                    style={[
                        styles.statusBadge,
                        service.active
                            ? styles.activeBadge
                            : styles.inactiveBadge,
                    ]}
                >

                    <View
                        style={[
                            styles.statusDot,
                            service.active
                                ? styles.activeDot
                                : styles.inactiveDot,
                        ]}
                    />

                    <Text
                        style={[
                            styles.statusText,
                            service.active
                                ? styles.activeText
                                : styles.inactiveText,
                        ]}
                    >
                        {service.active
                            ? "Active"
                            : "Inactive"}
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
                            service.active
                                ? "eye-off-outline"
                                : "eye-outline"
                        }
                        size={17}
                        color={
                            service.active
                                ? "#A16207"
                                : "#16A34A"
                        }
                    />

                    <Text
                        style={[
                            styles.actionText,
                            {
                                color:
                                    service.active
                                        ? "#A16207"
                                        : "#16A34A",
                            },
                        ]}
                    >
                        {service.active
                            ? "Hide"
                            : "Activate"}
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

    heading: {
        fontSize: 30,
        fontWeight: "800",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 5,
        color: "#888",
        fontSize: 11,
    },

    headerIcon: {
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
        fontSize: 22,
        fontWeight: "800",
    },

    summaryLabel: {
        marginTop: 3,
        color: "#888",
        fontSize: 9,
    },

    summaryDivider: {
        width: 1,
        height: 32,
        backgroundColor: "#333",
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
        fontSize: 10,
    },

    countText: {
        color: "#999",
        fontSize: 10,
    },

    serviceCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 15,
        marginBottom: 12,
    },

    serviceTop: {
        flexDirection: "row",
        alignItems: "center",
    },

    serviceIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    serviceInfo: {
        flex: 1,
        marginLeft: 12,
    },

    serviceName: {
        color: COLORS.black,
        fontSize: 15,
        fontWeight: "800",
    },

    serviceMarathi: {
        marginTop: 2,
        color: "#888",
        fontSize: 10,
    },

    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 7,
    },

    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 13,
    },

    metaText: {
        marginLeft: 4,
        color: "#888",
        fontSize: 9,
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 15,
    },

    activeBadge: {
        backgroundColor: "#EAF8EF",
    },

    inactiveBadge: {
        backgroundColor: "#F1F1F1",
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 5,
    },

    activeDot: {
        backgroundColor: "#22C55E",
    },

    inactiveDot: {
        backgroundColor: "#999",
    },

    statusText: {
        fontSize: 8,
        fontWeight: "700",
    },

    activeText: {
        color: "#16A34A",
    },

    inactiveText: {
        color: "#777",
    },

    actions: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
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

});