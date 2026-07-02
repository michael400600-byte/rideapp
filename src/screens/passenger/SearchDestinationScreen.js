import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../../utils/theme';

const mockPlaces = [
  { id: '1', name: 'Aeropuerto CDMX', address: 'Av. Capitán Carlos León s/n', lat: 19.4361, lng: -99.0719 },
  { id: '2', name: 'Zócalo', address: 'Plaza de la Constitución', lat: 19.4326, lng: -99.1332 },
  { id: '3', name: 'Coyoacán Centro', address: 'Jardín Centenario', lat: 19.3500, lng: -99.1620 },
  { id: '4', name: 'Polanco', address: 'Av. Presidente Masaryk', lat: 19.4320, lng: -99.1937 },
  { id: '5', name: 'Santa Fe', address: 'Centro Comercial Santa Fe', lat: 19.3590, lng: -99.2760 },
  { id: '6', name: 'Condesa', address: 'Parque México', lat: 19.4115, lng: -99.1735 },
];

export default function SearchDestinationScreen({ navigation }) {
  const [origin, setOrigin] = useState('Mi ubicación actual');
  const [destination, setDestination] = useState('');
  const filtered = mockPlaces.filter(p => p.name.toLowerCase().includes(destination.toLowerCase()));

  const selectPlace = (place) => {
    navigation.navigate('RequestRide', { destination: place });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buscar destino</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.fields}>
        <View style={styles.fieldRow}>
          <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
          <TextInput style={styles.fieldInput} value={origin} onChangeText={setOrigin} placeholderTextColor={COLORS.textMuted} />
        </View>
        <View style={styles.divider} />
        <View style={styles.fieldRow}>
          <View style={[styles.dot, { backgroundColor: COLORS.error }]} />
          <TextInput style={styles.fieldInput} placeholder="¿A dónde vas?" placeholderTextColor={COLORS.textMuted} value={destination} onChangeText={setDestination} autoFocus />
        </View>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.placeItem} onPress={() => selectPlace(item)}>
            <Ionicons name="location-outline" size={20} color={COLORS.primary} />
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{item.name}</Text>
              <Text style={styles.placeAddr}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingTop: 50, paddingBottom: SPACING.md },
  headerTitle: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  fields: { backgroundColor: COLORS.surface, margin: SPACING.lg, borderRadius: BORDER_RADIUS.md, padding: SPACING.md },
  fieldRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.sm },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: SPACING.md },
  fieldInput: { flex: 1, color: COLORS.textPrimary, fontSize: FONTS.sizes.md },
  divider: { height: 1, backgroundColor: COLORS.border, marginLeft: 26 },
  placeItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  placeInfo: { marginLeft: SPACING.md },
  placeName: { fontSize: FONTS.sizes.md, color: COLORS.textPrimary, fontWeight: FONTS.weights.medium },
  placeAddr: { fontSize: FONTS.sizes.sm, color: COLORS.textMuted },
});
