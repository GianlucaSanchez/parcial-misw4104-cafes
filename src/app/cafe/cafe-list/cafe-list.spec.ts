import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';
import { CafeList } from './cafe-list';

describe('CafeList', () => {
  let component: CafeList;
  let fixture: ComponentFixture<CafeList>;
  let compiled: HTMLElement;

  const cafes: Cafe[] = [
    new Cafe(1, 'Café Uno', 'Blend', 'Región Uno', 'Sabor Uno', 1500, 'https://example.com/1.png'),
    new Cafe(2, 'Café Dos', 'Café de Origen', 'Región Dos', 'Sabor Dos', 1600, 'https://example.com/2.png'),
    new Cafe(3, 'Café Tres', 'Café de Origen', 'Región Tres', 'Sabor Tres', 1700, 'https://example.com/3.png'),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CafeList],
      providers: [{ provide: CafeService, useValue: { getCafes: () => of(cafes) } }],
    }).compileComponents();

    fixture = TestBed.createComponent(CafeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a table with 3 rows plus the header', () => {
    expect(compiled.querySelectorAll('thead tr').length).toBe(1);
    expect(compiled.querySelectorAll('tbody tr').length).toBe(3);
    expect(compiled.querySelectorAll('table tr').length).toBe(4);
  });

  it('should render each cafe name, type and region', () => {
    const rows = compiled.querySelectorAll('tbody tr');
    cafes.forEach((cafe, i) => {
      expect(rows[i].textContent).toContain(cafe.nombre);
      expect(rows[i].textContent).toContain(cafe.tipo);
      expect(rows[i].textContent).toContain(cafe.region);
    });
  });

  it('should count cafes by type', () => {
    expect(component.totalOrigen()).toBe(2);
    expect(component.totalBlend()).toBe(1);
  });
});
