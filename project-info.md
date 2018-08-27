# Project title
Language translator

## What
Create a web app that can listen to you voice, translate into different language then speak it back to you.

## Why
I want to experiemnt with and learn about the speech and text to speech apis in Google Chrome. 

## How
- Creating an Express server rendering Pug templates; create a UI with a big button to get things started
- Additional UI elements allow the user to register a language to translate
- On click we will fire up the speech recognition API, this requires access to the device microphone.
- As the user speaks, the speech is converted to a text string.
- Once the speech api detects an end to the speech input (typically a pause), it sends that text and language preferences to the server for translation
- The server will send the data to the Google Language API, a translated string is returned and sent to the client. 
- Sockets are used to persist a connection so there is no redirection required
- The client recieves the new text and uses the browsers text-to-speech api to speak the translation back to the user.

## What else could be done?
- Is there a better way tansmitting data between client and server that doens't require the use of sockets?
- Voice and playback controls (for fun!)

## Tech
- Javascript, Express, Pug, Sockets.io
- Google Language api
- Chrome apis: text-to-speech, speech-recognition

## What did I learn

## Client
n/a

## Keywords

## Date published
21 January 2018
get date from last commit in github repo??

## Preview - public
--
## Preview - private
null

## Repo - public
https://github.com/martin-banks/language-translator
## Repo - private
null

## personal project
True
## news/dna project
False
## code challenge
False
