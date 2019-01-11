import '@styles/desktop.styl';
import { EditorApplication } from '../editor-application/editor-application';
import { TerminalApplication } from '../terminal-application/terminal-application';
import { WebsiteApplication } from '../website-application/website-application';
import domService from '../../services/dom/dom';
import template from './desktop.html';

const ANIMATION_DEFAULT_DURATION = 750;

export class Desktop {
  constructor(container){
    this.element = domService.parseHtml(template);
    this.container = container;
    this.openApplications = [];
    this.container.appendChild(this.element);
  }
  openApplication(applicationType, applicationOptions){
    const application = getOpenApplication(this.openApplications, applicationType);
    if(!application)
      return buildApplication(this, applicationType, applicationOptions);
    return application;
  }
  minimizeAllApplications(onComplete){
    for(let i = 0; i < this.openApplications.length; i++)
      this.openApplications[i].minimize();
    setTimeout(onComplete, ANIMATION_DEFAULT_DURATION);
  }
  maximizeApplication(application, onComplete){
    application.maximize();
    setTimeout(onComplete, ANIMATION_DEFAULT_DURATION);
  }
}

function getApp(applicationType='editor') {
  const apps = {
    website: WebsiteApplication,
    editor: EditorApplication,
    terminal: TerminalApplication,
  };
  return apps[applicationType];
}

function buildApplication(desktop, applicationType, options){
  const Application = getApp(applicationType);
  const application = new Application(desktop.element, options);
  desktop.openApplications.push(application);
  desktop.element.appendChild(application.element);
  return application;
}

function getOpenApplication(openApplications, applicationType){
  for(let i = 0; i < openApplications.length; i++){
    const application = openApplications[i];
    if(application.type == applicationType)
      return application;
  }
}
