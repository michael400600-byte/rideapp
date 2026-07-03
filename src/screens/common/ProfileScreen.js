import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

const menuGroups = [
  { title: 'Cuenta', items: [
    { icon: 'person-outline', label: 'Editar perfil', color: COLORS.primary },
    { icon: 'card-outline', label: 'Métodos de pago', color: COLORS.accent },
    { icon: 'location-outline', label: 'Direcciones guardadas', color: COLORS.warning },
  ]},
  { title: 'Actividad', items: [
    { icon: 'time-outline', label: 'Historial de viajes', color: COLORS.primary, screen: 'History' },
    { icon: 'pricetag-outline', label: 'Promociones', color: COLORS.accent },
    { icon: 'shield-outline', label: 'Seguridad', color: COLORS.success },
  ]},
  { title: 'Soporte', items: [
    { icon: 'help-circle-outline', label: 'Ayuda', color: COLORS.primary },
    { icon: 'document-text-outline', label: 'Términos y condiciones', color: COLORS.textSecondary },
  ]},
];

export default function ProfileScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.profileCard}>
        <LinearGradient colors={COLORS.gradientPremium} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </LinearGradient>
        <Text style={styles.name}>Juan Díaz</Text>
        <Text style={styles.email}>juan.diaz@email.com</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}><Text style={styles.statValue}>4.9</Text><Text style={styles.statLabel}>Rating</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.stat}><Text style={styles.statValue}>128</Text><Text style={styles.statLabel}>Viajes</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.stat}><Text style={styles.statValue}>8</Text><Text style={styles.statLabel}>Meses</Text></View>
        </View>
      </View>

      <View style={styles.notifRow}>
        <View style={[styles.menuIcon, { backgroundColor: COLORS.primary + '22' }]}><Ionicons name="notifications-outline" size={20} color={COLORS.primary} /></View>
        <Text style={styles.notifText}>Notificaciones</Text>
        <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: COLORS.primary, false: COLORS.surfaceLight }} thumbColor="#FFF" />
      </View>

      {menuGroups.map((group, gi) => (
        <View key={gi} style={styles.group}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          <View style={styles.menuSection}>
            {group.items.map((item, i) => (
              <TouchableOpacity key={i} style={[styles.menuItem, i < group.items.length - 1 && styles.menuBorder]} activeOpacity={0.7} onPress={() => item.screen && navigation.navigate(item.screen)}>
                <View style={[styles.menuIcon, { backgroundColor: item.color + '22' }]}><Ionicons name={item.icon} size={20} color={item.color} /></View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7} onPress={() => navigation.replace('Welcome')}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
      <Text style={styles.version}>RideApp · Versión 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.xl, paddingTop: 54, paddingBottom: SPACING.section },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.xl },
  backBtn: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  profileCard: { alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.xl, marginBottom: SPACING.xl, borderWidth: 1, borderColor: COLORS.border },
  avatar: { width: 84, height: 84, borderRadius: 42, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md, ...SHADOWS.glow },
  avatarText: { color: '#FFF', fontSize: FONTS.sizes.xxl, fontWeight: FONTS.weights.heavy },
  name: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  email: { fontSize: FONTS.sizes.sm, color: COLORS.textMuted, marginTop: SPACING.xs },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: SPACING.lg, backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.md, paddingVertical: SPACING.md, width: '100%', justifyContent: 'space-around' },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.heavy, color: COLORS.primary },
  statLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: COLORS.border },
  notifRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.xl, borderWidth: 1, borderColor: COLORS.border },
  notifText: { flex: 1, color: COLORS.textPrimary, marginLeft: SPACING.md, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.medium },
  group: { marginBottom: SPACING.lg },
  groupTitle: { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold, color: COLORS.textMuted, marginBottom: SPACING.sm, marginLeft: SPACING.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  menuSection: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuIcon: { width: 40, height: 40, borderRadius: BORDER_RADIUS.sm, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { flex: 1, color: COLORS.textPrimary, marginLeft: SPACING.md, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.medium },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, padding: SPACING.lg, backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, borderWidth: 1, borderColor: COLORS.error + '44', marginTop: SPACING.sm },
  logoutText: { color: COLORS.error, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold },
  version: { textAlign: 'center', color: COLORS.textMuted, fontSize: FONTS.sizes.xs, marginTop: SPACING.xl },
});
