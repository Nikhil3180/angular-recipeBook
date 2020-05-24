import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placehorder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { AlertComponent } from './alert/alert/alert.component';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
