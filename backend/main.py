from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading dog breed model...")
dog_model = pipeline(
    "image-classification",
    model="prithivMLmods/Dog-Breed-120"
)
print("Dog breed model ready!")

print("Loading cat breed model...")
cat_model = pipeline(
    "image-classification",
    model="ferdifdi/cat-breed-60-classes"
)
print("Cat breed model ready!")

print("Loading dog-vs-cat classifier...")
dog_vs_cat_classifier = pipeline(
    "zero-shot-image-classification",
    model="openai/clip-vit-base-patch32",
    device=-1
)
print("Dog-vs-cat classifier ready!")

@app.get("/")
def home():
    return {"status": "PawVision AI backend is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    classification = dog_vs_cat_classifier(
        image,
        candidate_labels=["a photo of a dog", "a photo of a cat"]
    )

    if classification[0]["label"] == "a photo of a dog":
        animal = "Dog"
        results = dog_model(image, top_k=5)
    else:
        animal = "Cat"
        results = cat_model(image, top_k=5)

    return {
        "animal": animal,
        "predictions": results
    }
