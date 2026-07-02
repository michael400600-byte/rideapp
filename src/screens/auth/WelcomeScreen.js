import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../../utils/theme';

const features = [
  { icon: 'location', text: 'Encuentra conductores cerca de ti' },
  { icon: 'pricetag', text: 'Negocia tu precio ideal' },
  { icon: 'shield-checkmark', text: 'Viajes seguros y verificados' },
];

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoSection}>
        <LinearGradient colors={COLORS.gradient} style={styles.logoCircle}>
          <Ionicons name="car-sport" size={48} color="#FFF" />
        </LinearGradient>
        <Text style={styles.appName}>RideApp</Text>
        <Text style={styles.tagline}>Tu viaje, tu precio</Text>
      </View>
      <View style={styles.features}>
        {features.map((f, i) => (
          <View key={i} style={styles.featureItem}>
            <Ionicons name={f.icon} size={24} color={COLORS.primary} />
            <Text style={styles.featureText}>{f.text}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
        <LinearGradient colors={COLORS.gradient} style={styles.btnGradient}>
          <Text style={styles.btnText}>Comenzar</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', padding: SPACING.xxl },
  logoSection: { alignItems: 'center', marginBottom: SPACING.section },
  logoCircle: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.lg },
  appName: { fontSize: FONTS.sizes.hero, fontWeight: FONTS.weights.heavy, color: COLORS.textPrimary },
  tagline: { fontSize: FONTS.sizes.lg, color: COLORS.textSecondary, marginTop: SPACING.xs },
  features: { marginBottom: SPACING.section },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.lg },
  featureText: { fontSize: FONTS.sizes.md, color: COLORS.textSecondary, marginLeft: SPACING.md },
  btn: { borderRadius: BORDER_RADIUS.lg, overflow: 'hidden' },
  btnGradient: { paddingVertical: SPACING.lg, alignItems: 'center', borderRadius: BORDER_RADIUS.lg },
  btnText: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold, color: '#FFF' },
});
