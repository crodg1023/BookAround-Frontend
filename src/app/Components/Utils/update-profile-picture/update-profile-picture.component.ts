import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImageService } from '../../../Services/Images/image.service';

@Component({
  selector: 'app-update-profile-picture',
  standalone: true,
  imports: [],
  templateUrl: './update-profile-picture.component.html',
  styleUrl: './update-profile-picture.component.scss'
})
export class UpdateProfilePictureComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;
  imageUrl: string = '/assets/images/profile-placeholder.jpg';

  constructor(private imageService: ImageService) {}

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
    files.forEach(file => formData.append('images[]', file));
    console.log(formData.getAll('images[]'));
    this.imageService.postImage(formData).subscribe(response => {
      console.log(response);
    });
  }
}
