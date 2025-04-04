// tutorial.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TutorialService } from '../services/tutorial.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TutorialResolver implements Resolve<any> {
  constructor(private tutorialService: TutorialService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.tutorialService.get(id).pipe(
      catchError(() => of(null))
    );
  }
}
