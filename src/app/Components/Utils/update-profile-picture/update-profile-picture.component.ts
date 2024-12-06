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

  constructor(
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getUserImage();
  }

  getUserImage() {
    const id = Number(sessionStorage.getItem('client_id') ?? -1);
    this.imageService.getCustomerImage(id).subscribe(x => {
      this.imageUrl = URL.createObjectURL(x);
      this.loading = false;
    });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files: File[] = Array.from(input.files);
      this.uploadProfilePicture(files);
    }
  }

  uploadProfilePicture(files: File[]) {
    const formData = new FormData();
    const id = sessionStorage.getItem('client_id');
    formData.append('cliente_id', id || '');
    files.forEach(file => formData.append('images[]', file));
    this.imageService.postImage(formData).subscribe(response => {
      console.log(response);
    });
  }
}
