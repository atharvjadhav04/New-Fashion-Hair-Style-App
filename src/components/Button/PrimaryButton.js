import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import COLORS from '../../theme/colors';
import RADIUS from '../../theme/radius';

export default function PrimaryButton({
    title,
    onPress,
    style,
    disabled = false,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled}
            style={[
                styles.button,
                disabled && styles.disabled,
                style,
            ]}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.secondary,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RADIUS.full,
    },

    disabled: {
        opacity: 0.6,
    },

    text: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
});