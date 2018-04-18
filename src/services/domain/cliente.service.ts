import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { PREFIX_CONSTANT } from "../../enums/prefix.enum";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService) { }

    findByEmail(email: string): Observable<ClienteDTO> {

        let token = this.storage.getUserLocal().token;
        let authHeader = new HttpHeaders({ 'Authorization': 'Brarer ' + token });

        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?email=${email}`,
            { 'headers': authHeader }
        );
    }

    getImagemFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/${PREFIX_CONSTANT.CLIENTE + id}.jpg`
        return this.http.get(url, { responseType: 'blob' });
    }

}