new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    // START
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      return;
    },
    // START

    // ATTACK
    attack: function () {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster: " + damage + " Hit Points",
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    // ATTACK

    // SPECIAL ATTACK
    specialAttack: function () {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.monsterAttacks();
      if (this.checkWin()) {
        return;
      }
      this.checkWin();
      this.turns.unshift({
        isPlayer: true,
        text:
          "Player hits Monster with his Special Attack for: " +
          damage +
          " Hit Points",
      });
    },
    // SPECIAL ATTACK

    //HEAL
    heal: function () {
      var healPoint = 10;
      if (this.playerHealth >= 91) {
        this.monsterAttacks();
        alert("Player Cannot be healed above 100 Hitpoints");

        this.checkWin();
        this.turns.unshift({
          isPlayer: true,
          text: "The Player was clumsy enough to stumble and spill the potion",
        });
      } else if (this.playerHealth <= 90) {
        this.playerHealth += healPoint;
        this.monsterAttacks();
        this.checkWin();
        this.turns.unshift({
          isPlayer: true,
          text: "Player healed himself for: " + healPoint + " Points",
        });
      }
    },

    //HEAL

    //GIVE UP
    giveUp: function () {
      this.gameIsRunning = false;
      this.turns = [];
    },
    monsterAttacks: function () {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits Player: " + damage + " Hit Points",
      });
    },
    //GIVE UP

    //CALC DAMAGE
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    //CALC DAMAGE

    //CHECK WIN
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You Won! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }

        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You Lost! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
    //CHECK WIN
  },
});
