export class RequestFailedError extends Error {
  code: number;
  
  constructor(status: any) {
    super(status.message);
    this.name = 'RequestFailedError'
    this.code = status.code;
  }
}