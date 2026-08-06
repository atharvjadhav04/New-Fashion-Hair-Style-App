import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";

export default function CompleteProfileScreen({ navigation }) {

    const [name, setName] = useState("");
    const [gender, setGender] = useState("Male");

    const [dob, setDob] = useState(new Date());

    const [showDatePicker, setShowDatePicker] =
        useState(false);

    return (
        <View style={styles.container}>

            <AuthCard>

                <Text style={styles.title}>
                    प्रोफाइल पूर्ण करा
                </Text>

                <Text style={styles.subtitle}>
                    तुमची माहिती फक्त एकदाच भरावी लागेल.
                </Text>

                <InputField
                    label="पूर्ण नाव"
                    placeholder="तुमचे नाव"
                    value={name}
                    onChangeText={setName}
                />

                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowDatePicker(true)}
                >

                    <Text style={styles.dateText}>
                        {dob.toLocaleDateString()}
                    </Text>

                </TouchableOpacity>

                {showDatePicker && (

                    <DateTimePicker
                        value={dob}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {

                            setShowDatePicker(false);

                            if (selectedDate) {
                                setDob(selectedDate);
                            }

                        }}
                    />

                )}

                <Text style={styles.genderTitle}>
                    लिंग
                </Text>

                <View style={styles.genderRow}>

                    {["Male", "Female", "Other"].map((item) => (

                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.genderButton,

                                gender === item &&
                                styles.selectedGender,
                            ]}
                            onPress={() => setGender(item)}
                        >

                            <Text
                                style={{
                                    color:
                                        gender === item
                                            ? COLORS.white
                                            : COLORS.black,
                                }}
                            >
                                {item}
                            </Text>

                        </TouchableOpacity>

                    ))}

                </View>

                <PrimaryButton
                    title="पुढे जा"
                    onPress={() =>
                        navigation.replace("Home")
                    }
                />

            </AuthCard>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        justifyContent: "center",
        padding: SPACING.lg,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 10,
    },

    subtitle: {
        color: "#777",
        marginBottom: 30,
    },

    dateButton: {
        height: 55,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.full,
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    dateText: {
        fontSize: 16,
    },

    genderTitle: {
        marginBottom: 15,
        fontWeight: "600",
    },

    genderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 35,
    },

    genderButton: {
        flex: 1,
        marginHorizontal: 4,
        height: 45,
        borderRadius: RADIUS.full,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.black,
    },

    selectedGender: {
        backgroundColor: COLORS.black,
    },

});