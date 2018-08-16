let Stopwatch = function (elem, options) {

    let timer = createTimer(),
        startButton = createButton('start', start),
        stopButton = createButton('stop', stop),
        resetButton = createButton('reset', reset),
        offset,
        clock,
        interval;

    // default options
    options = options || {};
    options.delay = options.delay || 1;

    // append elements
    elem.appendChild(timer);

    // initialize
    reset();


    // private functions
    function createTimer() {
        return tempElement = document.createElement('span');
        tempElement;
    }

    function createButton(action, handler) {
        let a = document.createElement('a');
        a.href = '#' + action;
        a.innerHTML = action;
        a.addEventListener('click', function (event) {
            handler();
            event.preventDefault();
        });
        return a;
    }

    function getTime() {
        alert(clock);
    }

    function start() {
        if (!interval) {
            offset = Date.now();
            interval = setInterval(update, options.delay);
        }
    }

    function stop() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        return clock / 1000;
    }

    function reset() {
        clock = 0;
        render();
    }

    function update() {
        clock += delta();
        render();
    }

    function render() {
        timer.innerHTML = clock / 1000;
    }

    function delta() {
        let now = Date.now(),
            d = now - offset;

        offset = now;
        return d;
    }

    // public API
    this.start = start;
    this.stop = stop;
    this.reset = reset;
};

function showHowTo() {
    let message = 'To win the game you must find all the twin-cards!';
    alert(message);
}

function changeCardBack(element) {
    let cardsBacks = document.getElementsByClassName('back');
    for (let i = 0; i < cardsBacks.length; i++) {
        cardsBacks[i].style.backgroundImage = element.style.backgroundImage;
    }
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}