var Message = function( roomId, id, message ){
  this.id = id;
  this.roomId = roomId;
  this.userId = message.userId;
  this.userName = message.userId;
  if(this.userId === window.accountId){
    this.$node = $('<li class="list-group-item bg-info"><p class="list-group-item-text">' + message.text + '</p><p class="list-group-item-heading"><strong>-' +message.userName+ '</strong></p></li>');
  } else {
    this.$node = $('<li class="list-group-item"><p class="list-group-item-text">' + message.text + '</p><p class="list-group-item-heading"><strong>' +message.userName+ '</strong></p></li>');
  }
};

Message.prototype.create = function(){

};

Message.prototype.read = function(id){

};

Message.prototype.update = function(id, data){

};

Message.prototype.remove = function(id){

};

