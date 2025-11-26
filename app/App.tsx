import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Category } from './types';
import { ConverterForm } from './components/ConverterForm';
import TabSelector from './components/TabSelector';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.LENGTH);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 16,
      }}
      className="bg-gradient-to-br from-slate-50 to-slate-100"
    >
      {/* Header */}
      <View className="items-center mb-8">
        <Text className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Quick
          <Text className="text-indigo-600">Convert</Text>
        </Text>

        <Text className="mt-2 text-slate-500 text-base">
          Simple, fast unit conversions.
        </Text>
      </View>

      {/* Card */}
      <View className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-white/50 p-6">
        <TabSelector activeCategory={activeCategory} onSelect={setActiveCategory} />
        <ConverterForm category={activeCategory} />
      </View>
    </ScrollView>
  );
};

export default App;
