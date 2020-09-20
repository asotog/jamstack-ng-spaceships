import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

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

  constructor(private route: ActivatedRoute, private apollo: Apollo) {}

  ngOnInit(): void {
    this.paramMap$ = this.route.paramMap.subscribe((params: ParamMap) => {
      this.postId = params.get('postId');

      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: gql`
            query BlogSampleQuery {
              blogSample(where: { id: "${this.postId}" }) {
                id
                title
                content {
                  html
                }
                image {
                  url
                }
                credits
              }
            }
          `,
        })
        .valueChanges.subscribe(({ data, loading }) => {
          this.post = data.blogSample;
        });
    });
  }

  ngOnDestroy(): void {
    this.paramMap$.unsubscribe();
    this.querySubscription.unsubscribe();
  }
}
