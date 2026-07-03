import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import { DEFAULT_LOCATION } from '../../utils/constants';

const routeCoords = [
  { latitude: 19.4326, longitude: -99.1332 },
  { latitude: 19.4340, longitude: -99.1200 },
  { latitude: 19.4361, longitude: -99.0719 },
];

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0d1526' }] },
  { elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1B2438' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a1020' }] },
];

export default function RideInProgressScreen({ navigation, route }) {
  const isDriver = route?.params?.isDriver || false;
  const price = route?.params?.price || 120;
  const destination = route?.params?.destination || { name: 'Aeropuerto CDMX' };
  const [status, setStatus] = useState('arriving');
  const person = { name: 'Juan Pérez', rating: 4.9, car: 'Toyota Corolla', plate: 'ABC-123', avatar: 'JP' };

  const statusInfo = {
    arriving: { label: 'Tu conductor va en camino', color: COLORS.primary, eta: '3 min' },
    arrived: { label: 'Tu conductor ha llegado', color: COLORS.warning, eta: 'Ahora' },
    in_progress: { label: 'Viaje en curso', color: COLORS.accent, eta: '25 min' },
  }[status];

  const handleAction = () => {
    if (status === 'arriving') setStatus('arrived');
    else if (status === 'arrived') setStatus('in_progress');
    else navigation.replace('RideCompleted', { price, destination, isDriver });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={DEFAULT_LOCATION} customMapStyle={darkMapStyle}>
        <Polyline coordinates={routeCoords} strokeColor={COLORS.primary} strokeWidth={4} />
        <Marker coordinate={routeCoords[1]}>
          <View style={styles.carMarker}><Ionicons name="car-sport" size={20} color="#FFF" /></View>
        </Marker>
        <Marker coordinate={routeCoords[routeCoords.length - 1]}>
          <View style={styles.destMarker}><Ionicons name="location" size={16} color="#FFF" /></View>
        </Marker>
      </MapView>

      <View style={styles.statusBar}>
        <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
        <Text style={styles.statusText}>{statusInfo.label}</Text>
        <View style={styles.etaPill}><Text style={styles.etaText}>{statusInfo.eta}</Text></View>
      </View>

      <View style={styles.panel}>
        <View style={styles.handle} />
        <View style={styles.personCard}>
          <LinearGradient colors={COLORS.gradientPremium} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.avatar}>
            <Text style={styles.avatarText}>{person.avatar}</Text>
          </LinearGradient>
          <View style={styles.personInfo}>
            <Text style={styles.personName}>{person.name}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={13} color={COLORS.star} />
              <Text style={styles.ratingText}>{person.rating}</Text>
              {!isDriver && <Text style={styles.carText}>· {person.car}</Text>}
            </View>
          </View>
          {!isDriver && <View style={styles.plateBox}><Text style={styles.plateText}>{person.plate}</Text></View>}
        </View>

        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactBtn} activeOpacity={0.8}>
            <Ionicons name="call" size={20} color={COLORS.accent} />
            <Text style={styles.contactText}>Llamar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactBtn} activeOpacity={0.8}>
            <Ionicons name="chatbubble" size={20} color={COLORS.primary} />
            <Text style={styles.contactText}>Mensaje</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactBtn} activeOpacity={0.8}>
            <Ionicons name="shield-checkmark" size={20} color={COLORS.warning} />
            <Text style={styles.contactText}>Seguridad</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tripDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="location" size={16} color={COLORS.error} />
            <Text style={styles.detailLabel}>Destino</Text>
            <Text style={styles.detailValue} numberOfLines={1}>{destination.name}</Text>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <Ionicons name="cash" size={16} color={COLORS.accent} />
            <Text style={styles.detailLabel}>Precio</Text>
            <Text style={[styles.detailValue, { color: COLORS.accent }]}>${price}</Text>
          </View>
        </View>

        {isDriver ? (
          <TouchableOpacity style={[styles.actionBtn, SHADOWS.glow]} onPress={handleAction} activeOpacity={0.85}>
            <LinearGradient colors={COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.actionGradient}>
              <Text style={styles.actionText}>{status === 'arriving' ? 'Ya llegué' : status === 'arrived' ? 'Iniciar viaje' : 'Finalizar viaje'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7} onPress={() => navigation.replace('PassengerHome')}>
            <Text style={styles.cancelText}>Cancelar viaje</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  map: { height: '48%' },
  carMarker: { width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF', ...SHADOWS.glow },
  destMarker: { width: 30, height: 30, borderRadius: 15, backgroundColor: COLORS.error, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
  statusBar: { position: 'absolute', top: 54, left: SPACING.xl, right: SPACING.xl, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.full, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, ...SHADOWS.medium, borderWidth: 1, borderColor: COLORS.border },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: SPACING.md },
  statusText: { flex: 1, color: COLORS.textPrimary, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.semibold },
  etaPill: { backgroundColor: COLORS.surfaceLight, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.full },
  etaText: { color: COLORS.primary, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold },
  panel: { flex: 1, backgroundColor: COLORS.background, borderTopLeftRadius: BORDER_RADIUS.xl, borderTopRightRadius: BORDER_RADIUS.xl, marginTop: -24, paddingTop: SPACING.md, paddingHorizontal: SPACING.xl, ...SHADOWS.large, borderTopWidth: 1, borderColor: COLORS.border },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: COLORS.borderLight, alignSelf: 'center', marginBottom: SPACING.lg },
  personCard: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.lg },
  avatar: { width: 54, height: 54, borderRadius: 27, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.lg },
  personInfo: { flex: 1, marginLeft: SPACING.md },
  personName: { color: COLORS.textPrimary, fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.lg },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  ratingText: { color: COLORS.star, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.semibold },
  carText: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm },
  plateBox: { backgroundColor: COLORS.surfaceLight, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.sm, borderWidth: 1, borderColor: COLORS.border },
  plateText: { color: COLORS.textPrimary, fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.sm, letterSpacing: 1 },
  contactRow: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.lg },
  contactBtn: { flex: 1, alignItems: 'center', gap: SPACING.xs, paddingVertical: SPACING.md, backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, borderWidth: 1, borderColor: COLORS.border },
  contactText: { color: COLORS.textSecondary, fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.medium },
  tripDetails: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.lg, marginBottom: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.xs },
  detailLabel: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm, marginLeft: SPACING.md, flex: 1 },
  detailValue: { color: COLORS.textPrimary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, maxWidth: '55%' },
  detailDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.xs },
  actionBtn: { borderRadius: BORDER_RADIUS.lg, marginBottom: SPACING.xl },
  actionGradient: { paddingVertical: SPACING.lg + 2, alignItems: 'center', borderRadius: BORDER_RADIUS.lg },
  actionText: { color: '#FFF', fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
  cancelBtn: { alignItems: 'center', paddingVertical: SPACING.lg, marginBottom: SPACING.md },
  cancelText: { color: COLORS.error, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.semibold },
});
