import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart_item';
import { CartService } from '../../services/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public clienteService: ClienteService, public cartService: CartService) {
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {

    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoEntrega.id, response['enderecos']);
      }, error => {
        this.navCtrl.setRoot('HomePage');
      });

  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    return list.filter(end => end.id == id)[0];
  }

  total() {
    return this.cartService.total();
  }
}
