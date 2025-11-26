import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Category } from '../types';
import { Ruler, Thermometer } from 'lucide-react-native';

interface TabSelectorProps {
  activeCategory: Category;
  onSelect: (category: Category) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeCategory, onSelect }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onSelect(Category.LENGTH)}
        style={[
          styles.tab,
          activeCategory === Category.LENGTH
            ? styles.activeTab
            : styles.inactiveTab,
        ]}
      >
        <Ruler
          size={16}
          color={activeCategory === Category.LENGTH ? '#4f46e5' : '#64748b'}
        />
        <Text
          style={[
            styles.tabText,
            { color: activeCategory === Category.LENGTH ? '#4f46e5' : '#64748b' },
          ]}
        >
          Length
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onSelect(Category.TEMPERATURE)}
        style={[
          styles.tab,
          activeCategory === Category.TEMPERATURE
            ? styles.activeTab
            : styles.inactiveTab,
        ]}
      >
        <Thermometer
          size={16}
          color={activeCategory === Category.TEMPERATURE ? '#f97316' : '#64748b'}
        />
        <Text
          style={[
            styles.tabText,
            { color: activeCategory === Category.TEMPERATURE ? '#f97316' : '#64748b' },
          ]}
        >
          Temperature
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(148,163,184,0.2)', // bg-slate-200/50
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 2,
  },
  activeTab: {
    backgroundColor: '#ffffff', // bg-white
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inactiveTab: {
    backgroundColor: '#e2e8f0', // bg-slate-200
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default TabSelector;
