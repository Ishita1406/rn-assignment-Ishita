// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// import { ArrowRightLeft } from 'lucide-react-native';
// import { Category, Unit } from '../types';
// import { calculateConversion } from '../utils/conversions';

// interface ConverterFormProps {
//   category: Category;
// }

// export const ConverterForm: React.FC<ConverterFormProps> = ({ category }) => {
//   const [inputValue, setInputValue] = useState('');
//   const [result, setResult] = useState('');
//   const [isFlipped, setIsFlipped] = useState(false);

//   const getUnits = useCallback(() => {
//     if (category === Category.LENGTH) {
//       return isFlipped
//         ? { from: Unit.FEET, to: Unit.METER, fromLabel: 'Feet', toLabel: 'Meters' }
//         : { from: Unit.METER, to: Unit.FEET, fromLabel: 'Meters', toLabel: 'Feet' };
//     } else {
//       return isFlipped
//         ? { from: Unit.FAHRENHEIT, to: Unit.CELSIUS, fromLabel: 'Fahrenheit', toLabel: 'Celsius' }
//         : { from: Unit.CELSIUS, to: Unit.FAHRENHEIT, fromLabel: 'Celsius', toLabel: 'Fahrenheit' };
//     }
//   }, [category, isFlipped]);

//   const { from, to, fromLabel, toLabel } = getUnits();

//   useEffect(() => {
//     const converted = calculateConversion(inputValue, from);
//     setResult(converted);
//   }, [inputValue, from, category]);

//   useEffect(() => {
//     setInputValue('');
//     setResult('');
//     setIsFlipped(false);
//   }, [category]);

//   const handleInputChange = (text: string) => {
//     if (text === '' || /^-?\d*\.?\d*$/.test(text)) {
//       setInputValue(text);
//     }
//   };

//   const handleFlip = () => {
//     setIsFlipped(!isFlipped);
//   };

//   return (
//     <View className="space-y-6">
//       {/* INPUT */}
//       <View>
//         <Text className="text-sm font-medium text-slate-500 mb-2">{fromLabel} ({from})</Text>

//         <TextInput
//           value={inputValue}
//           onChangeText={handleInputChange}
//           placeholder="0"
//           keyboardType="numeric"
//           className="w-full px-4 py-4 text-3xl font-semibold text-slate-900 bg-white border border-slate-200 rounded-2xl"
//         />
//       </View>

//       {/* SWAP BUTTON */}
//       <View className="flex items-center">
//         <TouchableOpacity
//           onPress={handleFlip}
//           className="p-3 rounded-full bg-slate-100 border border-slate-200"
//         >
//           <ArrowRightLeft size={24} color="#475569" />
//         </TouchableOpacity>
//       </View>

//       {/* RESULT BOX */}
//       <View className="p-6 bg-slate-900 rounded-2xl relative overflow-hidden">
//         <View className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -mr-8 -mt-8" />

//         <Text className="text-sm font-medium text-indigo-200 mb-2">
//           {toLabel} ({to})
//         </Text>

//         <View className="flex-row items-end">
//           <Text className={`text-4xl font-bold ${result ? 'text-white' : 'text-slate-500'}`}>
//             {result || '...'}
//           </Text>

//           {result !== '' && (
//             <Text className="ml-2 text-2xl text-indigo-300 font-medium">{to}</Text>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// };


import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ArrowRightLeft } from 'lucide-react-native';
import { Category, Unit } from '../types';
import { calculateConversion } from '../utils/conversions';

interface ConverterFormProps {
  category: Category;
}

const LENGTH_UNITS: { label: string; value: Unit }[] = [
  { label: 'Meters', value: Unit.METER },
  { label: 'Feet', value: Unit.FEET },
  { label: 'Inches', value: Unit.INCH },
  { label: 'Kilometers', value: Unit.KILOMETER },
  { label: 'Miles', value: Unit.MILE },
];

export const ConverterForm: React.FC<ConverterFormProps> = ({ category }) => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [fromUnit, setFromUnit] = useState<Unit>(Unit.METER);
  const [toUnit, setToUnit] = useState<Unit>(Unit.FEET);

  const getUnits = useCallback(() => {
    if (category === Category.LENGTH) {
      return isFlipped
        ? { from: toUnit, to: fromUnit }
        : { from: fromUnit, to: toUnit };
    } else {
      return isFlipped
        ? { from: Unit.FAHRENHEIT, to: Unit.CELSIUS }
        : { from: Unit.CELSIUS, to: Unit.FAHRENHEIT };
    }
  }, [category, isFlipped, fromUnit, toUnit]);

  const { from, to } = getUnits();

 useEffect(() => {
  const converted = calculateConversion(inputValue, from, to);
  setResult(converted);
}, [inputValue, from, to, category]);


  useEffect(() => {
    setInputValue('');
    setResult('');
    setIsFlipped(false);
    if (category === Category.LENGTH) {
      setFromUnit(Unit.METER);
      setToUnit(Unit.FEET);
    }
  }, [category]);

  const handleInputChange = (text: string) => {
    if (text === '' || /^-?\d*\.?\d*$/.test(text)) {
      setInputValue(text);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <View className="space-y-6">
      {/* INPUT */}
      <View>
        <Text className="text-sm font-medium text-slate-500 mb-2">
          From ({from})
        </Text>

        <TextInput
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder="0"
          keyboardType="numeric"
          className="w-full px-4 py-4 text-3xl font-semibold text-slate-900 bg-white border border-slate-200 rounded-2xl"
        />
      </View>

      {/* LENGTH PICKER */}
      {category === Category.LENGTH && (
        <View className="bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden">
          <Picker
            selectedValue={fromUnit}
            onValueChange={(value) => setFromUnit(value)}
            className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl"
          >
            {LENGTH_UNITS.map((unit) => (
              <Picker.Item key={unit.value} label={unit.label} value={unit.value} />
            ))}
          </Picker>

        </View>
      )}

      {/* SWAP BUTTON */}
      <View className="flex items-center">
        <TouchableOpacity
          onPress={handleFlip}
          className="p-3 rounded-full bg-slate-100 border border-slate-200"
        >
          <ArrowRightLeft size={24} color="#475569" />
        </TouchableOpacity>
      </View>

      {/* RESULT BOX */}
      <View className="p-6 bg-slate-900 rounded-2xl relative overflow-hidden">
        <View className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -mr-8 -mt-8" />

        <Text className="text-sm font-medium text-indigo-200 mb-2">
          To ({to})
        </Text>

        <View className="flex-row items-end">
          <Text className={`text-4xl font-bold ${result ? 'text-white' : 'text-slate-500'}`}>
            {result || '...'}
          </Text>

          {result !== '' && (
            <Text className="ml-2 text-2xl text-indigo-300 font-medium">{to}</Text>
          )}
        </View>
      </View>
    </View>
  );
};
