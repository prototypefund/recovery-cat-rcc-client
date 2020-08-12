import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QueryRunPageComponent } from './query-run-page.component';

describe('QueryRunPageComponent', () => {
  let component: QueryRunPageComponent;
  let fixture: ComponentFixture<QueryRunPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryRunPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QueryRunPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
