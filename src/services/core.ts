import { Extracts } from "extracts";

export class CoreAPI extends Extracts {
  constructor(urlApi = process.env.API_KEY) {
    super(urlApi);
  }
}
