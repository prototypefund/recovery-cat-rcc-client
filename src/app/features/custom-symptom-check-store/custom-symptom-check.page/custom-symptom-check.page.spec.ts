import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomSymptomCheck.PageComponent } from './custom-symptom-check.page.component';

describe('CustomSymptomCheck.PageComponent', () => {
  let component: CustomSymptomCheck.PageComponent;
  let fixture: ComponentFixture<CustomSymptomCheck.PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSymptomCheck.PageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSymptomCheck.PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
