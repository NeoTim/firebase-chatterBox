var Room = function( obj, id ){  
  this.id = id;
  this.name = obj.name;  
  this.FBURL = "http://my-data-test.firebaseio.com/rooms/" + this.id;  
  this.messagesRef = new Firebase(this.FBURL + "/messages");
  this.$node = $('<li id="room_'+ id +'" class="room list-group-item">'+ this.name +'<button class="btn btn-default btn-xs remove pull-right"><i class="fa fa-times"><i></button></li>');
  this.$container = $(this.containerTemp());
  this.initMessages();
  this.initContainers();
};

// This Method will Initialize the Room Container where the messages are held,
// and handle all events within the side bar container.

Room.prototype.initContainers = function(){
  // define this
  var self = this;

  // this.creatMessage Event Handler
  // find the send message button, and attach a click event handler
  this.$container.find('button').on("click", function (){
    // select the message <input> DOM element
    var $input = self.$container.find('input');
    // if the value $input exists call the prototype creatMessage function, passing the necessary arguments
    if($input.val()){
      self.createMessage({
        text: $input.val(),
        userName: window.accountName,
        userId: window.accountId
      });
      // Clear the DOM <input> Element
      $input.val("");

      // ###################################
      // This is incase of an error; // Dont change this line
      $input.css({"border-color": "#ddd"});
      // ###################################
    }
    else 
    {
      // ###################################
      // This is incase of an error; // Dont change this line
      $input.css({"border-color": "red"});      
      // ###################################
    }
  });

  // attache remaining event handlers
  // this is an event handler for the remove button;
  this.$node.find('button').on('click', function (){
    self.destroy( self.id );
  });

  // attache remaining event handlers 
  // this is an event handler for tabing between the rooms.
  // Please do not change these lines.  
  this.$node.on("click", function(){
    $(".room").removeClass("active");
    $(".roomContainer").hide();
    self.$node.addClass("active");
    self.$container.fadeIn('fast');
  });
}

Room.prototype.initMessages = function(){

  var self = this;

  this.messagesRef.on("child_added", function ( snapshot ) {
    //create a new Message passing the rooms di, then the messages id then the message object
    var data = snapshot.val();
    data.id = snapshot.name();
    if(data){
      var message = new Message( self.id, data.id, data );
      self.$container.find(".list-group").prepend( message.$node );
    } else {
      console.log("Nope");
    }
  });
};

Room.prototype.createMessage = function(data){

  this.messagesRef.push(data);
};


Room.prototype.destroy = function( id ){

  this.RoomsRef.child(id).remove();
};

Room.prototype.containerTemp = function(){

  return [
    '<div class="roomContainer messages_'+ this.id +'">',
      '<div class="input-group" style="margin-bottom: 10px;">',
        '<input type="text" id="messageInput" class="form-control" placeholder="Message. . ." id="input_'+ this.id +'">',
        '<span class="input-group-btn">',
          '<button id="send_'+ this.id +'" class="btn btn-info message-submit">Send</button>',
        '</span>',
      '</div>',
      
      '<ul class="list-group">',
      '</ul>',
    '</div>',
  ].join('')
};

