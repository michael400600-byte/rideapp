import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

const mockRequests = [
  { id: '1', passenger: { name: 'María García', rating: 4.8, trips: 156, avatar: 'MG' }, origin: 'Col. Roma Norte', destination: 'Aeropuerto CDMX', distance: '12.5 km', time: '25 min', payment: 'Efectivo', price: 120, suggestedPrice: 95, type: 'negotiation', timer: 45 },
  { id: '2', passenger: { name: 'Carlos Ruiz', rating: 4.5, trips: 42, avatar: 'CR' }, origin: 'Polanco', destination: 'Santa Fe', distance: '8 km', time: '18 min', payment: 'Tarjeta', price: 75, type: 'fixed', timer: 30 },
  { id: '3', passenger: { name: 'Ana López', rating: 4.9, trips: 312, avatar: 'AL' }, origin: 'Condesa', destination: 'Coyoacán', distance: '6 km', time: '15 min', payment: 'Billetera', price: 90, suggestedPrice: 65, type: 'negotiation', timer: 20 },
];

const RequestCard = ({ item, onAccept }) => (
  <View style={styles.card}>
    <View style={[styles.timerBar, { width: `${(item.timer / 60) * 100}%` }]} />
    <View style={styles.passengerRow}>
      <View style={styles.avatar}><Text style={styles.avatarText}>{item.passenger.avatar}</Text></View>
      <View style={styles.passengerInfo}>
        <Text style={styles.passengerName}>{item.passenger.name}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color={COLORS.star} />
          <Text style={styles.ratingText}>{item.passenger.rating} · {item.passenger.trips} viajes</Text>
        </View>
      </View>
    </View>
    <View style={styles.routeSection}>
      <View style={styles.routeRow}><View style={[styles.dot, { backgroundColor: COLORS.success }]} /><Text style={styles.routeText}>{item.origin}</Text></View>
      <View style={styles.routeLine} />
      <View style={styles.routeRow}><View style={[styles.dot, { backgroundColor: COLORS.error }]} /><Text style={styles.routeText}>{item.destination}</Text></View>
    </View>
    <View style={styles.tripInfo}>
      <Text style={styles.infoChip}>{item.distance}</Text>
      <Text style={styles.infoChip}>{item.time}</Text>
      <Text style={styles.infoChip}>{item.payment}</Text>
    </View>
    <View style={styles.priceSection}>
      {item.type === 'negotiation' ? (
        <View>
          <Text style={styles.offeredLabel}>Oferta: <Text style={styles.priceHighlight}>${item.price}</Text></Text>
          <Text style={styles.suggestedText}>Sugerido: ${item.suggestedPrice}</Text>
        </View>
      ) : (
        <Text style={styles.priceHighlight}>${item.price}</Text>
      )}
    </View>
    <View style={styles.actions}>
      <TouchableOpacity style={styles.rejectBtn}><Text style={styles.rejectText}>Rechazar</Text></TouchableOpacity>
      {item.type === 'negotiation' && <TouchableOpacity style={styles.counterBtn}><Text style={styles.counterText}>Contra-oferta</Text></TouchableOpacity>}
      <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
        <LinearGradient colors={COLORS.gradient} style={styles.acceptGradient}>
          <Text style={styles.acceptText}>Aceptar</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  </View>
);

export default function RideRequestScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Solicitudes</Text>
        <Text style={styles.headerCount}>{mockRequests.length}</Text>
      </View>
      <FlatList
        data={mockRequests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <RequestCard item={item} onAccept={() => navigation.replace('RideInProgress')} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.lg, paddingTop: 50, paddingBottom: SPACING.md },
  headerTitle: { flex: 1, fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary, marginLeft: SPACING.md },
  headerCount: { backgroundColor: COLORS.primary, color: '#FFF', fontSize: FONTS.sizes.sm, paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: 10, overflow: 'hidden' },
  list: { padding: SPACING.lg },
  card: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.lg, overflow: 'hidden', ...SHADOWS.small },
  timerBar: { position: 'absolute', top: 0, left: 0, height: 3, backgroundColor: COLORS.warning, borderRadius: 2 },
  passengerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.surfaceLight, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: COLORS.primary, fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.sm },
  passengerInfo: { marginLeft: SPACING.md },
  passengerName: { color: COLORS.textPrimary, fontWeight: FONTS.weights.semibold, fontSize: FONTS.sizes.md },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  ratingText: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs, marginLeft: 4 },
  routeSection: { marginBottom: SPACING.md },
  routeRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: SPACING.sm },
  routeLine: { width: 1, height: 16, backgroundColor: COLORS.border, marginLeft: 3, marginVertical: 2 },
  routeText: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm },
  tripInfo: { flexDirection: 'row', marginBottom: SPACING.md },
  infoChip: { backgroundColor: COLORS.surfaceLight, color: COLORS.textMuted, fontSize: FONTS.sizes.xs, paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: 8, marginRight: SPACING.xs },
  priceSection: { marginBottom: SPACING.md },
  offeredLabel: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm },
  priceHighlight: { color: COLORS.success, fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.lg },
  suggestedText: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
  actions: { flexDirection: 'row', gap: SPACING.sm },
  rejectBtn: { flex: 1, paddingVertical: SPACING.sm, alignItems: 'center', borderRadius: BORDER_RADIUS.sm, borderWidth: 1, borderColor: COLORS.error },
  rejectText: { color: COLORS.error, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium },
  counterBtn: { flex: 1, paddingVertical: SPACING.sm, alignItems: 'center', borderRadius: BORDER_RADIUS.sm, borderWidth: 1, borderColor: COLORS.warning },
  counterText: { color: COLORS.warning, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium },
  acceptBtn: { flex: 1, borderRadius: BORDER_RADIUS.sm, overflow: 'hidden' },
  acceptGradient: { paddingVertical: SPACING.sm, alignItems: 'center' },
  acceptText: { color: '#FFF', fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold },
});
