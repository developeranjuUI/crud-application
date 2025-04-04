import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { publish } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.scss']
})
export class TutorialDetailsComponent implements OnInit{

  @Input() viewMode = false;
  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  message = '';
  constructor(private tutorialService: TutorialService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(!this.viewMode){
      this.message = '',this.getTutorial(this.route.snapshot.params["id"]);
      this.currentTutorial = this.route.snapshot.data['tutorial'];
    }
  }
  getTutorial(id: string): void{
    this.tutorialService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTutorial = data;
          console.log(data);
        },
        error: (err)=>console.log(err)
      })
  }

  updatePublished(status: boolean): void{
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };
    this.message = '';
    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentTutorial.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (err) => console.log(err)
      });
  }
  updateTutorial(): void {
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial).subscribe({
      next: (res) => {
        this.toastr.success('Tutorial updated successfully!', 'Success');
        this.message = res.message ? res.message : 'The tutorial was updated successfully!';
      },
      error: (e) => {
        console.error(e);
        this.toastr.error('Failed to update the tutorial.', 'Error');
      }
    });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id).subscribe({
      next: (res) => {
        this.toastr.success('Tutorial deleted successfully!', 'Deleted');
        this.router.navigate(['/tutorials']);
      },
      error: (e) => {
        console.error(e);
        this.toastr.error('Failed to delete the tutorial.', 'Error');
      }
    });
  }
  
}
