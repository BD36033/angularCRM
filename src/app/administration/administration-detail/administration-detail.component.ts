import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Administration, EquipementType } from '../administration';
import { AdministrationService } from '../administration.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-administration-detail',
  templateUrl: './administration-detail.component.html',
  styleUrls: ['./administration-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class AdministrationDetailComponent implements OnInit {
  @ViewChild('salleForm') salleForm!: NgForm;
  salle?: Administration;
  hasTable = false;
  hasVisio = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private administrationService: AdministrationService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.salle = this.administrationService.getSalleById(id);
    
    if (this.salle) {
      this.hasTable = this.salle.equipements.includes(EquipementType.TABLE);
      this.hasVisio = this.salle.equipements.includes(EquipementType.VISIO);
    } else {
      this.goBack();
    }
  }

  updateEquipements(type: string) {
    if (!this.salle) return;
    
    const equipType = type as EquipementType;
    const index = this.salle.equipements.indexOf(equipType);
    
    if (type === 'Table' && this.hasTable && index === -1) {
      this.salle.equipements.push(EquipementType.TABLE);
    } else if (type === 'Table' && !this.hasTable && index !== -1) {
      this.salle.equipements.splice(index, 1);
    }
    
    if (type === 'Visio' && this.hasVisio && index === -1) {
      this.salle.equipements.push(EquipementType.VISIO);
    } else if (type === 'Visio' && !this.hasVisio && index !== -1) {
      this.salle.equipements.splice(index, 1);
    }
  }

  save() {
    if (this.salle) {
      this.administrationService.updateSalle(this.salle);
      this.goBack();
    }
  }

  delete() {
    if (this.salle) {
      this.administrationService.deleteSalle(this.salle.id);
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['/administration']);
  }
} 