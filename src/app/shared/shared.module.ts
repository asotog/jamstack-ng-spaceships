import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from './posts.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: PostsService,
    },
  ],
})
export class SharedModule {}
