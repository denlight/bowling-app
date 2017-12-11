import { Component } from '@angular/core';
import { Frame } from './frame';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  ignoreClicks: boolean;

  frames: Frame[];
  pins: number[] = [];
  balls: number[] = [];
  currentFrame: number;

  ngOnInit() {
    this.startNewGame();
  }

  startNewGame() {
    this.setPins();
    this.resetBalls();
    this.frames = [
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(true)
    ];
    this.currentFrame = 0;
  }

  roll(point: number) {
    let frame = this.frames[this.currentFrame];
    if(!frame || this.ignoreClicks || frame.lastFrame && frame.frameComplete) {
      return;
    }
    frame.roll(this.frames, point);
    if (frame.frameComplete) {
      this.ignoreClicks = true;
      setTimeout(() => {
        this.currentFrame++;
        this.resetBalls();
        this.ignoreClicks = false;
      },500);
    } else {
        this.balls.splice(10 - (point - 1));
        if(frame.lastFrame && frame.total >= 10) {
          this.resetBalls();
        }
    }
  }

  resetBalls() {
    this.balls = [];
    for (let i = 0; i <= 10; i++) {
      this.balls.push(i);
    }
  }

  setPins() {
    this.pins = [];
    let pins = 12;
    for (let i = 0; i <= pins; i++) {
      if(i === 1 || i === 3 || i === 6) {
        this.pins.push(0);
        pins--;
      }
      this.pins.push(i+1);
    }
    this.pins = this.pins.reverse();
  }

  hitPin(pin: number) {
    if(this.frames[this.currentFrame]
      &&this.frames[this.currentFrame].score.length) {
      let frame = this.frames[this.currentFrame];
      let result = frame.lastFrame
        ? pin <= frame.score[frame.score.length-1]
        : pin <= frame.score.reduce((a,b) => a + b);
      return result;
    }
  }

  getTotal() {
    let total = 0;
    this.frames.forEach(frame => {
      total += (frame.total || 0);
    });
    return total;
  }
}
