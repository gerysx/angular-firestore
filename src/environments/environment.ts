// src/environments/environment.ts

/**
 * Configuración del entorno de desarrollo.
 * 
 * Contiene las configuraciones de la aplicación para el entorno de desarrollo, incluidas las credenciales de Firebase.
 * 
 * @constant {Object} environment - Objeto que contiene la configuración del entorno.
 * @property {boolean} production - Indica si el entorno es de producción (false en desarrollo).
 * @property {Object} firebase - Configuración específica de Firebase para la aplicación.
 * @property {string} firebase.apiKey - Clave API para la autenticación de Firebase.
 * @property {string} firebase.authDomain - Dominio de autenticación de Firebase.
 * @property {string} firebase.projectId - ID del proyecto de Firebase.
 * @property {string} firebase.storageBucket - Bucket de almacenamiento de Firebase.
 * @property {string} firebase.messagingSenderId - ID del remitente de mensajería de Firebase.
 * @property {string} firebase.appId - ID de la aplicación de Firebase.
 * @property {string} firebase.measurementId - ID de medición para Google Analytics (opcional).
 */
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBa90pj7rP29WqDotr2db3GvqG4efc2OH8",
    authDomain: "contact-2d530.firebaseapp.com",
    projectId: "contact-2d530",
    storageBucket: "contact-2d530.firebasestorage.app",
    messagingSenderId: "658112751405",
    appId: "1:658112751405:web:2df644dac8bfc227f055a4",
    measurementId: "G-1HF89F15YX"
  }
};
