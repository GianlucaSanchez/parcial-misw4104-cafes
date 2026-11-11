import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cafe } from './cafe';

@Injectable({
  providedIn: 'root',
})
export class CafeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.baseUrl + '202212_MISW4104_Grupo3.json';

  getCafes(): Observable<Cafe[]> {
    return this.http.get<Cafe[]>(this.apiUrl);
  }
}
