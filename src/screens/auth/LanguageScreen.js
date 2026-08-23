import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import PrimaryButton from "../../components/common/PrimaryButton";

import {
    useLanguage,
    useTranslation,
} from "../../context/LanguageContext";

export default function LanguageScreen({ navigation }) {

    const {
        language,
        changeLanguage,
    } = useLanguage();

    const { t } = useTranslation();

    const handleContinue = () => {
        navigation.navigate("CompleteProfile");
    };

    return (
        <AppScreen style={styles.screen}>

            <View style={styles.container}>

                {/* Language Icon */}

                <View style={styles.iconContainer}>
                    <Ionicons
                        name="language-outline"
                        size={42}
                        color="#F0C775"
                    />
                </View>


                {/* Title */}

                <Text style={styles.title}>
                    {t("selectLanguage")}
                </Text>

                <Text style={styles.subtitle}>
                    {t("languageSubtitle")}
                </Text>


                {/* English */}

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        styles.languageCard,
                        language === "en" &&
                        styles.selectedCard,
                    ]}
                    onPress={() =>
                        changeLanguage("en")
                    }
                >

                    <Text style={styles.flag}>
                        🇬🇧
                    </Text>

                    <Text style={styles.languageText}>
                        English
                    </Text>

                    {language === "en" && (
                        <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#16A34A"
                        />
                    )}

                </TouchableOpacity>


                {/* Marathi */}

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        styles.languageCard,
                        language === "mr" &&
                        styles.selectedCard,
                    ]}
                    onPress={() =>
                        changeLanguage("mr")
                    }
                >

                    <Text style={styles.flag}>
                        🇮🇳
                    </Text>

                    <Text style={styles.languageText}>
                        मराठी
                    </Text>

                    {language === "mr" && (
                        <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#16A34A"
                        />
                    )}

                </TouchableOpacity>


                {/* Continue */}

                <View style={styles.footer}>

                    <PrimaryButton
                        title={t("continue")}
                        onPress={handleContinue}
                    />

                </View>

            </View>

        </AppScreen>
    );
}
const styles = StyleSheet.create({

    screen: {
        flex: 1,
        backgroundColor: "#FAFAFA",
    },

    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 70,
    },

    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 24,
        backgroundColor: "#111827",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 24,
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#111827",
        textAlign: "center",
    },

    subtitle: {
        marginTop: 8,
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 35,
    },

    languageCard: {
        height: 65,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",

        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 18,

        marginBottom: 14,
    },

    selectedCard: {
        borderColor: "#F0C775",
        borderWidth: 2,
        backgroundColor: "#FFFCF5",
    },

    flag: {
        fontSize: 25,
        marginRight: 14,
    },

    languageText: {
        flex: 1,
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },

    footer: {
        marginTop: 25,
    },

});