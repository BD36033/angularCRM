import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Administration } from './administration';
import { AdministrationService } from './administration.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule
  ]
})
export class AdministrationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'adresse', 'telephone', 'capacite', 'accessibilite', 'equipements', 'actions'];
  dataSource: MatTableDataSource<Administration>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private administrationService: AdministrationService
  ) {
    this.dataSource = new MatTableDataSource<Administration>([]);
  }

  ngOnInit() {
    this.administrationService.getSalles().subscribe(salles => {
      this.dataSource.data = salles;
      this.dataSource.paginator = this.paginator;
    });
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
