FROM node:20-alpine

WORKDIR /app

# Install required dependencies, including OpenSSL
RUN apk add --no-cache openssl

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Generate Prisma files and build the project
RUN npm run db:generate
RUN npm run build

# Expose the application port and start the app
EXPOSE 3001 5555
CMD ["npm", "start"]
