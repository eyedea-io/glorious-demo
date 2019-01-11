import '@styles/website-line.styl';
import domService from '../../services/dom/dom';
import template from './website-line.html';

export class WebsiteLine {
  constructor(){
    this.element = domService.parseHtml(template);
  }
  setContent(html){
    this.element.append(html);
  }
}
