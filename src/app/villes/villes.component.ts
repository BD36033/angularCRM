import { Component, OnInit, ViewChild } from '@angular/core';
import { VillesService } from './villes.service';
import { Ville } from './villes';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-villes',
  templateUrl: './villes.component.html',
  styleUrls: ['./villes.component.css'],
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
export class VillesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'code', 'codeDepartement', 'siren', 'codeEpci', 'codeRegion', 'codesPostaux', 'population'];
  dataSource = new MatTableDataSource<Ville>([]);
  totalVilles = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  searchForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private villesService: VillesService,
    private formBuilder: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource<Ville>([]);
    this.searchForm = this.formBuilder.group({
      nom: [''],
      codePostal: ['']
    });
  }

  ngOnInit(): void {
    this.loadVilles();
    
    // Écouter les changements dans le formulaire
    this.searchForm.valueChanges.subscribe(() => {
      this.onSearch();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadVilles(event?: PageEvent) {
    const pageIndex = event?.pageIndex ?? 0;
    const pageSize = event?.pageSize ?? this.pageSize;

    this.villesService.getVillesPaginated(pageIndex, pageSize).subscribe(response => {
      this.dataSource.data = response.villes;
      this.totalVilles = response.total;
    });
  }

  onSearch(): void {
    const { nom, codePostal } = this.searchForm.value;
    
    if (nom) {
      this.villesService.searchVilles(nom).subscribe(response => {
        this.dataSource.data = response;
        this.totalVilles = response.length;
      });
    } else if (codePostal) {
      this.villesService.getVillesByCodePostal(codePostal).subscribe(response => {
        this.dataSource.data = response;
        this.totalVilles = response.length;
      });
    } else {
      this.loadVilles();
    }
  }
}