$(document).ready(function(){

  var fireroot = "http://my-data-test.firebaseio.com";
  //window.rooms = {};
  window.accountId = localStorage.getItem("accountId");
  window.accountName = localStorage.getItem("accountName");
  if(!window.accountId){
    window.accountId = "";
    window.accountName = "";
    localStorage.accountId = "";
    localStorage.accountName = "";
  }
  window.users = [];
  
  var RoomsRef = new Firebase(fireroot + "/rooms");
  var UsersRef = new Firebase(fireroot + "/users");

  UsersController.init(UsersRef);
  RoomsController.init(RoomsRef);

});


