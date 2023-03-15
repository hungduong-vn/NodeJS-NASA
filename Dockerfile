FROM node:lts-alpine
# dir in docker container
WORKDIR /app

# source -> dest
# Copy both package & package.lock -> ensure exact deps (tested in dev)
COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --omit=dev

COPY server/package*.json server/
RUN npm run install-server --omit=dev

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

# Rather than root -> node to RUN, CMD -> Least privildges 
USER node

# Run when container start
CMD ["npm", "start", "--prefix", "server"]

EXPOSE 8080