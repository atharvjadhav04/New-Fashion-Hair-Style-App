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

export default function AddBarberChairScreen({
    navigation,
    route,
}) {
    const editingItem = route?.params?.item;

    const [barberName, setBarberName] = useState(
        editingItem?.barber || ""
    );

    const [chairNumber, setChairNumber] = useState(
        editingItem?.chair
            ? String(editingItem.chair)
            : ""
    );

    const [available, setAvailable] = useState(
        editingItem?.available ?? true
    );

    const isEditing = !!editingItem;

    const handleSave = () => {
        if (!barberName.trim()) {
            Alert.alert(
                "Barber Name Required",
                "कृपया barber चे नाव टाका."
            );
            return;
        }

        if (!chairNumber.trim()) {
            Alert.alert(
                "Chair Required",
                "कृपया chair number टाका."
            );
            return;
        }

        const barberData = {
            id:
                editingItem?.id ||
                Date.now().toString(),

            barber: barberName.trim(),

            chair: Number(chairNumber),

            available,
        };

        console.log(
            isEditing
                ? "UPDATE BARBER:"
                : "ADD BARBER:",
            barberData
        );

        Alert.alert(
            isEditing
                ? "Updated Successfully"
                : "Added Successfully",

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
                {/* Header */}

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
                        Barbers & Chairs
                    </Text>
                </TouchableOpacity>

                <View style={styles.header}>
                    <View>
                        <Text style={styles.heading}>
                            {isEditing
                                ? "Edit Barber"
                                : "Add Barber"}
                        </Text>

                        <Text style={styles.subtitle}>
                            Barber आणि chair एकत्र व्यवस्थापित करा
                        </Text>
                    </View>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="person-add-outline"
                            size={23}
                            color={COLORS.primary}
                        />
                    </View>
                </View>

                {/* Barber */}

                <Text style={styles.label}>
                    Barber Name
                </Text>

                <View style={styles.inputContainer}>
                    <Ionicons
                        name="person-outline"
                        size={20}
                        color="#888"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="उदा. Rajesh"
                        placeholderTextColor="#999"
                        value={barberName}
                        onChangeText={setBarberName}
                        autoCapitalize="words"
                    />
                </View>

                {/* Chair */}

                <Text style={styles.label}>
                    Chair Number
                </Text>

                <View style={styles.inputContainer}>
                    <Ionicons
                        name="business-outline"
                        size={20}
                        color="#888"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="उदा. 1"
                        placeholderTextColor="#999"
                        value={chairNumber}
                        onChangeText={setChairNumber}
                        keyboardType="number-pad"
                    />
                </View>

                {/* Availability */}

                <Text style={styles.label}>
                    Today's Availability
                </Text>

                <View style={styles.availabilityCard}>

                    <View style={styles.availabilityLeft}>
                        <View
                            style={[
                                styles.availabilityIcon,
                                available
                                    ? styles.availableIcon
                                    : styles.unavailableIcon,
                            ]}
                        >
                            <Ionicons
                                name={
                                    available
                                        ? "checkmark-circle-outline"
                                        : "pause-circle-outline"
                                }
                                size={22}
                                color={
                                    available
                                        ? "#16A34A"
                                        : "#777"
                                }
                            />
                        </View>

                        <View>
                            <Text style={styles.availabilityTitle}>
                                {available
                                    ? "Available Today"
                                    : "Unavailable Today"}
                            </Text>

                            <Text
                                style={
                                    styles.availabilitySubtitle
                                }
                            >
                                {available
                                    ? "हा barber आज queue मध्ये available आहे."
                                    : "हा barber आज queue मध्ये available नाही."}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.switch,
                            available &&
                            styles.switchActive,
                        ]}
                        onPress={() =>
                            setAvailable(
                                !available
                            )
                        }
                        activeOpacity={0.8}
                    >
                        <View
                            style={[
                                styles.switchThumb,
                                available &&
                                styles.switchThumbActive,
                            ]}
                        />
                    </TouchableOpacity>

                </View>

                {/* Preview */}

                <Text style={styles.sectionTitle}>
                    Preview
                </Text>

                <View style={styles.previewCard}>

                    <View style={styles.previewAvatar}>
                        <Text style={styles.previewAvatarText}>
                            {barberName
                                ? barberName
                                    .charAt(0)
                                    .toUpperCase()
                                : "B"}
                        </Text>
                    </View>

                    <View style={styles.previewInfo}>
                        <Text style={styles.previewName}>
                            {barberName ||
                                "Barber Name"}
                        </Text>

                        <View style={styles.previewChair}>
                            <Ionicons
                                name="business-outline"
                                size={14}
                                color="#888"
                            />

                            <Text
                                style={
                                    styles.previewChairText
                                }
                            >
                                Chair{" "}
                                {chairNumber ||
                                    "--"}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.previewBadge,
                            available
                                ? styles.previewAvailable
                                : styles.previewUnavailable,
                        ]}
                    >
                        <View
                            style={[
                                styles.previewDot,
                                available
                                    ? styles.previewGreen
                                    : styles.previewGray,
                            ]}
                        />

                        <Text
                            style={[
                                styles.previewBadgeText,
                                available
                                    ? styles.previewGreenText
                                    : styles.previewGrayText,
                            ]}
                        >
                            {available
                                ? "Available"
                                : "Unavailable"}
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
                            ? "Update Barber & Chair"
                            : "Add Barber & Chair"}
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </AppScreen>
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
        marginTop: 4,
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

    availabilityCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    availabilityLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    availabilityIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    availableIcon: {
        backgroundColor: "#EAF8EF",
    },

    unavailableIcon: {
        backgroundColor: "#F1F1F1",
    },

    availabilityTitle: {
        marginLeft: 10,
        color: COLORS.black,
        fontSize: 13,
        fontWeight: "700",
    },

    availabilitySubtitle: {
        marginLeft: 10,
        marginTop: 3,
        color: "#888",
        fontSize: 9,
        maxWidth: 190,
    },

    switch: {
        width: 48,
        height: 28,
        borderRadius: 20,
        backgroundColor: "#D5D5D5",
        padding: 3,
        justifyContent: "center",
    },

    switchActive: {
        backgroundColor: "#22C55E",
    },

    switchThumb: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: COLORS.white,
    },

    switchThumbActive: {
        alignSelf: "flex-end",
    },

    sectionTitle: {
        marginTop: 26,
        marginBottom: 10,
        color: COLORS.black,
        fontSize: 17,
        fontWeight: "800",
    },

    previewCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
    },

    previewAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
    },

    previewAvatarText: {
        color: COLORS.primary,
        fontSize: 20,
        fontWeight: "800",
    },

    previewInfo: {
        flex: 1,
        marginLeft: 12,
    },

    previewName: {
        color: COLORS.black,
        fontSize: 15,
        fontWeight: "700",
    },

    previewChair: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    previewChairText: {
        marginLeft: 5,
        color: "#888",
        fontSize: 10,
    },

    previewBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 15,
    },

    previewAvailable: {
        backgroundColor: "#EAF8EF",
    },

    previewUnavailable: {
        backgroundColor: "#F1F1F1",
    },

    previewDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 5,
    },

    previewGreen: {
        backgroundColor: "#22C55E",
    },

    previewGray: {
        backgroundColor: "#999",
    },

    previewBadgeText: {
        fontSize: 8,
        fontWeight: "700",
    },

    previewGreenText: {
        color: "#16A34A",
    },

    previewGrayText: {
        color: "#777",
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