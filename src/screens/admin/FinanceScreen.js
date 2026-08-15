import React, {
    useEffect,
    useMemo,
    useState,
} from "react";
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

const INITIAL_TRANSACTIONS = [
    {
        id: "1",
        type: "Income",
        title: "Hair Cut",
        source: "Offline",
        payment_method: "Cash",
        amount: 200,
        transaction_date:
            new Date().toISOString(),
    },

    {
        id: "2",
        type: "Income",
        title: "Hair + Beard",
        source: "Online",
        payment_method: "UPI",
        amount: 300,
        transaction_date:
            new Date().toISOString(),
    },

    {
        id: "3",
        type: "Expense",
        title: "Hair Products",
        source: "Offline",
        payment_method: "UPI",
        amount: 450,
        transaction_date:
            new Date().toISOString(),
    },

    {
        id: "4",
        type: "Income",
        title: "Hair Spa",
        source: "Online",
        payment_method: "Online Gateway",
        amount: 500,
        transaction_date:
            new Date().toISOString(),
    },
];

export default function FinanceScreen({
    navigation,
    route,
}) {

    const [transactions, setTransactions] =
        useState(INITIAL_TRANSACTIONS);

    useEffect(() => {
        const newTransaction =
            route?.params?.newTransaction;

        if (!newTransaction) {
            return;
        }

        console.log(
            "RECEIVED TRANSACTION:",
            newTransaction
        );

        setTransactions((current) => [
            newTransaction,
            ...current,
        ]);

        navigation.setParams({
            newTransaction: undefined,
        });
    }, [route?.params?.newTransaction]);

    const [filter, setFilter] = useState("All");

    const todayIncome = useMemo(() => {
        return transactions
            .filter(
                (item) =>
                    item.type === "Income" &&
                    item.date === "Today"
            )
            .reduce(
                (total, item) =>
                    total + item.amount,
                0
            );
    }, [transactions]);

    const todayExpense = useMemo(() => {
        return transactions
            .filter(
                (item) =>
                    item.type === "Expense" &&
                    item.date === "Today"
            )
            .reduce(
                (total, item) =>
                    total + item.amount,
                0
            );
    }, [transactions]);

    const monthlyIncome = useMemo(() => {
        return transactions
            .filter(
                (item) =>
                    item.type === "Income"
            )
            .reduce(
                (total, item) =>
                    total + item.amount,
                0
            );
    }, [transactions]);

    const monthlyExpense = useMemo(() => {
        return transactions
            .filter(
                (item) =>
                    item.type === "Expense"
            )
            .reduce(
                (total, item) =>
                    total + item.amount,
                0
            );
    }, [transactions]);

    const profit =
        monthlyIncome - monthlyExpense;

    const filteredTransactions =
        transactions.filter((item) => {

            if (filter === "All") {
                return true;
            }

            return item.type === filter;
        });

    return (
        <AppScreen style={styles.screen}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                {/* Header */}

                <View style={styles.header}>

                    <View>
                        <Text style={styles.heading}>
                            Finance
                        </Text>

                        <Text style={styles.subtitle}>
                            Salon income आणि expenses व्यवस्थापित करा
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addTransactionButton}
                        onPress={() =>
                            navigation.navigate(
                                "AddTransaction"
                            )
                        }
                    >
                        <Ionicons
                            name="add"
                            size={22}
                            color={COLORS.black}
                        />

                        <Text style={styles.addTransactionText}>
                            Add
                        </Text>
                    </TouchableOpacity>


                </View>

                {/* Main Balance */}

                <View style={styles.balanceCard}>

                    <View>
                        <Text style={styles.balanceLabel}>
                            Monthly Profit
                        </Text>

                        <Text style={styles.balanceValue}>
                            ₹{profit.toLocaleString("en-IN")}
                        </Text>

                        <Text style={styles.balanceSubtitle}>
                            Income − Expenses
                        </Text>
                    </View>

                    <View style={styles.profitIcon}>
                        <Ionicons
                            name={
                                profit >= 0
                                    ? "trending-up"
                                    : "trending-down"
                            }
                            size={28}
                            color={COLORS.primary}
                        />
                    </View>

                </View>

                {/* Today's Stats */}

                <Text style={styles.sectionTitle}>
                    Today
                </Text>

                <View style={styles.statsRow}>

                    <FinanceStat
                        icon="arrow-down-circle-outline"
                        title="Income"
                        value={todayIncome}
                    />

                    <FinanceStat
                        icon="arrow-up-circle-outline"
                        title="Expenses"
                        value={todayExpense}
                    />

                </View>

                {/* Monthly Stats */}

                <Text style={styles.sectionTitle}>
                    This Month
                </Text>

                <View style={styles.monthCard}>

                    <MonthRow
                        icon="trending-up-outline"
                        title="Total Income"
                        value={monthlyIncome}
                    />

                    <View style={styles.divider} />

                    <MonthRow
                        icon="trending-down-outline"
                        title="Total Expenses"
                        value={monthlyExpense}
                    />

                    <View style={styles.divider} />

                    <MonthRow
                        icon="wallet-outline"
                        title="Net Profit"
                        value={profit}
                        highlight
                    />

                </View>

                {/* Transactions Header */}

                <View style={styles.transactionHeader}>

                    <View>
                        <Text style={styles.sectionTitle}>
                            Transactions
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            Recent financial activity
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(
                                "TransactionHistory"
                            )
                        }
                    >
                        <Text style={styles.viewAll}>
                            View All
                        </Text>
                    </TouchableOpacity>

                </View>

                {/* Filters */}

                <View style={styles.filters}>

                    {["All", "Income", "Expense"].map(
                        (item) => (
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
                        )
                    )}

                </View>

                {/* Transaction List */}

                {filteredTransactions.map(
                    (transaction) => (
                        <TransactionCard
                            key={transaction.id}
                            transaction={
                                transaction
                            }
                        />
                    )
                )}

            </ScrollView>

        </AppScreen>
    );
}

function FinanceStat({
    icon,
    title,
    value,
}) {
    return (
        <View style={styles.statCard}>

            <View style={styles.statIcon}>
                <Ionicons
                    name={icon}
                    size={22}
                    color={COLORS.primary}
                />
            </View>

            <Text style={styles.statTitle}>
                {title}
            </Text>

            <Text style={styles.statValue}>
                ₹{value.toLocaleString("en-IN")}
            </Text>

        </View>
    );
}

function MonthRow({
    icon,
    title,
    value,
    highlight,
}) {
    return (
        <View style={styles.monthRow}>

            <View style={styles.monthIcon}>
                <Ionicons
                    name={icon}
                    size={20}
                    color={COLORS.primary}
                />
            </View>

            <Text style={styles.monthTitle}>
                {title}
            </Text>

            <Text
                style={[
                    styles.monthValue,
                    highlight &&
                    styles.monthValueHighlight,
                ]}
            >
                ₹{value.toLocaleString("en-IN")}
            </Text>

        </View>
    );
}

const formatTransactionDate = (date) => {
    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
        }
    );
};

function TransactionCard({
    transaction,
}) {
    const isIncome =
        transaction.type === "Income";

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
                    size={20}
                    color={
                        isIncome
                            ? "#16A34A"
                            : "#DC2626"
                    }
                />
            </View>

            <View style={styles.transactionInfo}>

                <Text style={styles.transactionTitle}>
                    {transaction.title}
                </Text>

                <Text style={styles.transactionCustomer}>
                    {transaction.source} •{" "}
                    {transaction.payment_method} •{" "}
                    {formatTransactionDate(
                        transaction.transaction_date
                    )}
                </Text>

            </View>

            <Text
                style={[
                    styles.transactionAmount,
                    isIncome
                        ? styles.incomeText
                        : styles.expenseText,
                ]}
            >
                {isIncome ? "+" : "-"}₹
                {transaction.amount}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        padding: SPACING.lg,
        paddingBottom: 50,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    heading: {
        fontSize: 30,
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
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    balanceCard: {
        marginTop: 22,
        backgroundColor: COLORS.black,
        borderRadius: RADIUS.xl,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    balanceLabel: {
        color: "#999",
        fontSize: 10,
    },

    balanceValue: {
        marginTop: 5,
        color: COLORS.primary,
        fontSize: 30,
        fontWeight: "800",
    },

    balanceSubtitle: {
        marginTop: 3,
        color: "#777",
        fontSize: 9,
    },

    profitIcon: {
        width: 55,
        height: 55,
        borderRadius: 18,
        backgroundColor: "#222",
        alignItems: "center",
        justifyContent: "center",
    },

    sectionTitle: {
        marginTop: 25,
        color: COLORS.black,
        fontSize: 18,
        fontWeight: "800",
    },

    sectionSubtitle: {
        marginTop: 3,
        color: "#999",
        fontSize: 10,
    },

    statsRow: {
        flexDirection: "row",
        gap: 10,
    },

    statCard: {
        flex: 1,
        marginTop: 12,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 15,
    },

    statIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    statTitle: {
        marginTop: 10,
        color: "#888",
        fontSize: 10,
    },

    statValue: {
        marginTop: 4,
        color: COLORS.black,
        fontSize: 19,
        fontWeight: "800",
    },

    monthCard: {
        marginTop: 12,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        paddingHorizontal: 15,
    },

    monthRow: {
        minHeight: 62,
        flexDirection: "row",
        alignItems: "center",
    },

    monthIcon: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    monthTitle: {
        flex: 1,
        marginLeft: 11,
        color: COLORS.black,
        fontSize: 11,
        fontWeight: "700",
    },

    monthValue: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "800",
    },

    monthValueHighlight: {
        color: COLORS.primary,
    },

    divider: {
        height: 1,
        backgroundColor: "#EEEEEE",
    },

    transactionHeader: {
        marginTop: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    viewAll: {
        color: COLORS.primary,
        fontSize: 10,
        fontWeight: "800",
    },

    filters: {
        flexDirection: "row",
        marginTop: 12,
        marginBottom: 10,
    },

    filterButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#EEEEEE",
        marginRight: 7,
    },

    filterActive: {
        backgroundColor: COLORS.black,
    },

    filterText: {
        color: "#777",
        fontSize: 9,
        fontWeight: "700",
    },

    filterTextActive: {
        color: COLORS.primary,
    },

    transactionCard: {
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding: 13,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
    },

    transactionIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
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
        marginLeft: 11,
    },

    transactionTitle: {
        color: COLORS.black,
        fontSize: 12,
        fontWeight: "800",
    },

    transactionCustomer: {
        marginTop: 3,
        color: "#999",
        fontSize: 9,
    },

    transactionAmount: {
        fontSize: 13,
        fontWeight: "800",
    },

    incomeText: {
        color: "#16A34A",
    },

    expenseText: {
        color: "#DC2626",
    },
    addTransactionButton: {
        height: 42,
        paddingHorizontal: 14,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    addTransactionText: {
        marginLeft: 4,
        color: COLORS.black,
        fontSize: 11,
        fontWeight: "800",
    },

});