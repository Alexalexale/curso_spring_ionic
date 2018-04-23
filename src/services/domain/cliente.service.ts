import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { PREFIX_CONSTANT } from "../../enums/prefix.enum";
import { ImageUtilService } from "../image_util.service";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService, public imageService: ImageUtilService) { }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    getImagemFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/${PREFIX_CONSTANT.CLIENTE + id}.jpg`
        return this.http.get(url, { responseType: 'blob' });
    }

    insert(obj: ClienteDTO) {
        let url = `${API_CONFIG.baseUrl}/clientes`
        return this.http.post(url, obj, { observe: 'response', responseType: 'text' });
    }

    uploadPicture(picture) {
        let pictureBlob = this.imageService.dataUriToBlob(picture);
        let formData: FormData = new FormData();
        formData.append('file', pictureBlob, 'file.png');
        let url = `${API_CONFIG.baseUrl}/clientes/picture`
        return this.http.post(url, formData, { observe: 'response', responseType: 'text' });
    }
}