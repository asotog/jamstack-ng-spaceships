import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  paramMap$: Subscription;
  postId: string;
  post: any;

  private querySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.paramMap$ = this.route.paramMap.subscribe((params: ParamMap) => {
      this.postId = params.get('postId');

      this.querySubscription = this.postsService
        .getPost(this.postId)
        .subscribe(({ data, loading }) => {
          this.post = data.blogSample;
        });
    });
  }

  ngOnDestroy(): void {
    this.paramMap$.unsubscribe();
    this.querySubscription.unsubscribe();
  }
}
