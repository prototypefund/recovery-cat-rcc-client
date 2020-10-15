import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSymptomChecks.PageComponent } from './view-symptom-checks.page.component';

describe('ViewSymptomChecks.PageComponent', () => {
  let component: ViewSymptomChecks.PageComponent;
  let fixture: ComponentFixture<ViewSymptomChecks.PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSymptomChecks.PageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSymptomChecks.PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
