import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

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

export default function AddTransactionScreen({
    navigation,
}) {
    const [type, setType] = useState("Income");

    const [source, setSource] =
        useState("Offline");

    const [category, setCategory] =
        useState("Hair Cut");

    const [amount, setAmount] =
        useState("");

    const [paymentMethod, setPaymentMethod] =
        useState("Cash");

    const [remarks, setRemarks] =
        useState("");

    const categories =
        type === "Income"
            ? INCOME_CATEGORIES
            : EXPENSE_CATEGORIES;

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
            Alert.alert(
                "Amount Required",
                "कृपया amount टाका."
            );
            return;
        }

        const numericAmount =
            Number(amount);

        if (
            !numericAmount ||
            numericAmount <= 0
        ) {
            Alert.alert(
                "Invalid Amount",
                "कृपया valid amount टाका."
            );
            return;
        }

        const transaction = {
            id: Date.now().toString(),

            type,

            source,

            category,

            amount: numericAmount,

            payment_method:
                paymentMethod,

            transaction_date:
                new Date().toISOString(),

            remarks:
                remarks.trim(),
        };

        console.log(
            "NEW TRANSACTION:",
            transaction
        );

        Alert.alert(
            "Transaction Added",

            `${type === "Income"
                ? "Income"
                : "Expense"
            } successfully recorded.`,

            [
                {
                    text: "OK",

                    onPress: () => {
                        navigation.popTo(
                            "FinanceHome",
                            {
                                newTransaction:
                                    transaction,
                            }
                        );
                    },
                },
            ]
        );
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.content
                }
                keyboardShouldPersistTaps="handled"
            >
                {/* Back */}

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                    <Ionicons
                        name="arrow-back"
                        size={20}
                        color={COLORS.black}
                    />

                    <Text
                        style={styles.backText}
                    >
                        Finance
                    </Text>
                </TouchableOpacity>

                {/* Header */}

                <View style={styles.header}>
                    <View>
                        <Text
                            style={styles.heading}
                        >
                            Add Transaction
                        </Text>

                        <Text
                            style={styles.subtitle}
                        >
                            Income किंवा expense record करा
                        </Text>
                    </View>

                    <View
                        style={styles.headerIcon}
                    >
                        <Ionicons
                            name="wallet-outline"
                            size={24}
                            color={
                                COLORS.primary
                            }
                        />
                    </View>
                </View>

                {/* TYPE */}

                <Text style={styles.label}>
                    Transaction Type
                </Text>

                <View style={styles.segmentRow}>
                    <SegmentButton
                        title="Income"
                        icon="arrow-down-circle-outline"
                        active={
                            type === "Income"
                        }
                        onPress={() =>
                            changeType(
                                "Income"
                            )
                        }
                    />

                    <SegmentButton
                        title="Expense"
                        icon="arrow-up-circle-outline"
                        active={
                            type === "Expense"
                        }
                        onPress={() =>
                            changeType(
                                "Expense"
                            )
                        }
                    />
                </View>

                {/* SOURCE */}

                <Text style={styles.label}>
                    Business Source
                </Text>

                <View style={styles.segmentRow}>
                    <SegmentButton
                        title="Offline"
                        icon="storefront-outline"
                        active={
                            source ===
                            "Offline"
                        }
                        onPress={() =>
                            setSource(
                                "Offline"
                            )
                        }
                    />

                    <SegmentButton
                        title="Online"
                        icon="globe-outline"
                        active={
                            source ===
                            "Online"
                        }
                        onPress={() =>
                            setSource(
                                "Online"
                            )
                        }
                    />
                </View>

                {/* CATEGORY */}

                <Text style={styles.label}>
                    Category
                </Text>

                <View
                    style={styles.optionsWrap}
                >
                    {categories.map(
                        (item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.option,
                                    category ===
                                    item &&
                                    styles.optionActive,
                                ]}
                                onPress={() =>
                                    setCategory(
                                        item
                                    )
                                }
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        category ===
                                        item &&
                                        styles.optionTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    )}
                </View>

                {/* AMOUNT */}

                <Text style={styles.label}>
                    Amount
                </Text>

                <View
                    style={styles.amountContainer}
                >
                    <Text
                        style={styles.currency}
                    >
                        ₹
                    </Text>

                    <TextInput
                        style={
                            styles.amountInput
                        }
                        value={amount}
                        onChangeText={
                            setAmount
                        }
                        placeholder="0"
                        placeholderTextColor="#999"
                        keyboardType="decimal-pad"
                    />
                </View>

                {/* PAYMENT */}

                <Text style={styles.label}>
                    Payment Method
                </Text>

                <View
                    style={styles.optionsWrap}
                >
                    {PAYMENT_METHODS.map(
                        (item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.option,
                                    paymentMethod ===
                                    item &&
                                    styles.optionActive,
                                ]}
                                onPress={() =>
                                    setPaymentMethod(
                                        item
                                    )
                                }
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        paymentMethod ===
                                        item &&
                                        styles.optionTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    )}
                </View>

                {/* REMARKS */}

                <Text style={styles.label}>
                    Remarks
                </Text>

                <View
                    style={styles.remarksContainer}
                >
                    <TextInput
                        style={
                            styles.remarksInput
                        }
                        value={remarks}
                        onChangeText={
                            setRemarks
                        }
                        placeholder="Optional remarks..."
                        placeholderTextColor="#999"
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                {/* SAVE */}

                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.8}
                    onPress={
                        saveTransaction
                    }
                >
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={21}
                        color={COLORS.black}
                    />

                    <Text
                        style={styles.saveText}
                    >
                        Save Transaction
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </AppScreen>
    );
}

function SegmentButton({
    title,
    icon,
    active,
    onPress,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.segmentButton,
                active &&
                styles.segmentActive,
            ]}
            onPress={onPress}
        >
            <Ionicons
                name={icon}
                size={19}
                color={
                    active
                        ? COLORS.primary
                        : "#888"
                }
            />

            <Text
                style={[
                    styles.segmentText,
                    active &&
                    styles.segmentTextActive,
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
        backgroundColor:
            COLORS.background,
    },

    content: {
        padding: SPACING.lg,
        paddingBottom: 50,
    },

    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },

    backText: {
        marginLeft: 7,
        color: "#666",
        fontSize: 12,
        fontWeight: "600",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:
            "space-between",
        marginBottom: 25,
    },

    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 5,
        color: "#888",
        fontSize: 11,
    },

    headerIcon: {
        width: 46,
        height: 46,
        borderRadius: 16,
        backgroundColor:
            COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    label: {
        marginTop: 4,
        marginBottom: 9,
        color: COLORS.black,
        fontSize: 13,
        fontWeight: "700",
    },

    segmentRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 18,
    },

    segmentButton: {
        flex: 1,
        height: 52,
        borderRadius: 15,
        backgroundColor:
            COLORS.white,
        borderWidth: 1,
        borderColor: "#EEEEEE",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:
            "center",
    },

    segmentActive: {
        backgroundColor:
            COLORS.black,
        borderColor:
            COLORS.black,
    },

    segmentText: {
        marginLeft: 7,
        color: "#888",
        fontSize: 11,
        fontWeight: "700",
    },

    segmentTextActive: {
        color: COLORS.primary,
    },

    optionsWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 18,
    },

    option: {
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderRadius: 18,
        backgroundColor:
            COLORS.white,
        borderWidth: 1,
        borderColor: "#EEEEEE",
    },

    optionActive: {
        backgroundColor:
            COLORS.black,
        borderColor:
            COLORS.black,
    },

    optionText: {
        color: "#777",
        fontSize: 10,
        fontWeight: "700",
    },

    optionTextActive: {
        color: COLORS.primary,
    },

    amountContainer: {
        height: 58,
        backgroundColor:
            COLORS.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#EEEEEE",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 18,
    },

    currency: {
        color: COLORS.primary,
        fontSize: 24,
        fontWeight: "800",
    },

    amountInput: {
        flex: 1,
        marginLeft: 10,
        color: COLORS.black,
        fontSize: 20,
        fontWeight: "700",
    },

    remarksContainer: {
        minHeight: 90,
        backgroundColor:
            COLORS.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#EEEEEE",
        padding: 12,
        marginBottom: 5,
    },

    remarksInput: {
        minHeight: 65,
        color: COLORS.black,
        fontSize: 12,
    },

    saveButton: {
        height: 55,
        borderRadius: RADIUS.xl,
        backgroundColor:
            COLORS.primary,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    saveText: {
        marginLeft: 7,
        color: COLORS.black,
        fontSize: 13,
        fontWeight: "800",
    },
});