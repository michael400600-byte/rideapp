import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

const mockRequests = [
  { id: '1', passenger: { name: 'María García', rating: 4.8, trips: 156, avatar: 'MG' }, origin: 'Col. Roma Norte', destination: 'Aeropuerto CDMX', distance: '12.5 km', time: '25 min', payment: 'Efectivo', price: 120, suggestedPrice: 95, type: 'negotiation', timer: 75 },
  { id: '2', passenger: { name: 'Carlos Ruiz', rating: 4.5, trips: 42, avatar: 'CR' }, origin: 'Polanco', destination: 'Santa Fe', distance: '8 km', time: '18 min', payment: 'Tarjeta', price: 75, type: 'fixed', timer: 55 },
  { id: '3', passenger: { name: 'Ana López', rating: 4.9, trips: 312, avatar: 'AL' }, origin: 'Condesa', destination: 'Coyoacán', distance: '6 km', time: '15 min', payment: 'Billetera', price: 90, suggestedPrice: 65, type: 'negotiation', timer: 40 },
];

const RequestCard = ({ item, onAccept }) => {
  const good = item.type !== 'negotiation' || item.price >= item.suggestedPrice;
  return (
    <View style={styles.card}>
      <View style={styles.timerTrack}><View style={[styles.timerBar, { width: `${(item.timer / 90) * 100}%` }]} /></View>
      <View style={styles.cardInner}>
        <View style={styles.passengerRow}>
          <LinearGradient colors={COLORS.gradientPremium} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.avatar}>
            <Text style={styles.avatarText}>{item.passenger.avatar}</Text>
          </LinearGradient>
          <View style={styles.passengerInfo}>
            <Text style={styles.passengerName}>{item.passenger.name}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color={COLORS.star} />
              <Text style={styles.ratingText}>{item.passenger.rating}</Text>
              <Text style={styles.tripsText}>· {item.passenger.trips} viajes</Text>
            </View>
          </View>
          <View style={styles.priceCol}>
            {item.type === 'negotiation' && <Text style={styles.offerBadge}>OFERTA</Text>}
            <Text style={[styles.price, { color: good ? COLORS.accent : COLORS.warning }]}>${item.price}</Text>
            {item.type === 'negotiation' && <Text style={styles.suggested}>Sug. ${item.suggestedPrice}</Text>}
          </View>
        </View>

        <View style={styles.routeSection}>
          <View style={styles.routeRow}><View style={[styles.dot, { backgroundColor: COLORS.accent }]} /><Text style={styles.routeText} numberOfLines={1}>{item.origin}</Text></View>
          <View style={styles.routeLine} />
          <View style={styles.routeRow}><View style={[styles.dot, { backgroundColor: COLORS.error }]} /><Text style={styles.routeText} numberOfLines={1}>{item.destination}</Text></View>
        </View>

        <View style={styles.tripInfo}>
          <View style={styles.chip}><Ionicons name="navigate" size={12} color={COLORS.textSecondary} /><Text style={styles.chipText}>{item.distance}</Text></View>
          <View style={styles.chip}><Ionicons name="time" size={12} color={COLORS.textSecondary} /><Text style={styles.chipText}>{item.time}</Text></View>
          <View style={styles.chip}><Ionicons name="wallet" size={12} color={COLORS.textSecondary} /><Text style={styles.chipText}>{item.payment}</Text></View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.rejectBtn} activeOpacity={0.7}><Ionicons name="close" size={20} color={COLORS.error} /></TouchableOpacity>
          {item.type === 'negotiation' && (
            <TouchableOpacity style={styles.counterBtn} activeOpacity={0.7}><Ionicons name="swap-horizontal" size={16} color={COLORS.warning} /><Text style={styles.counterText}>Contra</Text></TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.acceptBtn, SHADOWS.glow]} onPress={onAccept} activeOpacity={0.85}>
            <LinearGradient colors={COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.acceptGradient}>
              <Ionicons name="checkmark" size={18} color="#FFF" />
              <Text style={styles.acceptText}>Aceptar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function RideRequestScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Solicitudes</Text>
        <View style={styles.headerCount}><Text style={styles.headerCountText}>{mockRequests.length}</Text></View>
      </View>
      <FlatList
        data={mockRequests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <RequestCard item={item} onAccept={() => navigation.replace('RideInProgress', { isDriver: true })} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.xl, paddingTop: 54, paddingBottom: SPACING.md },
  backBtn: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { flex: 1, fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary, marginLeft: SPACING.md },
  headerCount: { backgroundColor: COLORS.primary, width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  headerCountText: { color: '#FFF', fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold },
  list: { padding: SPACING.xl, gap: SPACING.lg },
  card: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border, ...SHADOWS.medium },
  timerTrack: { height: 4, backgroundColor: COLORS.surfaceLight },
  timerBar: { height: 4, backgroundColor: COLORS.warning },
  cardInner: { padding: SPACING.lg },
  passengerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.lg },
  avatar: { width: 46, height: 46, borderRadius: 23, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.md },
  passengerInfo: { flex: 1, marginLeft: SPACING.md },
  passengerName: { color: COLORS.textPrimary, fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.md },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  ratingText: { color: COLORS.star, fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.semibold },
  tripsText: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
  priceCol: { alignItems: 'flex-end' },
  offerBadge: { color: COLORS.warning, fontSize: 9, fontWeight: FONTS.weights.bold, letterSpacing: 0.5 },
  price: { fontSize: FONTS.sizes.xxl, fontWeight: FONTS.weights.heavy },
  suggested: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
  routeSection: { marginBottom: SPACING.md },
  routeRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 9, height: 9, borderRadius: 5, marginRight: SPACING.md },
  routeLine: { width: 2, height: 16, backgroundColor: COLORS.border, marginLeft: 3, marginVertical: 2 },
  routeText: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, flex: 1 },
  tripInfo: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.lg },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.surfaceLight, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.full },
  chipText: { color: COLORS.textSecondary, fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.medium },
  actions: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'center' },
  rejectBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', borderRadius: BORDER_RADIUS.md, borderWidth: 1.5, borderColor: COLORS.error },
  counterBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, height: 48, paddingHorizontal: SPACING.md, borderRadius: BORDER_RADIUS.md, borderWidth: 1.5, borderColor: COLORS.warning },
  counterText: { color: COLORS.warning, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.semibold },
  acceptBtn: { flex: 1, borderRadius: BORDER_RADIUS.md, overflow: 'hidden' },
  acceptGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, height: 48 },
  acceptText: { color: '#FFF', fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold },
});
