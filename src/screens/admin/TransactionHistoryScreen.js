import React, { useMemo, useState } from "react";
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

const SAMPLE_TRANSACTIONS = [
    {
        id: "1",
        type: "Income",
        category: "Hair Cut",
        source: "Offline",
        payment_method: "Cash",
        amount: 200,
        transaction_date: new Date().toISOString(),
    },
    {
        id: "2",
        type: "Income",
        category: "Hair Spa",
        source: "Online",
        payment_method: "UPI",
        amount: 500,
        transaction_date: new Date().toISOString(),
    },
    {
        id: "3",
        type: "Expense",
        category: "Hair Products",
        source: "Offline",
        payment_method: "UPI",
        amount: 2000,
        transaction_date: new Date().toISOString(),
    },
];

export default function TransactionHistoryScreen({
    navigation,
}) {
    const [transactions] = useState(
        SAMPLE_TRANSACTIONS
    );

    const [filter, setFilter] = useState("All");

    const filteredTransactions = useMemo(() => {
        if (filter === "All") {
            return transactions;
        }

        return transactions.filter(
            (item) =>
                item.type === filter
        );
    }, [transactions, filter]);

    return (
        <AppScreen style={styles.screen}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.content
                }
            >

                {/* Header */}

                <View style={styles.header}>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() =>
                            navigation.goBack()
                        }
                    >
                        <Ionicons
                            name="arrow-back"
                            size={21}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>

                    <View style={styles.headerText}>
                        <Text style={styles.heading}>
                            Transactions
                        </Text>

                        <Text style={styles.subtitle}>
                            सर्व financial transactions
                        </Text>
                    </View>

                </View>

                {/* Filters */}

                <View style={styles.filters}>

                    {[
                        "All",
                        "Income",
                        "Expense",
                    ].map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.filterButton,
                                filter === item &&
                                styles.filterActive,
                            ]}
                            onPress={() =>
                                setFilter(item)
                            }
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    filter === item &&
                                    styles.filterTextActive,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}

                </View>

                {/* Summary */}

                <View style={styles.summaryCard}>

                    <Text style={styles.summaryTitle}>
                        {filter === "All"
                            ? "All Transactions"
                            : filter}
                    </Text>

                    <Text style={styles.summaryCount}>
                        {filteredTransactions.length}{" "}
                        transactions
                    </Text>

                </View>

                {/* List */}

                {filteredTransactions.length ===
                    0 ? (
                    <View style={styles.emptyCard}>

                        <Ionicons
                            name="receipt-outline"
                            size={42}
                            color="#999"
                        />

                        <Text
                            style={styles.emptyTitle}
                        >
                            No Transactions
                        </Text>

                        <Text
                            style={styles.emptyText}
                        >
                            या filter मध्ये कोणतेही
                            transactions नाहीत.
                        </Text>

                    </View>
                ) : (
                    filteredTransactions.map(
                        (transaction) => (
                            <TransactionItem
                                key={
                                    transaction.id
                                }
                                transaction={
                                    transaction
                                }
                            />
                        )
                    )
                )}

            </ScrollView>

        </AppScreen>
    );
}

function TransactionItem({
    transaction,
}) {
    const isIncome =
        transaction.type === "Income";

    const date = new Date(
        transaction.transaction_date
    ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <View style={styles.transactionCard}>

            <View
                style={[
                    styles.transactionIcon,
                    isIncome
                        ? styles.incomeIcon
                        : styles.expenseIcon,
                ]}
            >
                <Ionicons
                    name={
                        isIncome
                            ? "arrow-down-outline"
                            : "arrow-up-outline"
                    }
                    size={21}
                    color={
                        isIncome
                            ? "#16A34A"
                            : "#DC2626"
                    }
                />
            </View>

            <View style={styles.transactionInfo}>

                <Text style={styles.category}>
                    {transaction.category}
                </Text>

                <Text style={styles.meta}>
                    {transaction.source} •{" "}
                    {transaction.payment_method}
                </Text>

                <Text style={styles.date}>
                    {date}
                </Text>

            </View>

            <Text
                style={[
                    styles.amount,
                    isIncome
                        ? styles.incomeAmount
                        : styles.expenseAmount,
                ]}
            >
                {isIncome ? "+" : "-"}₹
                {transaction.amount.toLocaleString(
                    "en-IN"
                )}
            </Text>

        </View>
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

    header: {
        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor:
            COLORS.white,
        alignItems: "center",
        justifyContent: "center",
    },

    headerText: {
        marginLeft: 12,
    },

    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 4,
        color: "#888",
        fontSize: 10,
    },

    filters: {
        flexDirection: "row",
        marginTop: 22,
        marginBottom: 12,
    },

    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 20,
        backgroundColor:
            COLORS.white,
        marginRight: 8,
    },

    filterActive: {
        backgroundColor:
            COLORS.black,
    },

    filterText: {
        color: "#777",
        fontSize: 10,
        fontWeight: "700",
    },

    filterTextActive: {
        color: COLORS.primary,
    },

    summaryCard: {
        backgroundColor:
            COLORS.black,
        borderRadius: RADIUS.xl,
        padding: 16,
        marginBottom: 12,
    },

    summaryTitle: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: "800",
    },

    summaryCount: {
        marginTop: 4,
        color: "#999",
        fontSize: 10,
    },

    transactionCard: {
        backgroundColor:
            COLORS.white,
        borderRadius: 16,
        padding: 14,
        marginBottom: 9,
        flexDirection: "row",
        alignItems: "center",
    },

    transactionIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    incomeIcon: {
        backgroundColor: "#EAF8EF",
    },

    expenseIcon: {
        backgroundColor: "#FEECEC",
    },

    transactionInfo: {
        flex: 1,
        marginLeft: 12,
    },

    category: {
        color: COLORS.black,
        fontSize: 13,
        fontWeight: "800",
    },

    meta: {
        marginTop: 4,
        color: "#777",
        fontSize: 9,
    },

    date: {
        marginTop: 3,
        color: "#AAA",
        fontSize: 8,
    },

    amount: {
        fontSize: 14,
        fontWeight: "800",
    },

    incomeAmount: {
        color: "#16A34A",
    },

    expenseAmount: {
        color: "#DC2626",
    },

    emptyCard: {
        backgroundColor:
            COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 35,
        alignItems: "center",
        justifyContent: "center",
    },

    emptyTitle: {
        marginTop: 10,
        color: COLORS.black,
        fontSize: 15,
        fontWeight: "800",
    },

    emptyText: {
        marginTop: 5,
        color: "#999",
        fontSize: 10,
        textAlign: "center",
    },
});