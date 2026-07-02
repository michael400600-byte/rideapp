import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';


const menuItems = [
  { icon: 'person-outline', label: 'Editar perfil' },
  { icon: 'card-outline', label: 'Métodos de pago' },
  { icon: 'location-outline', label: 'Direcciones' },
  { icon: 'time-outline', label: 'Historial' },
  { icon: 'pricetag-outline', label: 'Promociones' },
  { icon: 'shield-outline', label: 'Seguridad' },
  { icon: 'help-circle-outline', label: 'Ayuda' },
  { icon: 'document-text-outline', label: 'Términos' },
];

export default function ProfileScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileCard}>
        <LinearGradient colors={COLORS.gradient} style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </LinearGradient>
        <Text style={styles.name}>Juan Díaz</Text>
        <Text style={styles.email}>juan.diaz@email.com</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>128</Text>
            <Text style={styles.statLabel}>Viajes</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Meses</Text>
          </View>
        </View>
      </View>

      <View style={styles.notifRow}>
        <Ionicons name="notifications-outline" size={20} color={COLORS.textSecondary} />
        <Text style={styles.notifText}>Notificaciones</Text>
        <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: COLORS.primary }} />
      </View>
      <View style={styles.menuSection}>
        {menuItems.map((item, i) => (
          <TouchableOpacity key={i} style={styles.menuItem}>
            <Ionicons name={item.icon} size={20} color={COLORS.textSecondary} />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
      <Text style={styles.version}>Versión 1.0.0</Text>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.xxl, paddingTop: 50 },
  header: { marginBottom: SPACING.xxl },
  profileCard: { alignItems: 'center', marginBottom: SPACING.xxl },
  avatar: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md },
  avatarText: { color: '#FFF', fontSize: FONTS.sizes.xxl, fontWeight: FONTS.weights.bold },
  name: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  email: { fontSize: FONTS.sizes.sm, color: COLORS.textMuted, marginTop: SPACING.xs },
  statsRow: { flexDirection: 'row', marginTop: SPACING.lg },
  stat: { alignItems: 'center', marginHorizontal: SPACING.xl },
  statValue: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold, color: COLORS.primary },
  statLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, marginTop: 2 },
  notifRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.lg },
  notifText: { flex: 1, color: COLORS.textSecondary, marginLeft: SPACING.md, fontSize: FONTS.sizes.md },
  menuSection: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, marginBottom: SPACING.xxl },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuLabel: { flex: 1, color: COLORS.textPrimary, marginLeft: SPACING.md, fontSize: FONTS.sizes.md },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: SPACING.md },
  logoutText: { color: COLORS.error, marginLeft: SPACING.sm, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.medium },
  version: { textAlign: 'center', color: COLORS.textMuted, fontSize: FONTS.sizes.xs, marginTop: SPACING.md },
});
