import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

const mockTrips = [
  { id: '1', date: '15 Nov · 14:30', status: 'completed', origin: 'Col. Roma Norte', destination: 'Aeropuerto CDMX', distance: '12.5 km', duration: '25 min', price: '$120', rating: 5 },
  { id: '2', date: '14 Nov · 09:00', status: 'completed', origin: 'Polanco', destination: 'Santa Fe', distance: '8 km', duration: '18 min', price: '$75', rating: 4 },
  { id: '3', date: '13 Nov · 20:15', status: 'cancelled', origin: 'Condesa', destination: 'Coyoacán', distance: '6 km', duration: '-', price: '$0', rating: 0 },
  { id: '4', date: '12 Nov · 07:45', status: 'completed', origin: 'Del Valle', destination: 'Reforma', distance: '5 km', duration: '12 min', price: '$55', rating: 5 },
];

const filters = ['Todos', 'Completados', 'Cancelados'];

export default function HistoryScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const filtered = mockTrips.filter(t => activeFilter === 'Completados' ? t.status === 'completed' : activeFilter === 'Cancelados' ? t.status === 'cancelled' : true);
  const totalTrips = mockTrips.filter(t => t.status === 'completed').length;

  const renderTrip = ({ item }) => (
    <View style={styles.tripCard}>
      <View style={styles.tripHeader}>
        <Text style={styles.tripDate}>{item.date}</Text>
        <View style={[styles.statusBadge, item.status === 'completed' ? styles.badgeCompleted : styles.badgeCancelled]}>
          <Text style={[styles.statusText, { color: item.status === 'completed' ? COLORS.success : COLORS.error }]}>{item.status === 'completed' ? 'Completado' : 'Cancelado'}</Text>
        </View>
      </View>
      <View style={styles.routeSection}>
        <View style={styles.routeRow}><View style={[styles.dot, { backgroundColor: COLORS.accent }]} /><Text style={styles.routeText} numberOfLines={1}>{item.origin}</Text></View>
        <View style={styles.routeLine} />
        <View style={styles.routeRow}><View style={[styles.dot, { backgroundColor: COLORS.error }]} /><Text style={styles.routeText} numberOfLines={1}>{item.destination}</Text></View>
      </View>
      <View style={styles.tripFooter}>
        <View style={styles.footerChips}>
          <View style={styles.chip}><Ionicons name="navigate" size={11} color={COLORS.textMuted} /><Text style={styles.chipText}>{item.distance}</Text></View>
          <View style={styles.chip}><Ionicons name="time" size={11} color={COLORS.textMuted} /><Text style={styles.chipText}>{item.duration}</Text></View>
        </View>
        <Text style={[styles.tripPrice, item.status === 'cancelled' && { color: COLORS.textMuted }]}>{item.price}</Text>
      </View>
      {item.rating > 0 && (
        <View style={styles.ratingRow}>
          {[1,2,3,4,5].map(s => <Ionicons key={s} name={s <= item.rating ? 'star' : 'star-outline'} size={13} color={s <= item.rating ? COLORS.star : COLORS.starEmpty} />)}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial</Text>
        <View style={{ width: 44 }} />
      </View>

      <LinearGradient colors={COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.summaryCard}>
        <View style={styles.summaryItem}><Text style={styles.summaryValue}>{totalTrips}</Text><Text style={styles.summaryLabel}>Viajes</Text></View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}><Text style={styles.summaryValue}>$250</Text><Text style={styles.summaryLabel}>Gastado</Text></View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}><Text style={styles.summaryValue}>4.7</Text><Text style={styles.summaryLabel}>Rating</Text></View>
      </LinearGradient>

      <View style={styles.filterRow}>
        {filters.map(f => (
          <TouchableOpacity key={f} style={[styles.filterBtn, activeFilter === f && styles.filterActive]} onPress={() => setActiveFilter(f)} activeOpacity={0.8}>
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList data={filtered} keyExtractor={item => item.id} renderItem={renderTrip} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.xl, paddingTop: 54, paddingBottom: SPACING.md },
  backBtn: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  summaryCard: { flexDirection: 'row', marginHorizontal: SPACING.xl, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, ...SHADOWS.glow },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: FONTS.sizes.xxl, fontWeight: FONTS.weights.heavy, color: '#FFF' },
  summaryLabel: { fontSize: FONTS.sizes.xs, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  summaryDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.25)' },
  filterRow: { flexDirection: 'row', paddingHorizontal: SPACING.xl, marginTop: SPACING.lg, marginBottom: SPACING.md, gap: SPACING.sm },
  filterBtn: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  filterActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium },
  filterTextActive: { color: '#FFF', fontWeight: FONTS.weights.bold },
  list: { paddingHorizontal: SPACING.xl, paddingBottom: SPACING.section, gap: SPACING.md },
  tripCard: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  tripHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  tripDate: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium },
  statusBadge: { paddingHorizontal: SPACING.md, paddingVertical: 3, borderRadius: BORDER_RADIUS.full },
  badgeCompleted: { backgroundColor: COLORS.success + '22' },
  badgeCancelled: { backgroundColor: COLORS.error + '22' },
  statusText: { fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.bold },
  routeSection: { marginBottom: SPACING.md },
  routeRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: SPACING.md },
  routeLine: { width: 2, height: 14, backgroundColor: COLORS.border, marginLeft: 3, marginVertical: 2 },
  routeText: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, flex: 1 },
  tripFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: SPACING.md },
  footerChips: { flexDirection: 'row', gap: SPACING.sm },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: COLORS.surfaceLight, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.full },
  chipText: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
  tripPrice: { color: COLORS.accent, fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.heavy },
  ratingRow: { flexDirection: 'row', gap: 2, marginTop: SPACING.md },
});
