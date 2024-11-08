# Use the official Python 3.12 image
FROM python:3.12

# Label the image
LABEL authors="mazkasr"

# Set the working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the entire 'code' directory and 'indobert-finetuned' directory
COPY ./*.py /app/
COPY ./indobert-finetuned /app/indobert-finetuned

# Expose the app's port
EXPOSE 80
RUN pwd
RUN ls
# Set the CMD to start Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80", "--workers", "4"]