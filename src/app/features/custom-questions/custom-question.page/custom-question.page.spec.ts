import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomQuestion.PageComponent } from './custom-question.page.component';

describe('CustomQuestion.PageComponent', () => {
  let component: CustomQuestion.PageComponent;
  let fixture: ComponentFixture<CustomQuestion.PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomQuestion.PageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomQuestion.PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
