import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { LoaderService } from "app/modules/shared/loader/loader.service";
import { ToastrService } from "ngx-toastr";
import { finalize } from "rxjs";
import { UserData } from "../../teamManagment/teamManagment/teamManagment.component";
import { RecipeService } from "../recipe.service";
import { DeleteComponent } from "app/modules/shared/delete/delete.component";
import { RejectRecipeComponent } from "../reject-recipe/reject-recipe.component";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"],
})
export class RecipeComponent {

  ngOnInit() {
    this.GetRecipe();
  }

  searchSelect = new FormControl("");
  searchList: string[] = ["Name", "Email", "Phone Number", "Role"];
  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];




  onAddRecipe(): void {
    // const dialogRef = this.dialog.open(AddRecipeComponent, {
    //   width: "70%",
    //   height: "auto",
    // });

    // dialogRef.afterClosed().subscribe((data) => { 
    //   if (data === true) {
    //     this.GetRecipe();
    //   }
    // });
  }
  // getImg(val){
  //   if(val)
  //   return environment.imageBaseUrl+val;
  //   else
  //   return '../../../../assets/img/recipe-default.png';
  // }

 

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.GetRecipe();
  }
  displayedColumns: string[] = [
            "recipe_id",
            "recipe_name",
            "recipe_description",
            "action",
            "cook",
  ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
              private dialogRef: MatDialog,
              private recipeService:RecipeService,
              private toastr: ToastrService,
              public loaderService: LoaderService,
              private _router:Router) {
   
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  changeStatus(id){
    this.loaderService.isLoading = true;
    this.recipeService.ChangeRecipeStatus({recipe_id:id,recipe_status:"Approved",recipe_remarks:""})
    .pipe(
        finalize(() => {
          this.loaderService.isLoading = false;
        })
    )
    .subscribe((res) => {
        if (res.success === true) {
          this.toastr.success("User Added Successfully", "Success");
        }
    });    
  }
  onReject(data){
    const dialogRef = this.dialog.open(RejectRecipeComponent, {
      width: "70%",
      height: "auto",
      data:data
    });

    dialogRef.afterClosed().subscribe((data) => { 
      if (data === true) {
        // this.GetUser();
      }
    });
  }



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
        this.recipeService.RemoveRecipe(id)
        .pipe(
            finalize(() => {
              this.loaderService.isLoading = false
            })
        )
        .subscribe((res) => {
            if (res.success === true) {
              this.toastr.success('Deleted','Success');
            } else { 
              this.toastr.error('Something went wrong','Failed');
               
            }
        });
      } 
      }
    )
  }
  
  GetRecipe(){
    this.loaderService.isLoading = true;
    this.recipeService.GetRecipe({page:this.pageIndex+1,limit:this.pageSize})
    .pipe(
        finalize(() => {
          this.loaderService.isLoading = false
        })
    ).subscribe((res) => {
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

  onAddUser(){}
}
