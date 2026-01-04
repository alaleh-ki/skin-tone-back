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
      <div className="min-h-screen p-4 sm:p-8 md:p-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="card">
            <div className="card-content text-center">
              <p className="text-muted-foreground mb-4">No analysis results found.</p>
              <button onClick={() => navigate('/')} className="btn-primary">
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { skinTone, colorPalette, aiDescription } = analysisResult;

  const ColorSwatch = ({ color, label }: { color: string; label?: string }) => (
    <div
      className="relative aspect-square rounded-lg border border-border/60 shadow-sm hover:scale-105 hover:shadow-md transition-all cursor-pointer group"
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
    <div className="min-h-screen p-4 sm:p-8 md:p-4 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">

        {uploadedImage && (
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold leading-none mb-1.5">Your Photo</h2>
            </div>
            <div className="card-content">
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Uploaded"
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold leading-none mb-1.5">Skin Tone Analysis</h2>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Season</p>
                <p className="text-lg font-semibold">{skinTone.season}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Undertone</p>
                <p className="text-lg font-semibold">{skinTone.undertone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Value</p>
                <p className="text-lg font-semibold">{skinTone.value}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Chroma</p>
                <p className="text-lg font-semibold">{skinTone.chroma}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold leading-none mb-1.5">AI Description</h2>
          </div>
          <div className="card-content">
            <p className="text-muted-foreground leading-relaxed mb-4">{aiDescription.tone_description}</p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Palette Type:</span> {aiDescription.palette_type}
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold leading-none mb-1.5">Clothing Colors</h3>
            <p className="text-sm text-muted-foreground">{aiDescription.clothing}</p>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {colorPalette.clothing.map((color, idx) => (
                <ColorSwatch key={idx} color={color} />
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold leading-none mb-1.5">Eye Makeup</h3>
            <p className="text-sm text-muted-foreground">{aiDescription.eye_makeup}</p>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {colorPalette.eye_makeup.map((color, idx) => (
                <ColorSwatch key={idx} color={color} />
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold leading-none mb-1.5">Makeup</h3>
            <p className="text-sm text-muted-foreground">{aiDescription.makeup}</p>
          </div>
          <div className="card-content">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Blush</h4>
                <div className="grid grid-cols-3 gap-3">
                  {colorPalette.makeup.blush.map((color, idx) => (
                    <ColorSwatch key={idx} color={color} />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Contour</h4>
                <div className="grid grid-cols-3 gap-3">
                  {colorPalette.makeup.contour.map((color, idx) => (
                    <ColorSwatch key={idx} color={color} />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Highlighter</h4>
                <div className="grid grid-cols-3 gap-3">
                  {colorPalette.makeup.highlighter.map((color, idx) => (
                    <ColorSwatch key={idx} color={color} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold leading-none mb-1.5">Lipstick</h3>
            <p className="text-sm text-muted-foreground">{aiDescription.lipstick}</p>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {colorPalette.lipstick.map((color, idx) => (
                <ColorSwatch key={idx} color={color} />
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold leading-none mb-1.5">Jewelry</h3>
            <p className="text-sm text-muted-foreground">{aiDescription.jewelry}</p>
          </div>
          <div className="card-content">
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

