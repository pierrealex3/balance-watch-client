import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrWrapperService {

  constructor(private toastr: ToastrService) { }

  error(text: string) {
    this.toastr.error(text);
  }

  success(text: string) {
    this.toastr.success(text);
  }
}
