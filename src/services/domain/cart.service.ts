import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { CartItem } from "../../models/cart_item";

@Injectable()
export class CartService {

    constructor(public storage: StorageService) { }

    createOrClearCart(): Cart {
        let cart: Cart = { items: [] };
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let indxItem = cart.items.findIndex(prod => prod.produto.id == produto.id);
        if (indxItem == -1) {
            let cartItem: CartItem = { produto: produto, quantidade: 1 };
            cart.items.push(cartItem);
        } else {
            cart.items[indxItem].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let indxItem = cart.items.findIndex(prod => prod.produto.id == produto.id);
        console.log(indxItem);
        if (indxItem != -1) {
            cart.items.splice(indxItem);
        }
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let indxItem = cart.items.findIndex(prod => prod.produto.id == produto.id);
        console.log(indxItem);
        if (indxItem != -1) {
            cart.items[indxItem].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let indxItem = cart.items.findIndex(prod => prod.produto.id == produto.id);
        console.log(indxItem);
        if (indxItem != -1) {
            cart.items[indxItem].quantidade--;
            if (cart.items[indxItem].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total(): number {
        return this.getCart().items.map(carItem => carItem.quantidade * carItem.produto.preco).reduce((valorAnt, valorAtu) => valorAnt + valorAtu, 0);
    }
}