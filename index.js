const GameServer = require('./server');



class Game {
  constructor() {
    this[Symbol.for('GAME_TYPE')] = true;
    this._onReq = this._onReq.bind(this);
    this.gameServer = new GameServer(this._onReq);
  }

  isGame() {
    return !!this[Symbol.for('GAME_TYPE')];
  }

  start() {
    this.restart();
    this.gameServer.listen(3000);
  }

  restart() {
    this.number = this._randomInteger(4);
    console.log(this.number);
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

  _onReq(req, res) {
    const userNumber = req.url.replace('/', '');
    const result = this._checkNumber(userNumber);

    if (!result) {
        res.end('Дані невірні, повторіть\n');
    }

    const { bulls, cows } = result;

    if (bulls === 4) {
        res.end('You win\n');
        this.restart();
    }

    res.end(`Bulls: ${bulls}, Cows: ${cows}\n`);
  }
}

const game = new Game(); // call constructor

game.start();