# Use the official Bun base image
FROM oven/bun:1.1

# Set working directory
WORKDIR /app

# Copy app files
COPY . .



# Install dependencies
RUN bun install

# Expose app port
EXPOSE 5000

# Run the app
CMD ["bun", "run", "src/index.ts"]
