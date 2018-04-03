FROM node:latest

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@latest

ENV HOME=/home/app

COPY . $HOME/nycet/back-end/
# RUN chown -R app:app $HOME/*

# USER app
WORKDIR $HOME/nycet/back-end/
RUN npm install 

EXPOSE 8080

CMD ["npm", "start"]
