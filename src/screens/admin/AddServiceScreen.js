import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import { COLORS, SPACING, RADIUS } from "../../theme";

export default function AddServiceScreen({ navigation, route }) {
    const editingService = route?.params?.service;

    const [name, setName] = useState(editingService?.name || "");
    const [marathi, setMarathi] = useState(editingService?.marathi || "");
    const [price, setPrice] = useState(
        editingService?.price ? String(editingService.price) : ""
    );
    const [duration, setDuration] = useState(editingService?.duration || "");

    const isEditing = !!editingService;

    const handleSave = () => {
        if (!name.trim()) {
            Alert.alert(
                "Service Name Required",
                "कृपया service चे नाव टाका."
            );
            return;
        }

        if (!price.trim()) {
            Alert.alert("Price Required", "कृपया service price टाका.");
            return;
        }

        if (!duration.trim()) {
            Alert.alert("Duration Required", "कृपया service duration टाका.");
            return;
        }

        const service = {
            id: editingService?.id || Date.now().toString(),
            name: name.trim(),
            marathi: marathi.trim() || name.trim(),
            price: Number(price),
            duration: duration.trim(),
            active: editingService?.active ?? true,
        };

        Alert.alert(
            isEditing ? "Service Updated" : "Service Added",
            isEditing
                ? "Service successfully updated."
                : "नवीन service successfully add झाली.",
            [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.popTo("ServicesHome", {
                            updatedService: service,
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
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color={COLORS.black || "#0F172A"}
                    />
                    <Text style={styles.backText}>Services</Text>
                </TouchableOpacity>

                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.headerTextGroup}>
                        <Text style={styles.heading}>
                            {isEditing ? "Edit Service" : "Add Service"}
                        </Text>
                        <Text style={styles.subtitle}>
                            Service आणि pricing manage करा
                        </Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="cut-outline"
                            size={22}
                            color={COLORS.primary || "#F59E0B"}
                        />
                    </View>
                </View>

                {/* Service Name Input */}
                <Text style={styles.label}>Service Name</Text>
                <Input
                    icon="cut-outline"
                    placeholder="उदा. Hair Cut"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />

                {/* Marathi Name Input */}
                <Text style={styles.label}>Marathi Name</Text>
                <Input
                    icon="language-outline"
                    placeholder="उदा. हेअर कट"
                    value={marathi}
                    onChangeText={setMarathi}
                />

                {/* Price Input */}
                <Text style={styles.label}>Price (₹)</Text>
                <Input
                    icon="cash-outline"
                    placeholder="उदा. 200"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="number-pad"
                />

                {/* Duration Input */}
                <Text style={styles.label}>Duration</Text>
                <Input
                    icon="time-outline"
                    placeholder="उदा. 30 min"
                    value={duration}
                    onChangeText={setDuration}
                />

                {/* Live Card Preview */}
                <Text style={styles.sectionTitle}>Preview</Text>
                <View style={styles.previewCard}>
                    <View style={styles.previewIcon}>
                        <Ionicons
                            name="cut-outline"
                            size={22}
                            color={COLORS.primary || "#F59E0B"}
                        />
                    </View>

                    <View style={styles.previewInfo}>
                        <Text style={styles.previewName} numberOfLines={1}>
                            {name || "Hair Cut"}
                        </Text>

                        <Text style={styles.previewMarathi} numberOfLines={1}>
                            {marathi || "हेअर कट"}
                        </Text>

                        <View style={styles.previewMeta}>
                            <Text style={styles.previewPrice}>
                                ₹{price || "0"}
                            </Text>
                            <Text style={styles.previewMetaDot}>•</Text>
                            <Text style={styles.previewDuration}>
                                {duration || "30 min"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.activeBadge}>
                        <View style={styles.activeDot} />
                        <Text style={styles.activeText}>Active</Text>
                    </View>
                </View>

                {/* Action Button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.85}
                    onPress={handleSave}
                >
                    <Ionicons
                        name={
                            isEditing
                                ? "checkmark-circle-outline"
                                : "add-circle-outline"
                        }
                        size={22}
                        color={COLORS.black || "#0F172A"}
                    />
                    <Text style={styles.saveText}>
                        {isEditing ? "Update Service" : "Add Service"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </AppScreen>
    );
}

function Input({
    icon,
    placeholder,
    value,
    onChangeText,
    keyboardType,
    autoCapitalize = "none",
}) {
    return (
        <View style={styles.inputContainer}>
            <Ionicons name={icon} size={20} color="#64748B" />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#94A3B8"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
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
        marginTop: 4,
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

    // Preview Section
    sectionTitle: {
        marginTop: 8,
        marginBottom: 12,
        color: COLORS.black || "#0F172A",
        fontSize: 17,
        fontWeight: "800",
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
    previewIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: COLORS.black || "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },
    previewInfo: {
        flex: 1,
        marginLeft: 14,
        marginRight: 8,
    },
    previewName: {
        color: COLORS.black || "#0F172A",
        fontSize: 15,
        fontWeight: "700",
    },
    previewMarathi: {
        marginTop: 2,
        color: "#64748B",
        fontSize: 12,
        fontWeight: "500",
    },
    previewMeta: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    previewPrice: {
        color: "#D97706",
        fontSize: 14,
        fontWeight: "800",
    },
    previewMetaDot: {
        marginHorizontal: 6,
        color: "#94A3B8",
        fontSize: 12,
    },
    previewDuration: {
        color: "#64748B",
        fontSize: 12,
        fontWeight: "600",
    },
    activeBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#16A34A",
        marginRight: 6,
    },
    activeText: {
        color: "#15803D",
        fontSize: 12,
        fontWeight: "700",
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