class Utils {
  delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  convertDatePtToEn(date) {
    const aux = date.split('/');
    return aux[2] + '-' + aux[1] + '-' + aux[0];
  }

  convertDateEnToPt(date) {
    const aux = date.split('-');
    return aux[2] + '/' + aux[1] + '/' + aux[0];
  }
}

export default new Utils();
