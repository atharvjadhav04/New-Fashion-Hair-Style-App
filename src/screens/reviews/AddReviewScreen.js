import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppScreen from "../../components/common/AppScreen";
import Stars from "../../components/reviews/Stars";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default function AddReviewScreen({ navigation }) {
    const [rating, setRating] = useState(5);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        if (!name.trim()) {
            Alert.alert(
                "त्रुटी",
                "कृपया तुमचे नाव प्रविष्ट करा."
            );
            return;
        }

        if (!comment.trim()) {
            Alert.alert(
                "त्रुटी",
                "कृपया आपला अभिप्राय लिहा."
            );
            return;
        }

        const newReview = {
            id: Date.now().toString(),
            name: name.trim(),
            rating: rating,
            date: "आत्ताच",
            comment: comment.trim(),
        };

        console.log(
            "NEW REVIEW:",
            newReview
        );

        Alert.alert(
            "धन्यवाद!",
            "तुमचा रिव्ह्यू यशस्वीरीत्या सबमिट झाला आहे.",
            [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate(
                            "CustomerTabs",
                            {
                                screen: "Reviews",
                                params: {
                                    newReview:
                                        newReview,
                                },
                            }
                        );
                    },
                },
            ]
        );
    };

    return (
        <AppScreen style={styles.screen}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                {/* Custom Top Navigation Header */}
                <View style={styles.navHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.black || "#111"} />
                    </TouchableOpacity>
                    <Text style={styles.navTitle}>रिव्ह्यू द्या</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView contentContainerStyle={styles.container}>
                    {/* Rating Interactive Picker */}
                    <View style={styles.ratingSection}>
                        <Text style={styles.labelTitle}>आपला अनुभव कसा होता?</Text>
                        <Text style={styles.ratingSubtitle}>रेटिंग देण्यासाठी स्टार निवडा</Text>

                        <View style={styles.starsWrapper}>
                            <Stars
                                rating={rating}
                                size={36}
                                interactive
                                onSelectRating={(val) => setRating(val)}
                            />
                        </View>
                        <Text style={styles.ratingBadgeText}>{rating} पैकी 5 स्टार</Text>
                    </View>

                    {/* Inputs */}
                    <View style={styles.formGroup}>
                        <Text style={styles.inputLabel}>तुमचे नाव</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="उदा. राहुल देशपांडे"
                            placeholderTextColor="#AAA"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.inputLabel}>तुमचा अभिप्राय / टिप्पणी</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="सर्व्हिस आणि अनुभवाबद्दल सविस्तर माहिती लिहा..."
                            placeholderTextColor="#AAA"
                            multiline
                            numberOfLines={5}
                            textAlignVertical="top"
                            value={comment}
                            onChangeText={setComment}
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={styles.submitButton}
                        activeOpacity={0.8}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitText}>सबमिट करा</Text>
                        <Ionicons name="send" size={16} color="#FFF" />
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background || "#F8F9FA",
    },
    navHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SPACING.lg || 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        backgroundColor: COLORS.white || "#FFF",
    },
    backBtn: {
        padding: 4,
    },
    navTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.black || "#111",
    },
    container: {
        padding: SPACING.lg || 16,
    },
    ratingSection: {
        alignItems: "center",
        backgroundColor: COLORS.white || "#FFF",
        padding: 20,
        borderRadius: RADIUS.xl || 16,
        marginBottom: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    labelTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.black || "#111",
    },
    ratingSubtitle: {
        fontSize: 13,
        color: "#777",
        marginTop: 4,
    },
    starsWrapper: {
        marginVertical: 16,
    },
    ratingBadgeText: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.primary || "#2196F3",
    },
    formGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.black || "#111",
        marginBottom: 8,
    },
    input: {
        backgroundColor: COLORS.white || "#FFF",
        borderRadius: RADIUS.lg || 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: "#333",
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    textArea: {
        height: 120,
    },
    submitButton: {
        flexDirection: "row",
        backgroundColor: COLORS.primary || "#2196F3",
        paddingVertical: 15,
        borderRadius: RADIUS.lg || 12,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 10,
        elevation: 3,
    },
    submitText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },
});