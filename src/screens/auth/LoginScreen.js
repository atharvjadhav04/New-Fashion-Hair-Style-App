import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

import COLORS from '../../theme/colors';
import SPACING from '../../theme/spacing';

import InputField from '../../components/Input/InputField';
import PrimaryButton from '../../components/Button/PrimaryButton';

export default function LoginScreen({ navigation }) {
    const [phone, setPhone] = useState('');

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>

                <Text style={styles.title}>
                    न्यू फॅशन
                </Text>

                <Text style={styles.subtitle}>
                    हेअर स्टाईल
                </Text>

            </View>

            <InputField
                label="मोबाईल नंबर"
                placeholder="9876543210"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />

            <PrimaryButton
                title="OTP पाठवा"
                onPress={() => navigation.navigate('Otp')}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.lg,
        justifyContent: 'center',
    },

    header: {
        marginBottom: 50,
        alignItems: 'center',
    },

    title: {
        fontSize: 32,
        fontWeight: '700',
        color: COLORS.secondary,
    },

    subtitle: {
        marginTop: 6,
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: '600',
    },

});