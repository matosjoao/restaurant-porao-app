class EventListener {
  events = [];

  addListener(eventName, cb) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(cb);
    const index = this.events[eventName].length - 1;
    return {
      remove: () => {
        this.events[eventName].splice(index, 1);
      },
    };
  }

  emit(eventName, values) {
    const cbs = this.events[eventName];
    if (cbs && cbs.length) {
      cbs.forEach(cb => {
        cb(values);
      });
    }
  }
}
export default new EventListener();
