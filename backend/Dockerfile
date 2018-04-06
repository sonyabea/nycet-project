FROM node:latest

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@latest

ENV HOME=/home/app

COPY . $HOME/express/
# RUN chown -R app:app $HOME/*

# USER app
WORKDIR $HOME/express/
RUN npm install 

EXPOSE 8080

CMD ["npm", "start"]
