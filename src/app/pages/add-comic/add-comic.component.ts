import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-comic',
  templateUrl: './add-comic.component.html',
  styleUrls: ['./add-comic.component.css']
})
export class AddComicComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); // Go to previous page
  }
}
