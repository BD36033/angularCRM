import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Animateur } from './animateurs';
import { AnimateursService } from './animateurs.service';

@Component({
  selector: 'crm-animateurs',
  templateUrl: './animateurs.component.html',
  styleUrl: './animateurs.component.css',
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
  ],
})
export class AnimateursComponent {
  //composant animateurs dans administrations car un administrateurs peut gérer les animateurs
  displayedColumns: string[] = ['id', 'name', 'city', 'address', 'mail', 'telephone'];
  dataSource = new MatTableDataSource<Animateur>([]);
  totalAnimateurs = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  searchForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private animateurService: AnimateursService,
    private formBuilder: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource<Animateur>([]);
    this.searchForm = this.formBuilder.group({
      name: [''],
      city: ['']
    });
  }

  ngOnInit(): void {
    this.loadAnimateurs();

    //ecouter les changements dans le formulaire
    this.searchForm.valueChanges.subscribe(() => {
      this.onSearch();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadAnimateurs(event?: PageEvent) {
    const pageIndex = event?.pageIndex ?? 0;
    const pageSize = event?.pageSize ?? this.pageSize;

    this.animateurService.getAnimateursPaginated(pageIndex, pageSize).subscribe(response => {
      this.dataSource.data = response.animateurs;
      this.totalAnimateurs = response.total;
    });
  }

  onSearch(): void {
    const name = this.searchForm.get('name')?.value;
    const city = this.searchForm.get('city')?.value;

    this.animateurService.searchAnimateurs(name, city).subscribe(animateurs => {
      this.dataSource.data = animateurs;
    });
  }



}