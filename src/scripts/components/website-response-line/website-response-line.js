import '@styles/website-response-line.styl';
import { WebsiteLine } from '../website-line/website-line';
import domService from '../../services/dom/dom';
import template from './website-response-line.html';

export class WebsiteResponseLine extends WebsiteLine {
  constructor(){
    super();
    this.setContent(domService.parseHtml(template));
  }
  setText(text){
    const textContainer = this.element.querySelector('[data-website-response-line-text]');
    return domService.containsClosingHtmlTag(text) ?
      appendHtml(textContainer, domService.parseHtml(text)) :
      appendText(textContainer, text);
  }
}

function appendHtml(container, html){
  addElementCssClass(container, 'website-response-line-html-text');
  container.appendChild(html);
}

function appendText(container, text){
  addElementCssClass(container, 'website-response-line-plain-text');
  container.innerText = text;
}

function addElementCssClass(element, cssClass){
  element.classList.add(cssClass);
}
