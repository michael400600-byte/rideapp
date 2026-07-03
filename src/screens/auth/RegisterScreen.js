import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

export default function RegisterScreen({ navigation }) {
  const [role, setRole] = useState('passenger');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace(role === 'driver' ? 'DriverHome' : 'PassengerHome');
    }, 1200);
  };

  const RoleTab = ({ value, label, icon }) => (
    <TouchableOpacity style={styles.tabWrap} activeOpacity={0.8} onPress={() => setRole(value)}>
      {role === value ? (
        <LinearGradient colors={COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.tab}>
          <Ionicons name={icon} size={20} color="#FFF" />
          <Text style={styles.tabTextActive}>{label}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.tabInactive}>
          <Ionicons name={icon} size={20} color={COLORS.textMuted} />
          <Text style={styles.tabText}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const Field = ({ id, icon, placeholder, value, onChangeText, ...props }) => (
    <View style={[styles.inputWrap, focused === id && styles.inputFocused]}>
      <Ionicons name={icon} size={20} color={focused === id ? COLORS.primary : COLORS.textMuted} />
      <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={COLORS.textMuted} value={value} onChangeText={onChangeText} onFocus={() => setFocused(id)} onBlur={() => setFocused(null)} {...props} />
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Únete y empieza a viajar</Text>

        <Text style={styles.sectionLabel}>Soy</Text>
        <View style={styles.tabs}>
          <RoleTab value="passenger" label="Pasajero" icon="person" />
          <RoleTab value="driver" label="Conductor" icon="car-sport" />
        </View>

        <Field id="name" icon="person-outline" placeholder="Nombre completo" value={name} onChangeText={setName} />
        <Field id="phone" icon="call-outline" placeholder="Teléfono" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <Field id="email" icon="mail-outline" placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Field id="password" icon="lock-closed-outline" placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity activeOpacity={0.85} onPress={handleRegister} disabled={loading} style={[styles.btn, SHADOWS.glow]}>
          <LinearGradient colors={COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.btnGradient}>
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>Crear Cuenta</Text>}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia sesión</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: SPACING.xxl, paddingTop: 60 },
  backBtn: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.lg },
  title: { fontSize: FONTS.sizes.title, fontWeight: FONTS.weights.heavy, color: COLORS.textPrimary },
  subtitle: { fontSize: FONTS.sizes.md, color: COLORS.textSecondary, marginTop: SPACING.xs, marginBottom: SPACING.xl },
  sectionLabel: { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.semibold, color: COLORS.textSecondary, marginBottom: SPACING.sm, marginLeft: SPACING.xs },
  tabs: { flexDirection: 'row', marginBottom: SPACING.xl, gap: SPACING.md },
  tabWrap: { flex: 1 },
  tab: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, paddingVertical: SPACING.lg, borderRadius: BORDER_RADIUS.md },
  tabInactive: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, paddingVertical: SPACING.lg, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  tabText: { color: COLORS.textMuted, fontWeight: FONTS.weights.semibold, fontSize: FONTS.sizes.md },
  tabTextActive: { color: '#FFF', fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.md },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.lg, marginBottom: SPACING.lg, borderWidth: 1.5, borderColor: COLORS.border },
  inputFocused: { borderColor: COLORS.primary, backgroundColor: COLORS.surfaceLight },
  input: { flex: 1, marginLeft: SPACING.md, color: COLORS.textPrimary, fontSize: FONTS.sizes.md },
  btn: { borderRadius: BORDER_RADIUS.lg, marginTop: SPACING.sm, marginBottom: SPACING.xl },
  btnGradient: { paddingVertical: SPACING.lg + 2, alignItems: 'center', borderRadius: BORDER_RADIUS.lg },
  btnText: { color: '#FFF', fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold, letterSpacing: 0.3 },
  link: { textAlign: 'center', color: COLORS.textSecondary, fontSize: FONTS.sizes.md },
  linkBold: { color: COLORS.primary, fontWeight: FONTS.weights.bold },
});
