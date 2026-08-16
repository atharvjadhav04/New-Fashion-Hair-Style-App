import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import { COLORS, SPACING, RADIUS } from "../../theme";

const INCOME_CATEGORIES = [
    "Hair Cut",
    "Hair + Beard",
    "Hair Spa",
    "Other Service",
];

const EXPENSE_CATEGORIES = [
    "Hair Products",
    "Salary",
    "Rent",
    "Electricity",
    "Maintenance",
    "Other",
];

const PAYMENT_METHODS = [
    "Cash",
    "UPI",
    "Card",
    "Online Gateway",
];

export default function AddTransactionScreen({ navigation }) {
    const [type, setType] = useState("Income");
    const [source, setSource] = useState("Offline");
    const [category, setCategory] = useState("Hair Cut");
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [remarks, setRemarks] = useState("");

    const categories =
        type === "Income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    const changeType = (newType) => {
        setType(newType);
        if (newType === "Income") {
            setCategory("Hair Cut");
        } else {
            setCategory("Hair Products");
        }
    };

    const saveTransaction = () => {
        if (!amount.trim()) {
            Alert.alert("Amount Required", "कृपया amount टाका.");
            return;
        }

        const numericAmount = Number(amount);
        if (!numericAmount || numericAmount <= 0) {
            Alert.alert("Invalid Amount", "कृपया valid amount टाका.");
            return;
        }

        const transaction = {
            id: Date.now().toString(),
            type,
            source,
            category,
            amount: numericAmount,
            payment_method: paymentMethod,
            transaction_date: new Date().toISOString(),
            remarks: remarks.trim(),
        };

        Alert.alert(
            "Transaction Added",
            `${type === "Income" ? "Income" : "Expense"} successfully recorded.`,
            [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.popTo("FinanceHome", {
                            newTransaction: transaction,
                        });
                    },
                },
            ]
        );
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color={COLORS.black || "#0F172A"}
                    />
                    <Text style={styles.backText}>Finance</Text>
                </TouchableOpacity>

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerTextGroup}>
                        <Text style={styles.heading}>Add Transaction</Text>
                        <Text style={styles.subtitle}>
                            Income किंवा expense record करा
                        </Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="wallet-outline"
                            size={22}
                            color={COLORS.primary || "#F59E0B"}
                        />
                    </View>
                </View>

                {/* Transaction Type Toggle */}
                <Text style={styles.label}>Transaction Type</Text>
                <View style={styles.segmentRow}>
                    <SegmentButton
                        title="Income"
                        icon="arrow-down-circle-outline"
                        active={type === "Income"}
                        onPress={() => changeType("Income")}
                    />
                    <SegmentButton
                        title="Expense"
                        icon="arrow-up-circle-outline"
                        active={type === "Expense"}
                        onPress={() => changeType("Expense")}
                    />
                </View>

                {/* Business Source Toggle */}
                <Text style={styles.label}>Business Source</Text>
                <View style={styles.segmentRow}>
                    <SegmentButton
                        title="Offline"
                        icon="storefront-outline"
                        active={source === "Offline"}
                        onPress={() => setSource("Offline")}
                    />
                    <SegmentButton
                        title="Online"
                        icon="globe-outline"
                        active={source === "Online"}
                        onPress={() => setSource("Online")}
                    />
                </View>

                {/* Category Selection */}
                <Text style={styles.label}>Category</Text>
                <View style={styles.optionsWrap}>
                    {categories.map((item) => {
                        const isSelected = category === item;
                        return (
                            <TouchableOpacity
                                key={item}
                                activeOpacity={0.7}
                                style={[
                                    styles.option,
                                    isSelected && styles.optionActive,
                                ]}
                                onPress={() => setCategory(item)}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        isSelected && styles.optionTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Amount Input */}
                <Text style={styles.label}>Amount</Text>
                <View style={styles.amountContainer}>
                    <Text style={styles.currency}>₹</Text>
                    <TextInput
                        style={styles.amountInput}
                        value={amount}
                        onChangeText={setAmount}
                        placeholder="0"
                        placeholderTextColor="#94A3B8"
                        keyboardType="decimal-pad"
                    />
                </View>

                {/* Payment Method Selection */}
                <Text style={styles.label}>Payment Method</Text>
                <View style={styles.optionsWrap}>
                    {PAYMENT_METHODS.map((item) => {
                        const isSelected = paymentMethod === item;
                        return (
                            <TouchableOpacity
                                key={item}
                                activeOpacity={0.7}
                                style={[
                                    styles.option,
                                    isSelected && styles.optionActive,
                                ]}
                                onPress={() => setPaymentMethod(item)}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        isSelected && styles.optionTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Remarks Input */}
                <Text style={styles.label}>Remarks</Text>
                <View style={styles.remarksContainer}>
                    <TextInput
                        style={styles.remarksInput}
                        value={remarks}
                        onChangeText={setRemarks}
                        placeholder="Optional remarks..."
                        placeholderTextColor="#94A3B8"
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.85}
                    onPress={saveTransaction}
                >
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={22}
                        color={COLORS.black || "#0F172A"}
                    />
                    <Text style={styles.saveText}>Save Transaction</Text>
                </TouchableOpacity>
            </ScrollView>
        </AppScreen>
    );
}

function SegmentButton({ title, icon, active, onPress }) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.segmentButton, active && styles.segmentActive]}
            onPress={onPress}
        >
            <Ionicons
                name={icon}
                size={20}
                color={active ? COLORS.primary || "#F59E0B" : "#64748B"}
            />
            <Text
                style={[
                    styles.segmentText,
                    active && styles.segmentTextActive,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background || "#F8FAFC",
    },
    content: {
        padding: SPACING.lg || 16,
        paddingBottom: 40,
    },

    // Back Header
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        alignSelf: "flex-start",
    },
    backText: {
        marginLeft: 4,
        color: "#64748B",
        fontSize: 14,
        fontWeight: "600",
    },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    headerTextGroup: {
        flex: 1,
        marginRight: 12,
    },
    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
        letterSpacing: -0.5,
    },
    subtitle: {
        marginTop: 4,
        color: "#64748B",
        fontSize: 13,
        fontWeight: "500",
    },
    headerIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },

    // Section Label
    label: {
        marginTop: 6,
        marginBottom: 10,
        color: COLORS.black || "#0F172A",
        fontSize: 14,
        fontWeight: "700",
    },

    // Segment Controls
    segmentRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 20,
    },
    segmentButton: {
        flex: 1,
        height: 50,
        borderRadius: RADIUS.lg || 14,
        backgroundColor: COLORS.white || "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    segmentActive: {
        backgroundColor: COLORS.black || "#0F172A",
        borderColor: COLORS.black || "#0F172A",
    },
    segmentText: {
        marginLeft: 8,
        color: "#64748B",
        fontSize: 13,
        fontWeight: "700",
    },
    segmentTextActive: {
        color: COLORS.primary || "#F59E0B",
    },

    // Option Chips
    optionsWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 20,
    },
    option: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: COLORS.white || "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    optionActive: {
        backgroundColor: COLORS.black || "#0F172A",
        borderColor: COLORS.black || "#0F172A",
    },
    optionText: {
        color: "#64748B",
        fontSize: 13,
        fontWeight: "600",
    },
    optionTextActive: {
        color: COLORS.primary || "#F59E0B",
        fontWeight: "700",
    },

    // Inputs
    amountContainer: {
        height: 56,
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.lg || 14,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    currency: {
        color: COLORS.primary || "#D97706",
        fontSize: 22,
        fontWeight: "800",
    },
    amountInput: {
        flex: 1,
        marginLeft: 10,
        color: COLORS.black || "#0F172A",
        fontSize: 18,
        fontWeight: "700",
    },
    remarksContainer: {
        minHeight: 100,
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.lg || 14,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        padding: 14,
        marginBottom: 12,
    },
    remarksInput: {
        minHeight: 72,
        color: COLORS.black || "#0F172A",
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 20,
    },

    // Save Button
    saveButton: {
        height: 54,
        borderRadius: RADIUS.xl || 16,
        backgroundColor: COLORS.primary || "#F59E0B",
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.12,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    saveText: {
        marginLeft: 8,
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "800",
    },
});