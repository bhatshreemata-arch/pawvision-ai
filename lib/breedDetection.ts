// Simplified breed detection for demo: only supported breeds
const DOG_BREEDS = [
  'Pug',
  'Labrador',
  'German Shepherd',
  'Golden Retriever',
];

const CAT_BREEDS = [
  'Persian',
  'Siamese',
  'Maine Coon',
  'British Shorthair',
];

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
// Multiple deterministic hash functions to improve consistency
function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return Math.abs(hash >>> 0);
}

function sdbm(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
  }
  return Math.abs(hash >>> 0);
}

function fnv1a(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return Math.abs(hash >>> 0);
}

// Determine whether image is dog or cat using majority vote from multiple hashes
function analyzeImageCharacteristics(imageData: string): { isDog: boolean; typeConfidence: number } {
  const h1 = djb2(imageData);
  const h2 = sdbm(imageData);
  const h3 = fnv1a(imageData);

  const vote1 = (h1 % 2) === 0; // even -> dog
  const vote2 = (h2 % 3) !== 0; // 2/3 chance -> dog
  const vote3 = (h3 % 5) < 3; // 3/5 chance -> dog

  const votes = [vote1, vote2, vote3];
  const dogVotes = votes.filter(Boolean).length;
  const isDog = dogVotes >= 2; // majority

  // Confidence based on vote agreement and hash spread (range 60-98)
  const agreement = dogVotes === 3 ? 1 : (dogVotes === 2 ? 0.8 : 0.5);
  const spread = ((h1 ^ h2 ^ h3) % 39); // 0-38
  const typeConfidence = Math.min(98, 60 + Math.round(agreement * 30) + Math.round(spread / 2));

  return { isDog, typeConfidence };
}

// Choose a supported breed or return 'Unknown Breed' when match is weak
function selectBreedForType(imageData: string, isDog: boolean): { breed: string; breedConfidence: number } {
  const breeds = isDog ? DOG_BREEDS : CAT_BREEDS;
  // Deterministic combined hash for breed selection
  const h1 = djb2(imageData);
  const h2 = sdbm(imageData + '|breed');
  const combined = (h1 ^ (h2 << 1)) >>> 0;

  // matchScore 0-99 derived from combined
  const matchScore = combined % 100;

  // If match score below threshold, return Unknown Breed
  const THRESHOLD = 65;
  if (matchScore < THRESHOLD) {
    return { breed: 'Unknown Breed', breedConfidence: matchScore };
  }

  // Deterministic index into supported breeds
  const index = (combined >>> 4) % breeds.length;
  const breed = breeds[index];
  const breedConfidence = Math.min(99, THRESHOLD + Math.floor((matchScore - THRESHOLD) * (39 / (100 - THRESHOLD))));
  return { breed, breedConfidence };
}

export function detectBreed(imageData: string): { breed: string; confidence: number; type: 'dog' | 'cat' } {
  const { isDog, typeConfidence } = analyzeImageCharacteristics(imageData);
  const { breed, breedConfidence } = selectBreedForType(imageData, isDog);

  // Final confidence: average, clamped 50-99 for demo
  const final = Math.round((typeConfidence + breedConfidence) / 2);
  const confidence = Math.max(50, Math.min(99, final || typeConfidence));

  return {
    breed,
    confidence,
    type: isDog ? 'dog' : 'cat',
  };
}

// Deterministic helper: return a default supported breed for a type
export function getRandomBreed(type: 'dog' | 'cat'): string {
  const breeds = type === 'dog' ? DOG_BREEDS : CAT_BREEDS;
  // Return first supported breed deterministically (no randomness)
  return breeds[0];
}

export const DOG_BREEDS_LIST = DOG_BREEDS;
export const CAT_BREEDS_LIST = CAT_BREEDS;
