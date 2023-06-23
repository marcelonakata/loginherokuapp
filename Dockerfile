# Base image
FROM cypress/base:14.17.0

# Set a working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN chmod -R 777 cypress/reports

# Run the Cypress tests
CMD ["npx", "cypress", "run"]