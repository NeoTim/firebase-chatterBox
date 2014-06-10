var UsersController = {};
var RoomsController = {};

UsersController.init = function(UsersRef){

  UsersRef.on("child_added", function (snapshot){

    var user = new User(snapshot.val(), snapshot.name());
    user.UsersRef = UsersRef;

    if(user.name === window.accountName){
      //console.log(user.name);
      window.accountId = snapshot.name();
      localStorage.accountId = snapshot.name();      
    }
    $("#usersList").append(user.$node);
  });

  this.initEvents(UsersRef);
};

UsersController.initEvents = function(UsersRef){
  $("#addUserBtn").on("click", function(){

    if(!window.accountName){
      var $input = $("#addUserInput");
      window.accountName = $input.val();
      localStorage.accountName = $input.val();
      UsersRef.push({name: $input.val()});
      $input.val("");
      $("#userInput").hide();
      $("#userTitle").show().html("Users")
    }
  });

  if(window.accountId){
      $("#userInput").hide();
      $("#userTitle").show().html("Users");    
  }  
}

RoomsController.init = function(RoomsRef){

  RoomsRef.on("child_added", function(snap){
    //console.log(snap.val());
    var room = new Room(snap.val(), snap.name());
    room.RoomsRef = RoomsRef;
    //console.log(room.$node);
    $("#roomsList").append(room.$node);
    $("#roomMessages").append(room.$container);
    $("#roomsList li").first().addClass('active');
    $(".roomContainer").first().fadeIn('fast');
  });


  RoomsRef.on('child_removed', function (snapshot){
    console.log(snapshot.val(), snapshot.name());
    $("#room_" + snapshot.name()).remove();
    $(".messages_" + snapshot.name()).remove();
  });

  $("#addRoom").on("click", function(){
    var name = $("#roomInput").val();
    //console.log(name);

    RoomsRef.push({name: name});
    $("#roomInput").val("");
  });
};

