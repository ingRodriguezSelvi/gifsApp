import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../models/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  apiKey: string = '2mBzsa7AeBeucELQdcdwv31C4vG3bjLE';
  url:string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  //TODO: implement
  public results:Gif[] = [];

  constructor(private http: HttpClient) {

    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('fastResult')!) || [];
  }

  get history(): string[] {
    return [...this._history];
  }

  searchGifs(search: string) {
    console.log('searching for: ', search);
    search = search.trim().toUpperCase();
    if (!this._history.includes(search)) {
      this._history.unshift(search);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', search)
      .set('limit', '10');
    this.http
      .get<SearchGifsResponse>(`${this.url}/search`, { params })
      .subscribe((response: SearchGifsResponse) => {
        this.results = response.data;
        localStorage.setItem('fastResult', JSON.stringify(this.results));
      });
  }
}
