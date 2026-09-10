import { StyleSheet, Text, View } from 'react-native';
import type { RootScreenProps } from '../../navigation/AppNavigator';

const DemoScreen = ({ navigation }: RootScreenProps<'DemoScreen'>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users query demo</Text>
      <Text style={styles.copy}>This screen is ready for the cached users query.</Text>
      <Text style={styles.link} onPress={() => navigation.navigate('HomeScreen')}>
        Return to home
      </Text>
    </View>
  );
};

export default DemoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: '#16213e' },
  copy: { marginTop: 12, color: '#68738b', fontSize: 16 },
  link: { marginTop: 24, color: '#e85d3f', fontWeight: '700' },
});