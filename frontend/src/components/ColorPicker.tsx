'use client'
import { useState, useEffect } from 'react'
import { Button } from './ui/button'

interface ColorPickerProps {
  label: string;
  value: [number, number, number];
  onChange: (rgb: [number, number, number]) => void;
}

// Convert RGB tuple to hex string
function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')}`;
}

// Convert hex string to RGB tuple
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ]
    : [0, 0, 0];
}

export function ColorPicker({
  label,
  value,
  onChange,
}: ColorPickerProps) {
  const defaultColor = rgbToHex(value[0], value[1], value[2]);
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  // Update selectedColor when value prop changes
  useEffect(() => {
    const hex = rgbToHex(value[0], value[1], value[2]);
    setSelectedColor(hex);
  }, [value]);

  const hasEyeDropperSupport = () => 'EyeDropper' in window

  const pickColor = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!hasEyeDropperSupport()) {
      console.warn('EyeDropper API is not supported in this browser')
      return
    }
    try {
      // @ts-expect-error - EyeDropper is not defined in the global scope
      const eyeDropper = new window.EyeDropper()
      const result = await eyeDropper.open()
      const hexColor = result.sRGBHex;
      setSelectedColor(hexColor);
      const rgbValue = hexToRgb(hexColor);
      onChange(rgbValue);
    } catch (e) {
      console.error('Error picking color:', e)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={pickColor}
      size="lg"
      className="cursor-pointer p-1 justify-start lg:text-xs xl:text-sm"
    >
      <div
        className="w-8 h-8 rounded-md shadow-sm border border-border"
        style={{ backgroundColor: selectedColor }}
      ></div>
      {label}
    </Button>
  )
}
