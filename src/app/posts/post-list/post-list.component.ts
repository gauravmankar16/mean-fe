import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // @Input() posts: Post[];
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10]
  private postSub: Subscription;

  constructor(public PostsService: PostsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.PostsService.getPosts(this.postsPerPage, this.currentPage);
    this.postSub = this.PostsService.getPostUpdateListener()
      .subscribe( (postData: {posts: Post[], postCount: number}) => {
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
        this.isLoading = false;
      })
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.PostsService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

  deletePost(postId: string) {
    this.PostsService.deletePost(postId).subscribe(() => {
      this.PostsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  editPost() {

  }
}
