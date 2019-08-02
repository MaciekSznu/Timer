'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
  //szablon klasy
  function Stopwatch(display) {
    _classCallCheck(this, Stopwatch);

    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  _createClass(Stopwatch, [{
    key: 'reset',
    value: function reset() {
      //metoda resetująca pomiar
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
    }
  }, {
    key: 'print',
    value: function print() {
      //metoda wyświetlająca pomiar
      this.display.innerText = this.format(this.times);
    }
  }, {
    key: 'format',
    value: function format(times) {
      //metoda ustawiająca format wyświetlania czasu mm:ss:msms
      return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      if (!this.running) {
        //sprawdzamy czy stoper "chodzi"
        this.running = true; //jesli nie działa to go włączamy
        this.watch = setInterval(function () {
          return _this.step();
        }, 10); //zmienieamy wartość co 10 ms odpalając metodę step, jako pierwszy argument callback (akyualny stan)
      }
    }
  }, {
    key: 'step',
    value: function step() {
      if (!this.running) return; //sprawdzamy czy stoper "chodzi"
      this.calculate();
      this.print();
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      //przelicza milisekundy na sekundy a sekundy na minuty i odpowiednio dodaje/zeruje
      this.times.miliseconds += 1;
      if (this.times.miliseconds >= 100) {
        this.times.seconds += 1;
        this.times.miliseconds = 0;
      }
      if (this.times.seconds >= 60) {
        this.times.minutes += 1;
        this.times.seconds = 0;
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.running = false;
      clearInterval(this.watch);
    }
  }, {
    key: 'zero',
    value: function zero() {
      this.running = false;
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
      this.print(this.times);
    }
  }, {
    key: 'saveTime',
    value: function saveTime() {
      var savedTime = this.format(this.times);
      var li = document.createElement('li');
      var tt = document.createTextNode(savedTime);
      li.appendChild(tt);
      document.querySelector('.results').appendChild(li);
    }
  }, {
    key: 'clearTimes',
    value: function clearTimes() {
      document.querySelector('.results').innerHTML = '';
    }
  }]);

  return Stopwatch;
}();

function pad0(value) {
  //funkcja ustawijąca 0 na początku jeśli pomiar jest jednocyfrowy
  var result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

var stopwatch = new Stopwatch( //instancja klasy
document.querySelector('.stopwatch'));

var results = document.querySelector('.results');

var startButton = document.getElementById('start'); //metoda dla przycisku start
startButton.addEventListener('click', function () {
  return stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
  return stopwatch.stop();
});

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
  return stopwatch.zero();
});

var saveButton = document.getElementById('save');
saveButton.addEventListener('click', function () {
  return stopwatch.saveTime();
});

var clearButton = document.getElementById('cleartimes');
clearButton.addEventListener('click', function () {
  return stopwatch.clearTimes();
});
