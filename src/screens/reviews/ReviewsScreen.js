import React from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

const REVIEWS = [
    {
        id: "1",
        name: "अमोल पाटील",
        rating: 5,
        date: "2 दिवसांपूर्वी",
        comment:
            "खूप छान सर्विस. स्टाफ खूप चांगला आहे आणि हेअर कट देखील एकदम मस्त झाला.",
    },
    {
        id: "2",
        name: "रोहित जाधव",
        rating: 5,
        date: "5 दिवसांपूर्वी",
        comment:
            "वेळेवर सर्विस मिळाली. ऑनलाइन बुकिंग आणि Queue सुविधा खूप उपयोगी आहे.",
    },
    {
        id: "3",
        name: "सचिन शिंदे",
        rating: 4,
        date: "1 आठवड्यापूर्वी",
        comment:
            "चांगला अनुभव. सलून स्वच्छ आहे आणि सर्विसची quality चांगली आहे.",
    },
    {
        id: "4",
        name: "प्रणव देशमुख",
        rating: 5,
        date: "2 आठवड्यांपूर्वी",
        comment:
            "New Fashion Hair Style मधली service नेहमीच चांगली असते. Highly recommended!",
    },
];

const RATING_DATA = [
    { stars: 5, percentage: 82 },
    { stars: 4, percentage: 12 },
    { stars: 3, percentage: 4 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
];

export default function ReviewsScreen() {
    return (
        <AppScreen style={styles.screen}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                <Text style={styles.heading}>
                    ग्राहकांचे रिव्ह्यू
                </Text>

                <Text style={styles.subtitle}>
                    आमच्या ग्राहकांचा अनुभव
                </Text>

                {/* Overall Rating */}

                <View style={styles.ratingCard}>

                    <View style={styles.ratingLeft}>

                        <Text style={styles.ratingNumber}>
                            4.8
                        </Text>

                        <View style={styles.starsRow}>
                            <Stars rating={5} />
                        </View>

                        <Text style={styles.totalReviews}>
                            128 Reviews
                        </Text>

                    </View>

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

                {/* Reviews */}

                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>
                        ग्राहकांचे अनुभव
                    </Text>

                    <Text style={styles.reviewCount}>
                        128 Reviews
                    </Text>

                </View>

                {REVIEWS.map((review) => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                    />
                ))}

            </ScrollView>

        </AppScreen>
    );
}

function Stars({ rating }) {
    return (
        <View style={styles.starsRow}>

            {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                    key={star}
                    name={
                        star <= rating
                            ? "star"
                            : "star-outline"
                    }
                    size={16}
                    color={COLORS.primary}
                />
            ))}

        </View>
    );
}

function RatingRow({
    stars,
    percentage,
}) {
    return (
        <View style={styles.ratingRow}>

            <Text style={styles.starNumber}>
                {stars}
            </Text>

            <Ionicons
                name="star"
                size={12}
                color={COLORS.primary}
            />

            <View style={styles.progressBackground}>
                <View
                    style={[
                        styles.progress,
                        {
                            width: `${percentage}%`,
                        },
                    ]}
                />
            </View>

            <Text style={styles.percentage}>
                {percentage}%
            </Text>

        </View>
    );
}

function ReviewCard({ review }) {
    return (
        <View style={styles.reviewCard}>

            <View style={styles.reviewHeader}>

                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {review.name.charAt(0)}
                    </Text>
                </View>

                <View style={styles.reviewerInfo}>

                    <Text style={styles.reviewerName}>
                        {review.name}
                    </Text>

                    <View style={styles.reviewMeta}>

                        <Stars rating={review.rating} />

                        <Text style={styles.date}>
                            {review.date}
                        </Text>

                    </View>

                </View>

            </View>

            <Text style={styles.comment}>
                {review.comment}
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
        paddingBottom: 40,
    },

    heading: {
        fontSize: 30,
        fontWeight: "700",
        color: COLORS.black,
    },

    subtitle: {
        marginTop: 6,
        color: "#777",
        fontSize: 14,
    },

    ratingCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginTop: 24,
        flexDirection: "row",
    },

    ratingLeft: {
        width: "34%",
        alignItems: "center",
        justifyContent: "center",
    },

    ratingNumber: {
        fontSize: 42,
        fontWeight: "800",
        color: COLORS.black,
    },

    starsRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    totalReviews: {
        marginTop: 6,
        color: "#888",
        fontSize: 11,
    },

    ratingBreakdown: {
        flex: 1,
        marginLeft: 18,
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
    },

    progressBackground: {
        flex: 1,
        height: 6,
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        marginHorizontal: 6,
        overflow: "hidden",
    },

    progress: {
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
    },

    percentage: {
        width: 30,
        fontSize: 10,
        color: "#888",
        textAlign: "right",
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 28,
        marginBottom: 14,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "700",
        color: COLORS.black,
    },

    reviewCount: {
        fontSize: 12,
        color: "#888",
    },

    reviewCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: 14,
    },

    reviewHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    avatarText: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: "700",
    },

    reviewerInfo: {
        marginLeft: 12,
        flex: 1,
    },

    reviewerName: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.black,
    },

    reviewMeta: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    date: {
        marginLeft: 9,
        fontSize: 11,
        color: "#999",
    },

    comment: {
        marginTop: 14,
        color: "#555",
        fontSize: 14,
        lineHeight: 21,
    },

});