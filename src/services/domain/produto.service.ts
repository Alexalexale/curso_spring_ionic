import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { PREFIX_CONSTANT } from "../../enums/prefix.enum";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) { }

    findByCategoria(categoria_id: string, page: number = 0, linesPage: number = 24) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos?categorias=${categoria_id}&page=${page}&linesPage=${linesPage}`);
    }

    findbyId(produto_id: string) {
        console.log(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`)
    }

    getSmallImeageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/${PREFIX_CONSTANT.PRODUTO + id}-small.jpg`;
        return this.http.get(url, { responseType: 'blob' });
    }

    getImeageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/${PREFIX_CONSTANT.PRODUTO + id}.jpg`;
        return this.http.get(url, { responseType: 'blob' });
    }
}