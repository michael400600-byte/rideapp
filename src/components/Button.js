import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, BORDER_RADIUS, SPACING, SHADOWS } from '../utils/theme';

const Button = ({ title, onPress, variant = 'primary', size = 'large', loading = false, disabled = false, icon, style }) => {
  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled || loading} activeOpacity={0.85} style={[!disabled && SHADOWS.glow, style]}>
        <LinearGradient colors={disabled ? ['#2A3550', '#232D44'] : COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.base, styles[size]]}>
          {loading ? <ActivityIndicator color="#FFF" /> : <View style={styles.content}>{icon}<Text style={[styles.text, styles[`text_${size}`]]}>{title}</Text></View>}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={[styles.base, styles[size], variant === 'outline' && styles.outline, variant === 'ghost' && styles.ghost, disabled && styles.disabled, style]} onPress={onPress} disabled={disabled || loading} activeOpacity={0.7}>
      {loading ? <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.textPrimary} /> : <View style={styles.content}>{icon}<Text style={[styles.text, styles[`text_${size}`], variant === 'outline' && styles.outlineText, variant === 'ghost' && styles.ghostText]}>{title}</Text></View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: BORDER_RADIUS.lg },
  content: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  large: { height: 58, paddingHorizontal: SPACING.xxl },
  medium: { height: 48, paddingHorizontal: SPACING.xl },
  small: { height: 38, paddingHorizontal: SPACING.lg },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: COLORS.primary },
  ghost: { backgroundColor: COLORS.surfaceLight },
  disabled: { opacity: 0.5 },
  text: { color: '#FFF', fontWeight: FONTS.weights.bold, letterSpacing: 0.3 },
  text_large: { fontSize: FONTS.sizes.lg },
  text_medium: { fontSize: FONTS.sizes.md },
  text_small: { fontSize: FONTS.sizes.sm },
  outlineText: { color: COLORS.primary },
  ghostText: { color: COLORS.textPrimary },
});

export default Button;
