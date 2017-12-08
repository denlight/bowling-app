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

    constructor(throw1: number, throw2: number) {
      this.throw1 = throw1;
      this.throw2 = throw2;
      this.total = throw1 + throw2;
      this.isSpare = throw1 < 10 && throw1 + throw2 === 10;
      this.isStrike = throw1 === 10;
    }
  }

  let score: Frame[] = [];

  let playFrame = (throw1: number, throw2: number) => {
    score.push(new Frame(throw1, throw2));  
  };


  describe('Playing a frame', () => {
    beforeEach(() => {
      score = [];
    });

    it('should return a sum of pins after the frame is played(2 throws) and identify STRIKE or SPARE', () => {
      // gutter
      playFrame(0,0);
      expect(score[0].total).toBe(0);
      expect(score[0].isSpare).toBe(false);
      expect(score[0].isStrike).toBe(false);
      // regular score
      playFrame(5,4);
      expect(score[1].total).toBe(9);
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

    });
  });
  describe('Handling a STRIKE', () => {
    it('should get awarded ten pins, plus a bonus of whatever is scored with the next 2 balls', () => {
      
    });
  });
  describe('Tenth frame', () => {
    it('should allow to throw two extra balls for achieving a STRIKE', () => {

    });

    it('should allow to throw one extra ball for achieving a SPARE', () => {

    });
  });
});
