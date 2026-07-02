import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

export default function RegisterScreen({ navigation }) {
  const [role, setRole] = useState('passenger');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    navigation.replace(role === 'driver' ? 'DriverHome' : 'PassengerHome');
  };

  const RoleTab = ({ value, label, icon }) => (
    <TouchableOpacity style={[styles.tab, role === value && styles.tabActive]} onPress={() => setRole(value)}>
      <Ionicons name={icon} size={20} color={role === value ? '#FFF' : COLORS.textMuted} />
      <Text style={[styles.tabText, role === value && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  const Field = ({ icon, placeholder, value, onChangeText, ...props }) => (
    <View style={styles.inputWrap}>
      <Ionicons name={icon} size={20} color={COLORS.textMuted} />
      <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={COLORS.textMuted} value={value} onChangeText={onChangeText} {...props} />
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>Crear Cuenta</Text>
      <View style={styles.tabs}>
        <RoleTab value="passenger" label="Pasajero" icon="person-outline" />
        <RoleTab value="driver" label="Conductor" icon="car-outline" />
      </View>
      <Field icon="person-outline" placeholder="Nombre completo" value={name} onChangeText={setName} />
      <Field icon="call-outline" placeholder="Teléfono" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Field icon="mail-outline" placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Field icon="lock-closed-outline" placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnText}>Crear Cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia sesión</Text></Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.xxl, paddingTop: 60 },
  back: { marginBottom: SPACING.lg },
  title: { fontSize: FONTS.sizes.title, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary, marginBottom: SPACING.xxl },
  tabs: { flexDirection: 'row', marginBottom: SPACING.xxl, backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.xs },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.sm },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { color: COLORS.textMuted, marginLeft: SPACING.xs, fontWeight: FONTS.weights.medium },
  tabTextActive: { color: '#FFF' },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  input: { flex: 1, marginLeft: SPACING.sm, color: COLORS.textPrimary, fontSize: FONTS.sizes.md },
  btn: { backgroundColor: COLORS.primary, borderRadius: BORDER_RADIUS.lg, paddingVertical: SPACING.lg, alignItems: 'center', marginTop: SPACING.sm, marginBottom: SPACING.xl, ...SHADOWS.medium },
  btnText: { color: '#FFF', fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
  link: { textAlign: 'center', color: COLORS.textSecondary, fontSize: FONTS.sizes.md },
  linkBold: { color: COLORS.primary, fontWeight: FONTS.weights.bold },
});
