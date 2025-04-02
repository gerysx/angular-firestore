import { Injectable, inject, NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  onAuthStateChanged,
  updatePassword,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from '@angular/fire/auth';
import { signal } from '@angular/core';
import { doc, Firestore, setDoc, getDoc } from '@angular/fire/firestore';

/**
 * Servicio de autenticación para manejar operaciones de login, registro, logout,
 * y gestión de contraseñas utilizando Firebase Authentication.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);                // Instancia de Firebase Authentication
  private _firestore = inject(Firestore);        // Instancia de Firestore
  private _ngZone = inject(NgZone);              // NgZone para asegurar la ejecución en el contexto de Angular

  /**
   * Signal para manejar el estado del usuario autenticado.
   */
  user = signal<User | null>(null);

  constructor() {
    // Suscripción a cambios de estado de autenticación (login, logout, etc.)
    onAuthStateChanged(this._auth, async (user) => {
      this.user.set(user);
      if (user) {
        await this.ensureUserDocumentExists(user.uid);
      }
    });
  }

  /**
   * Registra un nuevo usuario con correo electrónico y contraseña.
   * @param user Objeto con propiedades email y password.
   * @returns Información sobre el usuario registrado.
   */
  async signUp(user: { email: string; password: string }) {
    const userCredential = await createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
    this.user.set(userCredential.user);
    await this.ensureUserDocumentExists(userCredential.user.uid);
    return userCredential;
  }

  /**
   * Inicia sesión un usuario con correo electrónico y contraseña.
   * @param user Objeto con propiedades email y password.
   * @returns Información sobre el usuario autenticado.
   */
  async signIn(user: { email: string; password: string }) {
    const userCredential = await signInWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
    this.user.set(userCredential.user);
    await this.ensureUserDocumentExists(userCredential.user.uid);
    return userCredential;
  }

  /**
   * Inicia sesión con Google mediante un popup.
   * @returns Información sobre el usuario autenticado.
   */
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(this._auth, provider);
    this.user.set(userCredential.user);
    await this.ensureUserDocumentExists(userCredential.user.uid);
    return userCredential;
  }

  /**
   * Cierra la sesión del usuario autenticado.
   */
  async logout() {
    await signOut(this._auth);
    this.user.set(null);
  }

  /**
   * Obtiene el usuario actual autenticado.
   * @returns El objeto usuario o null si no está autenticado.
   */
  getUser() {
    return this.user();
  }

  /**
   * Obtiene el UID del usuario autenticado.
   * @returns El UID del usuario o null si no está autenticado.
   */
  getUserUid(): string | null {
    return this.user()?.uid ?? null;
  }

  /**
   * Asegura que el documento del usuario exista en Firestore.
   * Si no existe, lo crea automáticamente usando el UID como ID.
   * @param uid UID del usuario.
   */
  async ensureUserDocumentExists(uid: string) {
    const userRef = doc(this._firestore, 'users', uid);
    try {
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {});
        console.log(`Documento creado para el usuario con ID: ${uid}`);
      }
    } catch (error) {
      console.error('Error al verificar o crear el documento:', error);
    }
  }

  /**
   * Cambia la contraseña del usuario autenticado.
   * @param newPassword La nueva contraseña del usuario.
   */
  async changePassword(newPassword: string): Promise<void> {
    const user = this._auth.currentUser;
    if (user) {
      try {
        await updatePassword(user, newPassword);
        console.log('Contraseña actualizada correctamente');
      } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        throw error;
      }
    } else {
      throw new Error('No hay usuario autenticado');
    }
  }

   /**
   * Envía un correo de restablecimiento de contraseña al correo proporcionado.
   * @param email Correo electrónico del usuario.
   * @returns Promesa vacía si el correo se envía correctamente.
   * @throws Error si ocurre un problema durante el proceso.
   */
   async resetPassword(email: string): Promise<void> {
    if (!email || !email.trim()) {
      throw new Error('Por favor, ingresa un correo válido.');
    }

    try {
      await sendPasswordResetEmail(this._auth, email.trim());
      console.log('Correo de restablecimiento enviado con éxito');
    } catch (error: any) {
      console.error('Error al enviar el correo de restablecimiento:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  /**
   * Convierte códigos de error de Firebase en mensajes amigables.
   */
  private getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/invalid-email': 'El formato del correo es inválido.',
      'auth/user-not-found': 'No existe ninguna cuenta con este correo.',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet.',
    };
    return errorMessages[errorCode] || 'Hubo un error al procesar la solicitud.';
  }

}
