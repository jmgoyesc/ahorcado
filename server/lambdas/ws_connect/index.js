'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const CONNECTION_DB_TABLE = process.env.CONNECTION_DB_TABLE;

const successfullResponse = {
  statusCode: 200,
  body: 'Success'
};

const failedResponse = (statusCode, error) => ({
  statusCode,
  body: error
});

const connectHandler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  try {
    await addConnection(connectionId);
  } catch(err) {
    return failedResponse(500, JSON.stringify(err));
  }
  return successfullResponse;
};

const addConnection = async (connectionId) => {
  const params = {
    TableName: CONNECTION_DB_TABLE,
    Item: {
      connectionId: connectionId
    }
  };

  return await dynamo.put(params).promise();
};

exports.handler = async (event) => await connectHandler(event);