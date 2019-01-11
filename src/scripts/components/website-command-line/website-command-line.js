import '@styles/website-command-line.styl';
import { Cursor } from '../cursor/cursor';
import { WebsiteLine } from '../website-line/website-line';
import domService from '../../services/dom/dom';
import template from './website-command-line.html';

export class WebsiteCommandLine extends WebsiteLine {
  constructor(promptString){
    super();
    this.cursor = new Cursor();
    this.setContent(domService.parseHtml(template));
    this.setPromptString(promptString);
    getTextElement(this.element).appendChild(this.cursor.element);
  }
  setPromptString(promptString){
    const container = this.element.querySelector('[data-website-command-line-prompt-string]');
    container.appendChild(domService.parseHtml(promptString));
  }
  command(text, onComplete){
    this.cursor.write(text, onComplete);
  }
  setActive(){
    this.cursor.setActive();
  }
  setInactive(){
    this.cursor.setInactive();
  }
}

function getTextElement(lineElement){
  return lineElement.querySelector('[data-website-command-line-text]');
}
