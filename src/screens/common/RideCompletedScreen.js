import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

const tipOptions = [10, 20, 30, 50];

export default function RideCompletedScreen({ navigation }) {
  const [rating, setRating] = useState(0);
  const [selectedTip, setSelectedTip] = useState(null);
  const isPassenger = true;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.iconWrap}>
        <LinearGradient colors={COLORS.gradient} style={styles.iconCircle}>
          <Ionicons name="checkmark" size={48} color="#FFF" />
        </LinearGradient>
      </View>
      <Text style={styles.title}>¡Viaje completado!</Text>
      <Text style={styles.destination}>Aeropuerto CDMX</Text>
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>$120 MXN</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Distancia</Text>
          <Text style={styles.summaryValue}>12.5 km</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Duración</Text>
          <Text style={styles.summaryValue}>25 min</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Método de pago</Text>
          <Text style={styles.summaryValue}>Efectivo</Text>
        </View>
      </View>
      <Text style={styles.rateLabel}>Califica tu viaje</Text>
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons name={star <= rating ? 'star' : 'star-outline'} size={36} color={star <= rating ? COLORS.star : COLORS.starEmpty} style={styles.star} />
          </TouchableOpacity>
        ))}
      </View>
      {isPassenger && (
        <View style={styles.tipSection}>
          <Text style={styles.tipLabel}>Propina para el conductor</Text>
          <View style={styles.tipRow}>
            {tipOptions.map(tip => (
              <TouchableOpacity key={tip} style={[styles.tipBtn, selectedTip === tip && styles.tipBtnActive]} onPress={() => setSelectedTip(tip)}>
                <Text style={[styles.tipText, selectedTip === tip && styles.tipTextActive]}>${tip}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.doneBtn} onPress={() => navigation.replace(isPassenger ? 'PassengerHome' : 'DriverHome')}>
        <Text style={styles.doneBtnText}>Listo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.xxl, alignItems: 'center', paddingTop: 80 },
  iconWrap: { marginBottom: SPACING.xxl },
  iconCircle: { width: 90, height: 90, borderRadius: 45, justifyContent: 'center', alignItems: 'center', ...SHADOWS.large },
  title: { fontSize: FONTS.sizes.xxl, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary, marginBottom: SPACING.xs },
  destination: { fontSize: FONTS.sizes.md, color: COLORS.textMuted, marginBottom: SPACING.xxl },
  summaryCard: { width: '100%', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.xxl },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  summaryLabel: { color: COLORS.textMuted, fontSize: FONTS.sizes.md },
  summaryValue: { color: COLORS.textPrimary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.semibold },
  rateLabel: { color: COLORS.textSecondary, fontSize: FONTS.sizes.md, marginBottom: SPACING.md },
  starsRow: { flexDirection: 'row', marginBottom: SPACING.xxl },
  star: { marginHorizontal: SPACING.xs },
  tipSection: { width: '100%', marginBottom: SPACING.xxl },
  tipLabel: { color: COLORS.textSecondary, fontSize: FONTS.sizes.md, marginBottom: SPACING.md, textAlign: 'center' },
  tipRow: { flexDirection: 'row', justifyContent: 'center' },
  tipBtn: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, backgroundColor: COLORS.surface, marginHorizontal: SPACING.xs, borderWidth: 1, borderColor: COLORS.border },
  tipBtnActive: { borderColor: COLORS.primary, backgroundColor: 'rgba(30,144,255,0.1)' },
  tipText: { color: COLORS.textMuted, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.medium },
  tipTextActive: { color: COLORS.primary },
  doneBtn: { width: '100%', backgroundColor: COLORS.primary, borderRadius: BORDER_RADIUS.lg, paddingVertical: SPACING.lg, alignItems: 'center', ...SHADOWS.medium },
  doneBtnText: { color: '#FFF', fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
});
