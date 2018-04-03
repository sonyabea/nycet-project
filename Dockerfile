FROM node:latest

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@latest

ENV HOME=/home/app

COPY . $HOME/nycet/
# RUN chown -R app:app $HOME/*

# USER app
WORKDIR $HOME/nycet
RUN npm install 

# USER root
# RUN chown -R app:app $HOME/*
# USER app

CMD ["npm", "start"]
