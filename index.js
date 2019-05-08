const readline = require('readline');

class Game {
  constructor() {
  }

  start() {
    this.readline = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    this.number = this._randomInteger(4);
    this.question('Відгадай число\n');
  }

  question(message) {
      this.readline.question(message, answer => {
        const result = this._checkNumber(answer);

        if (!result) {
            this.question('Дані невірні, повторіть\n');
        }

        const { bulls, cows } = result;

        if (bulls === 4) {
            console.log('Ви виграли!\n');
            this.readline.close();
        }

        this.question(`Bulls: ${bulls}, Cows: ${cows}\n`);
      });
  }

  _randomInteger(count) {
    var str = '';
    while (str.length < count) {
      let n = Math.random();
      n = Math.floor(Math.random() * (9 + 1));
      n += '';
      if (!(str.includes(n)) && !(n === '0')) {
        str = str + n;
      }
    }
    return str;
  }

  _checkNumber(userNumber) {
    let bulls = 0;
    let cows = 0;

    if (userNumber.length !== 4) {
        return false;
    } else {
        for (let i = 0; i < 4; i++) {
            if (userNumber[i] == this.number[i]) {
                bulls++;
            } else if (this.number.includes(userNumber[i])) {
                cows++;
            }
        }
    }

    return { bulls, cows };
  }
}

const game = new Game(); // call constructor

game.start();