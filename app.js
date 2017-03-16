new Vue({
  el:'#app',
  data:{
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns:[]
  },
  methods:{
    startGame:function(){
      this.gameIsRunning=true;
      this.playerHealth=100;
      this.monsterHealth=100;
      this.turns=[];
    },
    attack(){
      var damage =this.getDamage();
      this.monsterHealth-=damage;
      this.turns.unshift({
        isPlayer:true,
        text:'Player hits monster for '+ damage
      });
      this.checkWinStatus();
      damage =this.getDamage();
      this.playerHealth-=this.getDamage();
      this.turns.unshift({
        isPlayer:false,
        text:'monster hits Player for '+ damage
      });
      this.checkWinStatus();
    },
    specialAttack(){
      var damage= Math.floor(1.2*(this.getDamage()));
      this.monsterHealth-=damage;
      this.turns.unshift({
        isPlayer:true,
        text:'Player hits monster for '+ damage
      });
      this.checkWinStatus();
      damage=Math.floor(1.2*(this.getDamage()))
      this.playerHealth-=damage;
      this.turns.unshift({
        isPlayer:true,
        text:'Player hits monster for '+ damage
      });
      this.checkWinStatus();

    },
    heal(){
      this.checkLogLength();
      if(this.playerHealth<=90){
        this.turns.unshift({
          isPlayer:true,
          text:'Player Healed for 10 '
        });
        this.playerHealth+=10;
        //monster still attacks though
        this.playerHealth-=this.getDamage();
      }else{
        this.turns.unshift({
          isPlayer:true,
          text:'Player pressed heal..it didn\'t do much.. '
        });
        this.playerHealth=100;
        this.playerHealth-=this.getDamage();

      }

    },
    giveUp(){
      this.turns=[];
      this.gameIsRunning=false;


    },
    getDamage(){
      var max = 10;
      var min = 3;
      return Math.max(Math.floor(Math.random()*max)+1,min)
    },
    checkWinStatus(){
      this.checkLogLength();
      if(this.monsterHealth<=0){
        if(confirm('You won...new game?')){
        this.startGame();
      }
        else{
        this.gameIsRunning=false;
      }
    }
        else if(this.playerHealth<=0){
          if(confirm('You lost...new game?')){
            this.gameIsRunning=false;
        }
      }

    },
    checkLogLength(){
      if(this.turns.length==6){
        this.turns.splice(4,1);
      }
    }

  }
});
