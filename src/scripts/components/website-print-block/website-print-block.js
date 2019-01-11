import '@styles/website-print-block.styl';
import { WebsiteLine } from '../website-line/website-line';
import domService from '../../services/dom/dom';
import template from './website-print-block.html';

export class WebsitePrintBlock extends WebsiteLine {
  constructor(){
    super();
    this.setContent(domService.parseHtml(template));
  }
  setText(text){
    const textContainer = this.element.querySelector('[data-website-print-block-text]');
    return domService.containsClosingHtmlTag(text) ?
      appendHtml(textContainer, domService.parseHtml(text)) :
      appendText(textContainer, text);
  }
}

function appendHtml(container, html){
  addElementCssClass(container, 'website-print-block-html-text');
  container.appendChild(html);
}

function appendText(container, text){
  addElementCssClass(container, 'website-print-block-plain-text');
  container.innerText = text;
}

function addElementCssClass(element, cssClass){
  element.classList.add(cssClass);
}
