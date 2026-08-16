import React, {
    useEffect,
    useState,
} from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppScreen from "../../components/common/AppScreen";
import Stars from "../../components/reviews/Stars";
import { COLORS, SPACING, RADIUS } from "../../theme";

const INITIAL_REVIEWS = [
    {
        id: "1",
        name: "अमोल पाटील",
        rating: 5,
        date: "2 दिवसांपूर्वी",
        comment: "खूप छान सर्विस. स्टाफ खूप चांगला आहे आणि हेअर कट देखील एकदम मस्त झाला.",
    },
    {
        id: "2",
        name: "रोहित जाधव",
        rating: 5,
        date: "5 दिवसांपूर्वी",
        comment: "वेळेवर सर्विस मिळाली. ऑनलाइन बुकिंग आणि Queue सुविधा खूप उपयोगी आहे.",
    },
    {
        id: "3",
        name: "सचिन शिंदे",
        rating: 4,
        date: "1 आठवड्यापूर्वी",
        comment: "चांगला अनुभव. सलून स्वच्छ आहे आणि सर्विसची quality चांगली आहे.",
    },
    {
        id: "4",
        name: "प्रणव देशमुख",
        rating: 5,
        date: "2 आठवड्यांपूर्वी",
        comment: "New Fashion Hair Style मधली service नेहमीच चांगली असते. Highly recommended!",
    },
];

const RATING_DATA = [
    { stars: 5, percentage: 82 },
    { stars: 4, percentage: 12 },
    { stars: 3, percentage: 4 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
];

const FILTER_TAGS = ["सर्व", "5 ★", "4 ★", "3 ★", "2 ★", "1 ★"];

export default function ReviewsScreen({
    navigation,
    route,
}) {
    const [selectedFilter, setSelectedFilter] = useState("सर्व");
    const [reviews, setReviews] = useState(INITIAL_REVIEWS);
    useEffect(() => {
        const newReview =
            route?.params?.newReview;

        if (!newReview) {
            return;
        }

        console.log(
            "RECEIVED REVIEW:",
            newReview
        );

        setReviews((current) => [
            newReview,
            ...current,
        ]);

        navigation.setParams({
            newReview: undefined,
        });
    }, [route?.params?.newReview]);

    const filteredReviews = reviews.filter((item) => {
        if (selectedFilter === "सर्व") return true;
        const starNum = parseInt(selectedFilter.charAt(0));
        return item.rating === starNum;
    });

    return (
        <AppScreen style={styles.screen}>
            <StatusBar barStyle="dark-content" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Screen Header */}
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.heading}>ग्राहकांचे रिव्ह्यू</Text>
                        <Text style={styles.subtitle}>आमच्या ग्राहकांचा खरी अनुभव</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.writeButtonHeader}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("AddReview")}
                    >
                        <Ionicons name="create-outline" size={18} color={COLORS.white || "#FFF"} />
                        <Text style={styles.writeButtonHeaderText}>रिव्ह्यू द्या</Text>
                    </TouchableOpacity>
                </View>

                {/* Overall Rating Overview Card */}
                <View style={styles.ratingCard}>
                    <View style={styles.ratingLeft}>
                        <Text style={styles.ratingNumber}>4.8</Text>
                        <Stars rating={5} size={16} />
                        <Text style={styles.totalReviews}>{reviews.length + 124} रिव्ह्यूज</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.ratingBreakdown}>
                        {RATING_DATA.map((item) => (
                            <RatingRow
                                key={item.stars}
                                stars={item.stars}
                                percentage={item.percentage}
                            />
                        ))}
                    </View>
                </View>

                {/* Filter Tags Bar */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContainer}
                >
                    {FILTER_TAGS.map((tag) => {
                        const active = selectedFilter === tag;
                        return (
                            <TouchableOpacity
                                key={tag}
                                style={[styles.filterChip, active && styles.filterChipActive]}
                                onPress={() => setSelectedFilter(tag)}
                            >
                                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Reviews List Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>ग्राहक अभिप्राय</Text>
                    <Text style={styles.reviewCount}>{filteredReviews.length} दाखवत आहे</Text>
                </View>

                {/* Review Cards */}
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="chatbox-outline" size={48} color="#CCC" />
                        <Text style={styles.emptyText}>या रेटिंगसाठी कोणतीही रिव्ह्यू उपलब्ध नाही.</Text>
                    </View>
                )}
            </ScrollView>
        </AppScreen>
    );
}

function RatingRow({ stars, percentage }) {
    return (
        <View style={styles.ratingRow}>
            <Text style={styles.starNumber}>{stars}</Text>
            <Ionicons name="star" size={12} color={COLORS.primary || "#FFB800"} />
            <View style={styles.progressBackground}>
                <View style={[styles.progress, { width: `${percentage}%` }]} />
            </View>
            <Text style={styles.percentage}>{percentage}%</Text>
        </View>
    );
}

function ReviewCard({ review }) {
    return (
        <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{review.name.charAt(0)}</Text>
                </View>

                <View style={styles.reviewerInfo}>
                    <View style={styles.nameBadgeRow}>
                        <Text style={styles.reviewerName}>{review.name}</Text>
                        <View style={styles.verifiedBadge}>
                            <Ionicons name="checkmark-circle" size={13} color="#4CAF50" />
                            <Text style={styles.verifiedText}>Verified</Text>
                        </View>
                    </View>
                    <View style={styles.reviewMeta}>
                        <Stars rating={review.rating} size={14} />
                        <Text style={styles.date}>{review.date}</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.comment}>{review.comment}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background || "#F8F9FA",
    },
    content: {
        padding: SPACING.lg || 16,
        paddingBottom: 40,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    heading: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.black || "#111",
    },
    subtitle: {
        marginTop: 2,
        color: "#666",
        fontSize: 13,
    },
    writeButtonHeader: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.primary || "#2196F3",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: RADIUS.md || 20,
        gap: 6,
    },
    writeButtonHeaderText: {
        color: COLORS.white || "#FFF",
        fontWeight: "700",
        fontSize: 13,
    },
    ratingCard: {
        backgroundColor: COLORS.white || "#FFF",
        borderRadius: RADIUS.xl || 16,
        padding: SPACING.lg || 16,
        marginTop: 18,
        flexDirection: "row",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    ratingLeft: {
        width: "32%",
        alignItems: "center",
        justifyContent: "center",
    },
    divider: {
        width: 1,
        backgroundColor: "#EEE",
        marginVertical: 4,
    },
    ratingNumber: {
        fontSize: 38,
        fontWeight: "800",
        color: COLORS.black || "#111",
        marginBottom: 2,
    },
    totalReviews: {
        marginTop: 6,
        color: "#888",
        fontSize: 11,
    },
    ratingBreakdown: {
        flex: 1,
        marginLeft: 14,
        justifyContent: "center",
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 3,
    },
    starNumber: {
        width: 12,
        fontSize: 11,
        color: "#666",
        fontWeight: "600",
    },
    progressBackground: {
        flex: 1,
        height: 6,
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        marginHorizontal: 8,
        overflow: "hidden",
    },
    progress: {
        height: "100%",
        backgroundColor: COLORS.primary || "#FFB800",
        borderRadius: 10,
    },
    percentage: {
        width: 28,
        fontSize: 10,
        color: "#888",
        textAlign: "right",
    },
    filterContainer: {
        marginTop: 20,
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#EAEAEA",
    },
    filterChipActive: {
        backgroundColor: COLORS.black || "#111",
    },
    filterText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#555",
    },
    filterTextActive: {
        color: "#FFF",
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 22,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.black || "#111",
    },
    reviewCount: {
        fontSize: 12,
        color: "#888",
    },
    reviewCard: {
        backgroundColor: COLORS.white || "#FFF",
        borderRadius: RADIUS.xl || 16,
        padding: SPACING.lg || 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    reviewHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#1E293B",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },
    reviewerInfo: {
        marginLeft: 12,
        flex: 1,
    },
    nameBadgeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    reviewerName: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.black || "#111",
    },
    verifiedBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    verifiedText: {
        fontSize: 10,
        color: "#4CAF50",
        fontWeight: "600",
    },
    reviewMeta: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 3,
    },
    date: {
        marginLeft: 8,
        fontSize: 11,
        color: "#999",
    },
    comment: {
        marginTop: 10,
        color: "#444",
        fontSize: 14,
        lineHeight: 21,
    },
    emptyContainer: {
        alignItems: "center",
        paddingVertical: 40,
    },
    emptyText: {
        marginTop: 10,
        color: "#999",
        fontSize: 14,
    },
});