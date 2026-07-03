import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import { DEFAULT_LOCATION } from '../../utils/constants';

const quickLocations = [
  { icon: 'home', label: 'Casa', address: 'Col. Roma Norte', color: COLORS.primary },
  { icon: 'briefcase', label: 'Trabajo', address: 'Reforma 222', color: COLORS.accent },
  { icon: 'star', label: 'Favoritos', address: 'Ver guardados', color: COLORS.warning },
];

const recentTrips = [
  { destination: 'Aeropuerto CDMX', time: 'Ayer, 14:30', price: '$120' },
  { destination: 'Coyoacán Centro', time: 'Lun, 09:15', price: '$65' },
];

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0d1526' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#5E6A85' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#070B14' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1B2438' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a1020' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFillObject} initialRegion={DEFAULT_LOCATION} customMapStyle={darkMapStyle} />
      <LinearGradient colors={['rgba(7,11,20,0.9)', 'transparent']} style={styles.topFade} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Profile')} activeOpacity={0.8}>
          <Ionicons name="menu" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>En línea</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
          <Ionicons name="notifications-outline" size={22} color={COLORS.textPrimary} />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomPanel}>
        <View style={styles.handle} />
        <Text style={styles.greeting}>¿A dónde vamos? 👋</Text>

        <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('SearchDestination')} activeOpacity={0.8}>
          <View style={styles.searchIcon}><Ionicons name="search" size={20} color={COLORS.primary} /></View>
          <Text style={styles.searchText}>Buscar destino...</Text>
          <View style={styles.searchNow}><Text style={styles.searchNowText}>Ahora</Text></View>
        </TouchableOpacity>

        <View style={styles.quickRow}>
          {quickLocations.map((loc, i) => (
            <TouchableOpacity key={i} style={styles.quickItem} activeOpacity={0.8} onPress={() => navigation.navigate('SearchDestination')}>
              <View style={[styles.quickIcon, { backgroundColor: loc.color + '22' }]}>
                <Ionicons name={loc.icon} size={20} color={loc.color} />
              </View>
              <Text style={styles.quickLabel}>{loc.label}</Text>
              <Text style={styles.quickAddr} numberOfLines={1}>{loc.address}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Viajes recientes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('History')}><Text style={styles.seeAll}>Ver todos</Text></TouchableOpacity>
        </View>
        {recentTrips.map((trip, i) => (
          <TouchableOpacity key={i} style={styles.recentItem} activeOpacity={0.7} onPress={() => navigation.navigate('SearchDestination')}>
            <View style={styles.recentIcon}><Ionicons name="time-outline" size={18} color={COLORS.textSecondary} /></View>
            <View style={styles.recentInfo}>
              <Text style={styles.recentDest}>{trip.destination}</Text>
              <Text style={styles.recentTime}>{trip.time}</Text>
            </View>
            <Text style={styles.recentPrice}>{trip.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  topFade: { position: 'absolute', top: 0, left: 0, right: 0, height: 140 },
  header: { position: 'absolute', top: 54, left: SPACING.xl, right: SPACING.xl, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconBtn: { width: 46, height: 46, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', ...SHADOWS.medium, borderWidth: 1, borderColor: COLORS.border },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, backgroundColor: COLORS.surface, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, ...SHADOWS.medium, borderWidth: 1, borderColor: COLORS.border },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success },
  statusText: { color: COLORS.textPrimary, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.semibold },
  badge: { position: 'absolute', top: 12, right: 13, width: 9, height: 9, borderRadius: 5, backgroundColor: COLORS.error, borderWidth: 1.5, borderColor: COLORS.surface },
  bottomPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.background, borderTopLeftRadius: BORDER_RADIUS.xl, borderTopRightRadius: BORDER_RADIUS.xl, paddingHorizontal: SPACING.xxl, paddingTop: SPACING.md, paddingBottom: SPACING.xxxl, ...SHADOWS.large, borderTopWidth: 1, borderColor: COLORS.border },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: COLORS.borderLight, alignSelf: 'center', marginBottom: SPACING.lg },
  greeting: { fontSize: FONTS.sizes.xxl, fontWeight: FONTS.weights.heavy, color: COLORS.textPrimary, marginBottom: SPACING.lg },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.xl, borderWidth: 1, borderColor: COLORS.border },
  searchIcon: { width: 40, height: 40, borderRadius: BORDER_RADIUS.sm, backgroundColor: COLORS.primary + '22', justifyContent: 'center', alignItems: 'center' },
  searchText: { flex: 1, color: COLORS.textSecondary, marginLeft: SPACING.md, fontSize: FONTS.sizes.md },
  searchNow: { backgroundColor: COLORS.primary + '22', paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.full },
  searchNowText: { color: COLORS.primary, fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.bold },
  quickRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.xl, gap: SPACING.md },
  quickItem: { flex: 1, alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, paddingVertical: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  quickIcon: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm },
  quickLabel: { fontSize: FONTS.sizes.sm, color: COLORS.textPrimary, fontWeight: FONTS.weights.bold },
  quickAddr: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, marginTop: 2 },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  recentTitle: { fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  seeAll: { fontSize: FONTS.sizes.sm, color: COLORS.primary, fontWeight: FONTS.weights.semibold },
  recentItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.border },
  recentIcon: { width: 40, height: 40, borderRadius: BORDER_RADIUS.sm, backgroundColor: COLORS.surfaceLight, justifyContent: 'center', alignItems: 'center' },
  recentInfo: { flex: 1, marginLeft: SPACING.md },
  recentDest: { fontSize: FONTS.sizes.md, color: COLORS.textPrimary, fontWeight: FONTS.weights.medium },
  recentTime: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, marginTop: 2 },
  recentPrice: { fontSize: FONTS.sizes.md, color: COLORS.accent, fontWeight: FONTS.weights.bold },
});
