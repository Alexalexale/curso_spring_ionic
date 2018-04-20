import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { PREFIX_CONSTANT } from "../../enums/prefix.enum";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) { }

    findByCategoria(categoria_id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos?categorias=${categoria_id}`);
    }

    getSmallImeageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/${PREFIX_CONSTANT.PRODUTO + id}-small.jpg`;
        return this.http.get(url, { responseType: 'blob' });
    }

}