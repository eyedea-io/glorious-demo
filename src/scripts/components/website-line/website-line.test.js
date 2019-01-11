import { WebsiteLine } from './website-line';

describe('Website Line Component', () => {

  it('should build website line on instantiate', () => {
    const line = new WebsiteLine();
    expect(line.element.classList[0]).toEqual('website-line');
  });

  it('should set content', () => {
    const line = new WebsiteLine();
    const paragraph = document.createElement('p');
    paragraph.innerText = 'content';
    line.setContent(paragraph);
    expect(line.element.querySelector('p').innerText).toEqual('content');
  });

});
