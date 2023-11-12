import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_BASE = 'http://localhost:8080/api/v1'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http:HttpClient) { }

  getRecipes(){
    return this.http.get(`${API_BASE}/allRecipes`)
  }

  create(recipe:any){
    return this.http.post(`${API_BASE}/newRecipe`,recipe)
  }

  update(id: string, recipe:any){
    return this.http.put(`${API_BASE}/update/${id}`,recipe)
  }
  delete(id: string){
    return this.http.delete(`${API_BASE}/delete/${id}`)
  }

  searchRecipes(word: String){
    return this.http.get(`${API_BASE}/search/${word}`)
  }

}

