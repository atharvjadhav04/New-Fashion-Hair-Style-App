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

export default function ProfileScreen({ navigation }) {

    // Demo customer data.
    // Later this will come from AuthContext / backend.
    const customer = {
        name: "अथर्व जाधव",
        phone: "9876543210",
        dob: "15 जून 2000",
    };

    return (
        <AppScreen style={styles.screen}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                {/* Header */}

                <Text style={styles.heading}>
                    माझे प्रोफाइल
                </Text>

                <Text style={styles.subtitle}>
                    तुमची माहिती आणि सेटिंग्ज
                </Text>

                {/* Profile Card */}

                <View style={styles.profileCard}>

                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {customer.name.charAt(0)}
                        </Text>
                    </View>

                    <View style={styles.profileInfo}>

                        <Text style={styles.name}>
                            {customer.name}
                        </Text>

                        <View style={styles.phoneRow}>

                            <Ionicons
                                name="call-outline"
                                size={14}
                                color="#999"
                            />

                            <Text style={styles.phone}>
                                +91 {customer.phone}
                            </Text>

                        </View>

                    </View>

                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => { }}
                    >
                        <Ionicons
                            name="create-outline"
                            size={18}
                            color={COLORS.primary}
                        />
                    </TouchableOpacity>

                </View>

                {/* Personal Information */}

                <Text style={styles.sectionTitle}>
                    वैयक्तिक माहिती
                </Text>

                <View style={styles.infoCard}>

                    <InfoRow
                        icon="person-outline"
                        label="नाव"
                        value={customer.name}
                    />

                    <InfoRow
                        icon="call-outline"
                        label="मोबाईल नंबर"
                        value={`+91 ${customer.phone}`}
                    />

                    <InfoRow
                        icon="calendar-outline"
                        label="जन्मतारीख"
                        value={customer.dob}
                        last
                    />

                </View>

                {/* Account */}

                <Text style={styles.sectionTitle}>
                    अकाउंट
                </Text>

                <View style={styles.menuCard}>

                    <MenuItem
                        icon="calendar-outline"
                        title="माझ्या बुकिंग"
                        subtitle="तुमच्या सर्व अपॉइंटमेंट्स"
                        onPress={() =>
                            navigation.navigate("Bookings")
                        }
                    />

                    <MenuItem
                        icon="star-outline"
                        title="माझे रिव्ह्यू"
                        subtitle="तुमचे दिलेले रिव्ह्यू"
                        onPress={() =>
                            navigation.navigate("Reviews")
                        }
                    />

                    <MenuItem
                        icon="notifications-outline"
                        title="नोटिफिकेशन्स"
                        subtitle="अपॉइंटमेंट आणि Queue अपडेट्स"
                        onPress={() => { }}
                    />

                </View>

                {/* Support */}

                <Text style={styles.sectionTitle}>
                    मदत
                </Text>

                <View style={styles.menuCard}>

                    <MenuItem
                        icon="help-circle-outline"
                        title="मदत आणि सपोर्ट"
                        subtitle="काही समस्या असल्यास आम्हाला सांगा"
                        onPress={() => { }}
                    />

                    <MenuItem
                        icon="information-circle-outline"
                        title="New Fashion Hair Style"
                        subtitle="Premium Grooming Experience"
                        onPress={() => { }}
                        last
                    />

                </View>

                {/* Logout */}

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => { }}
                >

                    <Ionicons
                        name="log-out-outline"
                        size={20}
                        color="#DC2626"
                    />

                    <Text style={styles.logoutText}>
                        लॉगआउट
                    </Text>

                </TouchableOpacity>

                <Text style={styles.version}>
                    Version 1.0.0
                </Text>

            </ScrollView>

        </AppScreen>
    );
}

function InfoRow({
    icon,
    label,
    value,
    last = false,
}) {
    return (
        <View
            style={[
                styles.infoRow,
                !last && styles.rowBorder,
            ]}
        >

            <View style={styles.rowIcon}>
                <Ionicons
                    name={icon}
                    size={19}
                    color={COLORS.primary}
                />
            </View>

            <View style={styles.rowContent}>

                <Text style={styles.rowLabel}>
                    {label}
                </Text>

                <Text style={styles.rowValue}>
                    {value}
                </Text>

            </View>

        </View>
    );
}

function MenuItem({
    icon,
    title,
    subtitle,
    onPress,
    last = false,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[
                styles.menuItem,
                !last && styles.rowBorder,
            ]}
            onPress={onPress}
        >

            <View style={styles.menuIcon}>
                <Ionicons
                    name={icon}
                    size={20}
                    color={COLORS.primary}
                />
            </View>

            <View style={styles.menuContent}>

                <Text style={styles.menuTitle}>
                    {title}
                </Text>

                <Text style={styles.menuSubtitle}>
                    {subtitle}
                </Text>

            </View>

            <Ionicons
                name="chevron-forward"
                size={19}
                color="#999"
            />

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

    heading: {
        fontSize: 30,
        fontWeight: "700",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 6,
        color: "#777",
        fontSize: 14,
    },

    profileCard: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 24,
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    avatarText: {
        color: COLORS.black,
        fontSize: 26,
        fontWeight: "800",
    },

    profileInfo: {
        flex: 1,
        marginLeft: 14,
    },

    name: {
        color: COLORS.white,
        fontSize: 19,
        fontWeight: "700",
    },

    phoneRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 7,
    },

    phone: {
        marginLeft: 5,
        color: "#AAAAAA",
        fontSize: 12,
    },

    editButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#292929",
        alignItems: "center",
        justifyContent: "center",
    },

    sectionTitle: {
        marginTop: 26,
        marginBottom: 10,
        fontSize: 17,
        fontWeight: "700",
        color: COLORS.black,
    },

    infoCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        paddingHorizontal: SPACING.lg,
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
    },

    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
    },

    rowIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#F7F3E7",
        alignItems: "center",
        justifyContent: "center",
    },

    rowContent: {
        flex: 1,
        marginLeft: 12,
    },

    rowLabel: {
        color: "#999",
        fontSize: 11,
    },

    rowValue: {
        marginTop: 3,
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "600",
    },

    menuCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        paddingHorizontal: SPACING.lg,
    },

    menuItem: {
        minHeight: 72,
        flexDirection: "row",
        alignItems: "center",
    },

    menuIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: "#F7F3E7",
        alignItems: "center",
        justifyContent: "center",
    },

    menuContent: {
        flex: 1,
        marginLeft: 12,
        marginRight: 10,
    },

    menuTitle: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "700",
    },

    menuSubtitle: {
        marginTop: 3,
        color: "#888",
        fontSize: 11,
    },

    logoutButton: {
        marginTop: 24,
        height: 54,
        borderRadius: RADIUS.xl,
        backgroundColor: "#FEECEC",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    logoutText: {
        marginLeft: 8,
        color: "#DC2626",
        fontSize: 15,
        fontWeight: "700",
    },

    version: {
        textAlign: "center",
        marginTop: 18,
        color: "#AAAAAA",
        fontSize: 11,
    },

});