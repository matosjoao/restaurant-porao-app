import EventListener from './EventListener';

class Loading {
  start() {
    EventListener.emit('loading', true);
  }

  stop() {
    EventListener.emit('loading', false);
  }
}
export default new Loading();
