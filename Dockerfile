FROM node:22.14-slim

USER node

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]