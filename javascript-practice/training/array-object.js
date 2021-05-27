class Player {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }

    moveUp() {
        this.y = this.y + 5
    }

    moveLeft() {
        this.x = this.x - 5
    }
}

let test = new Player('Brian', 5, 10);

function moveAllUp(players) {
    for (var i = 0; i < players.length; i++) {
        players[i].name = players[i].name + ' Meier'
        players[i].moveUp();

    }
}

function moveAllLeft(players) {
    for (var i = 0; i < players.length; i++) {
        players[i].name = players[i].name + ' Meier'
        players[i].moveLeft();
    }
}

var player = new Player('Franz', 5, 10);

var player2 = new Player('Brian', 10, 30);

var players = [
    player,
    player2,
    new Player('Hans', 10, 20)
]; // 3 positions
console.log(players)
moveAllUp(players)
moveAllLeft(players)
console.log(players)
