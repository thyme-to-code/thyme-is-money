# linux: docker build -t ghcr.io/adamshand/fuzzler:latest¬ .
# macos: docker build --platform linux/amd64 -t ghcr.io/adamshand/fuzzler .
#    or: docker build -t fuzzler .
#        docker tag 38f737a91f39 ghcr.io/adamshand/fuzzler:latest
# echo $GHCR_PAT | docker login ghcr.io -u adamshand --password-stdin
# docker push ghcr.io/adamshand/fuzzler:latest
# docker pull ghcr.io/adamshand/fuzzler

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run resetDev
CMD [ "node", "server/index.js" ]

# --publish 3000:3000