import { bootstrapApplication } from '@angular/platform-browser';  // Importa la función bootstrapApplication para iniciar la aplicación Angular
import { appConfig } from './app/app.config';  // Importa la configuración de la aplicación, como las rutas y Firebase
import { AppComponent } from './app/app.component';  // Importa el componente raíz de la aplicación

/**
 * Función principal para arrancar la aplicación Angular.
 * Esta función inicializa la aplicación en el navegador usando el componente raíz (AppComponent) y la configuración de la aplicación (appConfig).
 * 
 * @param {AppComponent} AppComponent - El componente principal que se cargará al iniciar la aplicación.
 * @param {ApplicationConfig} appConfig - La configuración de la aplicación que incluye proveedores y ajustes necesarios.
 * 
 * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando la aplicación está completamente arrancada.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));  // En caso de error, se captura y se muestra en la consola.
