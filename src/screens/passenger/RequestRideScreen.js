import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import { RIDE_TYPES, PAYMENT_METHODS, DEFAULT_LOCATION } from '../../utils/constants';

const routeCoords = [
  { latitude: 19.4326, longitude: -99.1332 },
  { latitude: 19.4350, longitude: -99.1200 },
  { latitude: 19.4361, longitude: -99.0719 },
];

export default function RequestRideScreen({ navigation, route }) {
  const destination = route?.params?.destination || { name: 'Destino' };
  const [selectedType, setSelectedType] = useState('economy');
  const [pricingMode, setPricingMode] = useState('fixed');
  const [customPrice, setCustomPrice] = useState('');
  const [payMethod, setPayMethod] = useState('cash');

  const types = Object.values(RIDE_TYPES);
  const basePrice = 85;

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={DEFAULT_LOCATION}>
        <Polyline coordinates={routeCoords} strokeColor={COLORS.primary} strokeWidth={3} />
        <Marker coordinate={routeCoords[routeCoords.length - 1]} />
      </MapView>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
      </TouchableOpacity>
      <View style={styles.destBar}>
        <Ionicons name="location" size={16} color={COLORS.error} />
        <Text style={styles.destText} numberOfLines={1}>{destination.name}</Text>
      </View>
      <ScrollView style={styles.panel} contentContainerStyle={styles.panelContent}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typesRow}>
          {types.map(t => (
            <TouchableOpacity key={t.id} style={[styles.typeCard, selectedType === t.id && styles.typeCardActive]} onPress={() => setSelectedType(t.id)}>
              <Ionicons name={t.icon} size={24} color={selectedType === t.id ? COLORS.primary : COLORS.textMuted} />
              <Text style={[styles.typeName, selectedType === t.id && styles.typeNameActive]}>{t.name}</Text>
              <Text style={styles.typeEta}>{t.eta}</Text>
              <Text style={styles.typePrice}>${Math.round(basePrice * t.multiplier)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.pricingToggle}>
          {['fixed', 'offer'].map(m => (
            <TouchableOpacity key={m} style={[styles.toggleBtn, pricingMode === m && styles.toggleActive]} onPress={() => setPricingMode(m)}>
              <Text style={[styles.toggleText, pricingMode === m && styles.toggleTextActive]}>{m === 'fixed' ? 'Precio fijo' : 'Ofrecer precio'}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {pricingMode === 'offer' && (
          <View style={styles.customPriceRow}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput style={styles.customInput} keyboardType="numeric" placeholder="Tu oferta" placeholderTextColor={COLORS.textMuted} value={customPrice} onChangeText={setCustomPrice} />
          </View>
        )}
        <View style={styles.payRow}>
          {Object.values(PAYMENT_METHODS).map(pm => (
            <TouchableOpacity key={pm.id} style={[styles.payBtn, payMethod === pm.id && styles.payBtnActive]} onPress={() => setPayMethod(pm.id)}>
              <Ionicons name={pm.icon} size={18} color={payMethod === pm.id ? COLORS.primary : COLORS.textMuted} />
              <Text style={[styles.payText, payMethod === pm.id && styles.payTextActive]}>{pm.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.requestBtn} onPress={() => navigation.navigate('SearchingDriver')}>
          <Text style={styles.requestBtnText}>Solicitar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  map: { height: '35%' },
  backBtn: { position: 'absolute', top: 50, left: SPACING.lg, width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center' },
  destBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, margin: SPACING.md, padding: SPACING.md, borderRadius: BORDER_RADIUS.sm },
  destText: { color: COLORS.textPrimary, marginLeft: SPACING.sm, fontSize: FONTS.sizes.md },
  panel: { flex: 1, backgroundColor: COLORS.surface, borderTopLeftRadius: BORDER_RADIUS.xl, borderTopRightRadius: BORDER_RADIUS.xl },
  panelContent: { padding: SPACING.lg },
  typesRow: { marginBottom: SPACING.lg },
  typeCard: { width: 100, padding: SPACING.md, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surfaceLight, marginRight: SPACING.sm, alignItems: 'center', borderWidth: 1, borderColor: 'transparent' },
  typeCardActive: { borderColor: COLORS.primary },
  typeName: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, marginTop: SPACING.xs },
  typeNameActive: { color: COLORS.primary },
  typeEta: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted },
  typePrice: { fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary, marginTop: SPACING.xs },
  pricingToggle: { flexDirection: 'row', backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.sm, padding: SPACING.xs, marginBottom: SPACING.md },
  toggleBtn: { flex: 1, paddingVertical: SPACING.sm, alignItems: 'center', borderRadius: BORDER_RADIUS.sm },
  toggleActive: { backgroundColor: COLORS.primary },
  toggleText: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm },
  toggleTextActive: { color: '#FFF', fontWeight: FONTS.weights.bold },
  customPriceRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.md },
  dollarSign: { color: COLORS.primary, fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold, marginRight: SPACING.sm },
  customInput: { flex: 1, color: COLORS.textPrimary, fontSize: FONTS.sizes.lg },
  payRow: { flexDirection: 'row', marginBottom: SPACING.lg },
  payBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: SPACING.sm, borderRadius: BORDER_RADIUS.sm, marginRight: SPACING.xs, backgroundColor: COLORS.surfaceLight },
  payBtnActive: { borderWidth: 1, borderColor: COLORS.primary },
  payText: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm, marginLeft: SPACING.xs },
  payTextActive: { color: COLORS.primary },
  requestBtn: { backgroundColor: COLORS.primary, borderRadius: BORDER_RADIUS.lg, paddingVertical: SPACING.lg, alignItems: 'center', ...SHADOWS.large },
  requestBtnText: { color: '#FFF', fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
});
