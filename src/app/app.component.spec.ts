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

  class Frame {
    score: number[];
    nextBalls: number[];
    total: number;
    isSpare: boolean;
    isStrike: boolean;
    frameComplete: boolean;
    lastFrame: boolean;

    constructor(lastFrame?: boolean) {
      this.lastFrame = lastFrame;
    }

    roll = (score?: number) => { }

  }

  let frames: Frame[] = [];

  let total: number;

  let newFrame: boolean;

  describe('Playing a frame:', () => {
    beforeEach(() => {
      frames = [new Frame()];
      total = 0;
    });
    it('should return a sum of pins after the frame is played(2 throws) and identify STRIKE or SPARE', () => {
      // gutter
      frames[0].roll();
      frames[0].roll();
      expect(frames[0].total).toBe(0);
      expect(frames[0].isSpare).toBe(false);
      expect(frames[0].isStrike).toBe(false);
      // meh
      frames[0].roll(2);
      frames[0].roll(4);
      expect(frames[0].total).toBe(6);
      expect(frames[0].isSpare).toBe(false);
      expect(frames[0].isStrike).toBe(false);
      // SPARE
      frames[0].roll(4);
      frames[0].roll(6);
      expect(frames[0].total).toBe(10);
      expect(frames[0].isSpare).toBe(true);
      expect(frames[0].isStrike).toBe(false);
      // STRIKE
      frames[0].roll(10);
      expect(frames[0].total).toBe(10);
      expect(frames[0].isSpare).toBe(false);
      expect(frames[0].isStrike).toBe(true);
    });
  });

  describe('Handling a SPARE:', () => {
    beforeEach(() => {
      frames = [new Frame(), new Frame()];
      total = 0;
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
      total = 0;
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
      total = 0;
    });

    it('should not allow to throw a third ball if there wes no STRIKE or a SPARE achieved', () => {
      frames[9].roll(3);
      frames[9].roll(5);
      expect(frames[9].frameComplete).toBe(true);
    });

    it('should allow to throw one extra ball for achieving a SPARE', () => {
      frames[9].roll(3);
      frames[9].roll(7);
      expect(frames[9].frameComplete).toBe(false);
      frames[9].roll(5);
      expect(frames[9].frameComplete).toBe(true);
    });

    it('should allow to throw two extra balls for achieving a STRIKE', () => {
      frames[9].roll(10);
      frames[9].roll(10);
      expect(frames[9].frameComplete).toBe(false);
      frames[9].roll(10);
      expect(frames[9].frameComplete).toBe(true);
    });
  });

  describe('PERFECT GAME!', () => {
    beforeEach(() => {
      frames = [new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(), new Frame(true)];
      total = 0;
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
      expect(total).toEqual(300);
    });
  });
});
