import { useState } from 'react';
import { ImageUpload } from '../components/ImageUpload';
import { ColorPicker } from '../components/ColorPicker';
import { analyzeColors } from '../services/api';
import type { ColorAnalysisResponse } from '../types/api.types';

export const HomePage = () => {
  const [skinColor, setSkinColor] = useState<[number, number, number]>([248, 196, 180]);
  const [hairColor, setHairColor] = useState<[number, number, number]>([78, 78, 28]);
  const [eyeColor, setEyeColor] = useState<[number, number, number]>([109, 100, 74]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ColorAnalysisResponse | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Overview', subtitle: 'Your Season' },
    { title: 'Style', subtitle: 'Clothing & Jewelry' },
    { title: 'Makeup', subtitle: 'Complete Look' },
  ];

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

      setAnalysisResult(result);
      setCurrentStep(0); // Reset to first step
    } catch (err: any) {
      setError(err.message || 'Failed to analyze colors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-4 pb-20">
      <main className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto md:items-start">
        <div className="flex flex-col gap-8 md:h-full">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold leading-none mb-1.5">Upload Your Photo</h2>
              <p className="text-sm text-muted-foreground">Optional, for reference</p>
            </div>
            <div className="card-content">
              <ImageUpload onImageSelect={() => { }} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold leading-none mb-1.5">Color Selection</h2>
              <p className="text-sm text-muted-foreground">Select your skin tone, hair, and eye colors</p>
            </div>
            <div className="card-content flex flex-col gap-6">
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

              {error && (
                <div className="bg-red-50/80 dark:bg-red-900/20 border border-red-200/60 dark:border-red-800/40 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg backdrop-blur-xs">
                  <p className="font-semibold">Error</p>
                  <p>{error}</p>
                </div>
              )}
            </div>
            <div className="card-footer flex justify-center">
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
            </div>
          </form>
        </div>

        <div className="rounded-xl backdrop-blur-xs shadow-sm bg-background/70 border border-border overflow-hidden flex flex-col md:h-full min-h-[600px]">
          {analysisResult ? (
            <>
              {/* Stepper Progress */}
              <div className="p-6 border-b border-border/40">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold">Your Results</h3>
                  <p className="text-xs text-muted-foreground mt-1">{steps[currentStep].title} - {steps[currentStep].subtitle}</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  {steps.map((_, idx) => (
                    <div key={idx} className="flex items-center">
                      <button
                        onClick={() => setCurrentStep(idx)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${idx === currentStep
                          ? 'bg-primary-500 text-white'
                          : idx < currentStep
                            ? 'bg-primary-500/30 text-primary-700 dark:text-primary-300'
                            : 'bg-muted text-muted-foreground'
                          }`}
                      >
                        {idx + 1}
                      </button>
                      {idx < steps.length - 1 && (
                        <div className={`w-8 h-0.5 ${idx < currentStep ? 'bg-primary-500/30' : 'bg-muted'}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 p-6">
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-center">Skin Tone Analysis</h4>
                      <div className="grid grid-cols-2 gap-3 text-center max-w-xs mx-auto">
                        <div>
                          <p className="text-xs text-muted-foreground">Season</p>
                          <p className="text-sm font-semibold">{analysisResult.skinTone.season}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Undertone</p>
                          <p className="text-sm font-semibold">{analysisResult.skinTone.undertone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-center">About Your Season</h4>
                      <p className="text-xs text-center text-muted-foreground leading-relaxed">
                        {analysisResult.aiDescription.season}
                      </p>
                      <p className="text-xs text-center text-muted-foreground leading-relaxed">
                        {analysisResult.aiDescription.tone_description}
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-3 pb-6 border-b border-border/40">
                      <h4 className="text-lg font-semibold text-center">Clothing Colors</h4>
                      <p className="text-sm text-center text-muted-foreground leading-relaxed max-w-md mx-auto">
                        {analysisResult.aiDescription.clothing}
                      </p>
                      <div className="flex justify-center pt-4">
                        <div className="flex items-center">
                          {analysisResult.colorPalette.clothing.map((color, idx) => (
                            <div
                              key={idx}
                              className="w-14 h-14 rounded-full border-2 border-background shadow-lg"
                              style={{
                                backgroundColor: color,
                                marginLeft: idx > 0 ? '-12px' : '0',
                                zIndex: analysisResult.colorPalette.clothing.length - idx
                              }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-center">Jewelry</h4>
                      <p className="text-sm text-center text-muted-foreground leading-relaxed max-w-md mx-auto">
                        {analysisResult.aiDescription.jewelry}
                      </p>
                      <div className="flex justify-center pt-4">
                        <div className="flex items-center">
                          {analysisResult.colorPalette.jewelry.map((color, idx) => (
                            <div
                              key={idx}
                              className="w-14 h-14 rounded-full border-2 border-background shadow-lg"
                              style={{
                                backgroundColor: color,
                                marginLeft: idx > 0 ? '-12px' : '0',
                                zIndex: analysisResult.colorPalette.jewelry.length - idx
                              }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6 pb-6 border-b border-border/40">
                      <div className="space-y-3">
                        <h4 className="text-base font-semibold text-center">Eye Makeup</h4>
                        <p className="text-xs text-center text-muted-foreground leading-relaxed">
                          {analysisResult.aiDescription.eye_makeup}
                        </p>
                        <div className="flex justify-center pt-2">
                          <div className="flex items-center">
                            {analysisResult.colorPalette.eye_makeup.map((color, idx) => (
                              <div
                                key={idx}
                                className="w-10 h-10 rounded-full border-2 border-background shadow-md"
                                style={{
                                  backgroundColor: color,
                                  marginLeft: idx > 0 ? '-8px' : '0',
                                  zIndex: analysisResult.colorPalette.eye_makeup.length - idx
                                }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-base font-semibold text-center">Lipstick</h4>
                        <p className="text-xs text-center text-muted-foreground leading-relaxed">
                          {analysisResult.aiDescription.lipstick}
                        </p>
                        <div className="flex justify-center pt-2">
                          <div className="flex items-center">
                            {analysisResult.colorPalette.lipstick.map((color, idx) => (
                              <div
                                key={idx}
                                className="w-10 h-10 rounded-full border-2 border-background shadow-md"
                                style={{
                                  backgroundColor: color,
                                  marginLeft: idx > 0 ? '-8px' : '0',
                                  zIndex: analysisResult.colorPalette.lipstick.length - idx
                                }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-center">Face Makeup</h4>
                      <p className="text-sm text-center text-muted-foreground leading-relaxed max-w-md mx-auto">
                        {analysisResult.aiDescription.makeup}
                      </p>
                      <div className="grid grid-cols-3 gap-4 pt-4">
                        <div>
                          <p className="text-xs font-medium text-center mb-2">Blush</p>
                          <div className="flex justify-center">
                            <div className="flex items-center">
                              {analysisResult.colorPalette.makeup.blush.map((color, idx) => (
                                <div
                                  key={idx}
                                  className="w-8 h-8 rounded-full border-2 border-background shadow-md"
                                  style={{
                                    backgroundColor: color,
                                    marginLeft: idx > 0 ? '-6px' : '0',
                                    zIndex: analysisResult.colorPalette.makeup.blush.length - idx
                                  }}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-center mb-2">Contour</p>
                          <div className="flex justify-center">
                            <div className="flex items-center">
                              {analysisResult.colorPalette.makeup.contour.map((color, idx) => (
                                <div
                                  key={idx}
                                  className="w-8 h-8 rounded-full border-2 border-background shadow-md"
                                  style={{
                                    backgroundColor: color,
                                    marginLeft: idx > 0 ? '-6px' : '0',
                                    zIndex: analysisResult.colorPalette.makeup.contour.length - idx
                                  }}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-center mb-2">Highlighter</p>
                          <div className="flex justify-center">
                            <div className="flex items-center">
                              {analysisResult.colorPalette.makeup.highlighter.map((color, idx) => (
                                <div
                                  key={idx}
                                  className="w-8 h-8 rounded-full border-2 border-background shadow-md"
                                  style={{
                                    backgroundColor: color,
                                    marginLeft: idx > 0 ? '-6px' : '0',
                                    zIndex: analysisResult.colorPalette.makeup.highlighter.length - idx
                                  }}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="p-6 border-t border-border/40">
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                    className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNewAnalysis}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Start New Analysis
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={currentStep === steps.length - 1}
                    className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="overflow-y-auto flex-1 p-6">
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Ready to Get Started?</h3>
                <p className="text-sm max-w-sm leading-relaxed mb-4 text-muted-foreground">
                  Upload your photo and select your colors to receive a personalized color palette analysis.
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span>Personalized analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span>Color recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span>Makeup suggestions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span>Style guidance</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

