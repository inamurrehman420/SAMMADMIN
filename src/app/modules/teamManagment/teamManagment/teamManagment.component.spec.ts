import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamManagmentComponent } from './teamManagment.component';



describe('TeamManagmentComponent', () => {
  let component: TeamManagmentComponent;
  let fixture: ComponentFixture<TeamManagmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamManagmentComponent]
    });
    fixture = TestBed.createComponent(TeamManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
