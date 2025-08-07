import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {

  constructor(private router: Router) {}

  comics = [
    {
      id: 1,
      title: 'Amazing Spider-Man',
      issue: '#300',
      purchasePrice: 200,
      currentValue: 400
    },
    {
      id: 2,
      title: 'Batman',
      issue: '#1',
      purchasePrice: 500,
      currentValue: 450
    }
  ];

  goToAddComic() {
    this.router.navigate(['/add-comic']);
  }

  viewComic(id: number) {
    this.router.navigate(['/comic', id]);
  }
}
