import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('txtSearch') txtSearch!:ElementRef;

  constructor(private gifService:GifsService) { }

  search(){
    if(this.txtSearch.nativeElement.value.length == 0){
      return
    }
    const value  = this.txtSearch.nativeElement.value;
    this.gifService.searchGifs(value);
    this.txtSearch.nativeElement.value = '';
  }

}
