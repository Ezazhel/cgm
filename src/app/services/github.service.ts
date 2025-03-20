import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly httpClient = inject(HttpClient);

  getRepos(filters?: any) {

  }
}
