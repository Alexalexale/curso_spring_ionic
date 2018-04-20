import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/Categoria.DTO';
import { API_CONFIG } from '../../config/api.config';
import { PREFIX_CONSTANT } from '../../enums/prefix.enum';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  prefix: string = PREFIX_CONSTANT.CATEGORIA;
  items: CategoriaDTO[];
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
    }, error => { });
  }

  showProdutos() {
    this.navCtrl.push('ProdutosPage');
  }

}