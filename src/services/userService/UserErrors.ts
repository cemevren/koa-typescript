export class InvalidParameterError extends Error {
  protected code: number;

  constructor(message: string) {
    super(message);
    this.code = 400;
  }
}
