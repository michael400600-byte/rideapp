import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import { DEFAULT_LOCATION } from '../../utils/constants';

const nearbyRequests = [
  { id: '1', lat: 19.435, lng: -99.130, price: '$75' },
  { id: '2', lat: 19.430, lng: -99.140, price: '$120' },
  { id: '3', lat: 19.438, lng: -99.125, price: '$55' },
];

export default function DriverHomeScreen({ navigation }) {
  const [online, setOnline] = useState(false);
  const todayEarnings = 450;
  const todayTrips = 5;
  const goal = 1000;

  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFillObject} initialRegion={DEFAULT_LOCATION}>
        {online && nearbyRequests.map(r => (
          <Marker key={r.id} coordinate={{ latitude: r.lat, longitude: r.lng }}>
            <View style={styles.markerBubble}><Text style={styles.markerText}>{r.price}</Text></View>
          </Marker>
        ))}
      </MapView>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="menu" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <View style={[styles.badge, online ? styles.badgeOnline : styles.badgeOffline]}>
          <View style={[styles.badgeDot, { backgroundColor: online ? COLORS.success : COLORS.error }]} />
          <Text style={styles.badgeText}>{online ? 'En línea' : 'Desconectado'}</Text>
        </View>
      </View>
      <View style={styles.bottomPanel}>
        <View style={styles.earningsCard}>
          <View style={styles.earningsRow}>
            <View>
              <Text style={styles.earningsLabel}>Hoy</Text>
              <Text style={styles.earningsValue}>${todayEarnings}</Text>
            </View>
            <View style={styles.tripsBox}>
              <Text style={styles.tripsCount}>{todayTrips}</Text>
              <Text style={styles.tripsLabel}>viajes</Text>
            </View>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${(todayEarnings / goal) * 100}%` }]} />
          </View>
          <Text style={styles.goalText}>Meta: ${goal}</Text>
        </View>
        <TouchableOpacity style={[styles.toggleBtn, online && styles.toggleBtnOff]} onPress={() => setOnline(!online)}>
          <Ionicons name={online ? 'pause-circle' : 'play-circle'} size={22} color="#FFF" />
          <Text style={styles.toggleText}>{online ? 'Desconectarse' : 'Conectarse'}</Text>
        </TouchableOpacity>
        {online && (
          <TouchableOpacity style={styles.viewRequestsBtn} onPress={() => navigation.navigate('RideRequest')}>
            <Ionicons name="list" size={20} color={COLORS.primary} />
            <Text style={styles.viewRequestsText}>Ver solicitudes disponibles</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { position: 'absolute', top: 50, left: SPACING.lg, right: SPACING.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  menuBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', ...SHADOWS.small },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, ...SHADOWS.small },
  badgeOnline: { backgroundColor: 'rgba(0,214,143,0.15)' },
  badgeOffline: { backgroundColor: 'rgba(255,61,113,0.15)' },
  badgeDot: { width: 8, height: 8, borderRadius: 4, marginRight: SPACING.xs },
  badgeText: { color: COLORS.textPrimary, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium },
  markerBubble: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.sm },
  markerText: { color: '#FFF', fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold },
  bottomPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.surface, borderTopLeftRadius: BORDER_RADIUS.xl, borderTopRightRadius: BORDER_RADIUS.xl, padding: SPACING.xxl, ...SHADOWS.medium },
  earningsCard: { backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.md, padding: SPACING.lg, marginBottom: SPACING.lg },
  earningsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  earningsLabel: { fontSize: FONTS.sizes.sm, color: COLORS.textMuted },
  earningsValue: { fontSize: FONTS.sizes.xxl, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  tripsBox: { alignItems: 'center' },
  tripsCount: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold, color: COLORS.primary },
  tripsLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted },
  progressBg: { height: 6, backgroundColor: COLORS.border, borderRadius: 3, marginBottom: SPACING.xs },
  progressFill: { height: 6, backgroundColor: COLORS.primary, borderRadius: 3 },
  goalText: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted },
  toggleBtn: { backgroundColor: COLORS.success, borderRadius: BORDER_RADIUS.lg, paddingVertical: SPACING.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.md },
  toggleBtnOff: { backgroundColor: COLORS.error },
  toggleText: { color: '#FFF', fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold, marginLeft: SPACING.sm },
  viewRequestsBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: SPACING.md, backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.md },
  viewRequestsText: { color: COLORS.primary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.medium, marginLeft: SPACING.sm },
});
