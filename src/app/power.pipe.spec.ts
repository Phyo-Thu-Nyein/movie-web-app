import { PowerPipe } from './services/power.pipe';

describe('PowerPipe', () => {
  it('create an instance', () => {
    const pipe = new PowerPipe();
    expect(pipe).toBeTruthy();
  });
});
