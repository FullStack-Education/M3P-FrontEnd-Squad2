import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAdmDocenteComponent } from './inicio-adm-docente.component';

describe('InicioAdmDocenteComponent', () => {
  let component: InicioAdmDocenteComponent;
  let fixture: ComponentFixture<InicioAdmDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioAdmDocenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioAdmDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
