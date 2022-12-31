FROM node

ENV PORT 3000

WORKDIR /app/client

COPY client/. ./

RUN ["apt-get", "update"]
RUN ["npm", "install"]

EXPOSE ${PORT}

RUN ["npm", "run", "build"]
CMD ["npm", "start"]
