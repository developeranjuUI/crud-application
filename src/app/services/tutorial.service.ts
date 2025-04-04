import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  apiUrl = `${environment.apiUrl}/tutorials`;
  
  constructor(private http: HttpClient){ }
  
  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(this.apiUrl);
  }

  get(id: any): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${this.apiUrl}/${id}`);
  }

  create(data: any): Observable<any>{
    return this.http.post(this.apiUrl, data);
  }

  update(id: any,data: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: any): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  deleteAll(): Observable<any>{
    return this.http.delete(this.apiUrl);
  }

  findByTitle(title: any): Observable<Tutorial[]>{
    return this.http.get<Tutorial[]>(`${this.apiUrl}?title=${title}`);
  }

  getPaginatedTutorials(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paginated/list`,
      { params: { page: page.toString(), size: size.toString() } });
  }

}
