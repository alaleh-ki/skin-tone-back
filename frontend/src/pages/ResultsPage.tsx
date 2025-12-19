import { useLocation, useNavigate } from 'react-router-dom';
import type { ColorAnalysisResponse } from '../types/api.types';

export const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisResult, uploadedImage } = (location.state as {
    analysisResult: ColorAnalysisResponse;
    uploadedImage: File | null;
  }) || {};

  if (!analysisResult) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-custom">
          <div className="card text-center">
            <p className="text-gray-700 mb-4">No analysis results found.</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { skinTone, colorPalette, aiDescription } = analysisResult;

  const ColorSwatch = ({ color, label }: { color: string; label?: string }) => (
    <div
      className="relative aspect-square rounded-lg border-2 border-gray-300 shadow-md hover:scale-105 transition-transform cursor-pointer group"
      style={{ backgroundColor: color }}
      title={color}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-lg">
        <span className="text-white text-xs font-semibold px-2 py-1 bg-black bg-opacity-50 rounded">
          {color}
        </span>
      </div>
      {label && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
          {label}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-white hover:text-primary-200 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          New Analysis
        </button>

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Your Color Analysis Results
        </h1>

        {uploadedImage && (
          <div className="card mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Photo</h2>
            <img
              src={URL.createObjectURL(uploadedImage)}
              alt="Uploaded"
              className="max-w-full max-h-96 mx-auto rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="card mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Skin Tone Analysis
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Season</p>
              <p className="text-lg font-semibold text-gray-800">{skinTone.season}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Undertone</p>
              <p className="text-lg font-semibold text-gray-800">{skinTone.undertone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Value</p>
              <p className="text-lg font-semibold text-gray-800">{skinTone.value}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Chroma</p>
              <p className="text-lg font-semibold text-gray-800">{skinTone.chroma}</p>
            </div>
          </div>
        </div>

        <div className="card mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">AI Description</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{aiDescription.tone_description}</p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Palette Type:</span> {aiDescription.palette_type}
          </p>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Clothing Colors</h3>
            <p className="text-gray-600 mb-4 text-sm">{aiDescription.clothing}</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {colorPalette.clothing.map((color, idx) => (
                <ColorSwatch key={idx} color={color} />
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Eye Makeup</h3>
            <p className="text-gray-600 mb-4 text-sm">{aiDescription.eye_makeup}</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {colorPalette.eye_makeup.map((color, idx) => (
                <ColorSwatch key={idx} color={color} />
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Makeup</h3>
            <p className="text-gray-600 mb-4 text-sm">{aiDescription.makeup}</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Blush</h4>
                <div className="grid grid-cols-3 gap-3">
                  {colorPalette.makeup.blush.map((color, idx) => (
                    <ColorSwatch key={idx} color={color} />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Contour</h4>
                <div className="grid grid-cols-3 gap-3">
                  {colorPalette.makeup.contour.map((color, idx) => (
                    <ColorSwatch key={idx} color={color} />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Highlighter</h4>
                <div className="grid grid-cols-3 gap-3">
                  {colorPalette.makeup.highlighter.map((color, idx) => (
                    <ColorSwatch key={idx} color={color} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Lipstick</h3>
            <p className="text-gray-600 mb-4 text-sm">{aiDescription.lipstick}</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {colorPalette.lipstick.map((color, idx) => (
                <ColorSwatch key={idx} color={color} />
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Jewelry</h3>
            <p className="text-gray-600 mb-4 text-sm">{aiDescription.jewelry}</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {colorPalette.jewelry.map((color, idx) => (
                <ColorSwatch key={idx} color={color} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

