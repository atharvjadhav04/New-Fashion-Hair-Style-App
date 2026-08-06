import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native';

import COLORS from '../../theme/colors';
import RADIUS from '../../theme/radius';
import SPACING from '../../theme/spacing';

export default function InputField({
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
}) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
                keyboardType={keyboardType}
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },

    label: {
        marginBottom: 8,
        color: COLORS.text,
        fontWeight: '600',
        fontSize: 15,
    },

    input: {
        height: 56,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.full,
        paddingHorizontal: 18,
        backgroundColor: COLORS.white,
        fontSize: 16,
        color: COLORS.text,
    },
});