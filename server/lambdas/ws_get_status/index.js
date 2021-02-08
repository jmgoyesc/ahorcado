'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

const GAME_DB_TABLE = process.env.GAME_DB_TABLE;

const failedResponse = (statusCode, error) => ({
  statusCode,
  body: error
});

const getStatusHandler = async (event) => {
  try {
    const {Item} = await getGame();
    const game = transform(Item);
    return {
        statusCode: 200,
        body: game
      };
  } catch(err) {
      console.log("error in dynamo query: " + err)
    return failedResponse(500, JSON.stringify(err));
  }
};

const transform = (dynamoItem) => {
    return {
        word_letters: transformArray(dynamoItem.word_letters.L),
        word_size: dynamoItem.word_size.N,
        used_letters: transformArray(dynamoItem.used_letters.L),
        game: dynamoItem.game.S,
        hangman_level: dynamoItem.hangman_level.N,
        status: dynamoItem.status.S
    }
};

const transformArray = (dynamoArray) => {
    return dynamoArray.map(v => v.S);
}

const getGame = async () => {
  const params = {
    Key: {
     "game": {
       S: "1"
      }
    }, 
    TableName: GAME_DB_TABLE
   };

  return await dynamodb.getItem(params).promise();
};

exports.handler = async (event) => await getStatusHandler(event);