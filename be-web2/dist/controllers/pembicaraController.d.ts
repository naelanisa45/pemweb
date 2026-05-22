import type { Request, Response } from 'express';
export declare const getAllPembicara: (req: Request, res: Response) => void;
export declare const createPembicara: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const getPembicaraById: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const updatePembicaraById: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const deletePembicaraById: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=pembicaraController.d.ts.map