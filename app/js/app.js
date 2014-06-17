var app = {
  init: function( FB ){
    app.FB = FB

    app.FB.on('child_added', function ( snapshot ){
      var message = snapshot.val();
      message.id = snapshot.name();
      app.makeMessage(message);
    });
    app.FB.on('child_removed', function ( snapshot ){
      $roomMessages.find('#room____' + snapshot.name()).remove();
    });


    $addMsgBtn.on('click', function(){
      if($addMsgInput.val()){
        app.create( $addMsgInput.val() )
      }
    });
  },
  create: function( data ){

    app.FB.push({text: data});
  },
  update: function( data, id){
  },
  destroy: function( id ){
    console.log(id)
    app.FB.child( id ).remove();
  },
  makeMessage: function(data) {
    $btn = $('<button><i class="fa fa-times"></i></button>').addClass('btn btn-danger btn-xs pull-right');
    $node = $("<li>", {id: 'room____'+data.id }).addClass('list-group-item').text(data.text).append($btn);
    $roomMessages.prepend($node);
    $btn.on('click', function(){
      var id = $(this).parent().attr('id').split('____')[1];
      app.destroy( id );
    });
  }
};

$(document).ready(function(){
  var fireroot = "http://my-data-test.firebaseio.com";
  var UsersRef = new Firebase(fireroot + "/messages");
  
  var $roomMessages   = $("#roomMessages");
  var $room           = $("#room");
  var $addMsgBtn      = $("#addMsgBtn");
  var $addMsgInput    = $("#addMsgInput");

  app.init(UsersRef);

});
