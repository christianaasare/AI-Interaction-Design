import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectScenarioComponent } from './select-scenario.component';

describe('SelectScenarioComponent', () => {
  let component: SelectScenarioComponent;
  let fixture: ComponentFixture<SelectScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectScenarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
