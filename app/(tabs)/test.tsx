import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Test() {
  const {
    isBiometricSupported,

    handleBiometricAuth,
  } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Radial Gradient Cards</Text>

      <View style={styles.cardContainer} className="bg-emerald-600">
        {/* Radial Warm Card - Alternative Approach */}
        <View style={[styles.card, { height: 30, width: 60 }]}>
          {/* Base linear gradient */}
          <LinearGradient
            colors={['#facc15', '#f97316', '#ef4444']} // yellow-400, orange-500, red-500
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { opacity: 0.9 }]}
          />

          {/* Simulated radial effect with multiple views */}
          <View style={[StyleSheet.absoluteFill]}>
            <View
              style={[
                StyleSheet.absoluteFill,
                styles.radialSimulation,
                { backgroundColor: 'rgba(255,255,255,0.2)' },
              ]}
            />
          </View>

          {/* Overlay for depth */}
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.15)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[{ opacity: 0.7 }]}
          />

          {/* Content */}
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Radial Sunburst</Text>
            <Text style={styles.cardDescription}>
              A warm radial gradient with a sunburst effect.
            </Text>
          </View>
        </View>

        {/* Radial Cool Card - Alternative Approach */}
        <View style={[styles.card, { height: 30, width: 60 }]}>
          {/* Base linear gradient */}
          <LinearGradient
            colors={['#06b6d4', '#3b82f6', '#6366f1']} // cyan-500, blue-500, indigo-500
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { opacity: 0.9 }]}
          />

          {/* Simulated radial effect with multiple views */}
          <View style={[StyleSheet.absoluteFill]}>
            <View
              style={[
                StyleSheet.absoluteFill,
                styles.radialSimulation,
                { backgroundColor: 'rgba(255,255,255,0.15)' },
              ]}
            />
          </View>

          {/* Overlay for depth */}
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[StyleSheet.absoluteFill, { opacity: 0.7 }]}
          />

          {/* Content */}
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Radial Ocean</Text>
            <Text style={styles.cardDescription}>
              A cool blue radial gradient with depth effect.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 24,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  cardContent: {
    padding: 24,
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  cardDescription: {
    color: 'white',
    opacity: 0.9,
  },
  radialSimulation: {
    borderRadius: 500, // Large value to ensure it's circular
    width: '200%',
    height: '200%',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    opacity: 1,
  },
});
