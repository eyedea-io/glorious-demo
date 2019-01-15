import '@styles/application.styl';
import domService from '../../services/dom/dom';
import textService from '../../services/text/text';
import template from './application.html';

export class Application {
  constructor(applicationType, options = {}){
    this.type = applicationType;
    this.options = options;
    this.template = template;
    this.element = this.buildElement(applicationType);
    this.setOptions(this.options);
  }
  setOptions(options){
    if(options.minHeight)
      this.setMinHeight(options.minHeight);
    if(options.windowTitle)
      this.setWindowTitle(options.windowTitle);
  }
  setMinHeight(height){
    const applicationTopbarHeight = 26;
    const contentContainer = this.getContentContainerElement(this.element);
    const contentContainerMinHeight = parseInt(height) - applicationTopbarHeight;
    contentContainer.style.minHeight = `${contentContainerMinHeight}px`;
  }
  setWindowTitle(title){
    const titleContainerElement = this.getWindowTitleContainerElement(this.element);
    titleContainerElement.innerText = title;
    this.windowTitle = title;
  }
  addContent(content){
    const container = this.getContentContainerElement(this.element);
    container.appendChild(content);
  }
  minimize(){
    this.setMaximized(false);
    this.handleMaximizedCssClass(this.element, 'remove');
  }
  maximize(){
    this.setMaximized(true);
    this.handleMaximizedCssClass(this.element, 'add');
  }
  setMaximized(isMaximized){
    this.isMaximized = isMaximized;
  }
  buildElement(applicationType){
    let element = this.buildWrapper(applicationType);
    element.appendChild(domService.parseHtml(this.template));
    return element;
  }

  buildWrapper(applicationType){
    const wrapper = document.createElement('div');
    const cssClass = `${textService.toKebabCase(applicationType)}-application`;
    wrapper.setAttribute('class', cssClass);
    return wrapper;
  }

  getContentContainerElement(applicationElement){
    return applicationElement.querySelector('[data-content-container]');
  }

  getWindowTitleContainerElement(applicationElement){
    return applicationElement.querySelector('[data-title-container]');
  }

  handleMaximizedCssClass(element, classListMethod){
    const application = element.querySelector('[data-application]');

    setTimeout(() => {
      application.classList[classListMethod]('application-maximized');
    }, 100)
  }
}

