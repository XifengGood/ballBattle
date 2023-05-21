let isfiring = false;
function touchStarted(e) {
  if(players[socket.id]){
    if(!isfiring){
      players[socket.id].fire();
    }else{
      clearTimeout(currentWaitforfire);
    }
    isfiring = !isfiring;
  }
}

