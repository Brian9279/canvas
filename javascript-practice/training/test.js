function moveLeft(position) {
    position.x = position.x - 5
}

var playerPosition = {
    x: 5,
    y: 10
};

playerPosition.y = playerPosition.y + 5
moveLeft(playerPosition)
console.log(playerPosition)
