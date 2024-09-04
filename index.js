// This code is for Line OA Poc

const express = require('express');
const app = express();
require('dotenv').config();

const line = require('@line/bot-sdk');

const config ={
    channelAccessToken: process.env.token,
    channelSecret: process.env.channel
}

app.post('/webhook', line.middleware(config), (req,res) => {
    Promise
        .all([
            req.body.events.map(handleEvents)
        ])
        .then((result) => res.json(result))
})

const client = new line.Client(config);

function handleEvents(event){

    console.log(event);

    return client.replyMessage(event.replyToken,[
        {
            "type": "text",
            "text": JSON.stringify(event)
        }
    ])
}

app.get('/',(req, res) =>{
    res.send('Hello World')
})

app.listen(8080, () => console.log('running in port 8080'))
