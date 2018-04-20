import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart_item';
import { ProdutoService } from '../../services/domain/produto.service';
import { PREFIX_CONSTANT } from '../../enums/prefix.enum';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems: CartItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService,
    public produtoService: ProdutoService) { }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.cartItems = cart.items;
    this.cartItems.forEach(cartItem => {
      this.produtoService.getSmallImeageFromBucket(cartItem.produto.id)
        .subscribe(response => {
          cartItem.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/${PREFIX_CONSTANT.PRODUTO + cartItem.produto.id}-small.jpg`;
        }, error => { })
    });
  }

}
