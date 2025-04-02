import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';  // Importación de Angular Core para la configuración de la aplicación y detección de cambios en zona
import { provideRouter } from '@angular/router';  // Proveedor para el enrutamiento de la aplicación
import { routes } from './app.routes';  // Importación de las rutas de la aplicación

// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';  // Proveedor para inicializar la aplicación Firebase
import { getAuth, provideAuth } from '@angular/fire/auth';  // Proveedor para la autenticación en Firebase
import { getFirestore, provideFirestore } from '@angular/fire/firestore';  // Proveedor para Firestore en Firebase

// Toastr imports
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';  // Importar el módulo Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Importar BrowserAnimations para la animación de los toasts

import { environment } from 'src/environments/environment';  // Importación de la configuración de Firebase desde el archivo de entorno

/**
 * Configuración de la aplicación Angular.
 * Esta configuración incluye la inicialización de Firebase, el enrutamiento,
 * y la configuración de la detección de cambios en zonas.
 * 
 * Se importa y configura el módulo Toastr para mostrar notificaciones en la aplicación.
 * También se inicializan las dependencias necesarias para Firebase (autenticación y Firestore).
 * 
 * @remarks
 * - `provideZoneChangeDetection`: Configura la detección de cambios para mejorar el rendimiento al coalescer eventos.
 * - `provideRouter`: Configura el enrutamiento con las rutas definidas en `app.routes`.
 * - `provideFirebaseApp`: Inicializa Firebase con la configuración del entorno.
 * - `provideAuth`: Configura Firebase Authentication para manejar el proceso de autenticación.
 * - `provideFirestore`: Configura Firestore para interactuar con la base de datos de Firebase.
 * - `ToastrModule`: Configura Toastr para mostrar notificaciones en la interfaz de usuario.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Configura la detección de cambios en Angular para mejorar el rendimiento.
     * Utiliza coalescing de eventos para evitar el procesamiento innecesario.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Proveedor para configurar el enrutamiento de la aplicación.
     * Usa las rutas definidas en el archivo `app.routes`.
     */
    provideRouter(routes),

    /**
     * Inicializa la aplicación Firebase utilizando la configuración del entorno.
     * Esto proporciona acceso a servicios como autenticación y Firestore.
     */
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    /**
     * Proveedor para configurar Firebase Authentication.
     * Usado para manejar la autenticación de usuarios en la aplicación.
     */
    provideAuth(() => getAuth()),

    /**
     * Proveedor para configurar Firestore de Firebase.
     * Usado para interactuar con la base de datos en tiempo real de Firebase.
     */
    provideFirestore(() => getFirestore()),

    /**
     * Proveedor para configurar el ToastrModule globalmente en la aplicación.
     * Esto es necesario para que Toastr funcione correctamente en componentes standalone.
     * Configuración de Toastr:
     * - `positionClass`: Define la posición del toast en la pantalla.
     * - `preventDuplicates`: Evita duplicados en las notificaciones.
     * - `timeOut`: Tiempo en milisegundos antes de que el toast desaparezca.
     * - `closeButton`: Agrega un botón de cierre al toast.
     * - `progressBar`: Muestra una barra de progreso en el toast.
     */
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',  // Posición del toast
        preventDuplicates: true,  // Evitar duplicados
        timeOut: 3000,  // Duración del toast
        closeButton: true,  // Mostrar botón de cierre
        progressBar: true,  // Mostrar barra de progreso
      })
    ),
  ],
};
