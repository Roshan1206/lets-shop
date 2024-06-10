import { API_URL } from './../app.constant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${API_URL}/address/countries`);
  }

  getStates(code: string): Observable<State[]> {
    return this.httpClient.get<State[]>(`${API_URL}/address/states/${code}`);
  }
}
