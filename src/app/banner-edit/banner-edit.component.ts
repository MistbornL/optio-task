import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../api.service.spec';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.scss'],
})
export class BannerEditComponent {
  editForm = this.fb.group({
    name: [null, Validators.required],
    channelId: [null, Validators.required],
    language: [null, Validators.required],
    zoneId: this.fb.array([]),
    priority: [0, Validators.required],
    fileId: [null],
    url: [null],
    startDate: [null, Validators.required],
    endDate: [null],
    active: [true],
    labels: this.fb.array([]),
  });
  labelOptions: string[] = [];
  zoneOptions: string[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  onSubmit() {
    if (this.editForm.valid) {
      const formData = this.editForm.value;
      // Send formData to your service for further processing
      console.log(formData);
    }
  }

  fetchItems(optionType: number, items: string[], formArrayName: string) {
    this.apiService.findOptions(optionType).subscribe((options) => {
      this.editForm.get(formArrayName)?.setValue(options);
    });
  }

  ngOnInit() {
    this.fetchItems(1900, this.labelOptions, 'labels');
    this.fetchItems(1700, this.zoneOptions, 'zoneId');
  }

  removeLabel(index: number) {
    const labelsArray = this.editForm.get('labels') as FormArray;
    labelsArray.removeAt(index);
  }

  removeZone(index: number) {
    const labelsArray = this.editForm.get('zoneId') as FormArray;
    labelsArray.removeAt(index);
  }
}
