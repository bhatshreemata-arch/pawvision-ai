interface PredictionResponse {
  animal?: unknown;
  predictions?: unknown;
}

interface Prediction {
  label?: unknown;
  score?: unknown;
}

export interface BreedDetectionResult {
  breed: string;
  confidence: number;
  type: 'dog' | 'cat';
}

const UNKNOWN_RESULT: BreedDetectionResult = {
  breed: 'Unknown Breed',
  confidence: 0,
  type: 'dog',
};

export async function detectBreed(file: File): Promise<BreedDetectionResult> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) return UNKNOWN_RESULT;

    const data = (await response.json()) as PredictionResponse;
    const prediction = Array.isArray(data.predictions)
      ? (data.predictions[0] as Prediction | undefined)
      : undefined;
    const label = typeof prediction?.label === 'string' ? prediction.label.trim() : '';
    const score = typeof prediction?.score === 'number' ? prediction.score : NaN;
    const animal = typeof data.animal === 'string' ? data.animal.trim().toLowerCase() : '';

    if (
      !label ||
      !Number.isFinite(score) ||
      score < 0 ||
      score > 1 ||
      (animal !== 'dog' && animal !== 'cat')
    ) {
      return UNKNOWN_RESULT;
    }

    return {
      breed: label,
      confidence: Math.round(score * 100),
      type: animal,
    };
  } catch {
    return UNKNOWN_RESULT;
  }
}
