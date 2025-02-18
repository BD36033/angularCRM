import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdministrationService } from './administration.service';
import { Administration, EquipementType } from './administration';

describe('AdministrationService', () => {
  let service: AdministrationService;
  let httpMock: HttpTestingController;

  const mockSalle = {
    id: 1,
    address: '123 rue Test',
    telephone: '0123456789',
    capacity: 10,
    accessibility: true,
    equipments: ['TABLE']
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdministrationService]
    });

    service = TestBed.inject(AdministrationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a new salle', () => {
    // Gérer la requête initiale de loadSalles()
    const initialReq = httpMock.expectOne('http://localhost:3000/rooms');
    initialReq.flush([]);

    const newSalle = {
      adresse: '123 rue Test',
      telephone: '0123456789',
      capacite: 10,
      accesibilite: true,
      equipements: [EquipementType.TABLE]
    };

    service.createSalle(newSalle).subscribe(salle => {
      expect(salle.id).toBe(1);
      expect(salle.adresse).toBe(newSalle.adresse);
    });

    const req = httpMock.expectOne('http://localhost:3000/rooms');
    expect(req.request.method).toBe('POST');
    req.flush(mockSalle);
  });
}); 