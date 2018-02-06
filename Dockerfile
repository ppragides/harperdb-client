## Build NPM Modules

FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD /app /app

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run index.js when the container launches
CMD ["node", "index.js"]