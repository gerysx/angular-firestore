/**
 * Constantes de la aplicación.
 * Este objeto contiene valores constantes que se usan a lo largo de la aplicación para
 * mantener un comportamiento consistente y evitar duplicación de valores.
 */
export const APP_CONSTANTS = {
  
    /** 
     * Nombre de la colección de contactos en la base de datos.
     * Se usa en operaciones relacionadas con la colección de contactos.
     */
    COLLECTION_NAME: 'contacts',
  
    /**
     * Mensajes de notificación para diferentes acciones realizadas sobre los contactos.
     * Estos mensajes son usados para proporcionar retroalimentación al usuario.
     */
    MESSAGES: {
      /**
       * Mensaje que se muestra cuando un contacto se actualiza correctamente.
       */
      CONTACT_UPDATED: 'Contacto editado correctamente',
  
      /**
       * Mensaje que se muestra cuando un contacto se agrega correctamente.
       */
      CONTACT_ADDED: 'Contacto añadido correctamente',
  
      /**
       * Mensaje que se muestra cuando un contacto se elimina correctamente.
       */
      CONTACT_DELETED: 'Contacto eliminado correctamente',
  
      /**
       * Mensaje que se muestra en un cuadro de confirmación para eliminar un contacto.
       * Pregunta al usuario si está seguro de eliminar el contacto.
       */
      CONFIRMATION_PROMPT: '¿Está seguro de eliminar el contacto?'
    }
  }
  