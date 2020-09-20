import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private querySubscription: Subscription;

  posts: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: gql`
          query BlogSamplesQuery {
            blogSamples {
              id
              title
            }
          }
        `,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.posts = data.blogSamples;
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
