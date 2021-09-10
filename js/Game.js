class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  //WAIT state = 0
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }


    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    allCars = [car1 , car2 , car3 , car4];
    
  }

  //Play state = 1
  play(){
    form.hide()
    textSize(30)
    text("game has started", 120, 100)
    Player.getPlayerInfo();

    //Game Starts
    if(allPlayers !== undefined ){

      var x = 100;
      var y ;
      var carIndex = 0 
      
      for(var i in allPlayers){ 
        
        carIndex++;
        x+=200;

        y = displayHeight-allPlayers[i].distance

        allCars[carIndex-1].x = x;
        allCars[carIndex-1].y = y;

        //Identifying the currently active car in the browser
        if(carIndex===player.index){
          allCars[carIndex-1].shapeColor = "red"
          camera.position.x = displayWidth/2;
          camera.position.y = allCars[carIndex-1].y
        }

      }
    }


    if(keyIsDown(UP_ARROW)&& player.index != null){
      player.distance += 50 ;
      player.update()
    }

    drawSprites();
  }
  
  end(){}

}

/*

for/in loop statement 

for(var i in arrayName){}
*/
