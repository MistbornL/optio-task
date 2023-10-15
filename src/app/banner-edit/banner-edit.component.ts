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
    zoneId: this.fb.array([]),
    fileId: [null],
    url: [null],
    startDate: [null, Validators.required],
    endDate: [null],
    active: [true],
    labels: this.fb.array([]),
    label: [null, Validators.required],
    zone: [null, Validators.required],
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
      } else if (formArrayName === 'zoneId') {
        this.zoneOptions = options.data.entities;
      }
    });
  }

  ngOnInit() {
    this.fetchItems(1900, this.labelOptions, 'labels');
    this.fetchItems(1700, this.zoneOptions, 'zoneId');
  }

  addLabel() {
    const labelsArray = this.editForm.get('labels') as FormArray;
    const selectedLabel = this.editForm.get('label')?.value;
    labelsArray.push(this.fb.control(selectedLabel));
  }

  addZOneId() {
    const zoneArray = this.editForm.get('zoneId') as FormArray;
    const selectedZone = this.editForm.get('zone')?.value;
    zoneArray.push(this.fb.control(selectedZone));
  }

  removeZone(zone: any) {
    const zoneArray = this.editForm.get('zoneId') as FormArray;
    const index = zoneArray.value.findIndex((item: string) => item === zone);
    if (index !== -1) {
      zoneArray.removeAt(index);
    }
  }

  removeLabel(label: any) {
    const labelsArray = this.editForm.get('labels') as FormArray;
    const index = labelsArray.value.findIndex((item: string) => item === label);
    if (index !== -1) {
      labelsArray.removeAt(index);
    }
  }
}
