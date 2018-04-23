import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { PREFIX_CONSTANT } from '../../enums/prefix.enum';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService,
    public loading: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoria_id = this.navParams.get('categoria_id')
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        let startPos = this.items.length;
        this.items = this.items.concat(response['content']);
        let endPos = this.items.length;
        loader.dismiss();
        this.loadImgUrls(startPos, endPos);
      }, error => {
        loader.dismiss();
      });
  }

  loadImgUrls(startPos: number, endPos: number) {
    console.log(this.items.slice(startPos, endPos));
    this.items.slice(startPos, endPos).forEach(item => {
      this.produtoService.getSmallImeageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/${PREFIX_CONSTANT.PRODUTO + item.id}-small.jpg`;
        }, error => { })
    });
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id });
  }

  presentLoading() {
    let loader = this.loading.create({
      content: "Aguarde ..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}