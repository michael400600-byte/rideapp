import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

const mockPlaces = [
  { id: '1', name: 'Aeropuerto Internacional CDMX', address: 'Av. Capitán Carlos León s/n', dist: '18 km' },
  { id: '2', name: 'Zócalo Ciudad de México', address: 'Plaza de la Constitución', dist: '5 km' },
  { id: '3', name: 'Coyoacán Centro', address: 'Jardín Centenario', dist: '9 km' },
  { id: '4', name: 'Polanco', address: 'Av. Presidente Masaryk', dist: '7 km' },
  { id: '5', name: 'Santa Fe', address: 'Centro Comercial Santa Fe', dist: '15 km' },
  { id: '6', name: 'Condesa', address: 'Parque México', dist: '4 km' },
];

export default function SearchDestinationScreen({ navigation }) {
  const [origin, setOrigin] = useState('Mi ubicación actual');
  const [destination, setDestination] = useState('');
  const [focused, setFocused] = useState('dest');
  const filtered = destination ? mockPlaces.filter(p => p.name.toLowerCase().includes(destination.toLowerCase())) : mockPlaces;

  const selectPlace = (place) => navigation.navigate('RequestRide', { destination: place });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buscar destino</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.fields}>
        <View style={styles.timeline}>
          <View style={[styles.tlDot, { backgroundColor: COLORS.accent }]} />
          <View style={styles.tlLine} />
          <View style={[styles.tlDot, { backgroundColor: COLORS.error }]} />
        </View>
        <View style={styles.fieldsInner}>
          <View style={[styles.fieldRow, focused === 'origin' && styles.fieldFocused]}>
            <TextInput style={styles.fieldInput} value={origin} onChangeText={setOrigin} placeholderTextColor={COLORS.textMuted} onFocus={() => setFocused('origin')} />
          </View>
          <View style={styles.fieldGap} />
          <View style={[styles.fieldRow, focused === 'dest' && styles.fieldFocused]}>
            <TextInput style={styles.fieldInput} placeholder="¿A dónde vas?" placeholderTextColor={COLORS.textMuted} value={destination} onChangeText={setDestination} autoFocus onFocus={() => setFocused('dest')} />
            {destination.length > 0 && (
              <TouchableOpacity onPress={() => setDestination('')}><Ionicons name="close-circle" size={18} color={COLORS.textMuted} /></TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.mapBtn} activeOpacity={0.7}>
        <Ionicons name="map" size={20} color={COLORS.primary} />
        <Text style={styles.mapBtnText}>Elegir en el mapa</Text>
      </TouchableOpacity>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.placeItem} onPress={() => selectPlace(item)} activeOpacity={0.7}>
            <View style={styles.placeIcon}><Ionicons name="location" size={20} color={COLORS.primary} /></View>
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{item.name}</Text>
              <Text style={styles.placeAddr}>{item.address}</Text>
            </View>
            <Text style={styles.placeDist}>{item.dist}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.xl, paddingTop: 54, paddingBottom: SPACING.md },
  backBtn: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  fields: { flexDirection: 'row', backgroundColor: COLORS.surface, marginHorizontal: SPACING.xl, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  timeline: { alignItems: 'center', paddingTop: 16, paddingBottom: 16, marginRight: SPACING.md },
  tlDot: { width: 11, height: 11, borderRadius: 6 },
  tlLine: { width: 2, flex: 1, backgroundColor: COLORS.border, marginVertical: 4 },
  fieldsInner: { flex: 1 },
  fieldRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.sm, paddingHorizontal: SPACING.md, height: 46, borderWidth: 1.5, borderColor: 'transparent' },
  fieldFocused: { borderColor: COLORS.primary },
  fieldGap: { height: SPACING.sm },
  fieldInput: { flex: 1, color: COLORS.textPrimary, fontSize: FONTS.sizes.md },
  mapBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, marginHorizontal: SPACING.xl, marginTop: SPACING.lg, paddingVertical: SPACING.md, backgroundColor: COLORS.primary + '18', borderRadius: BORDER_RADIUS.md },
  mapBtnText: { color: COLORS.primary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.semibold },
  list: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg },
  placeItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.md },
  placeIcon: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center' },
  placeInfo: { flex: 1, marginLeft: SPACING.md },
  placeName: { fontSize: FONTS.sizes.md, color: COLORS.textPrimary, fontWeight: FONTS.weights.semibold },
  placeAddr: { fontSize: FONTS.sizes.sm, color: COLORS.textMuted, marginTop: 2 },
  placeDist: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, fontWeight: FONTS.weights.medium },
});
