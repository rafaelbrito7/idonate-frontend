FROM node:21-alpine as builder

# Set the working directory
ENV HOME=/app

# As root user, create the directory and change its ownership to 'node'
RUN mkdir -p $HOME && chown node:node $HOME

WORKDIR $HOME

# Copy package files with correct ownership
COPY --chown=node:node package*.json $HOME/

# Install dependencies
RUN npm install --force

# Copy the rest of your application code
COPY --chown=node:node . $HOME

# Switch to 'node' user
USER node

# Build the application
RUN npm run build

# Start a new stage from the alpine version of the node image
FROM node:21-alpine

# Set the working directory in the new stage
ENV HOME=/app

RUN mkdir -p $HOME && chown node:node $HOME
WORKDIR $HOME

# Copy the node_modules and dist directory from the builder stage
COPY --chown=node:node --from=builder /app/node_modules $HOME/node_modules
COPY --chown=node:node --from=builder /app/dist $HOME/dist
COPY --chown=node:node --from=builder /app/package*.json $HOME/
COPY --chown=node:node --from=builder /app/vite.config.ts $HOME/

# Switch to 'node' user for better security
USER node

EXPOSE 4173

# Set the command to start the node server
CMD ["npm", "run", "preview"]
