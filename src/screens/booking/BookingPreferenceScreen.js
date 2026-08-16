import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
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

export default function BookingPreferenceScreen({ navigation }) {
    const { updateBooking } = useBooking();

    const [selected, setSelected] = useState("FASTEST");

    const handleContinue = () => {
        updateBooking({
            bookingType: selected,
        });

        if (selected === "FASTEST") {
            navigation.navigate("SelectDate");
        } else {
            navigation.navigate("BarberSelection");
        }
    };

    return (
        <AppScreen style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <Text style={styles.heading}>Booking Preference</Text>
                <Text style={styles.subHeading}>Choose how you want to book</Text>

                {/* Option 1: Fastest Available */}
                <TouchableOpacity
                    activeOpacity={0.88}
                    style={[
                        styles.card,
                        selected === "FASTEST" && styles.activeCard,
                    ]}
                    onPress={() => setSelected("FASTEST")}
                >
                    <View style={styles.cardHeader}>
                        <View style={styles.iconContainer}>
                            <Ionicons
                                name="flash"
                                size={20}
                                color={COLORS.primary}
                            />
                        </View>

                        <Text style={styles.title}>Fastest Available</Text>

                        {selected === "FASTEST" ? (
                            <View style={styles.radioSelected}>
                                <Ionicons
                                    name="checkmark"
                                    size={14}
                                    color={COLORS.white}
                                />
                            </View>
                        ) : (
                            <View style={styles.radioUnselected} />
                        )}
                    </View>

                    <Text style={styles.desc}>
                        We'll assign the barber with the shortest waiting time.
                    </Text>

                    <View style={styles.divider} />

                    <View style={styles.waitBadge}>
                        <Ionicons
                            name="time-outline"
                            size={14}
                            color={COLORS.primary}
                        />
                        <Text style={styles.waitText}>
                            Approx Wait: <Text style={styles.waitHighlight}>10 Minutes</Text>
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Option 2: Choose My Barber */}
                <TouchableOpacity
                    activeOpacity={0.88}
                    style={[
                        styles.card,
                        selected === "CUSTOM" && styles.activeCard,
                    ]}
                    onPress={() => setSelected("CUSTOM")}
                >
                    <View style={styles.cardHeader}>
                        <View style={styles.iconContainer}>
                            <Ionicons
                                name="person"
                                size={20}
                                color={COLORS.primary}
                            />
                        </View>

                        <Text style={styles.title}>Choose My Barber</Text>

                        {selected === "CUSTOM" ? (
                            <View style={styles.radioSelected}>
                                <Ionicons
                                    name="checkmark"
                                    size={14}
                                    color={COLORS.white}
                                />
                            </View>
                        ) : (
                            <View style={styles.radioUnselected} />
                        )}
                    </View>

                    <Text style={styles.desc}>
                        Select your preferred barber from the available staff.
                    </Text>

                    <View style={styles.divider} />

                    <View style={styles.waitBadge}>
                        <Ionicons
                            name="time-outline"
                            size={14}
                            color={COLORS.primary}
                        />
                        <Text style={styles.waitText}>
                            Approx Wait: <Text style={styles.waitHighlight}>20 Minutes</Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Footer */}
            <View style={styles.footer}>
                <PrimaryButton
                    title="Continue"
                    onPress={handleContinue}
                />
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: 110,
    },

    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black,
        letterSpacing: -0.5,
    },

    subHeading: {
        color: "#6B7280",
        marginBottom: 24,
        marginTop: 4,
        fontSize: 14,
        fontWeight: "400",
    },

    card: {
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        borderRadius: RADIUS.xl,
        borderWidth: 1.5,
        borderColor: "#F0F0F0",
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    activeCard: {
        borderColor: COLORS.primary,
        backgroundColor: "#FFFDF9",
        ...Platform.select({
            ios: {
                shadowColor: COLORS.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            },
        }),
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainer: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.black,
        marginLeft: 12,
        letterSpacing: -0.3,
    },

    radioSelected: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    radioUnselected: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
    },

    desc: {
        marginTop: 12,
        color: "#4B5563",
        lineHeight: 20,
        fontSize: 13,
    },

    divider: {
        height: 1,
        backgroundColor: "#F3F4F6",
        marginVertical: 14,
    },

    waitBadge: {
        flexDirection: "row",
        alignItems: "center",
    },

    waitText: {
        marginLeft: 6,
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "500",
    },

    waitHighlight: {
        color: COLORS.black,
        fontWeight: "700",
    },

    footer: {
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