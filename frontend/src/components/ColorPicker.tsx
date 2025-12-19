import { useState, useEffect } from 'react';

interface ColorPickerProps {
  label: string;
  value: [number, number, number];
  onChange: (rgb: [number, number, number]) => void;
}

export const ColorPicker = ({ label, value, onChange }: ColorPickerProps) => {
  const [hexColor, setHexColor] = useState(
    `#${value[0].toString(16).padStart(2, '0')}${value[1].toString(16).padStart(2, '0')}${value[2].toString(16).padStart(2, '0')}`
  );

  useEffect(() => {
    const hex = `#${value[0].toString(16).padStart(2, '0')}${value[1].toString(16).padStart(2, '0')}${value[2].toString(16).padStart(2, '0')}`;
    setHexColor(hex);
  }, [value]);

  const handleHexChange = (hex: string) => {
    setHexColor(hex);
    if (hex.length === 7 && /^#[0-9A-F]{6}$/i.test(hex)) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      onChange([r, g, b]);
    }
  };

  const handleRgbChange = (index: number, val: string) => {
    const numVal = parseInt(val) || 0;
    const clampedVal = Math.max(0, Math.min(255, numVal));
    const newValue: [number, number, number] = [...value];
    newValue[index] = clampedVal;
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="flex items-center gap-4 flex-wrap">
        <input
          type="color"
          value={hexColor}
          onChange={(e) => handleHexChange(e.target.value)}
          className="w-20 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
          aria-label={`${label} color picker`}
        />
        <div
          className="w-16 h-16 rounded-lg border-2 border-gray-300 shadow-md"
          style={{ backgroundColor: hexColor }}
          aria-label={`${label} preview`}
        />
        <div className="flex gap-2">
          <div className="flex flex-col">
            <label className="text-xs text-gray-600 mb-1">R</label>
            <input
              type="number"
              min="0"
              max="255"
              value={value[0]}
              onChange={(e) => handleRgbChange(0, e.target.value)}
              className="w-20 input-field text-center"
              aria-label={`${label} red value`}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-600 mb-1">G</label>
            <input
              type="number"
              min="0"
              max="255"
              value={value[1]}
              onChange={(e) => handleRgbChange(1, e.target.value)}
              className="w-20 input-field text-center"
              aria-label={`${label} green value`}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-600 mb-1">B</label>
            <input
              type="number"
              min="0"
              max="255"
              value={value[2]}
              onChange={(e) => handleRgbChange(2, e.target.value)}
              className="w-20 input-field text-center"
              aria-label={`${label} blue value`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

