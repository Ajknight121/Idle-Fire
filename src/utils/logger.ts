export class Logger {
  private static _localLogMode = false;

  static log(message: string) {
    if (Logger._localLogMode) {
      console.log(message);
    }
  }
  static table(obj: any) {
    if (Logger._localLogMode) {
      console.table(obj);
    }
  }
}
