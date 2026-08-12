import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function AddServiceScreen({
    navigation,
    route,
}) {

    const editingService =
        route?.params?.service;

    const [name, setName] = useState(
        editingService?.name || ""
    );

    const [marathi, setMarathi] = useState(
        editingService?.marathi || ""
    );

    const [price, setPrice] = useState(
        editingService?.price
            ? String(editingService.price)
            : ""
    );

    const [duration, setDuration] = useState(
        editingService?.duration || ""
    );

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
            Alert.alert(
                "Price Required",
                "कृपया service price टाका."
            );
            return;
        }

        if (!duration.trim()) {
            Alert.alert(
                "Duration Required",
                "कृपया service duration टाका."
            );
            return;
        }

        const service = {
            id:
                editingService?.id ||
                Date.now().toString(),

            name: name.trim(),

            marathi:
                marathi.trim() ||
                name.trim(),

            price: Number(price),

            duration: duration.trim(),

            active:
                editingService?.active ?? true,
        };

        console.log(
            isEditing
                ? "UPDATE SERVICE:"
                : "ADD SERVICE:",
            service
        );

        Alert.alert(
            isEditing
                ? "Service Updated"
                : "Service Added",

            isEditing
                ? "Service successfully updated."
                : "नवीन service successfully add झाली.",

            [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.popTo(
                            "ServicesHome",
                            {
                                updatedService: service,
                            }
                        );
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

                {/* Back */}

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                    <Ionicons
                        name="arrow-back"
                        size={20}
                        color={COLORS.black}
                    />

                    <Text style={styles.backText}>
                        Services
                    </Text>
                </TouchableOpacity>

                {/* Header */}

                <View style={styles.header}>

                    <View>
                        <Text style={styles.heading}>
                            {isEditing
                                ? "Edit Service"
                                : "Add Service"}
                        </Text>

                        <Text style={styles.subtitle}>
                            Service आणि pricing manage करा
                        </Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="cut-outline"
                            size={23}
                            color={COLORS.primary}
                        />
                    </View>

                </View>

                {/* Name */}

                <Text style={styles.label}>
                    Service Name
                </Text>

                <Input
                    icon="cut-outline"
                    placeholder="उदा. Hair Cut"
                    value={name}
                    onChangeText={setName}
                />

                {/* Marathi */}

                <Text style={styles.label}>
                    Marathi Name
                </Text>

                <Input
                    icon="language-outline"
                    placeholder="उदा. हेअर कट"
                    value={marathi}
                    onChangeText={setMarathi}
                />

                {/* Price */}

                <Text style={styles.label}>
                    Price
                </Text>

                <Input
                    icon="cash-outline"
                    placeholder="उदा. 200"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="number-pad"
                />

                {/* Duration */}

                <Text style={styles.label}>
                    Duration
                </Text>

                <Input
                    icon="time-outline"
                    placeholder="उदा. 30 min"
                    value={duration}
                    onChangeText={setDuration}
                />

                {/* Preview */}

                <Text style={styles.sectionTitle}>
                    Preview
                </Text>

                <View style={styles.previewCard}>

                    <View style={styles.previewIcon}>
                        <Ionicons
                            name="cut-outline"
                            size={23}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.previewInfo}>

                        <Text style={styles.previewName}>
                            {name || "Hair Cut"}
                        </Text>

                        <Text style={styles.previewMarathi}>
                            {marathi || "हेअर कट"}
                        </Text>

                        <View style={styles.previewMeta}>

                            <Text style={styles.previewPrice}>
                                ₹{price || "0"}
                            </Text>

                            <Text style={styles.previewDuration}>
                                {duration || "30 min"}
                            </Text>

                        </View>

                    </View>

                    <View style={styles.activeBadge}>
                        <View style={styles.activeDot} />

                        <Text style={styles.activeText}>
                            Active
                        </Text>
                    </View>

                </View>

                {/* Save */}

                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.8}
                    onPress={handleSave}
                >

                    <Ionicons
                        name={
                            isEditing
                                ? "checkmark-circle-outline"
                                : "add-circle-outline"
                        }
                        size={21}
                        color={COLORS.black}
                    />

                    <Text style={styles.saveText}>
                        {isEditing
                            ? "Update Service"
                            : "Add Service"}
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
}) {
    return (
        <View style={styles.inputContainer}>

            <Ionicons
                name={icon}
                size={20}
                color="#888"
            />

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />

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

    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },

    backText: {
        marginLeft: 7,
        color: "#666",
        fontSize: 12,
        fontWeight: "600",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 25,
    },

    heading: {
        fontSize: 28,
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

    label: {
        color: COLORS.black,
        fontSize: 13,
        fontWeight: "700",
        marginBottom: 8,
    },

    inputContainer: {
        height: 54,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#EEEEEE",
    },

    input: {
        flex: 1,
        marginLeft: 10,
        color: COLORS.black,
        fontSize: 14,
    },

    sectionTitle: {
        marginTop: 8,
        marginBottom: 11,
        color: COLORS.black,
        fontSize: 18,
        fontWeight: "800",
    },

    previewCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
    },

    previewIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    previewInfo: {
        flex: 1,
        marginLeft: 12,
    },

    previewName: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "800",
    },

    previewMarathi: {
        marginTop: 3,
        color: "#888",
        fontSize: 10,
    },

    previewMeta: {
        flexDirection: "row",
        marginTop: 6,
    },

    previewPrice: {
        color: COLORS.primary,
        fontSize: 11,
        fontWeight: "800",
    },

    previewDuration: {
        marginLeft: 12,
        color: "#888",
        fontSize: 10,
    },

    activeBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EAF8EF",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 15,
    },

    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#22C55E",
        marginRight: 5,
    },

    activeText: {
        color: "#16A34A",
        fontSize: 8,
        fontWeight: "700",
    },

    saveButton: {
        height: 54,
        borderRadius: RADIUS.xl,
        backgroundColor: COLORS.primary,
        marginTop: 22,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    saveText: {
        marginLeft: 7,
        color: COLORS.black,
        fontSize: 13,
        fontWeight: "800",
    },

});