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
    },
    {
        id: 2,
        name: "Amit",
        rating: 4.8,
        waiting: 5,
        eta: 25,
    },
    {
        id: 3,
        name: "Suresh",
        rating: 4.7,
        waiting: 1,
        eta: 5,
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
                <Text style={styles.heading}>
                    तुमचा बार्बर निवडा
                </Text>

                <Text style={styles.subtitle}>
                    तुमच्या आवडत्या बार्बरसह अपॉइंटमेंट बुक करा
                </Text>

                {BARBERS.map((barber) => {
                    const selected = selectedBarber?.id === barber.id;

                    return (
                        <TouchableOpacity
                            key={barber.id}
                            activeOpacity={0.88}
                            style={[
                                styles.card,
                                selected && styles.selectedCard,
                            ]}
                            onPress={() => setSelectedBarber(barber)}
                        >
                            <View style={styles.topRow}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>
                                        {barber.name.charAt(0)}
                                    </Text>
                                </View>

                                <View style={styles.info}>
                                    <Text style={styles.name}>
                                        {barber.name}
                                    </Text>

                                    <View style={styles.ratingRow}>
                                        <Ionicons
                                            name="star"
                                            size={14}
                                            color={COLORS.primary}
                                        />

                                        <Text style={styles.rating}>
                                            {barber.rating}
                                        </Text>
                                    </View>
                                </View>

                                {selected ? (
                                    <View style={styles.check}>
                                        <Ionicons
                                            name="checkmark"
                                            size={16}
                                            color={COLORS.white}
                                        />
                                    </View>
                                ) : (
                                    <View style={styles.unselectedCheck} />
                                )}
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.queueRow}>
                                <View style={styles.statBox}>
                                    <Text style={styles.smallLabel}>
                                        प्रतीक्षेत
                                    </Text>

                                    <Text style={styles.queueValue}>
                                        {barber.waiting} ग्राहक
                                    </Text>
                                </View>

                                <View style={styles.verticalDivider} />

                                <View style={styles.statBox}>
                                    <Text style={styles.smallLabel}>
                                        अंदाजे वेळ
                                    </Text>

                                    <Text style={styles.queueValue}>
                                        {barber.eta} मिनिटे
                                    </Text>
                                </View>

                                <View style={styles.availableBadge}>
                                    <View style={styles.greenDot} />

                                    <Text style={styles.availableText}>
                                        उपलब्ध
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <View style={styles.bottomButton}>
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
        backgroundColor: COLORS.background,
    },

    content: {
        padding: SPACING.lg,
        paddingBottom: 110,
    },

    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black,
        letterSpacing: -0.5,
    },

    subtitle: {
        marginTop: 4,
        marginBottom: 22,
        color: "#6B7280",
        fontSize: 14,
        fontWeight: "400",
    },

    card: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: "#F0F0F0",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    selectedCard: {
        borderColor: COLORS.primary,
        backgroundColor: "#FFFDF9",
        ...Platform.select({
            ios: {
                shadowColor: COLORS.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 10,
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
        borderRadius: 16,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    avatarText: {
        color: COLORS.primary,
        fontSize: 22,
        fontWeight: "800",
    },

    info: {
        flex: 1,
        marginLeft: 14,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.black,
        letterSpacing: -0.2,
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },

    rating: {
        marginLeft: 4,
        color: "#4B5563",
        fontSize: 13,
        fontWeight: "700",
    },

    check: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    unselectedCheck: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
    },

    divider: {
        height: 1,
        backgroundColor: "#F3F4F6",
        marginVertical: 14,
    },

    queueRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    statBox: {
        flex: 1,
    },

    verticalDivider: {
        width: 1,
        height: 24,
        backgroundColor: "#E5E7EB",
        marginHorizontal: 12,
    },

    smallLabel: {
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "500",
    },

    queueValue: {
        marginTop: 2,
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.black,
    },

    availableBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0FDF4",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#DCFCE7",
    },

    greenDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#22C55E",
        marginRight: 6,
    },

    availableText: {
        color: "#15803D",
        fontSize: 11,
        fontWeight: "700",
    },

    bottomButton: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: SPACING.lg,
        paddingBottom: Platform.OS === "ios" ? 28 : SPACING.lg,
        paddingTop: 12,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
    },
});