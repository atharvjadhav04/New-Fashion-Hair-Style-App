import React, { useEffect, useMemo, useState } from "react";
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
import { COLORS, SPACING, RADIUS } from "../../theme";

const INITIAL_TRANSACTIONS = [
    {
        id: "1",
        type: "Income",
        title: "Hair Cut",
        source: "Offline",
        payment_method: "Cash",
        amount: 200,
        transaction_date: new Date().toISOString(),
    },
    {
        id: "2",
        type: "Income",
        title: "Hair + Beard",
        source: "Online",
        payment_method: "UPI",
        amount: 300,
        transaction_date: new Date().toISOString(),
    },
    {
        id: "3",
        type: "Expense",
        title: "Hair Products",
        source: "Offline",
        payment_method: "UPI",
        amount: 450,
        transaction_date: new Date().toISOString(),
    },
    {
        id: "4",
        type: "Income",
        title: "Hair Spa",
        source: "Online",
        payment_method: "Online Gateway",
        amount: 500,
        transaction_date: new Date().toISOString(),
    },
];

// Helper to check if ISO string is today
const isToday = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

export default function FinanceScreen({ navigation, route }) {
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const newTransaction = route?.params?.newTransaction;
        if (!newTransaction) return;

        setTransactions((current) => [newTransaction, ...current]);
        navigation.setParams({ newTransaction: undefined });
    }, [route?.params?.newTransaction]);

    // Today's Income
    const todayIncome = useMemo(() => {
        return transactions
            .filter((item) => item.type === "Income" && isToday(item.transaction_date))
            .reduce((total, item) => total + Number(item.amount || 0), 0);
    }, [transactions]);

    // Today's Expense
    const todayExpense = useMemo(() => {
        return transactions
            .filter((item) => item.type === "Expense" && isToday(item.transaction_date))
            .reduce((total, item) => total + Number(item.amount || 0), 0);
    }, [transactions]);

    // Monthly / Overall Income
    const monthlyIncome = useMemo(() => {
        return transactions
            .filter((item) => item.type === "Income")
            .reduce((total, item) => total + Number(item.amount || 0), 0);
    }, [transactions]);

    // Monthly / Overall Expense
    const monthlyExpense = useMemo(() => {
        return transactions
            .filter((item) => item.type === "Expense")
            .reduce((total, item) => total + Number(item.amount || 0), 0);
    }, [transactions]);

    const profit = monthlyIncome - monthlyExpense;

    const filteredTransactions = useMemo(() => {
        if (filter === "All") return transactions;
        return transactions.filter((item) => item.type === filter);
    }, [transactions, filter]);

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerTextGroup}>
                        <Text style={styles.heading}>Finance</Text>
                        <Text style={styles.subtitle}>
                            सलूनच्या उत्पन्न आणि खर्चाची संपूर्ण माहिती
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.addTransactionButton}
                        onPress={() => navigation.navigate("AddTransaction")}
                    >
                        <Ionicons
                            name="add"
                            size={20}
                            color={COLORS.black || "#0F172A"}
                        />
                        <Text style={styles.addTransactionText}>Add</Text>
                    </TouchableOpacity>
                </View>

                {/* Main Net Balance Card */}
                <View style={styles.balanceCard}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.balanceLabel}>MONTHLY NET PROFIT</Text>
                        <Text style={styles.balanceValue}>
                            ₹{profit.toLocaleString("en-IN")}
                        </Text>
                        <View style={styles.balanceBadge}>
                            <Text style={styles.balanceSubtitle}>
                                Total Income − Total Expenses
                            </Text>
                        </View>
                    </View>

                    <View style={styles.profitIcon}>
                        <Ionicons
                            name={profit >= 0 ? "trending-up" : "trending-down"}
                            size={26}
                            color={profit >= 0 ? "#16A34A" : "#DC2626"}
                        />
                    </View>
                </View>

                {/* Today's Section */}
                <Text style={styles.sectionTitle}>Today's Overview</Text>
                <View style={styles.statsRow}>
                    <FinanceStat
                        icon="arrow-down-circle"
                        iconColor="#16A34A"
                        title="Today's Income"
                        value={todayIncome}
                    />
                    <FinanceStat
                        icon="arrow-up-circle"
                        iconColor="#DC2626"
                        title="Today's Expense"
                        value={todayExpense}
                    />
                </View>

                {/* Monthly Breakdown */}
                <Text style={styles.sectionTitle}>Monthly Summary</Text>
                <View style={styles.monthCard}>
                    <MonthRow
                        icon="trending-up-outline"
                        title="Total Income"
                        value={monthlyIncome}
                        color="#16A34A"
                    />
                    <View style={styles.divider} />
                    <MonthRow
                        icon="trending-down-outline"
                        title="Total Expenses"
                        value={monthlyExpense}
                        color="#DC2626"
                    />
                    <View style={styles.divider} />
                    <MonthRow
                        icon="wallet-outline"
                        title="Net Profit"
                        value={profit}
                        highlight
                        color={COLORS.primary || "#F59E0B"}
                    />
                </View>

                {/* Recent Transactions Section */}
                <View style={styles.transactionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>Transactions</Text>
                        <Text style={styles.sectionSubtitle}>
                            हालचेलींचा इतिहास (History)
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("TransactionHistory")}
                    >
                        <Text style={styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                </View>

                {/* Filter Chips */}
                <View style={styles.filters}>
                    {["All", "Income", "Expense"].map((item) => {
                        const active = filter === item;
                        return (
                            <TouchableOpacity
                                key={item}
                                activeOpacity={0.7}
                                style={[
                                    styles.filterButton,
                                    active && styles.filterActive,
                                ]}
                                onPress={() => setFilter(item)}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        active && styles.filterTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Transaction Item List */}
                {filteredTransactions.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>कोणतेही व्यव्हार सापडले नाहीत</Text>
                    </View>
                ) : (
                    filteredTransactions.map((transaction) => (
                        <TransactionCard
                            key={transaction.id}
                            transaction={transaction}
                        />
                    ))
                )}
            </ScrollView>
        </AppScreen>
    );
}

function FinanceStat({ icon, iconColor, title, value }) {
    return (
        <View style={styles.statCard}>
            <View style={styles.statHeader}>
                <View style={[styles.statIcon, { backgroundColor: `${iconColor}15` }]}>
                    <Ionicons name={icon} size={22} color={iconColor} />
                </View>
                <Text style={styles.statTitle}>{title}</Text>
            </View>
            <Text style={styles.statValue}>₹{value.toLocaleString("en-IN")}</Text>
        </View>
    );
}

function MonthRow({ icon, title, value, highlight, color }) {
    return (
        <View style={styles.monthRow}>
            <View style={styles.monthLeft}>
                <View style={[styles.monthIcon, { backgroundColor: `${color}15` }]}>
                    <Ionicons name={icon} size={20} color={color} />
                </View>
                <Text style={styles.monthTitle}>{title}</Text>
            </View>
            <Text
                style={[
                    styles.monthValue,
                    highlight && styles.monthValueHighlight,
                ]}
            >
                ₹{value.toLocaleString("en-IN")}
            </Text>
        </View>
    );
}

const formatTransactionDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
    });
};

function TransactionCard({ transaction }) {
    const isIncome = transaction.type === "Income";

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
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <Text style={styles.transactionSubtitle}>
                    {transaction.source} • {transaction.payment_method} •{" "}
                    {formatTransactionDate(transaction.transaction_date)}
                </Text>
            </View>

            <Text
                style={[
                    styles.transactionAmount,
                    isIncome ? styles.incomeText : styles.expenseText,
                ]}
            >
                {isIncome ? "+" : "-"}₹{transaction.amount}
            </Text>
        </View>
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

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
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
    addTransactionButton: {
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: COLORS.primary || "#F59E0B",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    addTransactionText: {
        marginLeft: 4,
        color: COLORS.black || "#0F172A",
        fontSize: 13,
        fontWeight: "700",
    },

    // Net Balance Card
    balanceCard: {
        backgroundColor: COLORS.black || "#0F172A",
        borderRadius: RADIUS.xl || 18,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    balanceLabel: {
        color: "#94A3B8",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 0.8,
    },
    balanceValue: {
        marginTop: 6,
        color: COLORS.primary || "#F59E0B",
        fontSize: 32,
        fontWeight: "800",
    },
    balanceBadge: {
        marginTop: 6,
    },
    balanceSubtitle: {
        color: "#CBD5E1",
        fontSize: 12,
        fontWeight: "500",
    },
    profitIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.08)",
        alignItems: "center",
        justifyContent: "center",
    },

    // Section Typography
    sectionTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
        marginBottom: 12,
    },

    // Today's Stats Grid
    statsRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 16,
        padding: 14,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 6,
            },
            android: {
                elevation: 1.5,
            },
        }),
    },
    statHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    statIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    statTitle: {
        color: "#64748B",
        fontSize: 12,
        fontWeight: "600",
        flex: 1,
    },
    statValue: {
        color: COLORS.black || "#0F172A",
        fontSize: 20,
        fontWeight: "800",
    },

    // Monthly Card
    monthCard: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        marginBottom: 24,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 6,
            },
            android: {
                elevation: 1.5,
            },
        }),
    },
    monthRow: {
        height: 58,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    monthLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    monthIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    monthTitle: {
        color: COLORS.black || "#0F172A",
        fontSize: 13,
        fontWeight: "600",
    },
    monthValue: {
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "800",
    },
    monthValueHighlight: {
        color: COLORS.primary || "#F59E0B",
    },
    divider: {
        height: 1,
        backgroundColor: "#F1F5F9",
    },

    // Transaction Section Header
    transactionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    sectionSubtitle: {
        marginTop: 2,
        color: "#64748B",
        fontSize: 12,
        fontWeight: "500",
    },
    viewAll: {
        color: COLORS.primary || "#F59E0B",
        fontSize: 13,
        fontWeight: "700",
    },

    // Filters
    filters: {
        flexDirection: "row",
        marginTop: 8,
        marginBottom: 14,
        gap: 8,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    filterActive: {
        backgroundColor: COLORS.black || "#0F172A",
        borderColor: COLORS.black || "#0F172A",
    },
    filterText: {
        color: "#64748B",
        fontSize: 12,
        fontWeight: "600",
    },
    filterTextActive: {
        color: "#FFFFFF",
    },

    // Transaction Card
    transactionCard: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.lg || 14,
        padding: 14,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    transactionIcon: {
        width: 40,
        height: 40,
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
        marginRight: 8,
    },
    transactionTitle: {
        color: COLORS.black || "#0F172A",
        fontSize: 14,
        fontWeight: "700",
    },
    transactionSubtitle: {
        marginTop: 3,
        color: "#64748B",
        fontSize: 11,
    },
    transactionAmount: {
        fontSize: 14,
        fontWeight: "800",
    },
    incomeText: {
        color: "#16A34A",
    },
    expenseText: {
        color: "#DC2626",
    },

    // Empty state
    emptyContainer: {
        paddingVertical: 24,
        alignItems: "center",
    },
    emptyText: {
        color: "#94A3B8",
        fontSize: 13,
    },
});