import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import { DEFAULT_LOCATION } from '../../utils/constants';

const quickLocations = [
  { icon: 'home', label: 'Casa', address: 'Col. Roma Norte' },
  { icon: 'briefcase', label: 'Trabajo', address: 'Reforma 222' },
  { icon: 'cart', label: 'Centro Comercial', address: 'Perisur' },
];

const recentTrips = [
  { destination: 'Aeropuerto CDMX', time: 'Ayer, 14:30' },
  { destination: 'Coyoacán Centro', time: 'Lun, 09:15' },
];

const darkMapStyle = [{ elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] }, { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] }];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFillObject} initialRegion={DEFAULT_LOCATION} customMapStyle={darkMapStyle} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="menu" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomPanel}>
        <Text style={styles.greeting}>¡Hola! ¿A dónde vamos?</Text>
        <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('SearchDestination')}>
          <Ionicons name="search" size={20} color={COLORS.textMuted} />
          <Text style={styles.searchText}>Buscar destino...</Text>
        </TouchableOpacity>
        <View style={styles.quickRow}>
          {quickLocations.map((loc, i) => (
            <TouchableOpacity key={i} style={styles.quickItem}>
              <View style={styles.quickIcon}><Ionicons name={loc.icon} size={18} color={COLORS.primary} /></View>
              <Text style={styles.quickLabel}>{loc.label}</Text>
              <Text style={styles.quickAddr} numberOfLines={1}>{loc.address}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {recentTrips.map((trip, i) => (
          <View key={i} style={styles.recentItem}>
            <Ionicons name="time-outline" size={18} color={COLORS.textMuted} />
            <View style={styles.recentInfo}>
              <Text style={styles.recentDest}>{trip.destination}</Text>
              <Text style={styles.recentTime}>{trip.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { position: 'absolute', top: 50, left: SPACING.lg, right: SPACING.lg, flexDirection: 'row', justifyContent: 'space-between' },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', ...SHADOWS.small },
  bottomPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.surface, borderTopLeftRadius: BORDER_RADIUS.xl, borderTopRightRadius: BORDER_RADIUS.xl, padding: SPACING.xxl, ...SHADOWS.medium },
  greeting: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary, marginBottom: SPACING.lg },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.lg },
  searchText: { color: COLORS.textMuted, marginLeft: SPACING.sm, fontSize: FONTS.sizes.md },
  quickRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.lg },
  quickItem: { alignItems: 'center', flex: 1 },
  quickIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.surfaceLight, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.xs },
  quickLabel: { fontSize: FONTS.sizes.sm, color: COLORS.textPrimary, fontWeight: FONTS.weights.medium },
  quickAddr: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted },
  recentItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.border },
  recentInfo: { marginLeft: SPACING.md },
  recentDest: { fontSize: FONTS.sizes.md, color: COLORS.textPrimary },
  recentTime: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted },
});
