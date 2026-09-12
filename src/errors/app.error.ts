export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
    this.name = "AppError";

    // Fix prototype chain so `instanceof AppError` works correctly after TS compile
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
