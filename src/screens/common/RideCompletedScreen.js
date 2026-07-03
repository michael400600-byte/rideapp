import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

const tipOptions = [10, 20, 30, 50];

export default function RideCompletedScreen({ navigation, route }) {
  const isDriver = route?.params?.isDriver || false;
  const price = route?.params?.price || 120;
  const destination = route?.params?.destination || { name: 'Aeropuerto CDMX' };
  const [rating, setRating] = useState(0);
  const [selectedTip, setSelectedTip] = useState(null);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A3D2E', '#070B14']} style={styles.glow} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.iconWrap}>
          <LinearGradient colors={COLORS.gradientAccent} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconCircle}>
            <Ionicons name="checkmark" size={52} color="#FFF" />
          </LinearGradient>
        </View>
        <Text style={styles.title}>{isDriver ? '¡Viaje finalizado!' : '¡Llegaste a tu destino!'}</Text>
        <Text style={styles.destination}>{destination.name}</Text>

        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>{isDriver ? 'Ganancia del viaje' : 'Total pagado'}</Text>
          <Text style={styles.priceValue}>${price}</Text>
          <View style={styles.priceMeta}>
            <View style={styles.priceMetaItem}><Ionicons name="navigate" size={13} color={COLORS.textMuted} /><Text style={styles.priceMetaText}>12.5 km</Text></View>
            <View style={styles.priceMetaItem}><Ionicons name="time" size={13} color={COLORS.textMuted} /><Text style={styles.priceMetaText}>25 min</Text></View>
            <View style={styles.priceMetaItem}><Ionicons name="cash" size={13} color={COLORS.textMuted} /><Text style={styles.priceMetaText}>Efectivo</Text></View>
          </View>
        </View>

        <Text style={styles.rateLabel}>{isDriver ? 'Califica al pasajero' : 'Califica tu viaje'}</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map(star => (
            <TouchableOpacity key={star} onPress={() => setRating(star)} activeOpacity={0.7}>
              <Ionicons name={star <= rating ? 'star' : 'star-outline'} size={40} color={star <= rating ? COLORS.star : COLORS.starEmpty} style={styles.star} />
            </TouchableOpacity>
          ))}
        </View>

        {!isDriver && (
          <View style={styles.tipSection}>
            <Text style={styles.tipLabel}>¿Quieres dejar propina?</Text>
            <View style={styles.tipRow}>
              {tipOptions.map(tip => {
                const active = selectedTip === tip;
                return (
                  <TouchableOpacity key={tip} style={[styles.tipBtn, active && styles.tipBtnActive]} onPress={() => setSelectedTip(active ? null : tip)} activeOpacity={0.8}>
                    <Text style={[styles.tipText, active && styles.tipTextActive]}>${tip}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.doneBtn, SHADOWS.glow]} onPress={() => navigation.replace(isDriver ? 'DriverHome' : 'PassengerHome')} activeOpacity={0.85}>
          <LinearGradient colors={COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.doneGradient}>
            <Text style={styles.doneBtnText}>{rating > 0 ? 'Enviar y finalizar' : 'Finalizar'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  glow: { position: 'absolute', top: 0, left: 0, right: 0, height: 380, opacity: 0.5 },
  scroll: { padding: SPACING.xxl, alignItems: 'center', paddingTop: 90 },
  iconWrap: { marginBottom: SPACING.xl },
  iconCircle: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', ...SHADOWS.glowAccent },
  title: { fontSize: FONTS.sizes.xxl, fontWeight: FONTS.weights.heavy, color: COLORS.textPrimary, textAlign: 'center' },
  destination: { fontSize: FONTS.sizes.md, color: COLORS.textSecondary, marginTop: SPACING.xs, marginBottom: SPACING.xl },
  priceCard: { width: '100%', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.xl, marginBottom: SPACING.xl, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  priceLabel: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm },
  priceValue: { color: COLORS.textPrimary, fontSize: FONTS.sizes.hero, fontWeight: FONTS.weights.heavy, marginVertical: SPACING.xs },
  priceMeta: { flexDirection: 'row', gap: SPACING.lg, marginTop: SPACING.sm },
  priceMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  priceMetaText: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
  rateLabel: { color: COLORS.textSecondary, fontSize: FONTS.sizes.md, marginBottom: SPACING.md, fontWeight: FONTS.weights.semibold },
  starsRow: { flexDirection: 'row', marginBottom: SPACING.xl },
  star: { marginHorizontal: SPACING.xs },
  tipSection: { width: '100%' },
  tipLabel: { color: COLORS.textSecondary, fontSize: FONTS.sizes.md, marginBottom: SPACING.md, textAlign: 'center', fontWeight: FONTS.weights.semibold },
  tipRow: { flexDirection: 'row', justifyContent: 'center', gap: SPACING.md },
  tipBtn: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.full, backgroundColor: COLORS.surface, borderWidth: 1.5, borderColor: COLORS.border },
  tipBtnActive: { borderColor: COLORS.accent, backgroundColor: COLORS.accent + '18' },
  tipText: { color: COLORS.textSecondary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold },
  tipTextActive: { color: COLORS.accent },
  footer: { padding: SPACING.xxl, paddingBottom: 40 },
  doneBtn: { borderRadius: BORDER_RADIUS.lg },
  doneGradient: { paddingVertical: SPACING.lg + 2, alignItems: 'center', borderRadius: BORDER_RADIUS.lg },
  doneBtnText: { color: '#FFF', fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
});
