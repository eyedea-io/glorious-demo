import '@styles/_variables.styl';
import '@styles/_mixins.styl';
import { Player } from './components/player/player';

export default class {
  constructor(selector){
    this.container = document.querySelector(selector);
    this.steps = [];
    this.lastOptions = {}
  }
  openApp(app, options = {}){
    this.lastOptions = options
    this.steps.push({
      app,
      options,
      onCompleteDelay: options.onCompleteDelay
    });
    return this;
  }
  write(codeSample, options = {}){
    this.steps.push({
      app: 'editor',
      action: 'write',
      params: { codeSample },
      options: this.lastOptions,
      onCompleteDelay: options.onCompleteDelay
    });
    return this;
  }
  print(content, options = {}){
    this.steps.push({
      app: 'website',
      action: 'print',
      params: { content },
      options: this.lastOptions,
      onCompleteDelay: options.onCompleteDelay
    });
    return this;
  }
  command(command, options = {}){
    this.steps.push({
      app: 'terminal',
      action: 'command',
      params: {
        command,
        promptString: options.promptString
      },
      options: this.lastOptions,
      onCompleteDelay: options.onCompleteDelay
    });
    return this;
  }
  respond(response, options = {}){
    this.steps.push({
      app: 'terminal',
      action: 'respond',
      params: { response },
      options: this.lastOptions,
      onCompleteDelay: options.onCompleteDelay
    });
    return this;
  }
  end(){
    const player = new Player(this.container, this.steps);
    player.play();
  }
}
