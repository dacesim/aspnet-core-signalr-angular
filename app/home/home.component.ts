import { Component, OnInit } from '@angular/core';

import { FeedService } from '../shared/feed.service';
import { Match } from '../shared/interfaces';
import { DataService } from '../shared/data.service';
import { ConnectionState } from '../shared/interfaces';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html'
})
export class HomeComponent implements OnInit {

    matches: Match[];
    error: any;

    constructor(private dataService: DataService,
        private feedService: FeedService) { }

    ngOnInit() {
        let self = this;

        self.feedService.connectionState
            .subscribe(
            connectionState => {
                if (connectionState == ConnectionState.Connected) {
                    console.log('Connected!');
                    self.loadMatches();
                } else {
                    console.log(connectionState.toString());
                }
            },
            error => {
                this.error = error;
                console.log(error);
            });
    }

    loadMatches(): void {
        let self = this;
        this.dataService.getMatches()
            .subscribe((res: Match[]) => {
                self.matches = res;
                console.log(self.matches);
            },
            error => {
                console.log(error);
            });
    }
}