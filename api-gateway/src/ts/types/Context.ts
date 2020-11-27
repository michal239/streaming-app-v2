import { Request, Response } from 'express';

export type Context = {
  req: Request & { user: any | undefined },
  res: Response
}