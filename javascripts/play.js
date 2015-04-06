;(function(window, document) {
    "use strict";

    var GAME_TIME = 30;
    var GAME_STATE = {
        IDLE: 0,
        COUNT_DOWN: 1,
        PLAY: 2,
    };
    var TCOLOR = {
        WHITE: {color: '#fff', count: 0},
        BLACK: {color: '#262629', count: 3},
        GREEN: {color: '#00d4c7', count: 3},
        RED: {color: '#f0392c', count: 4},
    };

    var state = GAME_STATE.IDLE;
    var count = 5;
    var timerIDs = [];
    var colorTable = [];

    document.addEventListener('DOMContentLoaded', function (event) {
        setBackground(TCOLOR.BLACK.color);
        document.documentElement.style.color = 'rgba(255, 255, 255, 0.8)';
        document.documentElement.style.fontSize = '500%';
        document.documentElement.style.height = '100%';
        document.documentElement.style.textAlign= 'center';
        document.documentElement.innerHTML = 'Tap to start';
        Object.keys(TCOLOR).forEach(function(key) {
            for (var i = 0; i < TCOLOR[key].count; i++) {
                colorTable.push(TCOLOR[key].color);
            }
        });
    });

    window.onclick = init;
    window.ontouchstart = init;

    function init() {
        colorTable.sort(function () { return Math.random() - 0.5 });

        if (state == GAME_STATE.IDLE) {
            count = 5;
            countDown();
        } else {
            endGame();
        }
    };

    function setBackground(color) {
        document.documentElement.style.background = color;
    }

    function countDown() {
        state = GAME_STATE.COUNT_DOWN;
        document.documentElement.innerHTML = count;
        count--;

        if (count >= 0) {
            timerIDs.push(setTimeout(countDown, 1000));
        } else {
            state = GAME_STATE.PLAY;
            document.documentElement.innerHTML = '';
            changeRole(0);
            setTimeout(endGame, GAME_TIME * 1000);
        }
    }

    function changeRole(count) {
        setBackground(colorTable[count]);
        timerIDs.push(setTimeout(function () { 
                changeRole(count + 1);
            }, GAME_TIME / colorTable.length * 1000)
        );
    }

    function endGame() {
        setBackground(TCOLOR.BLACK.color);
        document.documentElement.innerHTML = 'Tap to start';
        state = GAME_STATE.IDLE;

        for (var id; id = timerIDs.pop();) {
            clearTimeout(id);
        }
    }
})(this, document);
