import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {NgForm} from '@angular/forms';
import * as tableData from './settings';
import { LocalDataSource } from 'ng2-smart-table';
import { IssueService, StatusService, ReporterService } from './../../_services';
import { Status, Reporter } from './../../_models';
import { first } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.html',
})
export class DialogIssueViewComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogIssueViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.html',
})
export class DialogIssueCreateComponent {
  fileToUpload: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<DialogIssueCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onFileChange(e): void {
    this.fileToUpload = e.target.files.item(0);
  }

  onClick(d): void {
    this.dialogRef.close({...d, file: this.fileToUpload});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  source: LocalDataSource;
  statuses: Status[];
  reporters: Reporter[];
  constructor(private issueService: IssueService, private statusService: StatusService, private reporterService: ReporterService, public dialog: MatDialog) {
    // this.source = new LocalDataSource(tableData.data); // create the source
  }
  settings = tableData.settings;
  ngOnInit() {
    this.issueService.getAll().pipe(first()).subscribe(data => {
      this.source = new LocalDataSource(data);
    },error => {});
    
    this.statusService.getAll().pipe(first()).subscribe(data => {
      this.statuses = data;
    },error => {});

    this.reporterService.getAll().pipe(first()).subscribe(data => {
      this.reporters = data;
    },error => {});
  }
  onUserRowSelect(event): void {
    const dialogRef = this.dialog.open(DialogIssueViewComponent, {
      width: '500px',
      data: {apiUrl: environment.apiUrl, issue: event.data, statuses: this.statuses},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.issueService.update(result.issue).pipe(first()).subscribe(d => {
        this.issueService.getAll().pipe(first()).subscribe(data => {
          this.source = new LocalDataSource(data);
        },error => {});
      },error => {});
    });
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(DialogIssueCreateComponent, {
      width: '500px',
      data: {issue: {status_id: 1}, reporters: this.reporters, statuses: this.statuses},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.issueService.create(result).pipe(first()).subscribe(d => {
        this.issueService.getAll().pipe(first()).subscribe(data => {
          this.source = new LocalDataSource(data);
        },error => {});
      },error => {});
    });
  }
}
