export class Alert {
  static dropDown;

  static setDropDown(dropDown) {
    if (dropDown) {
      this.dropDown = dropDown;
    }
  }

  static alert(type, title, message, payload) {
    if (!this.dropDown) {
      // tslint:disable-next-line
      console.warn('no dropdown ref');
      return;
    }

    this.dropDown.alertWithType(type, title, message, payload);
  }

  static warn(title, message) {
    Alert.alert('warn', title, message);
  }

  static error(title, message) {
    Alert.alert('error', title, message);
  }

  static info(title, message) {
    Alert.alert('info', title, message);
  }

  static success(title, message) {
    Alert.alert('success', title, message);
  }
}
