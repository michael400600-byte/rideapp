import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('PassengerHome');
    }, 1200);
  };

  const socialBtn = (icon, color) => (
    <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
      <Ionicons name={icon} size={24} color={color} />
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <View style={styles.logoWrap}>
          <LinearGradient colors={COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.logoCircle}>
            <Ionicons name="car-sport" size={32} color="#FFF" />
          </LinearGradient>
        </View>

        <Text style={styles.title}>Bienvenido de vuelta</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        <View style={styles.form}>
          <View style={[styles.inputWrap, focusedField === 'email' && styles.inputФocused]}>
            <Ionicons name="mail-outline" size={20} color={focusedField === 'email' ? COLORS.primary : COLORS.textMuted} />
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor={COLORS.textMuted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
          </View>
          <View style={[styles.inputWrap, focusedField === 'password' && styles.inputФocused]}>
            <Ionicons name="lock-closed-outline" size={20} color={focusedField === 'password' ? COLORS.primary : COLORS.textMuted} />
            <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor={COLORS.textMuted} value={password} onChangeText={setPassword} secureTextEntry={!showPassword} onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgot}><Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text></TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} onPress={handleLogin} disabled={loading} style={[styles.loginBtn, SHADOWS.glow]}>
            <LinearGradient colors={COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.loginGradient}>
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.loginBtnText}>Iniciar Sesión</Text>}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>o continúa con</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialRow}>
            {socialBtn('logo-google', '#EA4335')}
            {socialBtn('logo-apple', '#FFF')}
            {socialBtn('logo-facebook', '#1877F2')}
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.driverBtn} onPress={() => navigation.replace('DriverHome')}>
          <Ionicons name="car" size={16} color={COLORS.accent} />
          <Text style={styles.driverText}>Entrar como conductor</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: SPACING.xxl, paddingTop: 60, flexGrow: 1 },
  backBtn: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.xl },
  logoWrap: { alignItems: 'center', marginBottom: SPACING.xl },
  logoCircle: { width: 72, height: 72, borderRadius: 22, justifyContent: 'center', alignItems: 'center', ...SHADOWS.glow },
  title: { fontSize: FONTS.sizes.title, fontWeight: FONTS.weights.heavy, color: COLORS.textPrimary, textAlign: 'center' },
  subtitle: { fontSize: FONTS.sizes.md, color: COLORS.textSecondary, textAlign: 'center', marginTop: SPACING.xs, marginBottom: SPACING.xxxl },
  form: { flex: 1 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.lg, marginBottom: SPACING.lg, borderWidth: 1.5, borderColor: COLORS.border },
  inputФocused: { borderColor: COLORS.primary, backgroundColor: COLORS.surfaceLight },
  input: { flex: 1, marginLeft: SPACING.md, color: COLORS.textPrimary, fontSize: FONTS.sizes.md },
  forgot: { alignSelf: 'flex-end', marginBottom: SPACING.xl },
  forgotText: { color: COLORS.primary, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium },
  loginBtn: { borderRadius: BORDER_RADIUS.lg },
  loginGradient: { paddingVertical: SPACING.lg + 2, alignItems: 'center', borderRadius: BORDER_RADIUS.lg },
  loginBtnText: { color: '#FFF', fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold, letterSpacing: 0.3 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: SPACING.xl },
  divider: { flex: 1, height: 1, backgroundColor: COLORS.border },
  orText: { color: COLORS.textMuted, marginHorizontal: SPACING.md, fontSize: FONTS.sizes.sm },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: SPACING.lg, marginBottom: SPACING.xl },
  socialBtn: { width: 56, height: 56, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  link: { textAlign: 'center', color: COLORS.textSecondary, fontSize: FONTS.sizes.md, marginTop: SPACING.md },
  linkBold: { color: COLORS.primary, fontWeight: FONTS.weights.bold },
  driverBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, marginTop: SPACING.xl, paddingVertical: SPACING.md },
  driverText: { color: COLORS.accent, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.semibold },
});
