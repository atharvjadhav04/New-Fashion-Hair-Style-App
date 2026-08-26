import React from "react";
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
import { useAuth } from "../../context/AuthContext";
import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function ProfileScreen({ navigation }) {

    const { user } = useAuth();

    const formatDate = (date) => {
        if (!date) {
            return "जन्मतारीख उपलब्ध नाही";
        }

        const parsedDate = new Date(date);

        return parsedDate.toLocaleDateString("en-GB");
    };

    const customer = {
        name: user?.name || "ग्राहक",
        phone: user?.phone || "9876543210",
        dob: formatDate(user?.dateOfBirth),
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
                                size={13}
                                color="rgba(255, 255, 255, 0.6)"
                            />

                            <Text style={styles.phone}>
                                +91 {customer.phone}
                            </Text>

                        </View>

                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.editButton}
                        onPress={() =>
                            navigation.navigate("EditProfile", {
                                customer,
                            })
                        }
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
                    activeOpacity={0.8}
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
                    size={18}
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
            activeOpacity={0.65}
            style={[
                styles.menuItem,
                !last && styles.rowBorder,
            ]}
            onPress={onPress}
        >

            <View style={styles.menuIcon}>
                <Ionicons
                    name={icon}
                    size={19}
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
                size={18}
                color="#C0C0C0"
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
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black,
        letterSpacing: -0.5,
    },

    subtitle: {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 14,
        fontWeight: "400",
    },

    profileCard: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        // Soft elevation shadow
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.15,
                shadowRadius: 10,
            },
            android: {
                elevation: 6,
            },
        }),
    },

    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.2)",
    },

    avatarText: {
        color: COLORS.black,
        fontSize: 24,
        fontWeight: "800",
    },

    profileInfo: {
        flex: 1,
        marginLeft: 16,
    },

    name: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 0.2,
    },

    phoneRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    phone: {
        marginLeft: 6,
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 13,
        fontWeight: "500",
    },

    editButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#1F1F1F",
        borderWidth: 1,
        borderColor: "#2D2D2D",
        alignItems: "center",
        justifyContent: "center",
    },

    sectionTitle: {
        marginTop: 24,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.black,
        letterSpacing: -0.2,
    },

    infoCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        paddingHorizontal: SPACING.lg,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
    },

    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },

    rowIcon: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: "#F8F6EF",
        alignItems: "center",
        justifyContent: "center",
    },

    rowContent: {
        flex: 1,
        marginLeft: 14,
    },

    rowLabel: {
        color: "#8E8E93",
        fontSize: 11,
        fontWeight: "500",
    },

    rowValue: {
        marginTop: 2,
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "600",
    },

    menuCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        paddingHorizontal: SPACING.lg,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    menuItem: {
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
    },

    menuIcon: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: "#F8F6EF",
        alignItems: "center",
        justifyContent: "center",
    },

    menuContent: {
        flex: 1,
        marginLeft: 14,
        marginRight: 8,
    },

    menuTitle: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "600",
    },

    menuSubtitle: {
        marginTop: 2,
        color: "#8E8E93",
        fontSize: 11,
        fontWeight: "400",
    },

    logoutButton: {
        marginTop: 28,
        height: 52,
        borderRadius: RADIUS.xl,
        backgroundColor: "#FEF2F2",
        borderWidth: 1,
        borderColor: "#FEE2E2",
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
        marginTop: 20,
        color: "#9CA3AF",
        fontSize: 12,
        fontWeight: "500",
    },

});