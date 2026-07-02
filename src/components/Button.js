import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, BORDER_RADIUS, SPACING, SHADOWS } from '../utils/theme';

const Button = ({ title, onPress, variant = 'primary', size = 'large', loading = false, disabled = false, icon, style }) => {
  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled || loading} activeOpacity={0.8}>
        <LinearGradient colors={disabled ? ['#3A4560', '#2A3550'] : COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.base, styles[size], style]}>
          {loading ? <ActivityIndicator color={COLORS.textPrimary} /> : <>{icon}<Text style={[styles.text, styles[`text_${size}`]]}>{title}</Text></>}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={[styles.base, styles[size], variant === 'outline' && styles.outline, variant === 'ghost' && styles.ghost, disabled && styles.disabled, style]} onPress={onPress} disabled={disabled || loading} activeOpacity={0.7}>
      {loading ? <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.textPrimary} /> : <>{icon}<Text style={[styles.text, styles[`text_${size}`], variant === 'outline' && styles.outlineText, variant === 'ghost' && styles.ghostText]}>{title}</Text></>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: BORDER_RADIUS.md, gap: SPACING.sm, ...SHADOWS.medium },
  large: { height: 56, paddingHorizontal: SPACING.xxl },
  medium: { height: 46, paddingHorizontal: SPACING.xl },
  small: { height: 36, paddingHorizontal: SPACING.lg },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: COLORS.primary },
  ghost: { backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 },
  disabled: { opacity: 0.5 },
  text: { color: COLORS.textPrimary, fontWeight: FONTS.weights.bold },
  text_large: { fontSize: FONTS.sizes.lg },
  text_medium: { fontSize: FONTS.sizes.md },
  text_small: { fontSize: FONTS.sizes.sm },
  outlineText: { color: COLORS.primary },
  ghostText: { color: COLORS.primary },
});

export default Button;
