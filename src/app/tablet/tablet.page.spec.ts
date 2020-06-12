import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabletPage } from './tablet.page';

describe('TabletPage', () => {
  let component: TabletPage;
  let fixture: ComponentFixture<TabletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
