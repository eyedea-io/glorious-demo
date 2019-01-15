import '@styles/website-application.styl';
import textService from '../../services/text/text';
import { Application } from '../application/application';
import { WebsiteCommandLine } from '../website-command-line/website-command-line';
import { WebsiteResponseLine } from '../website-response-line/website-response-line';
import { WebsitePrintBlock } from '../website-print-block/website-print-block';
import template from './website-application.html';

export class WebsiteApplication extends Application {
  constructor(container, options = {}){
    super('website', options);
    this.container = container;
    // FIXME: This adds second window instance
    // this.container.appendChild(this.element);
    this.template = template;
    this.element = this.buildElement('website');
    this.setCommandLines([]);
    this.configOptions(options);
    this.setOptions(this.options);
  }
  configOptions(options){
    this.setWindowTitle(buildWindowTitle(options));
    this.setPromptString(buildPromptString(options));
  }
  setCommandLines(lines){
    this.commandLines = lines;
  }
  setPromptString(string){
    this.promptString = string;
  }
  command({ command, promptString }, onComplete){
    if(promptString)
      this.setPromptString(promptString);
    setLastCommandLineWrittenAsInactive(this.commandLines);
    writeCommandLine(this, command, onComplete);
  }
  respond({ response }, onComplete){
    const responseLines = textService.removeBlankFirstLine(response);
    for(let i = 0; i < responseLines.length; i++)
      this.addContent(buildResponseLineElement(responseLines[i]));
    onComplete();
  }
  print({ content }, onComplete){
    this.addContent(buildBlockElement(`<pre>${content}</pre>`));
    onComplete();
  }

  handleMaximizedCssClass(element, classListMethod){
    const application = element.querySelector('[data-website-application]');
    setTimeout(() => {
      application.classList[classListMethod]('application-maximized');
    }, 100)
  }
}

function buildWindowTitle(options){
  return options.windowTitle || 'bash';
}

function buildPromptString(options){
  return options.promptString || '~/demo $';
}

function setLastCommandLineWrittenAsInactive(commandLines){
  if(commandLines.length)
    commandLines[commandLines.length - 1].setInactive();
}

function writeCommandLine(websiteApplication, command, onComplete){
  const line = new WebsiteCommandLine(websiteApplication.promptString);
  websiteApplication.commandLines.push(line);
  websiteApplication.addContent(line.element);
  line.setActive();
  line.command(command, onComplete);
}

function buildResponseLineElement(lineText){
  const line = new WebsiteResponseLine();
  line.setText(lineText);
  return line.element;
}
function buildBlockElement(text){
  const block = new WebsitePrintBlock();
  block.setText(text);
  return block.element;
}
