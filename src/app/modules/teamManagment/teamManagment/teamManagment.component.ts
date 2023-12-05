import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AddUserComponent } from "../add-user/add-user.component";
import { FormControl } from "@angular/forms";
import { TeamManagmentService } from "../teamManagment.service";
import { finalize } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { LoaderService } from "app/modules/shared/loader/loader.service";
import { DeleteComponent } from "app/modules/shared/delete/delete.component";

export interface UserData {
  
  user_id: number;
  full_name: string;
  email: string;
  created_by:  string;
  role_id: number;
  role_name:string;
}

@Component({
  selector: "app-teamManagment",
  templateUrl: "./teamManagment.component.html",
  styleUrls: ["./teamManagment.component.scss"],
})
export class TeamManagmentComponent implements OnInit{

  ngOnInit() {
    this.GetUser();
  }

  searchSelect = new FormControl("");
  searchList: string[] = ["Name", "Email", "Phone Number", "Role"];
  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];


  onAddUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: "70%",
      height: "auto",
    });

    dialogRef.afterClosed().subscribe((data) => { 
      if (data === true) {
        this.GetUser();
      }
    });
  }
  getImg(val){
    return "http://localhost:7001"+val;
  }

  onUpdateUser(data:any): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: "70%",
      height: "auto",
      data:data
    });

    dialogRef.afterClosed().subscribe((data) => { 
      if (data === true) {
        this.GetUser();
      }
    });
  }
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.GetUser();
  }
  displayedColumns: string[] = [
    "id",
    "name",
    "email",
    "role_name",
    "created_by",
    "action",
  ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
              private dialogRef: MatDialog,
              private teamManagmentService:TeamManagmentService,
              private toastr: ToastrService,
               public loaderService: LoaderService,) {
   
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDelete(id) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: "24%",
      height: "auto",
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === true) {
        this.loaderService.isLoading = true;
        this.teamManagmentService.RemoveUser(id)
        .pipe(
            finalize(() => {
              this.loaderService.isLoading = false;

            })
        )
        .subscribe((res) => {
            if (res.success === true) {
              this.GetUser();
              this.toastr.success('Deleted','Success');
            } else { 
              this.toastr.error('Something went wrong','Failed');
               
            }
        });
      } 
      }
    )
  }
  
  GetUser(){
    this.loaderService.isLoading = true;
    this.teamManagmentService.GetUser({page:this.pageIndex+1,limit:this.pageSize})
    .pipe(
        finalize(() => {
          this.loaderService.isLoading = false;

        })
    )
    .subscribe((res) => {
        console.log(res);
        if (res.success === true) {
          this.dataSource =new MatTableDataSource(res.data);
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator.length = res.data.total_records;
          this.length = res.data[0].total_records;
          // this.toastr.success('Login Successfully','Success');
        } else { 
          this.toastr.error('Something went wrong','Failed');
           
        }
    });
  }

  toggleBlock(id): void {
    this.loaderService.isLoading = true;
    this.teamManagmentService.BlockUser(id)
    .pipe(
        finalize(() => {
          this.loaderService.isLoading = false;
        })
    )
    .subscribe((res) => {
        console.log(res);
        if (res.success === true) {
          this.GetUser();
        } else { 
          this.toastr.error('Something went wrong','Failed');
           
        }
    });
  }
}