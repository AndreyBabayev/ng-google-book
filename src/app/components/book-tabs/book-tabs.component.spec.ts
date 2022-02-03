import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTabsComponent} from './book-tabs.component';

describe('BookTabsComponent', () => {
  let component: BookTabsComponent;
  let fixture: ComponentFixture<BookTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
