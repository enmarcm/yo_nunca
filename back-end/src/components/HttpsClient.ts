import fs from "node:fs/promises";
import https from "node:https";
import { RequestListener } from "http";
import {
  ErrorType,
  HttpsConstructor,
  ListenServerType,
  OptionsHttps,
} from "../types";

/**
 * Clase para hacer uso del cliente https de node.js
 */
class HttpClient {
  private keyRoute: string;
  private certRoute: string;
  private options: OptionsHttps | null;

  constructor(routes: HttpsConstructor) {
    this.keyRoute = routes.keyRoute;
    this.certRoute = routes.certRoute;
    this.options = null;
    this.obtainData();
  }

  /**
   * Método privado para cargar la clave privada y el certificado desde las rutas especificadas.
   */
  private obtainData = async (): Promise<void | ErrorType> => {
    try {
      const key = await fs.readFile(this.keyRoute);
      const cert = await fs.readFile(this.certRoute);

      this.options = {
        key,
        cert,
      };
      return;
    } catch (error) {
      console.error(error);
      return {
        error: `Hubo un error en la linea 42 del archivo HttpsClient.ts: ${error}`,
      };
    }
  };

  /**
   * Metodo para iniciar el servidor https.
   */
  public listenServer = async (
    params: ListenServerType
  ): Promise<https.Server | ErrorType> => {
    try {
      const { app, PORT, listen } = params;

      if (!this.options) await this.obtainData();
      if (!this.options)
        return {
          error: "No se pudo obtener la clave privada y el certificado",
        };

      const server = https.createServer(this.options, app as RequestListener);

      const serverListen = server.listen(PORT, listen);

      return serverListen;
    } catch (error) {
      return {
        error: `Hubo un error en la linea 69 del archivo HttpsClient.ts: ${error}`,
      };
    }
  };
}

export default HttpClient;
