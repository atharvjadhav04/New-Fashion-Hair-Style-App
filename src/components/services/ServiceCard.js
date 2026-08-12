import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useBooking } from "../../context/BookingContext";
import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function ServiceCard({
    service,
    onBook,
}) {
    const { updateBooking } = useBooking();
    return (
        <View style={styles.card}>

            <View style={styles.iconBox}>
                <Ionicons
                    name="cut"
                    size={32}
                    color={COLORS.primary}
                />
            </View>

            <View style={styles.details}>

                <Text style={styles.name}>
                    {service.marathi}
                </Text>

                <Text style={styles.description}>
                    {service.description}
                </Text>

                <View style={styles.bottomRow}>

                    <Text style={styles.price}>
                        ₹ {service.price}
                    </Text>

                    <Text style={styles.duration}>
                        {service.duration}
                    </Text>

                </View>

            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {

                    updateBooking({
                        service: service,
                        amount: service.price,
                        duration: service.duration,
                        serviceId: service.id,
                    });

                    onBook(service);

                }}
            >
                <Text style={styles.buttonText}>
                    Book
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: "#FFF",
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
    },

    iconBox: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
        alignItems: "center",
    },

    details: {
        flex: 1,
        marginLeft: 15,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
    },

    description: {
        color: "#777",
        marginVertical: 6,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    price: {
        color: COLORS.primary,
        fontWeight: "700",
    },

    duration: {
        color: "#666",
    },

    button: {
        backgroundColor: COLORS.black,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,
    },

    buttonText: {
        color: COLORS.white,
        fontWeight: "700",
    },

});