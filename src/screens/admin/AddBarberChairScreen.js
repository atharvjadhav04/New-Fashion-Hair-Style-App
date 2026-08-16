import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Switch,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default function AddBarberChairScreen({ navigation, route }) {
    const editingItem = route?.params?.item;

    const [barberName, setBarberName] = useState(editingItem?.barber || "");
    const [chairNumber, setChairNumber] = useState(
        editingItem?.chair ? String(editingItem.chair) : ""
    );
    const [available, setAvailable] = useState(editingItem?.available ?? true);

    const isEditing = !!editingItem;

    const handleSave = () => {
        if (!barberName.trim()) {
            Alert.alert("Barber Name Required", "कृपया barber चे नाव टाका.");
            return;
        }

        if (!chairNumber.trim()) {
            Alert.alert("Chair Required", "कृपया chair number टाका.");
            return;
        }

        const barberData = {
            id: editingItem?.id || Date.now().toString(),
            barber: barberName.trim(),
            chair: Number(chairNumber),
            available,
        };

        Alert.alert(
            isEditing ? "Updated Successfully" : "Added Successfully",
            isEditing
                ? "Barber आणि chair update झाले."
                : "नवीन barber आणि chair add झाले.",
            [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate("SalonSetup", {
                            updatedStaff: barberData,
                        });
                    },
                },
            ]
        );
    };

    return (
        <AppScreen style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Ionicons name="chevron-back" size={22} color={COLORS.black || "#0F172A"} />
                    <Text style={styles.backText}>Barbers & Chairs</Text>
                </TouchableOpacity>

                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.headerTextGroup}>
                        <Text style={styles.heading}>
                            {isEditing ? "Edit Barber" : "Add Barber"}
                        </Text>
                        <Text style={styles.subtitle}>
                            Barber आणि chair एकत्र व्यवस्थापित करा
                        </Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="person-add-outline"
                            size={22}
                            color={COLORS.primary || "#F59E0B"}
                        />
                    </View>
                </View>

                {/* Input: Barber Name */}
                <Text style={styles.label}>Barber Name</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#64748B" />
                    <TextInput
                        style={styles.input}
                        placeholder="उदा. Rajesh"
                        placeholderTextColor="#94A3B8"
                        value={barberName}
                        onChangeText={setBarberName}
                        autoCapitalize="words"
                    />
                </View>

                {/* Input: Chair Number */}
                <Text style={styles.label}>Chair Number</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="business-outline" size={20} color="#64748B" />
                    <TextInput
                        style={styles.input}
                        placeholder="उदा. 1"
                        placeholderTextColor="#94A3B8"
                        value={chairNumber}
                        onChangeText={setChairNumber}
                        keyboardType="number-pad"
                    />
                </View>

                {/* Today's Availability Toggle Card */}
                <Text style={styles.label}>Today's Availability</Text>
                <View style={styles.availabilityCard}>
                    <View style={styles.availabilityLeft}>
                        <View
                            style={[
                                styles.availabilityIcon,
                                available ? styles.availableIcon : styles.unavailableIcon,
                            ]}
                        >
                            <Ionicons
                                name={available ? "checkmark-circle" : "pause-circle"}
                                size={22}
                                color={available ? "#16A34A" : "#64748B"}
                            />
                        </View>

                        <View style={styles.availabilityTextGroup}>
                            <Text style={styles.availabilityTitle}>
                                {available ? "Available Today" : "Unavailable Today"}
                            </Text>
                            <Text style={styles.availabilitySubtitle}>
                                {available
                                    ? "हा barber आज queue मध्ये available आहे."
                                    : "हा barber आज queue मध्ये available नाही."}
                            </Text>
                        </View>
                    </View>

                    <Switch
                        value={available}
                        onValueChange={setAvailable}
                        trackColor={{ false: "#E2E8F0", true: "#DCFCE7" }}
                        thumbColor={available ? "#16A34A" : "#94A3B8"}
                    />
                </View>

                {/* Live Card Preview */}
                <Text style={styles.sectionTitle}>Live Card Preview</Text>
                <View style={styles.previewCard}>
                    <View style={styles.previewAvatar}>
                        <Text style={styles.previewAvatarText}>
                            {barberName ? barberName.charAt(0).toUpperCase() : "B"}
                        </Text>
                    </View>

                    <View style={styles.previewInfo}>
                        <Text style={styles.previewName}>
                            {barberName || "Barber Name"}
                        </Text>
                        <View style={styles.previewChair}>
                            <Ionicons name="business-outline" size={14} color="#64748B" />
                            <Text style={styles.previewChairText}>
                                Chair {chairNumber || "--"}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.previewBadge,
                            available ? styles.previewAvailable : styles.previewUnavailable,
                        ]}
                    >
                        <View
                            style={[
                                styles.previewDot,
                                available ? styles.previewGreen : styles.previewGray,
                            ]}
                        />
                        <Text
                            style={[
                                styles.previewBadgeText,
                                available ? styles.previewGreenText : styles.previewGrayText,
                            ]}
                        >
                            {available ? "Available" : "Unavailable"}
                        </Text>
                    </View>
                </View>

                {/* Save / Action Button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.85}
                    onPress={handleSave}
                >
                    <Ionicons
                        name={isEditing ? "checkmark-circle-outline" : "add-circle-outline"}
                        size={22}
                        color={COLORS.black || "#0F172A"}
                    />
                    <Text style={styles.saveText}>
                        {isEditing ? "Update Barber & Chair" : "Add Barber & Chair"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </AppScreen>
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

    // Back Header
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        alignSelf: "flex-start",
    },
    backText: {
        marginLeft: 4,
        color: "#64748B",
        fontSize: 14,
        fontWeight: "600",
    },

    // Screen Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
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
    headerIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },

    // Form Inputs
    label: {
        color: COLORS.black || "#0F172A",
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 8,
        marginTop: 6,
    },
    inputContainer: {
        height: 52,
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.lg || 14,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "500",
    },

    // Toggle Card
    availabilityCard: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 24,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 6,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    availabilityLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: 10,
    },
    availabilityIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    availableIcon: {
        backgroundColor: "#DCFCE7",
    },
    unavailableIcon: {
        backgroundColor: "#F1F5F9",
    },
    availabilityTextGroup: {
        marginLeft: 12,
        flex: 1,
    },
    availabilityTitle: {
        color: COLORS.black || "#0F172A",
        fontSize: 14,
        fontWeight: "700",
    },
    availabilitySubtitle: {
        marginTop: 2,
        color: "#64748B",
        fontSize: 12,
        lineHeight: 16,
    },

    // Preview
    sectionTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.black || "#0F172A",
        marginBottom: 12,
    },
    previewCard: {
        backgroundColor: COLORS.white || "#FFFFFF",
        borderRadius: RADIUS.xl || 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 28,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
            },
            android: {
                elevation: 1.5,
            },
        }),
    },
    previewAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },
    previewAvatarText: {
        color: COLORS.primary || "#F59E0B",
        fontSize: 18,
        fontWeight: "800",
    },
    previewInfo: {
        flex: 1,
        marginLeft: 14,
    },
    previewName: {
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "700",
    },
    previewChair: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    previewChairText: {
        marginLeft: 6,
        color: "#64748B",
        fontSize: 12,
        fontWeight: "500",
    },

    // Preview Badge
    previewBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    previewAvailable: {
        backgroundColor: "#DCFCE7",
    },
    previewUnavailable: {
        backgroundColor: "#F1F5F9",
    },
    previewDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    previewGreen: {
        backgroundColor: "#16A34A",
    },
    previewGray: {
        backgroundColor: "#64748B",
    },
    previewBadgeText: {
        fontSize: 12,
        fontWeight: "700",
    },
    previewGreenText: {
        color: "#15803D",
    },
    previewGrayText: {
        color: "#475569",
    },

    // Save Button
    saveButton: {
        height: 54,
        borderRadius: RADIUS.xl || 16,
        backgroundColor: COLORS.primary || "#F59E0B",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.12,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    saveText: {
        marginLeft: 8,
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "800",
    },
});