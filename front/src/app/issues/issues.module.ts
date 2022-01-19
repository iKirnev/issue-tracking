import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IssuesRoutes } from './issues.routing';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ListComponent, DialogIssueViewComponent, DialogIssueCreateComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(IssuesRoutes),
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ListComponent,
    DialogIssueViewComponent,
    DialogIssueCreateComponent
  ],
  entryComponents: [DialogIssueViewComponent, DialogIssueCreateComponent]
})
export class IssuesModule {}
