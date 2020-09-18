import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  paramMap$: Subscription;
  postId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnDestroy(): void {
    this.paramMap$.unsubscribe();
  }

  ngOnInit(): void {
    this.paramMap$ = this.route.paramMap.subscribe((params: ParamMap) => {
      this.postId = params.get('postId');
    });
  }
}
