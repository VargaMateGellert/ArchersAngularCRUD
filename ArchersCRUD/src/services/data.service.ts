import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArcherModel } from '../app/models/archerModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:3000/archers';

  constructor(private http: HttpClient) { }

  getArchers(): Observable<ArcherModel[]> {
    return this.http.get<ArcherModel[]>(this.url);
  }

  addArcher(archer: ArcherModel): Observable<ArcherModel> {
    return this.http.post<ArcherModel>(this.url, archer);
  }

  modifyArcher(archer: ArcherModel): Observable<ArcherModel> {
    return this.http.put<ArcherModel>(this.url + '/' + archer.id, archer);
  }

  deleteArcher(archer: ArcherModel): Observable<ArcherModel> {
    return this.http.delete<ArcherModel>(this.url + '/' + archer.id);
  }
}
