import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

export default function SearchingDriverScreen({ navigation, route }) {
  const price = route?.params?.price || 85;
  const destination = route?.params?.destination || { name: 'Aeropuerto CDMX' };
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const [timer, setTimer] = useState(0);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    const foundTimeout = setTimeout(() => setFound(true), 4000);
    const navTimeout = setTimeout(() => navigation.replace('RideInProgress', { price, destination }), 5500);

    Animated.loop(Animated.timing(rotate, { toValue: 1, duration: 2500, easing: Easing.linear, useNativeDriver: true })).start();
    const mkPulse = (v, delay) => Animated.loop(Animated.sequence([Animated.delay(delay), Animated.timing(v, { toValue: 1, duration: 1800, useNativeDriver: true }), Animated.timing(v, { toValue: 0, duration: 0, useNativeDriver: true })]));
    mkPulse(pulse1, 0).start();
    mkPulse(pulse2, 900).start();

    return () => { clearInterval(interval); clearTimeout(foundTimeout); clearTimeout(navTimeout); };
  }, []);

  const spin = rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const mkStyle = (v) => ({ transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 2.2] }) }], opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] }) });

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F2A5C', '#070B14']} style={styles.glow} />
      <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={22} color={COLORS.textPrimary} />
      </TouchableOpacity>

      <View style={styles.center}>
        <Animated.View style={[styles.pulse, mkStyle(pulse1)]} />
        <Animated.View style={[styles.pulse, mkStyle(pulse2)]} />
        {!found && <Animated.View style={[styles.ring, { transform: [{ rotate: spin }] }]}><View style={styles.ringDot} /></Animated.View>}
        <LinearGradient colors={found ? COLORS.gradientAccent : COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconCircle}>
          <Ionicons name={found ? 'checkmark' : 'car-sport'} size={40} color="#FFF" />
        </LinearGradient>
      </View>

      <Text style={styles.status}>{found ? '¡Conductor encontrado!' : 'Buscando conductor...'}</Text>
      <Text style={styles.subtitle}>{found ? 'Preparando tu viaje' : 'Esto solo tomará unos segundos'}</Text>
      {!found && <View style={styles.timerPill}><Text style={styles.timer}>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</Text></View>}

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}><Ionicons name="location" size={16} color={COLORS.error} /></View>
          <Text style={styles.infoLabel}>Destino</Text>
          <Text style={styles.infoValue} numberOfLines={1}>{destination.name}</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}><Ionicons name="cash" size={16} color={COLORS.accent} /></View>
          <Text style={styles.infoLabel}>Precio</Text>
          <Text style={[styles.infoValue, { color: COLORS.accent }]}>${price}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', paddingHorizontal: SPACING.xxl },
  glow: { position: 'absolute', top: 0, left: 0, right: 0, height: 400, opacity: 0.5 },
  cancelBtn: { position: 'absolute', top: 54, right: SPACING.xl, width: 44, height: 44, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  center: { width: 180, height: 180, justifyContent: 'center', alignItems: 'center', marginTop: 140, marginBottom: SPACING.section },
  pulse: { position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: COLORS.primary },
  ring: { position: 'absolute', width: 150, height: 150, borderRadius: 75, borderWidth: 3, borderColor: 'transparent', borderTopColor: COLORS.primary },
  ringDot: { position: 'absolute', top: -5, left: '50%', marginLeft: -5, width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  iconCircle: { width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center', ...SHADOWS.glow },
  status: { fontSize: FONTS.sizes.xxl, fontWeight: FONTS.weights.heavy, color: COLORS.textPrimary, textAlign: 'center' },
  subtitle: { fontSize: FONTS.sizes.md, color: COLORS.textSecondary, marginTop: SPACING.sm },
  timerPill: { backgroundColor: COLORS.surface, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, marginTop: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  timer: { color: COLORS.textSecondary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold },
  infoCard: { width: '100%', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, marginTop: SPACING.section, borderWidth: 1, borderColor: COLORS.border },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.sm },
  infoIcon: { width: 32, height: 32, borderRadius: BORDER_RADIUS.sm, backgroundColor: COLORS.surfaceLight, justifyContent: 'center', alignItems: 'center' },
  infoLabel: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm, marginLeft: SPACING.md, flex: 1 },
  infoValue: { color: COLORS.textPrimary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, maxWidth: '55%' },
  infoDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.xs },
});
