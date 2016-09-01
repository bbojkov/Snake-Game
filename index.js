$(document).ready(function () {
    var $this = this;
    var canvas = $("#canvas");
    var ctx = canvas[0].getContext("2d");
    var width = canvas.width();
    var height = canvas.height();

    var cellWidth = 10,
        direction,
        food,
        score,
        snakeArray,
        tail;

    function init() {
        direction = "right";

        createSnake();
        createFood();

        score = 0;

        if (typeof $this != undefined) {
            clearInterval($this);
        }

        $this = setInterval(paint, 60);
    }

    init();

    function createSnake() {
        var snakeLength = 5;
        snakeArray = [];

        for (var i = snakeLength - 1; i >= 0; i -= 1) {
            snakeArray.push({
                x: i,
                y: 0
            });
        }
    }

    function createFood() {
        food = {
            x: Math.round(Math.random() * (width - cellWidth) / cellWidth),
            y: Math.round(Math.random() * (height - cellWidth) / cellWidth)
        };
    }

    function paint() {


        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, width, height);

        var snakeX = snakeArray[0].x;
        var snakeY = snakeArray[0].y;

        if (direction == "right") {
            snakeX += 1;
        }
        else if (direction == "left") {
            snakeX -= 1;
        }
        else if (direction == "down") {
            snakeY += 1;
        }
        else if (direction == "up") {
            snakeY -= 1;
        }

        //check for collision with walls or with self
        if (snakeX === -1 ||
            snakeX === width / cellWidth ||
            snakeY === -1 ||
            snakeY === height / cellWidth ||
            checkCollision(snakeX, snakeY, snakeArray)) {
            //restart game

            init();
            return;
        }

        if (snakeX == food.x && snakeY == food.y) {
            tail = {x: snakeX, y: snakeY};
            score += 1;
            createFood();
        } else {
            tail = snakeArray.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        }

        snakeArray.unshift(tail);

        for (var j = 0; j < snakeArray.length; j += 1) {
            var snakeCell = snakeArray[j];

            paintCell(snakeCell.x, snakeCell.y);
        }

        paintFood(food.x, food.y);

        var scoreText = "Score: " + score;
        ctx.fillText(scoreText, 5, height - 5);
    }

    function paintCell(x, y) {
        ctx.fillStyle = "blue";
        ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
    }

    function paintFood(x, y) {
        ctx.fillStyle = "black";
        ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
    }

    function checkCollision(x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x == x && array[i].y == y)
                return true;
        }
        return false;
    }

    $(document).keydown(function (e) {
        var key = e.which;

        if (key == "37" && direction != "right") {
            direction = "left";
        }
        else if (key == "38" && direction != "down") {
            direction = "up";
        }
        else if (key == "39" && direction != "left") {
            direction = "right";
        }
        else if (key == "40" && direction != "up") {
            direction = "down";
        }
    });
});