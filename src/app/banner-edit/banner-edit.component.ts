import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../api.service.spec';
import { Options } from '../models/options.model';

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
  labelOptions: Options[] = [];
  zoneOptions: Options[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  onSubmit() {
    if (this.editForm.valid) {
      const formData = this.editForm.value;
      // Send formData to your service for further processing
      console.log(formData);
    }
  }

  fetchItems(optionType: number, items: any[], formArrayName: string) {
    this.apiService.findOptions(optionType).subscribe((options) => {
      if (formArrayName === 'labels') {
        this.labelOptions = options.data.entities;
      }
      this.zoneOptions = options.data.entities;
      console.log(this.zoneOptions);
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
