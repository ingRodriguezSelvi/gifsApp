import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private gifService:GifsService) { }

  get history(){
    return this.gifService.history;
  }

  ngOnInit(): void {
  }

  search(item:string){
    this.gifService.searchGifs(item);
  }
}
