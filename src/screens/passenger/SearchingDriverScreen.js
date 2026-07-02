import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

export default function SearchingDriverScreen({ navigation }) {
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      navigation.replace('RideInProgress');
    }, 5000);

    Animated.loop(Animated.timing(rotate, { toValue: 1, duration: 3000, easing: Easing.linear, useNativeDriver: true })).start();
    Animated.loop(Animated.sequence([
      Animated.timing(pulse1, { toValue: 1, duration: 1500, useNativeDriver: true }),
      Animated.timing(pulse1, { toValue: 0, duration: 1500, useNativeDriver: true }),
    ])).start();
    Animated.loop(Animated.sequence([
      Animated.delay(500),
      Animated.timing(pulse2, { toValue: 1, duration: 1500, useNativeDriver: true }),
      Animated.timing(pulse2, { toValue: 0, duration: 1500, useNativeDriver: true }),
    ])).start();

    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  const spin = rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const scale1 = pulse1.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6] });
  const opacity1 = pulse1.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] });
  const scale2 = pulse2.interpolate({ inputRange: [0, 1], outputRange: [1, 1.8] });
  const opacity2 = pulse2.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0] });

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Animated.View style={[styles.pulseCircle, { transform: [{ scale: scale1 }], opacity: opacity1 }]} />
        <Animated.View style={[styles.pulseCircle, styles.pulse2, { transform: [{ scale: scale2 }], opacity: opacity2 }]} />
        <Animated.View style={[styles.ring, { transform: [{ rotate: spin }] }]}>
          <View style={styles.ringDot} />
        </Animated.View>
        <View style={styles.iconCircle}>
          <Ionicons name="car-sport" size={36} color={COLORS.primary} />
        </View>
      </View>
      <Text style={styles.status}>Buscando conductor...</Text>
      <Text style={styles.timer}>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</Text>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Destino</Text>
          <Text style={styles.infoValue}>Aeropuerto CDMX</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Precio</Text>
          <Text style={styles.infoValue}>$85 MXN</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tipo</Text>
          <Text style={styles.infoValue}>Económico</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', padding: SPACING.xxl },
  center: { width: 160, height: 160, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.xxxl },
  pulseCircle: { position: 'absolute', width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: COLORS.primary },
  pulse2: { width: 140, height: 140, borderRadius: 70 },
  ring: { position: 'absolute', width: 130, height: 130, borderRadius: 65, borderWidth: 2, borderColor: 'transparent', borderTopColor: COLORS.primary },
  ringDot: { position: 'absolute', top: -4, left: '50%', marginLeft: -4, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', ...SHADOWS.medium },
  status: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary, marginBottom: SPACING.sm },
  timer: { fontSize: FONTS.sizes.md, color: COLORS.textMuted, marginBottom: SPACING.xxxl },
  infoCard: { width: '100%', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, ...SHADOWS.small },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SPACING.sm },
  infoLabel: { fontSize: FONTS.sizes.md, color: COLORS.textMuted },
  infoValue: { fontSize: FONTS.sizes.md, color: COLORS.textPrimary, fontWeight: FONTS.weights.medium },
});
