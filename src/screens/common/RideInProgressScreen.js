import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import { DEFAULT_LOCATION } from '../../utils/constants';

const routeCoords = [
  { latitude: 19.4326, longitude: -99.1332 },
  { latitude: 19.4340, longitude: -99.1200 },
  { latitude: 19.4361, longitude: -99.0719 },
];

export default function RideInProgressScreen({ navigation }) {
  const [status, setStatus] = useState('arriving');
  const isDriver = false;
  const person = { name: 'Juan Pérez', rating: 4.9, car: 'Toyota Corolla', plate: 'ABC-123', avatar: 'JP' };

  const statusLabels = { arriving: 'Conductor en camino', arrived: 'Conductor llegó', in_progress: 'Viaje en curso' };
  const statusColors = { arriving: COLORS.warning, arrived: COLORS.info, in_progress: COLORS.success };

  const handleAction = () => {
    if (status === 'arrived') setStatus('in_progress');
    else if (status === 'in_progress') navigation.replace('RideCompleted');
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={DEFAULT_LOCATION}>
        <Polyline coordinates={routeCoords} strokeColor={COLORS.primary} strokeWidth={3} />
        <Marker coordinate={routeCoords[1]}>
          <Ionicons name="car-sport" size={28} color={COLORS.primary} />
        </Marker>
      </MapView>
      <View style={[styles.statusBar, { backgroundColor: statusColors[status] }]}>
        <Text style={styles.statusText}>{statusLabels[status]}</Text>
      </View>
      <View style={styles.bottomPanel}>
        <View style={styles.personCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{person.avatar}</Text></View>
          <View style={styles.personInfo}>
            <Text style={styles.personName}>{person.name}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color={COLORS.star} />
              <Text style={styles.ratingText}>{person.rating}</Text>
            </View>
            <Text style={styles.carInfo}>{person.car} · {person.plate}</Text>
          </View>
          <View style={styles.contactBtns}>
            <TouchableOpacity style={styles.contactBtn}><Ionicons name="call" size={18} color={COLORS.primary} /></TouchableOpacity>
            <TouchableOpacity style={styles.contactBtn}><Ionicons name="chatbubble" size={18} color={COLORS.primary} /></TouchableOpacity>
          </View>
        </View>
        <View style={styles.tripDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Destino</Text>
            <Text style={styles.detailValue}>Aeropuerto CDMX</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Precio</Text>
            <Text style={styles.detailValue}>$120 MXN</Text>
          </View>
        </View>
        {(isDriver && status === 'arrived') && (
          <TouchableOpacity style={styles.actionBtn} onPress={handleAction}>
            <Text style={styles.actionBtnText}>Iniciar Viaje</Text>
          </TouchableOpacity>
        )}
        {(isDriver && status === 'in_progress') && (
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.success }]} onPress={handleAction}>
            <Text style={styles.actionBtnText}>Finalizar Viaje</Text>
          </TouchableOpacity>
        )}
        {!isDriver && (
          <TouchableOpacity style={styles.shareBtn}>
            <Ionicons name="share-outline" size={18} color={COLORS.primary} />
            <Text style={styles.shareBtnText}>Compartir viaje</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  map: { height: '45%' },
  statusBar: { paddingVertical: SPACING.sm, alignItems: 'center' },
  statusText: { color: '#FFF', fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.sm },
  bottomPanel: { flex: 1, backgroundColor: COLORS.surface, borderTopLeftRadius: BORDER_RADIUS.xl, borderTopRightRadius: BORDER_RADIUS.xl, padding: SPACING.xxl, marginTop: -SPACING.lg },
  personCard: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.lg },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.surfaceLight, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: COLORS.primary, fontWeight: FONTS.weights.bold },
  personInfo: { flex: 1, marginLeft: SPACING.md },
  personName: { color: COLORS.textPrimary, fontWeight: FONTS.weights.semibold, fontSize: FONTS.sizes.md },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  ratingText: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs, marginLeft: 4 },
  carInfo: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs, marginTop: 2 },
  contactBtns: { flexDirection: 'row' },
  contactBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.surfaceLight, justifyContent: 'center', alignItems: 'center', marginLeft: SPACING.sm },
  tripDetails: { backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.lg },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SPACING.xs },
  detailLabel: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm },
  detailValue: { color: COLORS.textPrimary, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium },
  actionBtn: { backgroundColor: COLORS.primary, borderRadius: BORDER_RADIUS.lg, paddingVertical: SPACING.md, alignItems: 'center', ...SHADOWS.medium },
  actionBtnText: { color: '#FFF', fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
  shareBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: SPACING.md, backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.md },
  shareBtnText: { color: COLORS.primary, fontSize: FONTS.sizes.md, marginLeft: SPACING.sm },
});
