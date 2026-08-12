import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
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
                            activeOpacity={0.85}
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
                                            size={15}
                                            color={COLORS.primary}
                                        />

                                        <Text style={styles.rating}>
                                            {barber.rating}
                                        </Text>
                                    </View>
                                </View>

                                {selected && (
                                    <View style={styles.check}>
                                        <Ionicons
                                            name="checkmark"
                                            size={18}
                                            color={COLORS.white}
                                        />
                                    </View>
                                )}
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.queueRow}>
                                <View>
                                    <Text style={styles.smallLabel}>
                                        प्रतीक्षेत
                                    </Text>

                                    <Text style={styles.queueValue}>
                                        {barber.waiting} ग्राहक
                                    </Text>
                                </View>

                                <View>
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
        paddingBottom: 120,
    },

    heading: {
        fontSize: 28,
        fontWeight: "700",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 8,
        marginBottom: 24,
        color: "#777",
        fontSize: 15,
    },

    card: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: "#EEEEEE",
    },

    selectedCard: {
        borderColor: COLORS.primary,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    avatarText: {
        color: COLORS.primary,
        fontSize: 23,
        fontWeight: "700",
    },

    info: {
        flex: 1,
        marginLeft: 14,
    },

    name: {
        fontSize: 19,
        fontWeight: "700",
        color: COLORS.black,
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    rating: {
        marginLeft: 5,
        color: "#666",
        fontWeight: "600",
    },

    check: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    divider: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginVertical: 16,
    },

    queueRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    smallLabel: {
        color: "#888",
        fontSize: 12,
    },

    queueValue: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.black,
    },

    availableBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EAF8EF",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },

    greenDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#22C55E",
        marginRight: 5,
    },

    availableText: {
        color: "#16A34A",
        fontSize: 12,
        fontWeight: "700",
    },

    bottomButton: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.lg,
        paddingTop: 8,
        backgroundColor: COLORS.background,
    },
});