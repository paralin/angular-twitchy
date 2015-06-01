#!/bin/bash

cd ./twitch-chat-emoticon-sprites/ && node generate.js -js default && cd -
cp ../src/twitchy.js ../dist/scripts/twitchy.js
sed -e "s/{{EMOTES}}/$(cat ./twitch-chat-emoticon-sprites/icons.json)/" -i ../dist/scripts/twitchy.js
sed -e "s/{{EMOTESWIDTHS}}/$(cat ./twitch-chat-emoticon-sprites/iconswidths.json)/" -i ../dist/scripts/twitchy.js
rm -rf ../dist/images/*
rm -rf ../dist/stylesheets/*
cp -r ./twitch-chat-emoticon-sprites/assets/images/* ../dist/images/
cp -r ./twitch-chat-emoticon-sprites/assets/stylesheets/* ../dist/stylesheets/
