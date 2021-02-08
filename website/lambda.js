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

module.exports.connectHandler = (event, context, callback) => {
  addConnection(event.requestContext.connectionId)
    .then(() => {
      callback(null, successfullResponse);
    })
    .catch((err) => {
      callback(failedResponse(500, JSON.stringify(err)));
    });
};

module.exports.disconnectHandler = (event, context, callback) => {
  deleteConnection(event.requestContext.connectionId)
    .then(() => {
      callback(null, successfullResponse);
    })
    .catch((err) => {
      console.log(err);
      callback(failedResponse(500, JSON.stringify(err)));
    });
};

module.exports.defaultHandler = (event, context, callback) => {
  callback(null, failedResponse(404, 'No event found'));
};

module.exports.sendMessageHandler = (event, context, callback) => {
  sendMessageToAllConnected(event)
    .then(() => {
      callback(null, successfullResponse);
    })
    .catch((err) => {
      callback(failedResponse(500, JSON.stringify(err)));
    });
};

const sendMessageToAllConnected = (event) => {
  return getAllConnections().then((connectionData) => {
    return connectionData.Items.map((connection_id) => {
      return send(event, connection_id.connection_id);
    });
  });
};

const getAllConnections = () => {
  const params = {
    TableName: CONNECTION_DB_TABLE,
    ProjectionExpression: 'connection_id'
  };

  return dynamo.scan(params).promise();
};

const send = (event, connection_id) => {
  const body = JSON.parse(event.body);
  let postData = body.data;
  console.log('Sending.....');

  if (typeof postData === 'object') {
    console.log('It was an object');
    postData = JSON.stringify(postData);
  } else if (typeof postData === 'string') {
    console.log('It was a string');
  }

  const endpoint =
    event.requestContext.domainName + '/' + event.requestContext.stage;
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: endpoint
  });

  const params = {
    connection_id: connection_id,
    Data: postData
  };
  return apigwManagementApi.postToConnection(params).promise();
};

const addConnection = (connection_id) => {
  const params = {
    TableName: CONNECTION_DB_TABLE,
    Item: {
      connection_id: connection_id
    }
  };

  return dynamo.put(params).promise();
};

const deleteConnection = (connection_id) => {
  const params = {
    TableName: CONNECTION_DB_TABLE,
    Key: {
      connection_id: connection_id
    }
  };

  return dynamo.delete(params).promise();
};