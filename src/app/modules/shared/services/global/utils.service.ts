import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
