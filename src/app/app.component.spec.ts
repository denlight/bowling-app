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

  describe('Playing a frame', () => {
    it('should return a sum of pins after the frame is played(2 throws)', () => {
    
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
