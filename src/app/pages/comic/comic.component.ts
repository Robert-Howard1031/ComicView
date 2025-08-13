import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {
  comic: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const comicId = Number(this.route.snapshot.paramMap.get('id'));

    const allComics = [
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

    this.comic = allComics.find(c => c.id === comicId);
  }
}
