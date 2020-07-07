import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MetaStore.PageComponent } from './meta-store.page.component';

describe('MetaStore.PageComponent', () => {
  let component: MetaStore.PageComponent;
  let fixture: ComponentFixture<MetaStore.PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaStore.PageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MetaStore.PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
