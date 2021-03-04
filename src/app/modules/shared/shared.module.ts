import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/global/alert/alert.component';
import { DotsComponent } from './components/global/dots/dots.component';
import { FormsModule } from '@angular/forms';
import { ControlErrorsDirective } from './directives/control-errors.directive';
import { ControlErrorComponent } from './components/global/control-error/control-error.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/global/sidebar/sidebar.component';

@NgModule({
  declarations: [AlertComponent, DotsComponent, ControlErrorComponent, DotsComponent,
    ControlErrorsDirective, SidebarComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [AlertComponent, ControlErrorComponent, ControlErrorsDirective,
    DotsComponent, SidebarComponent],
  entryComponents: [ControlErrorComponent],
})
export class SharedModule { }
