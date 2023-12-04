import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { studentdata } from './student.modal';
import { ApiService } from '../services/api.service';
import { generate } from 'rxjs';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  showadd!: boolean;
  showupdate!: boolean;
  formValue!: FormGroup;
  studentModelObj: studentdata = new studentdata();
  allStudentData: any;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.getData();
  }

  add() {
    this.showadd = true;
    this.showupdate = false;
  }
  edit(data: any) {
    this.showadd = false;
    this.showupdate = true;
    this.studentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['city'].setValue(data.city);
  }

  //Update On Edit

  update() {
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    this.studentModelObj.city = this.formValue.value.city;

    this.api
      .updateStudent(this.studentModelObj, this.studentModelObj.id)
      .subscribe(
        (res) => {
          this.formValue.reset();
          this.getData();
        },
        (err) => {
          alert('Something went Wrong!!');
        }
      );
  }
  addStudent() {
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    this.studentModelObj.city = this.formValue.value.city;
    this.api.PostStudent(this.studentModelObj).subscribe(
      (res) => {
        console.log(res);
        this.formValue.reset();
        this.getData();
        // alert('Added Successfully');
      },
      (err) => {
        alert('Something Went Wrong!!');
      }
    );
  }

  getData() {
    this.api.getStudent().subscribe((res) => {
      this.allStudentData = res;
    });
  }

  deleteStudent(data: any) {
    this.api.deleteStudent(data.id).subscribe((res) => {
      this.getData();
    });
  }
}
