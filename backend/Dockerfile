FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3005
CMD ["node", "index.js"]

# login to dockerhub with: docker login docker.io
# build the image with: docker build -t hub-username/image-name .
# tag the image with: docker tag image_id hub-username/image-name:custom_tag/version
# push the image with: docker push hub-username/image-name:custom_tag/version