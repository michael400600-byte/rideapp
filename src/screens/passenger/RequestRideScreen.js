import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import { RIDE_TYPES, PAYMENT_METHODS, DEFAULT_LOCATION } from '../../utils/constants';

const routeCoords = [
  { latitude: 19.4326, longitude: -99.1332 },
  { latitude: 19.4350, longitude: -99.1200 },
  { latitude: 19.4361, longitude: -99.0719 },
];

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0d1526' }] },
  { elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1B2438' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a1020' }] },
];

export default function RequestRideScreen({ navigation, route }) {
  const destination = route?.params?.destination || { name: 'Destino' };
  const [selectedType, setSelectedType] = useState('economy');
  const [pricingMode, setPricingMode] = useState('fixed');
  const [customPrice, setCustomPrice] = useState('');
  const [payMethod, setPayMethod] = useState('cash');
  const types = Object.values(RIDE_TYPES);
  const basePrice = 85;
  const selectedRide = types.find(t => t.id === selectedType);
  const finalPrice = pricingMode === 'offer' && customPrice ? customPrice : Math.round(basePrice * (selectedRide?.multiplier || 1));

  return (
    <View style={styles.container}>
      <View style={styles.mapWrap}>
        <MapView style={StyleSheet.absoluteFillObject} initialRegion={DEFAULT_LOCATION} customMapStyle={darkMapStyle}>
          <Polyline coordinates={routeCoords} strokeColor={COLORS.primary} strokeWidth={4} />
          <Marker coordinate={routeCoords[0]}><View style={styles.originMarker} /></Marker>
          <Marker coordinate={routeCoords[routeCoords.length - 1]}>
            <View style={styles.destMarker}><Ionicons name="location" size={18} color="#FFF" /></View>
          </Marker>
        </MapView>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <View style={styles.tripMeta}>
          <View style={styles.metaItem}><Ionicons name="navigate" size={14} color={COLORS.primary} /><Text style={styles.metaText}>12.5 km</Text></View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}><Ionicons name="time" size={14} color={COLORS.accent} /><Text style={styles.metaText}>25 min</Text></View>
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.handle} />
        <View style={styles.destBar}>
          <View style={styles.destDot} />
          <Text style={styles.destText} numberOfLines={1}>{destination.name}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typesRow} contentContainerStyle={{ gap: SPACING.md }}>
            {types.map(t => {
              const active = selectedType === t.id;
              return (
                <TouchableOpacity key={t.id} style={[styles.typeCard, active && styles.typeCardActive]} onPress={() => setSelectedType(t.id)} activeOpacity={0.8}>
                  <Ionicons name={t.icon} size={28} color={active ? COLORS.primary : COLORS.textSecondary} />
                  <Text style={[styles.typeName, active && styles.typeNameActive]}>{t.name}</Text>
                  <Text style={styles.typeEta}>{t.eta}</Text>
                  <Text style={[styles.typePrice, active && { color: COLORS.primary }]}>${Math.round(basePrice * t.multiplier)}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.pricingToggle}>
            {[{ k: 'fixed', l: 'Precio fijo', i: 'pricetag' }, { k: 'offer', l: 'Ofrecer precio', i: 'cash' }].map(m => {
              const active = pricingMode === m.k;
              return (
                <TouchableOpacity key={m.k} style={styles.toggleBtn} onPress={() => setPricingMode(m.k)} activeOpacity={0.8}>
                  {active ? (
                    <LinearGradient colors={COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.toggleActive}>
                      <Ionicons name={m.i} size={16} color="#FFF" />
                      <Text style={styles.toggleTextActive}>{m.l}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.toggleInactive}><Ionicons name={m.i} size={16} color={COLORS.textMuted} /><Text style={styles.toggleText}>{m.l}</Text></View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {pricingMode === 'offer' && (
            <View style={styles.offerBox}>
              <Text style={styles.offerLabel}>Tu oferta</Text>
              <View style={styles.offerInputRow}>
                <Text style={styles.dollar}>$</Text>
                <TextInput style={styles.offerInput} keyboardType="numeric" placeholder={`${Math.round(basePrice * selectedRide.multiplier)}`} placeholderTextColor={COLORS.textMuted} value={customPrice} onChangeText={setCustomPrice} />
              </View>
              <Text style={styles.offerHint}>Sugerido: ${Math.round(basePrice * selectedRide.multiplier)}</Text>
            </View>
          )}

          <Text style={styles.payTitle}>Método de pago</Text>
          <View style={styles.payRow}>
            {Object.values(PAYMENT_METHODS).map(pm => {
              const active = payMethod === pm.id;
              return (
                <TouchableOpacity key={pm.id} style={[styles.payBtn, active && styles.payBtnActive]} onPress={() => setPayMethod(pm.id)} activeOpacity={0.8}>
                  <Ionicons name={pm.icon} size={20} color={active ? COLORS.primary : COLORS.textMuted} />
                  <Text style={[styles.payText, active && styles.payTextActive]}>{pm.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <TouchableOpacity style={[styles.requestBtn, SHADOWS.glow]} activeOpacity={0.85} onPress={() => navigation.navigate('SearchingDriver', { price: finalPrice, destination })}>
          <LinearGradient colors={COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.requestGradient}>
            <Text style={styles.requestBtnText}>Solicitar viaje</Text>
            <View style={styles.priceTag}><Text style={styles.priceTagText}>${finalPrice}</Text></View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  mapWrap: { height: '32%' },
  backBtn: { position: 'absolute', top: 54, left: SPACING.xl, width: 44, height: 44, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', ...SHADOWS.medium },
  originMarker: { width: 16, height: 16, borderRadius: 8, backgroundColor: COLORS.accent, borderWidth: 3, borderColor: '#FFF' },
  destMarker: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.error, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
  tripMeta: { position: 'absolute', bottom: SPACING.xxl, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, ...SHADOWS.medium, borderWidth: 1, borderColor: COLORS.border },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  metaText: { color: COLORS.textPrimary, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.semibold },
  metaDivider: { width: 1, height: 16, backgroundColor: COLORS.border, marginHorizontal: SPACING.md },
  panel: { flex: 1, backgroundColor: COLORS.background, borderTopLeftRadius: BORDER_RADIUS.xl, borderTopRightRadius: BORDER_RADIUS.xl, marginTop: -24, paddingTop: SPACING.md, paddingHorizontal: SPACING.xl, ...SHADOWS.large, borderTopWidth: 1, borderColor: COLORS.border },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: COLORS.borderLight, alignSelf: 'center', marginBottom: SPACING.lg },
  destBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  destDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.error, marginRight: SPACING.md },
  destText: { flex: 1, color: COLORS.textPrimary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.medium },
  scrollContent: { paddingBottom: SPACING.md },
  typesRow: { marginBottom: SPACING.lg },
  typeCard: { width: 96, padding: SPACING.md, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.border },
  typeCardActive: { borderColor: COLORS.primary, backgroundColor: COLORS.surfaceLight },
  typeName: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, marginTop: SPACING.sm, fontWeight: FONTS.weights.semibold },
  typeNameActive: { color: COLORS.textPrimary },
  typeEta: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, marginTop: 2 },
  typePrice: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary, marginTop: SPACING.xs },
  pricingToggle: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.lg },
  toggleBtn: { flex: 1 },
  toggleActive: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.md },
  toggleInactive: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  toggleText: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.semibold },
  toggleTextActive: { color: '#FFF', fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold },
  offerBox: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.lg, marginBottom: SPACING.lg, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  offerLabel: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, marginBottom: SPACING.sm },
  offerInputRow: { flexDirection: 'row', alignItems: 'center' },
  dollar: { color: COLORS.accent, fontSize: FONTS.sizes.xxl, fontWeight: FONTS.weights.bold, marginRight: SPACING.xs },
  offerInput: { color: COLORS.textPrimary, fontSize: FONTS.sizes.hero, fontWeight: FONTS.weights.heavy, minWidth: 100, textAlign: 'center' },
  offerHint: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs, marginTop: SPACING.sm },
  payTitle: { color: COLORS.textPrimary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, marginBottom: SPACING.md },
  payRow: { flexDirection: 'row', gap: SPACING.sm },
  payBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.xs, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, borderWidth: 1.5, borderColor: COLORS.border },
  payBtnActive: { borderColor: COLORS.primary, backgroundColor: COLORS.surfaceLight },
  payText: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium },
  payTextActive: { color: COLORS.textPrimary },
  requestBtn: { borderRadius: BORDER_RADIUS.lg, marginVertical: SPACING.lg },
  requestGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.md, paddingVertical: SPACING.lg + 2, borderRadius: BORDER_RADIUS.lg },
  requestBtnText: { color: '#FFF', fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
  priceTag: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.full },
  priceTagText: { color: '#FFF', fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.heavy },
});
