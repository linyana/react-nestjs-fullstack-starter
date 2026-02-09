export abstract class BaseHttpService {
  abstract getHeaders(): Promise<{ [key in string]: string }>;
  abstract getUrl(params: { url: string }): Promise<string>;
  abstract handleError(params: { error: any }): Promise<void>;
}
