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

    const amount = booking?.amount || booking?.service?.price || 0;

    const handleSuccess = () => {
        navigation.navigate("BookingSuccess");
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>पेमेंटचा पर्याय निवडा</Text>
                    <Text style={styles.subtitle}>
                        सुरक्षित व जलद बुकिंगसाठी तुमची आवडती पेमेंट पद्धत निवडा
                    </Text>
                </View>

                {/* Amount Summary Card */}
                <View style={styles.amountCard}>
                    <View style={styles.amountInfo}>
                        <Text style={styles.amountLabel}>एकूण देय रक्कम</Text>
                        <Text style={styles.amountValue}>₹{amount}</Text>
                    </View>
                    <View style={styles.safetyBadge}>
                        <Ionicons
                            name="shield-checkmark"
                            size={14}
                            color={COLORS.primary || "#EAB308"}
                        />
                        <Text style={styles.safetyText}>100% सुरक्षित</Text>
                    </View>
                </View>

                {/* UPI Options Section */}
                <Text style={styles.sectionTitle}>UPI पेमेंट</Text>

                <PaymentOption
                    id="gpay"
                    title="Google Pay"
                    subtitle="UPI द्वारे थेट पेमेंट करा"
                    icon="logo-google"
                    iconColor="#4285F4"
                    selected={selectedMethod === "gpay"}
                    onSelect={setSelectedMethod}
                    tag="Fast"
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
                <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
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
                    tag="Popular"
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
                        name="lock-closed"
                        size={15}
                        color="#6B7280"
                    />
                    <Text style={styles.trustText}>
                        तुमची पेमेंट माहिती पूर्णपणे एन्क्रिप्टेड व सुरक्षित आहे.
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Floating Action Footer */}
            <View style={styles.bottomContainer}>
                <View style={styles.bottomPrice}>
                    <View style={styles.priceContainer}>
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
    tag,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.optionCard, selected && styles.optionCardSelected]}
            onPress={() => onSelect(id)}
        >
            <View
                style={[
                    styles.optionIconContainer,
                    selected && { backgroundColor: iconColor + "15" },
                ]}
            >
                <Ionicons name={icon} size={22} color={iconColor} />
            </View>

            <View style={styles.optionTextContainer}>
                <View style={styles.titleRow}>
                    <Text
                        style={[
                            styles.optionTitle,
                            selected && styles.optionTitleSelected,
                        ]}
                    >
                        {title}
                    </Text>
                    {tag && (
                        <View style={styles.tagBadge}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.optionSubtitle}>{subtitle}</Text>
            </View>

            {/* Custom Styled Radio Button */}
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
        backgroundColor: COLORS.background || "#F9FAFB",
    },

    content: {
        paddingHorizontal: SPACING.lg || 16,
        paddingTop: SPACING.md || 12,
        paddingBottom: 170,
    },

    headerContainer: {
        marginBottom: 18,
    },

    heading: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.black || "#111827",
        letterSpacing: -0.3,
    },

    subtitle: {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 13.5,
        lineHeight: 18,
    },

    amountCard: {
        backgroundColor: COLORS.black || "#111827",
        borderRadius: RADIUS.xl || 20,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
            },
            android: {
                elevation: 6,
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
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    amountValue: {
        color: COLORS.primary || "#F59E0B",
        fontSize: 30,
        fontWeight: "800",
        marginTop: 2,
    },

    safetyBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },

    safetyText: {
        color: "#F3F4F6",
        fontSize: 11,
        fontWeight: "600",
        marginLeft: 5,
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#374151",
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: 0.6,
    },

    optionCard: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 16,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 5,
            },
            android: {
                elevation: 1,
            },
        }),
    },

    optionCardSelected: {
        borderColor: COLORS.primary || "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.04)",
    },

    optionIconContainer: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
    },

    optionTextContainer: {
        flex: 1,
        marginLeft: 12,
        marginRight: 8,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    optionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.black || "#1F2937",
    },

    optionTitleSelected: {
        color: COLORS.black || "#111827",
    },

    tagBadge: {
        backgroundColor: "#FEF3C7",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginLeft: 8,
    },

    tagText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#D97706",
    },

    optionSubtitle: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },

    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#D1D5DB",
        alignItems: "center",
        justifyContent: "center",
    },

    radioOuterSelected: {
        borderColor: COLORS.primary || "#F59E0B",
    },

    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary || "#F59E0B",
    },

    trustBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        paddingHorizontal: 16,
    },

    trustText: {
        marginLeft: 6,
        color: "#9CA3AF",
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center",
    },

    bottomContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white || "#FFFFFF",
        paddingHorizontal: SPACING.lg || 16,
        paddingTop: 14,
        paddingBottom: Platform.OS === "ios" ? 30 : 16,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -6 },
                shadowOpacity: 0.06,
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            },
        }),
    },

    bottomPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    priceContainer: {
        flexDirection: "column",
    },

    bottomLabel: {
        color: "#9CA3AF",
        fontSize: 11,
        fontWeight: "600",
        textTransform: "uppercase",
    },

    bottomAmount: {
        fontSize: 22,
        fontWeight: "800",
        color: COLORS.black || "#111827",
        marginTop: 1,
    },

    buttonWrapper: {
        flex: 0.65,
    },
});