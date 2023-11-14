import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { AlphaNumSpecialDirective } from "app/directives/alpha-num-special.directive";
import { AlphaNumericFieldDirective } from "app/directives/alpha-numeric-field.directive";
import { AlphabetOnlyDirective } from "app/directives/alphabet-only.directive";
import { CapsOnlyDirective } from "app/directives/caps-only.directive";
import { NumberAndDecimalDirective } from "app/directives/number-and-decimal.directive";
import { NumberOnlyDirective } from "app/directives/number-only.directive";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
@NgModule({
    declarations: [
        // ViewFileComponent,
        AlphabetOnlyDirective,
        NumberOnlyDirective,
        AlphaNumericFieldDirective,
        CapsOnlyDirective,
        AlphaNumSpecialDirective,
        NumberAndDecimalDirective,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        FormsModule,
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatDialogModule,
        MatButtonModule,
        MatChipsModule,
        NgxSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        RouterModule,
        NgxSpinnerModule
        
        // AgmCoreModule.forRoot({
        //     apiKey: 'AIzaSyC3SrcUt_3iPERnX-hk46YYsKJiCTzJ5z0',
        //     libraries: ['places', 'drawing', 'geometry'],
        // }),


    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatDialogModule,
        MatButtonModule,
        MatChipsModule,
        NgxSpinnerModule,
        AlphabetOnlyDirective,
        NumberOnlyDirective,
        AlphaNumericFieldDirective,
        CapsOnlyDirective,
        AlphaNumSpecialDirective,
        NumberAndDecimalDirective,

        RouterModule,
        NgxSpinnerModule,
        
    ],
    entryComponents: [
    ],
    providers: [
        // HttpUtilsService,
    ]
})
export class SharedModule {
}
