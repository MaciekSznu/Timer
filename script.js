class Stopwatch {//szablon klasy
  constructor(display) {
      this.running = false;
      this.display = display;
      this.reset();
      this.print(this.times);
  }

  reset() {//metoda resetująca pomiar
    this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
    };
  }

  print() {//metoda wyświetlająca pomiar
    this.display.innerText = this.format(this.times);
  }

  format(times) {//metoda ustawiająca format wyświetlania czasu mm:ss:msms
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }
  
  start() {
    if (!this.running) {//sprawdzamy czy stoper "chodzi"
        this.running = true;//jesli nie działa to go włączamy
        this.watch = setInterval(() => this.step(), 10);//zmienieamy wartość co 10 ms odpalając metodę step, jako pierwszy argument callback (akyualny stan)
    }
  }

  step() {
    if (!this.running) return;//sprawdzamy czy stoper "chodzi"
    this.calculate(); 
    this.print();
  }

  calculate() {//przelicza milisekundy na sekundy a sekundy na minuty i odpowiednio dodaje/zeruje
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

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  zero() {
    this.running = false;
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    this.print(this.times);
  }
}

function pad0(value) {//funkcja ustawijąca 0 na początku jeśli pomiar jest jednocyfrowy
  let result = value.toString();
  if (result.length < 2) {
      result = '0' + result;
  }
  return result;
}

const stopwatch = new Stopwatch(//instancja klasy
document.querySelector('.stopwatch'));

let startButton = document.getElementById('start'); //metoda dla przycisku start
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.zero());