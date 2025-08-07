import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-comic',
  templateUrl: './add-comic.component.html',
  styleUrls: ['./add-comic.component.css']
})
export class AddComicComponent {

  constructor(private router: Router) {}

  comic = {
    title: '',
    issue: '',
    purchasePrice: 0,
    purchaseDate: ''
  };

  saveComic() {
    // This is where we'll POST to the backend later
    console.log('Comic to save:', this.comic);

    // For now, just go back to collection view
    this.router.navigate(['/collection']);
  }
}
