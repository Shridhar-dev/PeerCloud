export const nodejs = 
`
# Use an official lightweight Node.js image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files separately for layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Optional: expose a port if it's a web service
EXPOSE 3000

# Define environment variables (optional)
# ENV NODE_ENV=production

# Run the main file (you can customize this)
CMD ["node", "index.js"]
`

export const python = 
`
FROM python:3.10

WORKDIR /app

# Copy only requirements first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Now copy the rest of the code
COPY . .

EXPOSE 3000

CMD ["python", "train.py"]

`