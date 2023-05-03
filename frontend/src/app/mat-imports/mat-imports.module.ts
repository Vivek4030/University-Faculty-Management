import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSelectModule} from '@angular/material/select'; 
import { MatOptionModule } from '@angular/material/core';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 

const materialsUsed: any = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  TextFieldModule,
  MatSelectModule,
  MatOptionModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialsUsed
  ],
  exports: [
    materialsUsed
  ]
})
export class MatImportsModule { }
