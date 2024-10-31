import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification


def load_model(model_path):
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForSequenceClassification.from_pretrained(model_path)

    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    model.to(device)
    return tokenizer, model

def predict_text(text, model, tokenizer):
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    model.eval()

    # Tokenize input
    inputs = tokenizer(text, return_tensors='pt', padding=True, truncation=False).to(device)

    # Move inputs to the same device as the model
    inputs = {key: value.to(device) for key, value in inputs.items()}
    inputs = inputs

    # Perform inference
    with torch.inference_mode():
        outputs = model(**inputs)

    logits = outputs.logits

    # Get the predicted label (for single-label classification)
    predicted_label = torch.sigmoid(logits).round().squeeze().cpu()

    return predicted_label.tolist()

