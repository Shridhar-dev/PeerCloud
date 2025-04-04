const nodejs = 
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

const python = 
`
FROM python:3.10

WORKDIR /app
COPY . .

RUN pip install -r requirements.txt

CMD ["python", "train.py"]

`