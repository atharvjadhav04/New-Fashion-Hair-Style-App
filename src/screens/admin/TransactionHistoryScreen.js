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
import { COLORS, SPACING, RADIUS } from "../../theme";

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

export default function TransactionHistoryScreen({ navigation }) {
    const [transactions] = useState(SAMPLE_TRANSACTIONS);
    const [filter, setFilter] = useState("All");

    const filteredTransactions = useMemo(() => {
        if (filter === "All") {
            return transactions;
        }
        return transactions.filter((item) => item.type === filter);
    }, [transactions, filter]);

    // Calculated totals for summary card
    const stats = useMemo(() => {
        return transactions.reduce(
            (acc, item) => {
                if (item.type === "Income") {
                    acc.income += item.amount;
                } else {
                    acc.expense += item.amount;
                }
                return acc;
            },
            { income: 0, expense: 0 }
        );
    }, [transactions]);

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        activeOpacity={0.7}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={20}
                            color={COLORS.black || "#0F172A"}
                        />
                    </TouchableOpacity>

                    <View style={styles.headerText}>
                        <Text style={styles.heading}>Transactions</Text>
                        <Text style={styles.subtitle}>
                            सर्व financial transactions इतिहास
                        </Text>
                    </View>
                </View>

                {/* Summary Card */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryHeader}>
                        <Text style={styles.summaryTitle}>Financial Overview</Text>
                        <Text style={styles.summaryCount}>
                            {filteredTransactions.length} items
                        </Text>
                    </View>

                    <View style={styles.summaryStatsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Income</Text>
                            <Text style={[styles.statValue, styles.incomeText]}>
                                +₹{stats.income.toLocaleString("en-IN")}
                            </Text>
                        </View>

                        <View style={styles.statDivider} />

                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Expense</Text>
                            <Text style={[styles.statValue, styles.expenseText]}>
                                -₹{stats.expense.toLocaleString("en-IN")}
                            </Text>
                        </View>

                        <View style={styles.statDivider} />

                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Net Balance</Text>
                            <Text style={styles.statValue}>
                                ₹{(stats.income - stats.expense).toLocaleString("en-IN")}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Filters */}
                <View style={styles.filters}>
                    {["All", "Income", "Expense"].map((item) => {
                        const isActive = filter === item;
                        return (
                            <TouchableOpacity
                                key={item}
                                activeOpacity={0.7}
                                style={[
                                    styles.filterButton,
                                    isActive && styles.filterActive,
                                ]}
                                onPress={() => setFilter(item)}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        isActive && styles.filterTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Transaction List */}
                {filteredTransactions.length === 0 ? (
                    <View style={styles.emptyCard}>
                        <View style={styles.emptyIconBg}>
                            <Ionicons
                                name="receipt-outline"
                                size={32}
                                color="#64748B"
                            />
                        </View>
                        <Text style={styles.emptyTitle}>No Transactions Found</Text>
                        <Text style={styles.emptyText}>
                            या filter मध्ये कोणतेही transactions उपलब्ध नाहीत.
                        </Text>
                    </View>
                ) : (
                    filteredTransactions.map((transaction) => (
                        <TransactionItem
                            key={transaction.id}
                            transaction={transaction}
                        />
                    ))
                )}
            </ScrollView>
        </AppScreen>
    );
}

function TransactionItem({ transaction }) {
    const isIncome = transaction.type === "Income";

    const formattedDate = new Date(
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
                    isIncome ? styles.incomeIcon : styles.expenseIcon,
                ]}
            >
                <Ionicons
                    name={isIncome ? "arrow-down" : "arrow-up"}
                    size={18}
                    color={isIncome ? "#16A34A" : "#DC2626"}
                />
            </View>

            <View style={styles.transactionInfo}>
                <Text style={styles.category}>{transaction.category}</Text>

                <View style={styles.badgeRow}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{transaction.source}</Text>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{transaction.payment_method}</Text>
                    </View>
                </View>

                <Text style={styles.date}>{formattedDate}</Text>
            </View>

            <View style={styles.amountContainer}>
                <Text
                    style={[
                        styles.amount,
                        isIncome ? styles.incomeAmount : styles.expenseAmount,
                    ]}
                >
                    {isIncome ? "+" : "-"}₹
                    {transaction.amount.toLocaleString("en-IN")}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background || "#F8FAFC",
    },
    content: {
        padding: SPACING.lg || 20,
        paddingBottom: 40,
    },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    headerText: {
        marginLeft: 14,
    },
    heading: {
        fontSize: 24,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
        letterSpacing: -0.3,
    },
    subtitle: {
        marginTop: 2,
        color: "#64748B",
        fontSize: 13,
    },

    // Summary Card
    summaryCard: {
        backgroundColor: COLORS.black || "#0F172A",
        borderRadius: RADIUS.xl || 20,
        padding: 18,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    summaryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#334155",
        paddingBottom: 10,
    },
    summaryTitle: {
        color: "#F8FAFC",
        fontSize: 15,
        fontWeight: "700",
    },
    summaryCount: {
        color: "#94A3B8",
        fontSize: 12,
        fontWeight: "600",
    },
    summaryStatsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statLabel: {
        color: "#94A3B8",
        fontSize: 11,
        fontWeight: "600",
        marginBottom: 4,
    },
    statValue: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },
    incomeText: {
        color: "#4ADE80",
    },
    expenseText: {
        color: "#F87171",
    },
    statDivider: {
        width: 1,
        height: 24,
        backgroundColor: "#334155",
    },

    // Filters
    filters: {
        flexDirection: "row",
        marginBottom: 16,
        gap: 8,
    },
    filterButton: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 24,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    filterActive: {
        backgroundColor: COLORS.black || "#0F172A",
        borderColor: COLORS.black || "#0F172A",
    },
    filterText: {
        color: "#64748B",
        fontSize: 13,
        fontWeight: "600",
    },
    filterTextActive: {
        color: "#FFFFFF",
    },

    // Transaction Card
    transactionCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F1F5F9",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 1.5,
    },
    transactionIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    incomeIcon: {
        backgroundColor: "#DCFCE7",
    },
    expenseIcon: {
        backgroundColor: "#FEE2E2",
    },
    transactionInfo: {
        flex: 1,
        marginLeft: 12,
    },
    category: {
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "700",
    },
    badgeRow: {
        flexDirection: "row",
        gap: 6,
        marginTop: 4,
        marginBottom: 4,
    },
    badge: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 11,
        color: "#475569",
        fontWeight: "600",
    },
    date: {
        color: "#94A3B8",
        fontSize: 11,
    },
    amountContainer: {
        alignItems: "flex-end",
        justifyContent: "center",
    },
    amount: {
        fontSize: 16,
        fontWeight: "800",
    },
    incomeAmount: {
        color: "#16A34A",
    },
    expenseAmount: {
        color: "#DC2626",
    },

    // Empty State
    emptyCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: RADIUS.xl || 20,
        padding: 32,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#F1F5F9",
        marginTop: 10,
    },
    emptyIconBg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    emptyTitle: {
        color: COLORS.black || "#0F172A",
        fontSize: 16,
        fontWeight: "700",
    },
    emptyText: {
        marginTop: 4,
        color: "#64748B",
        fontSize: 13,
        textAlign: "center",
        lineHeight: 18,
    },
});