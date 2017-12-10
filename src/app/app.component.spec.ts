import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('BOWLING APP:', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AppComponent] });
  });

  it('should work', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });

  let recalculateFramesTotals = (currentBall: number) => {
    frames.forEach(frame => {
      if (!frame.lastFrame && frame.isSpare && !frame.nextBalls.length) {
        frame.nextBalls.push(currentBall);
        frame.total = 10 + currentBall;
      }
      if (!frame.lastFrame && frame.isStrike && frame.nextBalls.length < 2) {
        frame.nextBalls.push(currentBall);
        frame.total = 10 + frame.nextBalls.reduce((a, b) => a + b);
      }
    });
  };

  let frames: Frame[] = [];

  class Frame {
    score: number[];
    nextBalls: number[];
    total: number;
    isSpare: boolean;
    isStrike: boolean;
    frameComplete: boolean;
    lastFrame: boolean;

    constructor(lastFrame?: boolean) {
      this.score = [];
      this.lastFrame = lastFrame;
      this.nextBalls = [];
    }

    roll = (score?: number) => {
      score = score || 0;
      this.score.push(score);
      this.score.reduce((a,b) => a + b);
      recalculateFramesTotals(score);
      if (!this.lastFrame) {
        // handle a STRIKE
        if (this.score.length === 1 && score === 10) {
          this.isStrike = true;
          this.total = score;
          this.frameComplete = true;
        }
        // handle a SPARE
        if (this.score.length === 2) {
          this.total = this.score[0] + this.score[1];
          this.isSpare = this.total === 10;
          this.frameComplete = true;
        }
      } else {
        this.total = this.score.reduce((a, b) => a + b);
        this.frameComplete = ((this.score[0] + this.score[1] >= 10) && this.score.length === 3) || this.score[0] + this.score[1] < 10;
      }
    }
  }

  let getTotal = () => {
    let total = 0;
    frames.forEach(frame => {
      total += frame.total;
    });
    return total;
  };

  describe('Playing a frame:', () => {

    beforeEach(() => {
      frames = [new Frame()];
    });

    it('should return a sum of pins after the frame is played, identify STRIKE or SPARE, and whether the frame was completed | GUTTER', () => {
      // gutter
      frames[0].roll();
      expect(frames[0].frameComplete).toBeFalsy();
      frames[0].roll();
      expect(frames[0].frameComplete).toBe(true);
      expect(frames[0].total).toBe(0);
      expect(frames[0].isSpare).toBeFalsy();
      expect(frames[0].isStrike).toBeFalsy();
    });
    it('should return a sum of pins after the frame is played, identify STRIKE or SPARE, and whether the frame was completed | NORMAL', () => {
      frames[0].roll(2);
      expect(frames[0].frameComplete).toBeFalsy();
      frames[0].roll(4);
      expect(frames[0].frameComplete).toBe(true);
      expect(frames[0].total).toBe(6);
      expect(frames[0].isSpare).toBeFalsy();
      expect(frames[0].isStrike).toBeFalsy();
    });
    it('should return a sum of pins after the frame is played, identify STRIKE or SPARE, and whether the frame was completed | SPARE', () => {
      // SPARE
      frames[0].roll(4);
      expect(frames[0].frameComplete).toBeFalsy();
      frames[0].roll(6);
      expect(frames[0].frameComplete).toBe(true);
      expect(frames[0].total).toBe(10);
      expect(frames[0].isSpare).toBe(true);
      expect(frames[0].isStrike).toBeFalsy();
    });
    it('should return a sum of pins after the frame is played, identify STRIKE or SPARE, and whether the frame was completed | STRIKE', () => {
      frames[0].roll(10);
      expect(frames[0].frameComplete).toBe(true);
      expect(frames[0].total).toBe(10);
      expect(frames[0].isSpare).toBeFalsy();
      expect(frames[0].isStrike).toBe(true);
    });
  });

  describe('Handling a SPARE:', () => {

    beforeEach(() => {
      frames = [new Frame(), new Frame()];
    });

    it('should get awarded ten pins, plus a bonus of whatever is scored with the next ball', () => {
      frames[0].roll(3);
      frames[0].roll(7);
      frames[1].roll(5);
      frames[1].roll(4);
      expect(frames[0].total).toBe(15);
    });
  });

  describe('Handling a STRIKE:', () => {

    beforeEach(() => {
      frames = [new Frame(), new Frame()];
    });

    it('should get awarded ten pins, plus a bonus of whatever is scored with the next 2 balls', () => {
      frames[0].roll(10);
      frames[1].roll(5);
      frames[1].roll(4);
      expect(frames[0].total).toBe(19);
    });
  });

  describe('Tenth frame:', () => {

    beforeEach(() => {
      frames = [new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(true)];
    });

    it('should not allow to throw a third ball if there wes no STRIKE or a SPARE achieved', () => {
      frames[9].roll(3);
      frames[9].roll(5);
      expect(frames[9].frameComplete).toBe(true);
    });

    it('should allow to throw one extra ball for achieving a SPARE', () => {
      frames[9].roll(3);
      frames[9].roll(7);
      expect(frames[9].frameComplete).toBeFalsy();
      frames[9].roll(5);
      expect(frames[9].frameComplete).toBe(true);
    });

    it('should allow to throw two extra balls for achieving a STRIKE', () => {
      frames[9].roll(10);
      frames[9].roll(10);
      expect(frames[9].frameComplete).toBeFalsy();
      frames[9].roll(10);
      expect(frames[9].frameComplete).toBe(true);
    });
  });

  describe('PERFECT GAME!', () => {

    beforeEach(() => {
      frames = [new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(true)];
    });

    it('Total score of all frames should equal 300', () => {
      frames[0].roll(10);
      frames[1].roll(10);
      frames[2].roll(10);
      frames[3].roll(10);
      frames[4].roll(10);
      frames[5].roll(10);
      frames[6].roll(10);
      frames[7].roll(10);
      frames[8].roll(10);
      // last frame
      frames[9].roll(10);
      frames[9].roll(10);
      frames[9].roll(10);
      expect(getTotal()).toEqual(300);
    });
  });
});
