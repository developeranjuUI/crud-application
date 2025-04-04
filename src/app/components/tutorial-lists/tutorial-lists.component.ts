import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-lists',
  templateUrl: './tutorial-lists.component.html',
  styleUrls: ['./tutorial-lists.component.scss']
})
export class TutorialListsComponent implements OnInit{
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  currentPages: any;
  totalPages: any;
  pageSize: number = 5;

  constructor(private tutorialService: TutorialService, private router: Router) { }

  ngOnInit(): void {
    // this.retrieveTutorialList();
    this.currentPages = 1; 
    this.getTutorials(this.currentPages);
  }

  retrieveTutorialList(): void {
    this.tutorialService.getAll()
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          console.log(data);
        },
        error: (err) => console.log(err)
      });
  }
  refreshList(): void {
    this.retrieveTutorialList();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (err) => console.log(err)
      });
  }

  searchTitle(): void{
    this.currentTutorial = {};
    this.currentIndex = -1;
    this.tutorialService.findByTitle(this.title)
      .subscribe({
        next: (data) =>{
          this.tutorials = data;
          console.log(data);
        },
        error: (err) => console.log(err)
      });
  }

  deleteTutorial(id: any, index: number): void {
    this.tutorialService.delete(id).subscribe({
      next: () => {
        // ✅ Remove the deleted tutorial from the UI list
        if (this.tutorials) {
          this.tutorials.splice(index, 1);
        }
        console.log("Tutorial deleted successfully!");
      },
      error: (err) => console.log(err)
    });
  }

  viewTutorial(id: any): void {
    // ✅ Navigate to the tutorial-detail page with the tutorial ID
    this.router.navigate(['/tutorial-detail', id]);
  }

  getTutorials(page: number): void {
    if (!page) {
      console.error("Page number is undefined! Defaulting to 1.");
      page = 1;
    }
  
    this.tutorialService.getPaginatedTutorials(page, this.pageSize).subscribe({
      next: (data) => {
        this.tutorials = data.tutorials;
        this.totalPages = data.totalPages;
        this.currentPages = data.currentPage;
        console.log("Fetched Page:", this.currentPages, "Total Pages:", this.totalPages, "Data:", this.tutorials);
      },
      error: (err) => console.log(err)
    });
  }  
  // pageSize(page: number, pageSize: number) {
  //   throw new Error('Method not implemented.');
  // }
  
  changePage(next: boolean): void {
    if (next && this.currentPages < this.totalPages) {
      this.currentPages++;
      this.getTutorials(this.currentPages);
    } else if (!next && this.currentPages > 1) {
      this.currentPages--;
      this.getTutorials(this.currentPages);
    }
  }
  
}
