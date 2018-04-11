FROM node:latest

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@latest

ENV HOME=/home/app

COPY . $HOME/competitive
# RUN chown -R app:app $HOME/*

# USER app
WORKDIR $HOME/competitive
RUN npm install 
RUN npm install  --save redux

# USER root
# RUN chown -R app:app $HOME/*
# USER app

CMD ["npm", "start"]
