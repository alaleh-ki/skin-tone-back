import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageUpload } from '../components/ImageUpload';
import { ColorPicker } from '../components/ColorPicker';
import { analyzeColors } from '../services/api';

export const HomePage = () => {
  const navigate = useNavigate();
  const [skinColor, setSkinColor] = useState<[number, number, number]>([248, 196, 180]);
  const [hairColor, setHairColor] = useState<[number, number, number]>([78, 78, 28]);
  const [eyeColor, setEyeColor] = useState<[number, number, number]>([109, 100, 74]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await analyzeColors({
        skin_rgb: skinColor,
        hair_rgb: hairColor,
        eye_rgb: eyeColor,
      });

      // Navigate to results page with data
      navigate('/results', {
        state: {
          analysisResult: result,
          uploadedImage: image,
        },
      });
    } catch (err: any) {
      setError(err.message || 'Failed to analyze colors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Skin Tone & Color Analysis
        </h1>

        <div className="card mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Upload a photo of yourself (optional, for reference)</li>
            <li>Use the color pickers to select your skin tone, hair color, and eye color</li>
            <li>You can adjust RGB values manually or use the color picker</li>
            <li>Click "Analyze Colors" to get your personalized color palette</li>
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-6">
          <ImageUpload onImageSelect={setImage} />

          <div className="space-y-6">
            <ColorPicker
              label="Skin Color"
              value={skinColor}
              onChange={setSkinColor}
            />
            <ColorPicker
              label="Hair Color"
              value={hairColor}
              onChange={setHairColor}
            />
            <ColorPicker
              label="Eye Color"
              value={eyeColor}
              onChange={setEyeColor}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              'Analyze Colors'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

