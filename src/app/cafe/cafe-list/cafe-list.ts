import { Component, OnInit, inject, signal } from '@angular/core';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-list',
  standalone: false,
  templateUrl: './cafe-list.html',
  styleUrl: './cafe-list.css',
})
export class CafeList implements OnInit {
  private readonly cafeService = inject(CafeService);

  readonly cafes = signal<Cafe[]>([]);

  ngOnInit(): void {
    this.getCafes();
  }

  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => this.cafes.set(cafes));
  }
}
