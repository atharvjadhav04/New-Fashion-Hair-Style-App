import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme";

export default function Stars({ rating, size = 16, interactive = false, onSelectRating }) {
    return (
        <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => {
                const iconName = star <= rating ? "star" : "star-outline";

                if (interactive) {
                    return (
                        <TouchableOpacity
                            key={star}
                            activeOpacity={0.7}
                            onPress={() => onSelectRating && onSelectRating(star)}
                            style={styles.starTouch}
                        >
                            <Ionicons name={iconName} size={size} color={COLORS.primary || "#FFB800"} />
                        </TouchableOpacity>
                    );
                }

                return (
                    <Ionicons
                        key={star}
                        name={iconName}
                        size={size}
                        color={COLORS.primary || "#FFB800"}
                        style={styles.starIcon}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    starsRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    starTouch: {
        paddingHorizontal: 4,
    },
    starIcon: {
        marginRight: 2,
    },
});