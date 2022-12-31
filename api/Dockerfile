FROM node

ENV PORT 8000

WORKDIR /app/api

COPY api/. ./

RUN ["apt-get", "update"]
RUN ["npm", "install"]

EXPOSE ${PORT}

CMD ["npm", "start"]