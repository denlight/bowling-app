import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('BOWLING APP: ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AppComponent]});
  });

  it ('should work', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });

  class Frame {
    throw1: number;
    throw2: number;
    total: number;
    isSpare: boolean;
    isStrike: boolean;
    totalIsFinal: boolean;

    constructor(throw1?: number, throw2?: number) {
      this.throw1 = throw1 || 0;
      this.throw2 = throw2 || 0;
      this.total = this.throw1 + this.throw2;
      this.isSpare = this.throw1 < 10 && this.throw1 + this.throw2 === 10;
      this.isStrike = throw1 === 10;
      this.totalIsFinal = !this.isSpare && !this.isStrike;
    }
  }

  let frames: Frame[] = [];

  let total: number;

  let recalculateFramesTotals = () => {
    total = 0;
    frames.forEach((frame,i) => {
      if(!frame.totalIsFinal) {
        // handle spares
        if(frame.isSpare && frames[i+1]) {
          frame.total += frames[i+1].throw1;
          frame.totalIsFinal = true;
        }
        // handle strikes
        if(frame.isStrike && frames[i+1] && !frames[i+1].isStrike) {
          frame.total += frames[i+1].total;
          frame.totalIsFinal = true;
        }
        if(frame.isStrike && frames[i+1] && frames[i+1].isStrike && frames[i+2]) {
          frame.total += frames[i+1].total + frames[i+2].throw1;
          frame.totalIsFinal = true;
        }
      }
      total += frame.total;
    });
  };

  let playFrame = (throw1?: number, throw2?: number) => {
    let gameOver: boolean;
    frames.push(new Frame(throw1, throw2));
    recalculateFramesTotals();
    // determine wheather the game is over
    if(frames[9] && (frames[9].isSpare && frames.length === 11
      || frames[9].isStrike && frames.length === 12)) {
      gameOver = true;
    }
    return gameOver;
  };

  describe('Playing a frame: ', () => {
    beforeEach(() => {
      frames = [];
      total = 0;
    });
    it('should return a sum of pins after the frame is played(2 throws) and identify STRIKE or SPARE', () => {
      // gutter
      playFrame();
      expect(frames[0].total).toBe(0);
      expect(frames[0].isSpare).toBe(false);
      expect(frames[0].isStrike).toBe(false);
      // meh
      playFrame(2,4);
      expect(frames[1].total).toBe(6);
      expect(frames[1].isSpare).toBe(false);
      expect(frames[1].isStrike).toBe(false);
      // SPARE
      playFrame(4,6);
      expect(frames[2].total).toBe(10);
      expect(frames[2].isSpare).toBe(true);
      expect(frames[2].isStrike).toBe(false);
      // STRIKE
      playFrame(10,0);
      expect(frames[3].total).toBe(10);
      expect(frames[3].isSpare).toBe(false);
      expect(frames[3].isStrike).toBe(true);
    });
  });

  describe('Handling a SPARE: ', () => {
    beforeEach(() => {
      frames = [];
      total = 0;
    });
    it('should get awarded ten pins, plus a bonus of whatever is framesd with the next ball', () => {
      playFrame(4,6);
      playFrame(2,3);
      expect(frames[0].total).toBe(12);
    });
  });

  describe('Handling a STRIKE: ', () => {
    beforeEach(() => {
      frames = [];
      total = 0;
    });
    it('should get awarded ten pins, plus a bonus of whatever is framesd with the next 2 balls', () => {
      playFrame(10);
      playFrame(3,6);
      expect(frames[0].total).toBe(19);
    });
  });

  describe('Tenth frame: ', () => {
    beforeEach(() => {
      frames = [];
      total = 0;
    });

    it('should allow to throw two extra balls for achieving a STRIKE', () => {
      playFrame(1);
      playFrame(2);
      playFrame(3);
      playFrame(4);
      playFrame(5);
      playFrame(6);
      playFrame(7);
      playFrame(8);
      playFrame(9);
      playFrame(10); // tenth frame is a strike
      playFrame(2,4);
      expect(playFrame(4,5)).toBe(true); // playFrame will return FALSE by default until the game is over.
    });

    it('should allow to throw one extra ball for achieving a SPARE', () => {
      playFrame(1);
      playFrame(2);
      playFrame(3);
      playFrame(4);
      playFrame(5);
      playFrame(6);
      playFrame(7);
      playFrame(8);
      playFrame(9);
      playFrame(9,1); // tenth frame is a spare
      expect(playFrame(10)).toBe(true); // playFrame() will return FALSE by default until the game is over.
    });
  });

  describe('PERFECT GAME!', () => {
    it('should return a total frames of 300', () => {
      playFrame(10);
      playFrame(10);
      playFrame(10);
      playFrame(10);
      playFrame(10);
      playFrame(10);
      playFrame(10);
      playFrame(10);
      playFrame(10);
      playFrame(10); // tenth frame is a strike
      playFrame(10);
      playFrame(10);
      expect(total).toBe(300);
    });
  });
});
