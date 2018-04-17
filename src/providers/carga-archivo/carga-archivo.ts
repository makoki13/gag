import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import 'rxjs/add/operator/map';

@Injectable()
export class CargaArchivoProvider {

  imagenes: ArchivoSubir[] = [];
  lastKey: string;  

  constructor(public toastCtrl: ToastController, public afdb: AngularFireDatabase) {
    console.log('Hello CargaArchivoProvider Provider');

    this.cargar_ultimo_key().subscribe( () => this.carga_imagenes());
  }

  private cargar_ultimo_key() {
    return this.afdb.list( '/post', ref => ref.orderByKey().limitToLast(1) )
             .valueChanges()
             .map( (post:any) => {
               console.log(post);
               this.lastKey = post[0].key;

               this.imagenes.push (post[0]);
             })
  }

  carga_imagenes() {
    return new Promise( ( resolve, reject  ) => {
      this.afdb.list('/post', 
        ref => ref.limitToLast(3)
                  .orderByKey()
                  .endAt( this.lastKey )
      ).valueChanges()
       .subscribe( (posts:any) => {
         posts.pop();

          if (posts.length === 0 ) {
            console.log('No hay más registros');
            resolve(false);
            return;
          }

          this.lastKey = posts[0].key;

          for (let i = posts.length-1; i>=0; i--) {
            let post = posts[i];
            this.imagenes.push (post);
          }

          resolve(true);
       });
    });
  }

  cargar_imagen_firebase(archivo: ArchivoSubir) {
    let promesa = new Promise((resolve, reject) => {
      this.mostrar_toast( 'Cargando...');

      let storeRef = firebase.storage().ref();
      let nombreArchivo: string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask = 
        storeRef.child(`img/${ nombreArchivo }`)
                .putString( archivo.img, 'base64', { contentType: 'image/jpeg'});
      uploadTask.on ( firebase.storage.TaskEvent.STATE_CHANGED,
        () => {}, // Saber el porcentaje subido
        ( error ) => {
          // manejo de error
          console.log ("Error en la carga");
          console.log (JSON.stringify(error));
          this.mostrar_toast ( JSON.stringify(error) );
        },
        () => {
          // Todo bien
          console.log('Archivo subido');

          this.mostrar_toast( 'Imagen cargada correctamente' );

          let url = uploadTask.snapshot.downloadURL;
        
          this.crear_post ( archivo.titulo, url, nombreArchivo ) ;

          resolve();
        }
      );
    });

    return promesa;

  }

  private crear_post(titulo: string, url: string, nombreArchivo: string) {
    let post : ArchivoSubir = {
      img: url,
      titulo: titulo,
      key: nombreArchivo
    };

    console.log( JSON.stringify( post ) );
  
    //this.afdb.list('/post').push(post); una forma de hacerlo
    this.afdb.object(`/post/${ nombreArchivo }`).update( post );
    this.imagenes.push ( post );
    
  }

  mostrar_toast( mensaje: string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    }).present();    
  }
}

interface ArchivoSubir {
  titulo: string;
  img: string;
  key?: string;
}
