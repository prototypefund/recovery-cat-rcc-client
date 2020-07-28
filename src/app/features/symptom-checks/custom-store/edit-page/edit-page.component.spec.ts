import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomSymptomCheck.componentComponent } from './custom-symptom-check.component.component';

describe('CustomSymptomCheck.componentComponent', () => {
  let component: CustomSymptomCheck.componentComponent;
  let fixture: ComponentFixture<CustomSymptomCheck.componentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSymptomCheck.componentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSymptomCheck.componentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
