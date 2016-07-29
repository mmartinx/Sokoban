'use strict';

class Sokoban {
  constructor(gameState) {
    this.board = gameState.board;
    this.player = this.find('P')[0];
    this.goals = this.find('G');
  }

  log() {
    console.log(this.board.map(row => {
      return row.join(' ');
    }).join('\r\n'));
    if (this.isWon()) {
      console.log('WINNER');
    }
  }

  getState() {
    return this;
  }

  isWon() {
    return this.goals.every(g => this.board[g.y][g.x] === 'B');
  }

  tryMove(direction) {
    let baseX = this.player.x, baseY = this.player.y;
    let x, y, boxX, boxY;

    if (direction === 'DOWN') {
      x = baseX, y = baseY + 1;
      boxX = baseX, boxY = baseY + 2;
    }
    if (direction === 'UP') {
      x = baseX, y = baseY - 1;
      boxX = baseX, boxY = baseY - 2;
    }
    if (direction === 'LEFT') {
      x = baseX - 1, y = baseY;
      boxX = baseX - 2, boxY = baseY;
    }
    if (direction === 'RIGHT') {
      x = baseX + 1, y = baseY;
      boxX = baseX + 2, boxY = baseY;
    }

    if (this.board[y][x] === ' ' || this.board[y][x] === 'G') {
      this.board[baseY][baseX] = ' ';
      this.board[y][x] = 'P';
      this.player = { x, y };
    }
    if (this.board[y][x] === 'B' && (this.board[boxY][boxX] === ' ' || this.board[boxY][boxX] === 'G')) {
      this.board[baseY][baseX] = ' ';
      this.board[y][x] = 'P';
      this.board[boxY][boxX] = 'B';
      this.player = { x, y };
    }

    this.goals.filter(g => this.board[g.y][g.x] === ' ').forEach(g => this.board[g.y][g.x] = 'G');
  }

  find(token) {
    let hits = [];
    for (let y = 0; y < this.board.length; ++y) {
      for (let x = 0; x < this.board[0].length; ++x) {
        if (token === this.board[y][x])
          hits.push({ x, y });
      }
    }
    return hits;
  }
}