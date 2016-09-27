'use strict';

function ClientError(message){
  this.type = 'ClientError';
  this.message = message || 'An error occured, please try again'
}

ClientError.prototype = Object.create(Error.prototype);
ClientError.prototype.constructor = ClientError;


module.exports = {
  ClientError: ClientError
}
