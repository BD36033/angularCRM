import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrationComponent } from './administration.component';
import { AdministrationService } from './administration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Administration, EquipementType } from './administration';
import { of } from 'rxjs';

describe('AdministrationComponent', () => {
  let component: AdministrationComponent;
  let fixture: ComponentFixture<AdministrationComponent>;
  let service: AdministrationService;

  // Mock data pour les tests
  const mockSalle: Administration = new Administration(
    1,
    '123 rue Test',
    '0123456789',
    10,
    true,
    [EquipementType.TABLE]
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ],
      providers: [AdministrationService]
    }).compileComponents();

    service = TestBed.inject(AdministrationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load salles on init', () => {
    // Arrange
    const mockSalles = [mockSalle];
    spyOn(service, 'getSalles').and.returnValue(of(mockSalles));

    // Act
    component.ngOnInit();

    // Assert
    expect(component.dataSource.data).toEqual(mockSalles);
  });

  it('should navigate to new salle form when createSalle is called', () => {
    // Arrange
    const routerSpy = spyOn(component['router'], 'navigate');

    // Act
    component.createSalle();

    // Assert
    expect(routerSpy).toHaveBeenCalledWith(['/administration/new']);
  });

  it('should navigate to edit salle form when editSalle is called', () => {
    // Arrange
    const routerSpy = spyOn(component['router'], 'navigate');
    const salleId = 1;

    // Act
    component.editSalle(salleId);

    // Assert
    expect(routerSpy).toHaveBeenCalledWith(['/administration', salleId]);
  });

  it('should delete salle when confirmed', () => {
    // Arrange
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteSpy = spyOn(service, 'deleteSalle').and.returnValue(of({}));
    const getSallesSpy = spyOn(service, 'getSalles').and.returnValue(of([mockSalle]));

    // Act
    component.deleteSalle(1);

    // Assert
    expect(deleteSpy).toHaveBeenCalledWith(1);
    expect(getSallesSpy).toHaveBeenCalled();
  });

  it('should not delete salle when not confirmed', () => {
    // Arrange
    spyOn(window, 'confirm').and.returnValue(false);
    const deleteSpy = spyOn(service, 'deleteSalle');

    // Act
    component.deleteSalle(1);

    // Assert
    expect(deleteSpy).not.toHaveBeenCalled();
  });
});
