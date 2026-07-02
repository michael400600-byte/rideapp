import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';


const mockTrips = [
  { id: '1', date: '15 Nov, 14:30', status: 'completed', origin: 'Col. Roma Norte', destination: 'Aeropuerto CDMX', driver: 'Carlos M.', distance: '12.5 km', duration: '25 min', price: '$120', rating: 5 },
  { id: '2', date: '14 Nov, 09:00', status: 'completed', origin: 'Polanco', destination: 'Santa Fe', driver: 'Ana R.', distance: '8 km', duration: '18 min', price: '$75', rating: 4 },
  { id: '3', date: '13 Nov, 20:15', status: 'cancelled', origin: 'Condesa', destination: 'Coyoacán', driver: 'Pedro L.', distance: '6 km', duration: '-', price: '$0', rating: 0 },
  { id: '4', date: '12 Nov, 07:45', status: 'completed', origin: 'Del Valle', destination: 'Reforma', driver: 'María S.', distance: '5 km', duration: '12 min', price: '$55', rating: 5 },
];

const filters = ['Todos', 'Completados', 'Cancelados'];

export default function HistoryScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const filtered = mockTrips.filter(t => {
    if (activeFilter === 'Completados') return t.status === 'completed';
    if (activeFilter === 'Cancelados') return t.status === 'cancelled';
    return true;
  });
  const totalTrips = mockTrips.filter(t => t.status === 'completed').length;
  const totalSpent = '$250';


  const renderTrip = ({ item }) => (
    <View style={styles.tripCard}>
      <View style={styles.tripHeader}>
        <Text style={styles.tripDate}>{item.date}</Text>
        <View style={[styles.statusBadge, item.status === 'completed' ? styles.badgeCompleted : styles.badgeCancelled]}>
          <Text style={[styles.statusText, item.status === 'completed' ? styles.statusCompleted : styles.statusCancelled]}>
            {item.status === 'completed' ? 'Completado' : 'Cancelado'}
          </Text>
        </View>
      </View>
      <View style={styles.routeSection}>
        <View style={styles.routeRow}>
          <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
          <Text style={styles.routeText}>{item.origin}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeRow}>
          <View style={[styles.dot, { backgroundColor: COLORS.error }]} />
          <Text style={styles.routeText}>{item.destination}</Text>
        </View>
      </View>
      <View style={styles.tripFooter}>
        <Text style={styles.driverName}>{item.driver}</Text>
        <Text style={styles.tripDetail}>{item.distance}</Text>
        <Text style={styles.tripDetail}>{item.duration}</Text>
        <Text style={styles.tripPrice}>{item.price}</Text>
      </View>
      {item.rating > 0 && (
        <View style={styles.ratingRow}>
          {[1,2,3,4,5].map(s => (
            <Ionicons key={s} name={s <= item.rating ? 'star' : 'star-outline'} size={14} color={s <= item.rating ? COLORS.star : COLORS.starEmpty} />
          ))}
        </View>
      )}
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{totalTrips}</Text>
          <Text style={styles.summaryLabel}>Viajes totales</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{totalSpent}</Text>
          <Text style={styles.summaryLabel}>Total gastado</Text>
        </View>
      </View>
      <View style={styles.filterRow}>
        {filters.map(f => (
          <TouchableOpacity key={f} style={[styles.filterBtn, activeFilter === f && styles.filterActive]} onPress={() => setActiveFilter(f)}>
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList data={filtered} keyExtractor={item => item.id} renderItem={renderTrip} contentContainerStyle={styles.list} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingTop: 50, paddingBottom: SPACING.md },
  headerTitle: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  summaryCard: { flexDirection: 'row', backgroundColor: COLORS.surface, margin: SPACING.lg, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, ...SHADOWS.small },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: FONTS.sizes.xxl, fontWeight: FONTS.weights.bold, color: COLORS.primary },
  summaryLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, marginTop: SPACING.xs },
  summaryDivider: { width: 1, backgroundColor: COLORS.border },
  filterRow: { flexDirection: 'row', paddingHorizontal: SPACING.lg, marginBottom: SPACING.md },
  filterBtn: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, backgroundColor: COLORS.surface, marginRight: SPACING.sm },
  filterActive: { backgroundColor: COLORS.primary },
  filterText: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm },
  filterTextActive: { color: '#FFF', fontWeight: FONTS.weights.bold },
  list: { paddingHorizontal: SPACING.lg },
  tripCard: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md, ...SHADOWS.small },
  tripHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  tripDate: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm },
  statusBadge: { paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: 8 },
  badgeCompleted: { backgroundColor: 'rgba(0,214,143,0.15)' },
  badgeCancelled: { backgroundColor: 'rgba(255,61,113,0.15)' },
  statusText: { fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.medium },
  statusCompleted: { color: COLORS.success },
  statusCancelled: { color: COLORS.error },
  routeSection: { marginBottom: SPACING.md },
  routeRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: SPACING.sm },
  routeLine: { width: 1, height: 14, backgroundColor: COLORS.border, marginLeft: 3, marginVertical: 2 },
  routeText: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm },
  tripFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  driverName: { color: COLORS.textPrimary, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium },
  tripDetail: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
  tripPrice: { color: COLORS.primary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold },
  ratingRow: { flexDirection: 'row', marginTop: SPACING.sm },
});
