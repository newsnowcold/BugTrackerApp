import { Component } from '@angular/core';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoader: boolean = false;

  constructor(
      private loaderService: LoaderService) {
  }

  ngOnInit() {
      this.loaderService.status.subscribe((val: boolean) => {
          this.showLoader = val;
      });
  }
}
