import React from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function SetupScreen({ navigation }) {

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
                            Setup
                        </Text>

                        <Text style={styles.subtitle}>
                            सलूनच्या settings व्यवस्थापित करा
                        </Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="settings-outline"
                            size={24}
                            color={COLORS.primary}
                        />
                    </View>
                </View>

                {/* Salon Configuration */}

                <Text style={styles.sectionTitle}>
                    Salon Configuration
                </Text>

                <Text style={styles.sectionSubtitle}>
                    सलूनची दैनंदिन माहिती आणि व्यवस्था
                </Text>

                {/* Barber & Chair */}

                <SetupCard
                    icon="people-outline"
                    title="Barbers & Chairs"
                    subtitle="Barbers आणि chairs add / edit करा"
                    onPress={() =>
                        navigation.navigate("SalonSetup")
                    }
                />

                {/* Salon Status */}

                <SetupCard
                    icon="storefront-outline"
                    title="Salon Status"
                    subtitle="Salon open / close आणि timing"
                    onPress={() =>
                        navigation.navigate("SalonStatus")
                    }
                />

                {/* Holidays */}

                <SetupCard
                    icon="calendar-outline"
                    title="Holidays"
                    subtitle="Salon holidays व्यवस्थापित करा"
                    onPress={() =>
                        navigation.navigate("Holidays")
                    }
                />

                {/* Information */}

                <View style={styles.infoCard}>
                    <View style={styles.infoIcon}>
                        <Ionicons
                            name="information-circle-outline"
                            size={20}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>
                            Setup Information
                        </Text>

                        <Text style={styles.infoText}>
                            येथे केलेले changes salon मधील
                            booking आणि queue वर लागू होतील.
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </AppScreen>
    );
}

function SetupCard({
    icon,
    title,
    subtitle,
    onPress,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={onPress}
        >
            <View style={styles.cardIcon}>
                <Ionicons
                    name={icon}
                    size={25}
                    color={COLORS.primary}
                />
            </View>

            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                    {title}
                </Text>

                <Text style={styles.cardSubtitle}>
                    {subtitle}
                </Text>
            </View>

            <View style={styles.arrow}>
                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#888"
                />
            </View>
        </TouchableOpacity>
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
        fontSize: 12,
    },

    headerIcon: {
        width: 46,
        height: 46,
        borderRadius: 16,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    sectionTitle: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.black,
    },

    sectionSubtitle: {
        marginTop: 4,
        marginBottom: 14,
        color: "#999",
        fontSize: 11,
    },

    card: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 15,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
    },

    cardIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    cardContent: {
        flex: 1,
        marginLeft: 13,
    },

    cardTitle: {
        color: COLORS.black,
        fontSize: 15,
        fontWeight: "800",
    },

    cardSubtitle: {
        marginTop: 4,
        color: "#888",
        fontSize: 10,
    },

    arrow: {
        width: 35,
        height: 35,
        borderRadius: 12,
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "center",
    },

    infoCard: {
        marginTop: 8,
        padding: 14,
        borderRadius: 16,
        backgroundColor: "#FFF7E0",
        flexDirection: "row",
        alignItems: "flex-start",
    },

    infoIcon: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    infoContent: {
        flex: 1,
        marginLeft: 10,
    },

    infoTitle: {
        color: COLORS.black,
        fontSize: 12,
        fontWeight: "800",
    },

    infoText: {
        marginTop: 3,
        color: "#8A6700",
        fontSize: 10,
        lineHeight: 16,
    },
});