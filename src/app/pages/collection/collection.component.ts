import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  comics = [
    {
      id: 1,
      title: 'Amazing Spider-Man #300',
      purchasePrice: 200,
      currentValue: 400
    },
    {
      id: 2,
      title: 'Batman #1',
      purchasePrice: 500,
      currentValue: 450
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
