import { Picker } from '@react-native-picker/picker';
import { ArrowRightLeft } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
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

const TEMPERATURE_UNITS: { label: string; value: Unit }[] = [
  { label: 'Celsius', value: Unit.CELSIUS },
  { label: 'Fahrenheit', value: Unit.FAHRENHEIT },
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

  const getCurrentUnits = () => {
    return category === Category.LENGTH ? LENGTH_UNITS : TEMPERATURE_UNITS;
  };

  const fixedPickerTextColor = styles.textDark; 
  
  const resultTextStyle = result ? styles.resultTextValue : styles.resultTextPlaceholder;

  return (
    <View className="space-y-6">
      {/* INPUT */}
      <View>
        <Text
          style={styles.label}
          className="text-sm font-medium mb-2"
        >
          From ({from})
        </Text>

        <TextInput
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder="0"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          style={[styles.inputBase, styles.fixedInputStyle]} 
          className="w-full px-4 py-4 text-3xl font-semibold rounded-2xl mb-3"
        />
      </View>

      {/* SELECT PICKER */}
      <View
        style={[styles.pickerContainer, styles.fixedPickerStyle]} 
        className="rounded-2xl border overflow-hidden"
      >
        <Picker
          selectedValue={from}
          onValueChange={(value) => {
            if (category === Category.LENGTH) setFromUnit(value);
          }}
          enabled={category === Category.LENGTH}
           style={fixedPickerTextColor} 
        >
          {getCurrentUnits().map((unit) => (
            <Picker.Item 
              key={unit.value} 
              label={unit.label} 
              value={unit.value} 
              color={'#000'} 
            />
          ))}
        </Picker>
      </View>

      {/* SWAP BUTTON */}
      <View className="flex items-center">
        <TouchableOpacity
          onPress={handleFlip}
          style={styles.swapButton}
          className="p-3 rounded-full border m-2"
        >
          <ArrowRightLeft size={24} color="#475569" />
        </TouchableOpacity>
      </View>

      {/* RESULT BOX */}
      <View
        style={styles.resultBox}
        className="p-6 rounded-2xl relative overflow-hidden"
      >
        <View
          style={styles.resultAccent}
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -mr-8 -mt-8"
        />

        <Text
          style={styles.resultLabel}
          className="text-sm font-medium mb-2"
        >
          To ({to})
        </Text>

        <View className="flex-row items-end">
          <Text
            style={[styles.resultTextBase, resultTextStyle]}
            className="text-4xl font-bold"
          >
            {result || '...'}
          </Text>

          {result !== '' && (
            <Text style={styles.resultUnit} className="ml-2 text-2xl font-medium">
              {to}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textDark: { color: '#000' } as TextStyle,

  fixedInputStyle: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    color: '#0f172a', 
  } as TextStyle,
  fixedPickerStyle: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
  } as ViewStyle,

  label: {
    color: '#64748b',
  } as TextStyle,
  inputBase: {
    borderWidth: 1,
  } as TextStyle,

  pickerContainer: {
    borderWidth: 1,
  } as ViewStyle,

  swapButton: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
    borderWidth: 1,
  } as ViewStyle,

  resultBox: {
    backgroundColor: '#0f172a',
  } as ViewStyle,
  resultAccent: {
    backgroundColor: 'rgba(79,70,229,0.15)',
  } as ViewStyle,
  resultLabel: {
    color: '#c7d2fe',
  } as TextStyle,
  resultTextBase: {
    fontWeight: 'bold',
  } as TextStyle,
  resultTextValue: {
    color: '#ffffff',
  } as TextStyle,
  resultTextPlaceholder: {
    color: '#64748b', 
  } as TextStyle,
  resultUnit: {
    color: '#a5b4fc', 
  } as TextStyle,
});

export default ConverterForm;