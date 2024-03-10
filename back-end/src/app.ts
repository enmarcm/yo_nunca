/**
 * @file Archivo principal de la aplicacion.
 * @description Este es un servidor desarrollado en node.js con Express y TypeScript.
 * @author Enmanuel Colina <theenmanuel123@gmail.com>
 */

import express from "express";
import picocolors from "picocolors";
import { PORT } from "./constants";

const app = express();
