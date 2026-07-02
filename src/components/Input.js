import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, BORDER_RADIUS, SPACING } from '../utils/theme';

const Input = ({ label, placeholder, value, onChangeText, secureTextEntry = false, icon, error, keyboardType = 'default', autoCapitalize = 'none', style }) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, focused && styles.focused, error && styles.errorBorder]}>
        {icon && <Ionicons name={icon} size={20} color={focused ? COLORS.primary : COLORS.textSecondary} style={styles.icon} />}
        <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={COLORS.textMuted} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry && !showPassword} keyboardType={keyboardType} autoCapitalize={autoCapitalize} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.lg },
  label: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium, marginBottom: SPACING.sm, marginLeft: SPACING.xs },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.md, borderWidth: 1.5, borderColor: COLORS.border, paddingHorizontal: SPACING.lg, height: 54 },
  focused: { borderColor: COLORS.primary, backgroundColor: COLORS.surface },
  errorBorder: { borderColor: COLORS.error },
  icon: { marginRight: SPACING.md },
  input: { flex: 1, color: COLORS.textPrimary, fontSize: FONTS.sizes.lg },
  errorText: { color: COLORS.error, fontSize: FONTS.sizes.xs, marginTop: SPACING.xs, marginLeft: SPACING.xs },
});

export default Input;
