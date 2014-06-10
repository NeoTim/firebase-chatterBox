$("#roomMessages").on("keydown", "#messageInput", function(evt){
  if ( evt.which === 13 ){
    $( this ).next( "span" ).find( "button" ).click();
  }
});