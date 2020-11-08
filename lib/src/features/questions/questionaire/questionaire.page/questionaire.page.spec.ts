import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Questionaire.PageComponent } from './questionaire.page.component';

describe('Questionaire.PageComponent', () => {
  let component: Questionaire.PageComponent;
  let fixture: ComponentFixture<Questionaire.PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Questionaire.PageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Questionaire.PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
