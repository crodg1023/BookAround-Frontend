import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../../../Services/Images/image.service';

@Component({
  selector: 'app-update-profile-picture',
  standalone: true,
  imports: [],
  templateUrl: './update-profile-picture.component.html',
  styleUrl: './update-profile-picture.component.scss'
})
export class UpdateProfilePictureComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  imageUrl: string = '/assets/images/profile-placeholder.jpg';
  loading = false;
  hasDefaultPicture = true;

  constructor(
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getUserImage();
    this.imageService.imageUrl$.subscribe(x => this.imageUrl = x);
  }

  getUserImage() {
    const id = Number(sessionStorage.getItem('client_id') ?? -1);
    this.imageService.getCustomerImage(id).subscribe({
      next: (x) => {
        this.imageUrl = URL.createObjectURL(x);
        this.loading = false;
        this.hasDefaultPicture = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files: File[] = Array.from(input.files);
      this.imageService.updateUIWithNewImg(input.files[0]);
      this.uploadProfilePicture(files);
    }
  }


  uploadProfilePicture(files: File[]) {
    const formData = new FormData();
    const id = sessionStorage.getItem('client_id');
    formData.append('cliente_id', id || '');
    files.forEach(file => formData.append('images[]', file));

    if (this.hasDefaultPicture) {
      this.imageService.postImage(formData).subscribe(response => {
        console.log(response);
      });
    } else {
      this.imageService.updateCustomerImage(Number(id), formData).subscribe(response => console.log(response));
    }
  }

  deleteImage() {
    const id = Number(sessionStorage.getItem('client_id') ?? -1);
    this.imageService.deleteCustomerImage(id).subscribe(x => console.log(x));
    this.imageService.updateUIDeleteImg();
  }
}
