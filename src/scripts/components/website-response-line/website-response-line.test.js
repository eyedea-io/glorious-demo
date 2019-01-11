import { WebsiteResponseLine } from './website-response-line';

describe('Website Response Line Component', () => {

  it('should build line element on instantiate', () => {
    const line = new WebsiteResponseLine();
    const wrapper = line.element;
    const textElement = line.element.querySelector('[data-website-response-line-text]');
    expect(wrapper.classList[0]).toEqual('website-line');
    expect(textElement.classList[0]).toEqual('website-response-line-text');
  });

  it('should set line as plain text', () => {
    const text = 'hello';
    const line = new WebsiteResponseLine();
    line.setText(text);
    const textElement = line.element.querySelector('[data-website-response-line-text]');
    expect(textElement.innerText).toEqual(text);
  });

  it('should set plain text css class on set line as plain text', () => {
    const line = new WebsiteResponseLine();
    line.setText('');
    const textElement = line.element.querySelector('[data-website-response-line-text]');
    expect(textElement.classList.contains('website-response-line-plain-text')).toEqual(true);
  });

  it('should set line as html', () => {
    const text = '<span>hello</span>';
    const line = new WebsiteResponseLine();
    line.setText(text);
    const textElement = line.element.querySelector('[data-website-response-line-text]');
    expect(textElement.querySelector('span').innerHTML).toEqual('hello');
  });

  it('should set plain text css class on set line as plain text', () => {
    const line = new WebsiteResponseLine();
    line.setText('<span>hello</span>');
    const textElement = line.element.querySelector('[data-website-response-line-text]');
    expect(textElement.classList.contains('website-response-line-html-text')).toEqual(true);
  });

});
