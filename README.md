QuickConvert
============

**QuickConvert** is a small React Native app built with Expo that allows users to quickly convert units of **length** and **temperature**. The app provides a live conversion as the user types and supports switching between units easily.

* * * * *

📦 Features
-----------

-   **Length conversions**: Meters ↔ Feet ↔ Inches ↔ Kilometers ↔ Miles

-   **Temperature conversions**: Celsius ↔ Fahrenheit

-   **Live conversion**: Shows the result as you type

-   **Swap units**: Flip between "from" and "to" units

-   **Input validation**: Only allows numbers and decimal points

-   **Clean UI**: Simple, intuitive, and responsive design

* * * * *

🗂 Folder Structure
-------------------

```
/converter
  /src
    /components
      ConverterForm.js       # Main conversion form component
      TabSelector.js         # Category selector (Length / Temperature)
    /screens
      Home.js                # Main screen
  App.js                     # Entry point
  /utils
    conversions.js            # Helper functions for conversions
  /types
    index.ts                  # Type definitions for Category & Unit`
```

* * * * *

⚙️ Installation
---------------

1.  Clone the repository:

2.  Install dependencies:
   `npm install`

3.  Start the app with Expo:
   `npx expo start`

4.  Scan the QR code with Expo Go (iOS/Android) or run on a simulator.

* * * * *

📝 Usage
--------

1.  Open the app.

2.  Select the category: **Length** or **Temperature**.

3.  Enter a numeric value in the "From" input.

4.  Pick the "From" and "To" units (or swap using the arrow button).

5.  See the converted value instantly in the result box.

* * * * *

💻 Code Highlights
------------------

-   **Controlled input** ensures only valid numbers are processed.

-   **Live conversion** via `useEffect` for instant feedback.

-   **Separation of concerns**:

    -   `ConverterForm` handles conversion logic and UI

    -   `TabSelector` handles category selection

    -   `utils/conversions.js` contains reusable conversion functions

* * * * *

🧪 Conversions
--------------

-   **Length**: Meters, Feet, Inches, Kilometers, Miles

-   **Temperature**: Celsius, Fahrenheit

**Helper Functions**:

-   `convertLength(value, from, to)`

-   `convertTemperature(value, from)`

-   `calculateConversion(inputValue, from, to)`

* * * * *

🎨 UI
-----

-   Uses **React Native components**: `TextInput`, `Picker`, `Text`, `TouchableOpacity`

-   Styled with **StyleSheet** and **Tailwind-like classes** for simplicity

-   Responsive design for both light and dark screens
