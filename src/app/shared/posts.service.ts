import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private apollo: Apollo) {}

  public getPosts() {
    return this.apollo.watchQuery<any>({
      query: gql`
        query BlogSamplesQuery {
          blogSamples {
            id
            title
          }
        }
      `,
    }).valueChanges;
  }

  public getPost(postId: string) {
    return this.apollo.watchQuery<any>({
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
    }).valueChanges;
  }
}
