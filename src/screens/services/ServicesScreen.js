import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";

import SearchBar from "../../components/services/SearchBar";
import CategoryChip from "../../components/services/CategoryChip";
import ServiceCard from "../../components/services/ServiceCard";
import { useBooking } from "../../context/BookingContext";
import { SERVICES } from "../../constants/DummyData";
import { COLORS, SPACING, RADIUS } from "../../theme";

const categories = [
    "All",
    "Hair",
    "Beard",
    "Face",
];

export default function ServicesScreen({ navigation }) {
    const { addService } = useBooking();
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredServices = SERVICES.filter((service) => {
        const categoryMatch =
            selectedCategory === "All" ||
            service.category === selectedCategory;

        const searchMatch =
            (service.marathi &&
                service.marathi.toLowerCase().includes(search.toLowerCase())) ||
            (service.name &&
                service.name.toLowerCase().includes(search.toLowerCase()));

        return categoryMatch && searchMatch;
    });

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[1]}
            >
                {/* Screen Title & Subtitle */}
                <View style={styles.header}>
                    <View style={styles.titleRow}>
                        <View style={styles.headerIndicator} />
                        <Text style={styles.title}>सेवा</Text>
                    </View>
                    <Text style={styles.subtitle}>
                        तुम्हाच्या आवडीनुसार Salon Services निवडा
                    </Text>
                </View>

                {/* Sticky Search Container */}
                <View style={styles.searchWrapper}>
                    <SearchBar
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                {/* Horizontal Category Selector */}
                <View style={styles.categoriesSection}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContent}
                    >
                        {categories.map((item) => (
                            <CategoryChip
                                key={item}
                                title={item}
                                active={selectedCategory === item}
                                onPress={() => setSelectedCategory(item)}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Results Counter Bar */}
                <View style={styles.metaRow}>
                    <Text style={styles.resultsText}>
                        Showing <Text style={styles.resultsCount}>{filteredServices.length}</Text> {filteredServices.length === 1 ? 'service' : 'services'}
                    </Text>
                </View>

                {/* Service List or Empty State */}
                {filteredServices.length === 0 ? (
                    <View style={styles.emptyCard}>
                        <View style={styles.emptyIconBg}>
                            <Ionicons name="search-outline" size={32} color="#94A3B8" />
                        </View>
                        <Text style={styles.emptyTitle}>कोणतीही सेवा सापडली नाही</Text>
                        <Text style={styles.emptyText}>
                            कृपया शोध शब्द किंवा श्रेणी बदलून पुन्हा प्रयत्न करा.
                        </Text>
                    </View>
                ) : (
                    filteredServices.map((service) => (
                        <View key={service.id} style={styles.cardWrapper}>
                            <ServiceCard
                                service={service}
                                onBook={(selectedService) => {
                                    addService(selectedService);

                                    navigation.navigate("BookingFlow", {
                                        screen: "BookingDetails",
                                    });
                                }}
                            />
                        </View>
                    ))
                )}
            </ScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background || "#FAF9F6",
    },
    container: {
        padding: SPACING.lg || 20,
        paddingBottom: 40,
    },

    // Header Section
    header: {
        marginBottom: 16,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    headerIndicator: {
        width: 4,
        height: 24,
        borderRadius: 2,
        backgroundColor: "#F59E0B",
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
        letterSpacing: -0.5,
    },
    subtitle: {
        marginTop: 4,
        fontSize: 13,
        color: "#64748B",
        fontWeight: "500",
    },

    // Search Wrapper (Sticky Support)
    searchWrapper: {
        backgroundColor: COLORS.background || "#FAF9F6",
        paddingVertical: 6,
        marginBottom: 16,
    },

    // Categories ScrollView
    categoriesSection: {
        marginBottom: 18,
    },
    categoriesContent: {
        gap: 8,
        paddingRight: 10,
    },

    // Results Meta Info
    metaRow: {
        marginBottom: 14,
    },
    resultsText: {
        fontSize: 13,
        color: "#64748B",
        fontWeight: "500",
    },
    resultsCount: {
        color: COLORS.black || "#0F172A",
        fontWeight: "700",
    },

    // Card Spacing
    cardWrapper: {
        marginBottom: 12,
    },

    // Empty State Layout
    emptyCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: RADIUS.xl || 20,
        padding: 36,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#F1F5F9",
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    emptyIconBg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },
    emptyTitle: {
        color: COLORS.black || "#0F172A",
        fontSize: 16,
        fontWeight: "700",
    },
    emptyText: {
        marginTop: 6,
        color: "#64748B",
        fontSize: 13,
        textAlign: "center",
        lineHeight: 18,
    },
});