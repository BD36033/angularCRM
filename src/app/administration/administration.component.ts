import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Administration, EquipementType } from './administration';
import { AdministrationService } from './administration.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'crm-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class AdministrationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'adresse', 'telephone', 'capacite', 'accessibilite', 'equipements', 'actions'];
  dataSource: MatTableDataSource<Administration>;
  formSearchSalles!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private administrationService: AdministrationService,
    private formBuilder: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource<Administration>([]);
  }

  createForm(): void {
    this.formSearchSalles = this.formBuilder.group({
      adresse: [''],
      capaciteMin: [''],
      capaciteMax: [''],
      accessibilite: [false],
      equipements: [[]]
    });

    // Réagir aux changements du formulaire
    this.formSearchSalles.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  ngOnInit() {
    this.createForm();
    this.administrationService.getSalles().subscribe(salles => {
      this.dataSource.data = salles;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(): void {
    const filterValue = this.formSearchSalles.value;
    
    this.dataSource.filterPredicate = (data: Administration, filter: string) => {
      const searchTerms = JSON.parse(filter);
      
      // Filtre par adresse
      if (searchTerms.adresse && !data.adresse.toLowerCase().includes(searchTerms.adresse.toLowerCase())) {
        return false;
      }
      
      // Filtre par capacité minimum
      if (searchTerms.capaciteMin && data.capacite < searchTerms.capaciteMin) {
        return false;
      }
      
      // Filtre par capacité maximum
      if (searchTerms.capaciteMax && data.capacite > searchTerms.capaciteMax) {
        return false;
      }
      
      // Filtre par accessibilité
      if (searchTerms.accessibilite && !data.accesibilite) {
        return false;
      }
      
      // Filtre par équipements
      if (searchTerms.equipements && searchTerms.equipements.length > 0) {
        if (!searchTerms.equipements.every((equip: EquipementType) => data.equipements.includes(equip))) {
          return false;
        }
      }
      
      return true;
    };
    
    this.dataSource.filter = JSON.stringify(filterValue);
  }

  onSubmit(): void {
    this.applyFilter();
  }

  onNew() {
    this.router.navigate(['/administration/new']);
  }

  onEdit(id: number) {
    this.router.navigate(['/administration', id]);
  }

  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) {
      this.administrationService.deleteSalle(id).subscribe({
        next: () => {
          this.administrationService.getSalles().subscribe(salles => {
            this.dataSource.data = salles;
          });
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Une erreur est survenue lors de la suppression de la salle');
        }
      });
    }
  }
}
