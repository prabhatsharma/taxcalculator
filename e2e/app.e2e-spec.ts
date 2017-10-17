import { PrudentialPredictorPage } from './app.po';

describe('prudential-predictor App', () => {
  let page: PrudentialPredictorPage;

  beforeEach(() => {
    page = new PrudentialPredictorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
