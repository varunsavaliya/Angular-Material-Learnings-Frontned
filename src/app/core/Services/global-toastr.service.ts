import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalToastrService {

  constructor(private toastr: ToastrService) { }

  showToastr(action: string, message: string) {
    switch (action) {
      case 'success':
        this.toastr.success('Success!', message);
        break;
      case 'error':
        this.toastr.error('Error!', message);
        break;
    }
  }
}
