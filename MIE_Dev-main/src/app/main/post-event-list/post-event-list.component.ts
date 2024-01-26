import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-event-list',
  templateUrl: './post-event-list.component.html',
  styleUrls: ['./post-event-list.component.css']
})
export class PostEventListComponent implements OnInit {
  dynamicaUrl = "https://app.smartsheet.com/b/publish?EQBCT=f6872c4a9d2f48d5b81273e52312d197Smartsheet"

  constructor() { }

  ngOnInit(): void {
  }

}
