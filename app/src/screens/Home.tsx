import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ConverterForm } from '../components/ConverterForm';
import TabSelector from '../components/TabSelector';
import { Category } from '../types';

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.LENGTH);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={styles.scrollBackground}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          Quick
          <Text style={styles.titleHighlight}>Convert</Text>
        </Text>

        <Text style={styles.subtitle}>
          Simple, fast unit conversions.
        </Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <TabSelector activeCategory={activeCategory} onSelect={setActiveCategory} />
        <ConverterForm category={activeCategory} />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  scrollBackground: {
    backgroundColor: '#f7f7f7',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 40,
  },
  titleHighlight: {
    color: '#4f46e5',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#64748b',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
});
