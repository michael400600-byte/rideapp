import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

const { width } = Dimensions.get('window');

const features = [
  { icon: 'flash', color: COLORS.warning, title: 'Rápido y confiable', text: 'Conductores cerca de ti al instante' },
  { icon: 'pricetag', color: COLORS.accent, title: 'Tú pones el precio', text: 'Negocia y ahorra en cada viaje' },
  { icon: 'shield-checkmark', color: COLORS.success, title: '100% Seguro', text: 'Conductores verificados y rastreo en vivo' },
];

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#0F2A5C', '#070B14']} style={styles.topGlow} />

      <View style={styles.logoSection}>
        <LinearGradient colors={COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.logoCircle}>
          <Ionicons name="car-sport" size={52} color="#FFF" />
        </LinearGradient>
        <Text style={styles.appName}>RideApp</Text>
        <Text style={styles.tagline}>Tu viaje, tu precio</Text>
      </View>

      <View style={styles.features}>
        {features.map((f, i) => (
          <View key={i} style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: f.color + '22' }]}>
              <Ionicons name={f.icon} size={22} color={f.color} />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={() => navigation.navigate('Register')}>
          <LinearGradient colors={COLORS.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.btnGradient}>
            <Text style={styles.btnText}>Crear cuenta</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.7} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.secondaryBtnText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: SPACING.xxl },
  topGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 400, opacity: 0.6 },
  logoSection: { alignItems: 'center', marginTop: 110 },
  logoCircle: { width: 104, height: 104, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.xl, ...SHADOWS.glow },
  appName: { fontSize: FONTS.sizes.hero, fontWeight: FONTS.weights.heavy, color: COLORS.textPrimary, letterSpacing: 0.5 },
  tagline: { fontSize: FONTS.sizes.lg, color: COLORS.textSecondary, marginTop: SPACING.sm },
  features: { flex: 1, justifyContent: 'center', gap: SPACING.lg },
  featureItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  featureIcon: { width: 48, height: 48, borderRadius: BORDER_RADIUS.md, justifyContent: 'center', alignItems: 'center' },
  featureTextWrap: { flex: 1, marginLeft: SPACING.lg },
  featureTitle: { fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  featureText: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, marginTop: 2 },
  actions: { paddingBottom: 40, gap: SPACING.md },
  primaryBtn: { borderRadius: BORDER_RADIUS.lg, ...SHADOWS.glow },
  btnGradient: { paddingVertical: SPACING.lg + 2, alignItems: 'center', borderRadius: BORDER_RADIUS.lg },
  btnText: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold, color: '#FFF', letterSpacing: 0.3 },
  secondaryBtn: { paddingVertical: SPACING.lg, alignItems: 'center' },
  secondaryBtnText: { fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.semibold, color: COLORS.textSecondary },
});
