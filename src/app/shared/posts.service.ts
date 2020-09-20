import { Injectable } from '@angular/core';
import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';
import { Apollo, gql } from 'apollo-angular';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private apollo: Apollo,
    private transferStateService: TransferStateService
  ) {}

  public getPosts() {
    if (isScullyGenerated()) {
      return this.transferStateService.getState<any>(`/posts`);
    }
    return this.apollo
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
      .valueChanges.pipe(
        tap((data) => this.transferStateService.setState<any>(`/posts`, data))
      );
  }

  public getPost(postId: string) {
    if (isScullyGenerated()) {
      return this.transferStateService.getState<any>(`/p/${postId}`);
    }
    return this.apollo
      .watchQuery<any>({
        query: gql`
        query BlogSampleQuery {
          blogSample(where: { id: "${postId}" }) {
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
      .valueChanges.pipe(
        tap((data) =>
          this.transferStateService.setState<any>(`/p/${postId}`, data)
        )
      );
  }
}
