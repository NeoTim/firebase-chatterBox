var User = function( user, id){
  var self = this;
  this.id = id;
  this.name = user.name;
  if( this.id === window.accountId ){
    this.$node = $('<p>' + this.name + '<button class="btn btn-default btn-xs pull-right"><i class="fa fa-times"></i></button></p>');
    
  } else {  
    this.$node = $('<p>' + this.name + '</p>');
  }
  this.$node.find("button").on("click", function (){
    self.destroy();
  });
  //$("#users").append(this.$node);
}

User.prototype.create = function(data){

  //this.UsersRef.push({name: data})
};

User.prototype.destroy = function( id ){
  this.UsersRef.child(id).remove();
  localStorage.accountId = "";
  localStorage.accountName = "";
};