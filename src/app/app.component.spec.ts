import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App', () => {
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
      this.total = throw1 + throw2;
      this.isSpare = throw1 < 10 && throw1 + throw2 === 10;
      this.isStrike = throw1 === 10;
      this.totalIsFinal = !this.isSpare && !this.isStrike;
    }
  }

  let score: Frame[] = [];

  let total: number;

  let playFrame = (throw1?: number, throw2?: number) => {
    score.push(new Frame(throw1, throw2));
  };

  describe('Playing a frame', () => {
    beforeEach(() => {
      score = [];
      total = 0;
    });

    it('should return a sum of pins after the frame is played(2 throws) and identify STRIKE or SPARE', () => {
      // gutter
      playFrame();
      expect(score[0].total).toBe(0);
      expect(score[0].isSpare).toBe(false);
      expect(score[0].isStrike).toBe(false);
      // meh
      playFrame(2,4);
      expect(score[1].total).toBe(6);
      expect(score[1].isSpare).toBe(false);
      expect(score[1].isStrike).toBe(false);
      // SPARE
      playFrame(4,6);
      expect(score[2].total).toBe(10);
      expect(score[2].isSpare).toBe(true);
      expect(score[2].isStrike).toBe(false);
      // STRIKE
      playFrame(10,0);
      expect(score[3].total).toBe(10);
      expect(score[3].isSpare).toBe(false);
      expect(score[3].isStrike).toBe(true);
    });
  });

  describe('Handling a SPARE', () => {
    it('should get awarded ten pins, plus a bonus of whatever is scored with the next ball', () => {
      playFrame(4,6);
      playFrame(2,3);
      expect(score[0].total).toBe(12);
    });
  });

  describe('Handling a STRIKE', () => {
    it('should get awarded ten pins, plus a bonus of whatever is scored with the next 2 balls', () => {
      playFrame(10);
      playFrame(3,6);
      expect(score[0].total).toBe(19);
    });
  });

  describe('Tenth frame', () => {
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
      expect(playFrame(10)).toBe(true); // playFrame will return FALSE by default until the game is over.
    });
  });

  describe('PERFECT GAME!', () => {
    it('should return a total score of 300', () => {
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
