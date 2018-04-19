import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';

import { SocialSharing } from '@ionic-native/social-sharing';

import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hayMas: boolean = true;
  //posts: Observable<any[]>;

  constructor(private modalCtrl: ModalController, private _cap: CargaArchivoProvider, private socialSharing: SocialSharing) {
    //this.posts = afDB.list('post').valueChanges();
  }

  mostrar_modal() {
    let modal = this.modalCtrl.create ( SubirPage );
    modal.present();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this._cap.carga_imagenes().then ( 
      (hayMas:boolean)  => {
        console.log(hayMas);
        this.hayMas = hayMas;
        infiniteScroll.complete();
      });    
  }

  compartir( post: any) {
    this.socialSharing.shareViaFacebook(post.titulo, post.img, post.img )
      .then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

}
