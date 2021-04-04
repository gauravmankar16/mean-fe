import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  storedPost: Post[] = [];

  constructor(private authService: AuthService) {}

  onAddPost(post) {
    this.storedPost.push(post);
  }

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
