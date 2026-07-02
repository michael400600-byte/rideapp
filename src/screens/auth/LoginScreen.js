import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('PassengerHome');
    }, 1500);
  };

  const socialBtn = (icon, color) => (
    <TouchableOpacity style={styles.socialBtn}>
      <Ionicons name={icon} size={24} color={color} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.subtitle}>Bienvenido de vuelta</Text>
      <View style={styles.inputWrap}>
        <Ionicons name="mail-outline" size={20} color={COLORS.textMuted} />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor={COLORS.textMuted} value={email} onChangeText={setEmail} keyboardType="email-address" />
      </View>
      <View style={styles.inputWrap}>
        <Ionicons name="lock-closed-outline" size={20} color={COLORS.textMuted} />
        <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor={COLORS.textMuted} value={password} onChangeText={setPassword} secureTextEntry />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.loginBtnText}>Iniciar Sesión</Text>}
      </TouchableOpacity>
      <Text style={styles.orText}>o continuar con</Text>
      <View style={styles.socialRow}>
        {socialBtn('logo-google', '#DB4437')}
        {socialBtn('logo-apple', '#FFF')}
        {socialBtn('logo-facebook', '#4267B2')}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate</Text></Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('DriverHome')}>
        <Text style={[styles.link, { marginTop: SPACING.md }]}>Entrar como conductor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SPACING.xxl, justifyContent: 'center' },
  title: { fontSize: FONTS.sizes.title, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  subtitle: { fontSize: FONTS.sizes.md, color: COLORS.textSecondary, marginBottom: SPACING.xxxl },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  input: { flex: 1, marginLeft: SPACING.sm, color: COLORS.textPrimary, fontSize: FONTS.sizes.md },
  loginBtn: { backgroundColor: COLORS.primary, borderRadius: BORDER_RADIUS.lg, paddingVertical: SPACING.lg, alignItems: 'center', marginTop: SPACING.sm, ...SHADOWS.medium },
  loginBtnText: { color: '#FFF', fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
  orText: { textAlign: 'center', color: COLORS.textMuted, marginVertical: SPACING.xl },
  socialRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: SPACING.xxl },
  socialBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginHorizontal: SPACING.sm, borderWidth: 1, borderColor: COLORS.border },
  link: { textAlign: 'center', color: COLORS.textSecondary, fontSize: FONTS.sizes.md },
  linkBold: { color: COLORS.primary, fontWeight: FONTS.weights.bold },
});
