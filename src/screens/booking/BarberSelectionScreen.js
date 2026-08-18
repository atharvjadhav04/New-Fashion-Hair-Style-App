import React, { useState } from "react";
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

const BARBERS = [
    {
        id: 1,
        name: "Rajesh",
        rating: 4.9,
        waiting: 2,
        eta: 10,
        chair: 1,
    },
    {
        id: 2,
        name: "Amit",
        rating: 4.8,
        waiting: 5,
        eta: 25,
        chair: 2,
    },
    {
        id: 3,
        name: "Suresh",
        rating: 4.7,
        waiting: 1,
        eta: 5,
        chair: 3,
    },
];

export default function BarberSelectionScreen({ navigation }) {
    const { updateBooking } = useBooking();

    const [selectedBarber, setSelectedBarber] = useState(null);

    const handleContinue = () => {
        if (!selectedBarber) {
            return;
        }

        updateBooking({
            barber: selectedBarber,
            chair: selectedBarber.chair,
        });

        navigation.navigate("SelectDate");
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <View style={styles.stepBadge}>
                        <Ionicons name="cut-outline" size={12} color={COLORS.primary} />
                        <Text style={styles.stepBadgeText}>बार्बर निवड</Text>
                    </View>
                    <Text style={styles.heading}>तुमचा बार्बर निवडा</Text>
                    <Text style={styles.subtitle}>
                        तुमच्या आवडत्या बार्बरसह अपॉइंटमेंट बुक करा
                    </Text>
                </View>

                {/* Barber List */}
                {BARBERS.map((barber) => {
                    const selected = selectedBarber?.id === barber.id;

                    return (
                        <TouchableOpacity
                            key={barber.id}
                            activeOpacity={0.9}
                            style={[
                                styles.card,
                                selected && styles.selectedCard,
                            ]}
                            onPress={() => setSelectedBarber(barber)}
                        >
                            {/* Card Header Row */}
                            <View style={styles.topRow}>
                                <View style={[styles.avatar, selected && styles.selectedAvatar]}>
                                    <Text style={styles.avatarText}>
                                        {barber.name.charAt(0)}
                                    </Text>
                                </View>

                                <View style={styles.info}>
                                    <Text style={styles.name}>{barber.name}</Text>

                                    <View style={styles.ratingBadge}>
                                        <Ionicons
                                            name="star"
                                            size={12}
                                            color="#D97706"
                                        />
                                        <Text style={styles.ratingText}>
                                            {barber.rating}
                                        </Text>
                                    </View>
                                </View>

                                <View style={selected ? styles.check : styles.unselectedCheck}>
                                    {selected && (
                                        <Ionicons
                                            name="checkmark"
                                            size={14}
                                            color={COLORS.white}
                                        />
                                    )}
                                </View>
                            </View>

                            {/* Divider Line */}
                            <View style={styles.divider} />

                            {/* Stats & Status Footer */}
                            <View style={styles.statsContainer}>
                                <View style={styles.statBox}>
                                    <Text style={styles.smallLabel}>प्रतीक्षेत</Text>
                                    <Text style={styles.queueValue}>
                                        {barber.waiting} ग्राहक
                                    </Text>
                                </View>

                                <View style={styles.verticalDivider} />

                                <View style={styles.statBox}>
                                    <Text style={styles.smallLabel}>अंदाजे वेळ</Text>
                                    <Text style={styles.queueValue}>
                                        {barber.eta} मिनिटे
                                    </Text>
                                </View>

                                <View style={styles.availableBadge}>
                                    <View style={styles.greenDot} />
                                    <Text style={styles.availableText}>उपलब्ध</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Bottom Floating Bar */}
            <View style={styles.bottomButtonContainer}>
                <PrimaryButton
                    title="पुढे जा"
                    onPress={handleContinue}
                    disabled={!selectedBarber}
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
        padding: SPACING.lg || 20,
        paddingBottom: 120,
    },

    headerContainer: {
        marginBottom: 20,
    },

    stepBadge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "#FFFBEB",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#FEF3C7",
    },

    stepBadgeText: {
        fontSize: 12,
        fontWeight: "700",
        color: COLORS.primary || "#D97706",
        marginLeft: 4,
    },

    heading: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.black || "#111827",
        letterSpacing: -0.5,
    },

    subtitle: {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 20,
    },

    card: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.03,
                shadowRadius: 10,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    selectedCard: {
        borderColor: COLORS.primary || "#F59E0B",
        backgroundColor: "#FFFDF9",
        ...Platform.select({
            ios: {
                shadowColor: COLORS.primary || "#F59E0B",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
            },
            android: {
                elevation: 4,
            },
        }),
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: 18,
        backgroundColor: "#111827",
        alignItems: "center",
        justifyContent: "center",
    },

    selectedAvatar: {
        backgroundColor: COLORS.primary || "#F59E0B",
    },

    avatarText: {
        color: COLORS.white || "#FFFFFF",
        fontSize: 22,
        fontWeight: "800",
    },

    info: {
        flex: 1,
        marginLeft: 14,
        justifyContent: "center",
    },

    name: {
        fontSize: 17,
        fontWeight: "700",
        color: COLORS.black || "#111827",
        letterSpacing: -0.2,
    },

    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "#FFFBEB",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        marginTop: 4,
    },

    ratingText: {
        marginLeft: 4,
        color: "#D97706",
        fontSize: 12,
        fontWeight: "700",
    },

    check: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary || "#F59E0B",
        alignItems: "center",
        justifyContent: "center",
    },

    unselectedCheck: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#D1D5DB",
    },

    divider: {
        height: 1,
        backgroundColor: "#F3F4F6",
        marginVertical: 14,
    },

    statsContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    statBox: {
        flex: 1,
    },

    verticalDivider: {
        width: 1,
        height: 20,
        backgroundColor: "#E5E7EB",
        marginHorizontal: 10,
    },

    smallLabel: {
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.3,
    },

    queueValue: {
        marginTop: 2,
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.black || "#111827",
    },

    availableBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ECFDF5",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#A7F3D0",
    },

    greenDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#10B981",
        marginRight: 6,
    },

    availableText: {
        color: "#047857",
        fontSize: 11,
        fontWeight: "700",
    },

    bottomButtonContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: SPACING.lg || 20,
        paddingBottom: Platform.OS === "ios" ? 32 : 20,
        paddingTop: 14,
        backgroundColor: COLORS.white || "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 8,
    },
});