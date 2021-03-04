import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { MainRoutingModule } from './main-routing.module';
import { PostComponent } from './post/post.component';



@NgModule({
  declarations: [UsersComponent, PostComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
