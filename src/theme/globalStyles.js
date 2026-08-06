import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "./";

export default StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: SPACING.lg,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    spaceBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});