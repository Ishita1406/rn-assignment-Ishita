import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Category } from '../types';
import { Ruler, Thermometer } from 'lucide-react-native';

interface TabSelectorProps {
  activeCategory: Category;
  onSelect: (category: Category) => void;
}

export const TabSelector: React.FC<TabSelectorProps> = ({ activeCategory, onSelect }) => {
  return (
    <View className="flex-row p-1 space-x-1 bg-slate-200/50 rounded-xl mb-8">
      <TouchableOpacity
        onPress={() => onSelect(Category.LENGTH)}
        className={`flex-1 flex-row items-center justify-center space-x-2 py-2.5 rounded-lg ${
          activeCategory === Category.LENGTH ? 'bg-white shadow-sm' : 'bg-slate-200'
        }`}
      >
        <Ruler
          size={16}
          color={activeCategory === Category.LENGTH ? '#4f46e5' : '#64748b'}
        />
        <Text
          className={`text-sm font-medium ${
            activeCategory === Category.LENGTH ? 'text-indigo-600' : 'text-slate-500'
          }`}
        >
          Length
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onSelect(Category.TEMPERATURE)}
        className={`flex-1 flex-row items-center justify-center space-x-2 py-2.5 rounded-lg ${
          activeCategory === Category.TEMPERATURE ? 'bg-white shadow-sm' : 'bg-slate-200'
        }`}
      >
        <Thermometer
          size={16}
          color={activeCategory === Category.TEMPERATURE ? '#f97316' : '#64748b'}
        />
        <Text
          className={`text-sm font-medium ${
            activeCategory === Category.TEMPERATURE ? 'text-orange-600' : 'text-slate-500'
          }`}
        >
          Temperature
        </Text>
      </TouchableOpacity>
    </View>
  );
};
