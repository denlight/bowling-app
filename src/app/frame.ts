export class Frame {
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

    roll = (frames: Frame[], score?: number) => {
        score = score || 0;
        this.score.push(score);
        this.score.reduce((a, b) => a + b);
        frames = this.recalculateFramesTotals(score, frames);
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

    recalculateFramesTotals(currentBall: number, frames: Frame[]) {
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
        return frames;
    }
}
