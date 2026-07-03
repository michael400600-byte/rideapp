import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import { DEFAULT_LOCATION } from '../../utils/constants';

const nearbyRequests = [
  { id: '1', lat: 19.435, lng: -99.130, price: '$75' },
  { id: '2', lat: 19.430, lng: -99.140, price: '$120' },
  { id: '3', lat: 19.438, lng: -99.125, price: '$55' },
];

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0d1526' }] },
  { elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1B2438' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a1020' }] },
];

export default function DriverHomeScreen({ navigation }) {
  const [online, setOnline] = useState(false);
  const todayEarnings = 450;
  const todayTrips = 5;
  const goal = 1000;
  const progress = Math.min((todayEarnings / goal) * 100, 100);

  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFillObject} initialRegion={DEFAULT_LOCATION} customMapStyle={darkMapStyle}>
        {online && nearbyRequests.map(r => (
          <Marker key={r.id} coordinate={{ latitude: r.lat, longitude: r.lng }}>
            <View style={styles.markerBubble}><Text style={styles.markerText}>{r.price}</Text></View>
          </Marker>
        ))}
      </MapView>
      <LinearGradient colors={['rgba(7,11,20,0.9)', 'transparent']} style={styles.topFade} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Profile')} activeOpacity={0.8}>
          <Ionicons name="menu" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <View style={[styles.statusPill, { borderColor: online ? COLORS.success : COLORS.error }]}>
          <View style={[styles.statusDot, { backgroundColor: online ? COLORS.success : COLORS.error }]} />
          <Text style={styles.statusText}>{online ? 'En línea' : 'Desconectado'}</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
          <Ionicons name="wallet-outline" size={22} color={COLORS.accent} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomPanel}>
        <View style={styles.handle} />

        <View style={styles.earningsCard}>
          <View style={styles.earningsRow}>
            <View>
              <Text style={styles.earningsLabel}>Ganancias de hoy</Text>
              <Text style={styles.earningsValue}>${todayEarnings}</Text>
            </View>
            <View style={styles.tripsBox}>
              <Text style={styles.tripsCount}>{todayTrips}</Text>
              <Text style={styles.tripsLabel}>viajes</Text>
            </View>
          </View>
          <View style={styles.progressBg}>
            <LinearGradient colors={COLORS.gradientAccent} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.goalText}>Meta diaria: ${goal} · {Math.round(progress)}%</Text>
        </View>

        <TouchableOpacity activeOpacity={0.85} onPress={() => setOnline(!online)} style={[styles.toggleBtn, online ? SHADOWS.medium : SHADOWS.glow]}>
          <LinearGradient colors={online ? [COLORS.error, '#D63A54'] : COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.toggleGradient}>
            <Ionicons name={online ? 'pause' : 'power'} size={22} color="#FFF" />
            <Text style={styles.toggleText}>{online ? 'Desconectarse' : 'Conectarse ahora'}</Text>
          </LinearGradient>
        </TouchableOpacity>

        {online && (
          <TouchableOpacity style={styles.viewRequestsBtn} onPress={() => navigation.navigate('RideRequest')} activeOpacity={0.8}>
            <View style={styles.reqBadge}><Text style={styles.reqBadgeText}>3</Text></View>
            <Text style={styles.viewRequestsText}>Nuevas solicitudes disponibles</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  topFade: { position: 'absolute', top: 0, left: 0, right: 0, height: 140 },
  header: { position: 'absolute', top: 54, left: SPACING.xl, right: SPACING.xl, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconBtn: { width: 46, height: 46, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', ...SHADOWS.medium, borderWidth: 1, borderColor: COLORS.border },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, backgroundColor: COLORS.surface, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, ...SHADOWS.medium, borderWidth: 1.5 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { color: COLORS.textPrimary, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.semibold },
  markerBubble: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.full, ...SHADOWS.glow, borderWidth: 2, borderColor: '#FFF' },
  markerText: { color: '#FFF', fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold },
  bottomPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.background, borderTopLeftRadius: BORDER_RADIUS.xl, borderTopRightRadius: BORDER_RADIUS.xl, paddingHorizontal: SPACING.xxl, paddingTop: SPACING.md, paddingBottom: SPACING.xxxl, ...SHADOWS.large, borderTopWidth: 1, borderColor: COLORS.border },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: COLORS.borderLight, alignSelf: 'center', marginBottom: SPACING.lg },
  earningsCard: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.xl, marginBottom: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  earningsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg },
  earningsLabel: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary },
  earningsValue: { fontSize: FONTS.sizes.hero, fontWeight: FONTS.weights.heavy, color: COLORS.textPrimary, marginTop: 2 },
  tripsBox: { alignItems: 'center', backgroundColor: COLORS.surfaceLight, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.md },
  tripsCount: { fontSize: FONTS.sizes.xxl, fontWeight: FONTS.weights.heavy, color: COLORS.accent },
  tripsLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted },
  progressBg: { height: 8, backgroundColor: COLORS.surfaceLight, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 4 },
  goalText: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, marginTop: SPACING.sm },
  toggleBtn: { borderRadius: BORDER_RADIUS.lg, marginBottom: SPACING.lg },
  toggleGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.md, paddingVertical: SPACING.lg + 2, borderRadius: BORDER_RADIUS.lg },
  toggleText: { color: '#FFF', fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
  viewRequestsBtn: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, paddingVertical: SPACING.lg, paddingHorizontal: SPACING.lg, backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, borderWidth: 1.5, borderColor: COLORS.primary },
  reqBadge: { width: 26, height: 26, borderRadius: 13, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  reqBadgeText: { color: '#FFF', fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.bold },
  viewRequestsText: { flex: 1, color: COLORS.textPrimary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.semibold },
});
