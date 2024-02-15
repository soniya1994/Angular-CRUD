import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';
import { StudentService } from './services/student.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})
export class AppComponent implements OnInit {
  //title = 'student';
  displayedColumns: string[] = ['count','firstName', 'lastName', 'email', 'education','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog,private _stdservices: StudentService){}

    openAddEditStudForm(){
      const dialogRef = this._dialog.open(StudentAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getStudentList();
          }
        },
      });
    }

    
    ngOnInit(): void {
      this.getStudentList();
    }
    
    getStudentList(){
      this._stdservices.getStudentList().subscribe({
        next:(res)=>{
          this.dataSource=new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator=this.paginator;
        },
        error:console.log,

      });
    }
    deleteStudent(id: number){
      this._stdservices.deleteStudent(id).subscribe({
        next:(res)=>
        {
      alert('Record Deleted Successfully')
        },
        error:console.log,
      });
    }
    openEditForm(data: any) {
      const dialogRef = this._dialog.open(StudentAddEditComponent, {
        data,
      });
  
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getStudentList();
          }
        },
      });
    }
}
