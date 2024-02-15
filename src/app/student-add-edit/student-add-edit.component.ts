import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrl: './student-add-edit.component.scss'
})
export class StudentAddEditComponent implements OnInit{
studentform: FormGroup;

education: string[]=[
'Matric',
'Diploma',
'Graduate',
'Post Graduate',
]

constructor(private _fb: FormBuilder,private _stdservice: StudentService,private _dialogRef: DialogRef<StudentAddEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
  this.studentform=this._fb.group({
    firstName: '',
    lastName: '',
    email: '',
    dob:'',
    gender:'',
    education:'',
    marks:'',
  });
}
ngOnInit(): void {
  this.studentform.patchValue(this.data);
}
onformSubmit(){
  if(this.studentform.valid){
    if(this.data){
    this._stdservice.updateStudent(this.data.id,this.studentform.value).subscribe({
      next:(val: any)=>{
        alert('Student Updated Successfully');
        this._dialogRef.close();
      },
      error:(err :any)=>{
      console.error(err);
      },
    });
  }else
  {
    this._stdservice.addStudent(this.studentform.value).subscribe({
      next:(val: any)=>{
        alert('Student Added Successfully');
        this._dialogRef.close();
      },
      error:(err :any)=>{
      console.error(err);
      },
    });
  }
}}
}
