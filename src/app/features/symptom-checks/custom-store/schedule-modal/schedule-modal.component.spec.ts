import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Schedule.componentComponent } from './schedule.component.component';

describe('Schedule.componentComponent', () => {
  let component: Schedule.componentComponent;
  let fixture: ComponentFixture<Schedule.componentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Schedule.componentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Schedule.componentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
