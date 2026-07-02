import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, BORDER_RADIUS, SPACING, SHADOWS } from '../utils/theme';

const RideCard = ({ ride, selected, onSelect }) => (
  <TouchableOpacity style={[styles.container, selected && styles.selected]} onPress={() => onSelect(ride)} activeOpacity={0.7}>
    <View style={styles.iconContainer}>
      <Ionicons name={ride.icon} size={28} color={selected ? COLORS.primary : COLORS.textSecondary} />
    </View>
    <View style={styles.info}>
      <Text style={styles.name}>{ride.name}</Text>
      <Text style={styles.description}>{ride.description}</Text>
    </View>
    <View style={styles.priceContainer}>
      <Text style={[styles.price, selected && styles.priceSelected]}>${ride.estimatedPrice}</Text>
      <Text style={styles.eta}>{ride.eta}</Text>
    </View>
    {selected && <View style={styles.selectedIndicator}><Ionicons name="checkmark-circle" size={20} color={COLORS.primary} /></View>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.lg, marginBottom: SPACING.md, borderWidth: 1.5, borderColor: COLORS.border, ...SHADOWS.small },
  selected: { borderColor: COLORS.primary, backgroundColor: 'rgba(30, 144, 255, 0.08)' },
  iconContainer: { width: 50, height: 50, borderRadius: BORDER_RADIUS.sm, backgroundColor: COLORS.surfaceLight, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, marginLeft: SPACING.md },
  name: { color: COLORS.textPrimary, fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.semibold },
  description: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, marginTop: 2 },
  priceContainer: { alignItems: 'flex-end' },
  price: { color: COLORS.textPrimary, fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold },
  priceSelected: { color: COLORS.primary },
  eta: { color: COLORS.textSecondary, fontSize: FONTS.sizes.xs, marginTop: 2 },
  selectedIndicator: { position: 'absolute', top: SPACING.sm, right: SPACING.sm },
});

export default RideCard;
