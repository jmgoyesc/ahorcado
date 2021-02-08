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

const disconnectHandler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  try {
    await deleteConnection(connectionId);
  } catch(err) {
    return failedResponse(500, JSON.stringify(err));
  }
  return successfullResponse;
};

const deleteConnection = async (connectionId) => {
  const params = {
    TableName: CONNECTION_DB_TABLE,
    Key: {
      connectionId: connectionId
    }
  };

  return await dynamo.delete(params).promise();
};

exports.handler = async (event) => await disconnectHandler(event);