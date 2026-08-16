import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import PrimaryButton from "../../components/common/PrimaryButton";

import { useBooking } from "../../context/BookingContext";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default function PaymentScreen({ navigation }) {
    const { booking } = useBooking();
    const [selectedMethod, setSelectedMethod] = useState("gpay");

    const amount = booking.amount || booking.service?.price || 0;

    const handleSuccess = () => {
        navigation.navigate("BookingSuccess");
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}
                <Text style={styles.heading}>पेमेंटचा पर्याय निवडा</Text>
                <Text style={styles.subtitle}>
                    सुरक्षित व जलद बुकिंगसाठी पेमेंट पद्धत निवडा
                </Text>

                {/* Amount Summary Card */}
                <View style={styles.amountCard}>
                    <View style={styles.amountInfo}>
                        <Text style={styles.amountLabel}>एकूण देय रक्कम</Text>
                        <Text style={styles.amountValue}>₹{amount}</Text>
                    </View>
                    <View style={styles.safetyBadge}>
                        <Ionicons
                            name="shield-checkmark-sharp"
                            size={14}
                            color={COLORS.primary}
                        />
                        <Text style={styles.safetyText}>100% सुरक्षित</Text>
                    </View>
                </View>

                {/* UPI Options */}
                <Text style={styles.sectionTitle}>UPI पेमेंट</Text>

                <PaymentOption
                    id="gpay"
                    title="Google Pay"
                    subtitle="UPI द्वारे थेट पेमेंट करा"
                    icon="logo-google"
                    iconColor="#4285F4"
                    selected={selectedMethod === "gpay"}
                    onSelect={setSelectedMethod}
                />

                <PaymentOption
                    id="phonepe"
                    title="PhonePe"
                    subtitle="PhonePe App द्वारे भरणा"
                    icon="wallet-outline"
                    iconColor="#5F259F"
                    selected={selectedMethod === "phonepe"}
                    onSelect={setSelectedMethod}
                />

                <PaymentOption
                    id="upi_other"
                    title="इतर UPI Apps / QR"
                    subtitle="Paytm, BHIM किंवा UPI ID"
                    icon="qr-code-outline"
                    iconColor="#00BAF2"
                    selected={selectedMethod === "upi_other"}
                    onSelect={setSelectedMethod}
                />

                {/* Pay at Salon & Other Options */}
                <Text style={[styles.sectionTitle, { marginTop: 22 }]}>
                    इतर पर्याय
                </Text>

                <PaymentOption
                    id="cash"
                    title="दुकानात कॅश द्या (Pay at Salon)"
                    subtitle="सर्व्हिस पूर्ण झाल्यावर बार्बरला रोख पैसे द्या"
                    icon="cash-outline"
                    iconColor="#16A34A"
                    selected={selectedMethod === "cash"}
                    onSelect={setSelectedMethod}
                />

                <PaymentOption
                    id="card"
                    title="डेबिट / क्रेडिट कार्ड"
                    subtitle="Visa, Mastercard, RuPay"
                    icon="card-outline"
                    iconColor="#EAB308"
                    selected={selectedMethod === "card"}
                    onSelect={setSelectedMethod}
                />

                {/* Security Trust Banner */}
                <View style={styles.trustBox}>
                    <Ionicons
                        name="lock-closed-outline"
                        size={16}
                        color="#6B7280"
                    />
                    <Text style={styles.trustText}>
                        तुमची पेमेंट माहिती पूर्णपणे सुरक्षित व एन्क्रिप्टेड आहे.
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Action Footer */}
            <View style={styles.bottomContainer}>
                <View style={styles.bottomPrice}>
                    <View>
                        <Text style={styles.bottomLabel}>देय रक्कम</Text>
                        <Text style={styles.bottomAmount}>₹{amount}</Text>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <PrimaryButton
                            title={
                                selectedMethod === "cash"
                                    ? "बुकिंग निश्चित करा"
                                    : `₹${amount} भरा`
                            }
                            onPress={handleSuccess}
                        />
                    </View>
                </View>
            </View>
        </AppScreen>
    );
}

function PaymentOption({
    id,
    title,
    subtitle,
    icon,
    iconColor,
    selected,
    onSelect,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.optionCard, selected && styles.optionCardSelected]}
            onPress={() => onSelect(id)}
        >
            <View style={styles.optionIconContainer}>
                <Ionicons name={icon} size={22} color={iconColor} />
            </View>

            <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{title}</Text>
                <Text style={styles.optionSubtitle}>{subtitle}</Text>
            </View>

            <View
                style={[
                    styles.radioOuter,
                    selected && styles.radioOuterSelected,
                ]}
            >
                {selected && <View style={styles.radioInner} />}
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
        paddingBottom: 160,
    },

    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black,
        letterSpacing: -0.4,
    },

    subtitle: {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 14,
        marginBottom: 20,
    },

    amountCard: {
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.12,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            },
        }),
    },

    amountInfo: {
        flex: 1,
    },

    amountLabel: {
        color: "#9CA3AF",
        fontSize: 12,
        fontWeight: "600",
        letterSpacing: 0.3,
    },

    amountValue: {
        color: COLORS.primary,
        fontSize: 32,
        fontWeight: "800",
        marginTop: 2,
    },

    safetyBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#262626",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    safetyText: {
        color: "#E5E7EB",
        fontSize: 11,
        fontWeight: "600",
        marginLeft: 6,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.black,
        marginBottom: 12,
        letterSpacing: -0.2,
    },

    optionCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        borderWidth: 1.5,
        borderColor: "#F3F4F6",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.03,
                shadowRadius: 6,
            },
            android: {
                elevation: 1.5,
            },
        }),
    },

    optionCardSelected: {
        borderColor: COLORS.primary,
        backgroundColor: "#FFFDF9",
    },

    optionIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#F9FAFB",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#F3F4F6",
    },

    optionTextContainer: {
        flex: 1,
        marginLeft: 14,
        marginRight: 8,
    },

    optionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.black,
    },

    optionSubtitle: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },

    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: "#D1D5DB",
        alignItems: "center",
        justifyContent: "center",
    },

    radioOuterSelected: {
        borderColor: COLORS.primary,
    },

    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
    },

    trustBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
        paddingHorizontal: 12,
    },

    trustText: {
        marginLeft: 8,
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center",
    },

    bottomContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.lg,
        paddingTop: 12,
        paddingBottom: Platform.OS === "ios" ? 28 : SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },

    bottomPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    bottomLabel: {
        color: "#9CA3AF",
        fontSize: 12,
        fontWeight: "600",
    },

    bottomAmount: {
        fontSize: 22,
        fontWeight: "800",
        color: COLORS.black,
        marginTop: 2,
    },

    buttonWrapper: {
        flex: 0.6,
    },
});