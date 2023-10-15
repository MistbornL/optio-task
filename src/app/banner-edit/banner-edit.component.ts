import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../api.service.spec';
import { Options } from '../models/options.model';
import { Entities } from '../models/banner.model';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.scss'],
})
export class BannerEditComponent implements OnInit, OnChanges {
  editForm = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    zoneId: [null],
    fileId: [null],
    url: [null],
    startDate: [null, Validators.required],
    endDate: [null],
    active: [true],
    labels: this.fb.array([]),
    label: [null, Validators.required],
  });
  labelOptions: Options[] = [];
  zoneOptions: Options[] = [];

  @Input() sharedId: string | undefined;
  @Input() selectedBanner: any;

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sharedId'] && changes['sharedId'].currentValue) {
      this.updateFormValues();
      console.log(this.editForm.value);
    }
  }
  private updateFormValues() {
    const selectedBanner = this.selectedBanner;
    const labelsArray = this.editForm.get('labels') as FormArray;
    console.log(selectedBanner);
    selectedBanner.labels.forEach((label: string) => {
      labelsArray.push(this.fb.control(label));
    });

    this.editForm.patchValue({
      id: selectedBanner?.id,
      name: selectedBanner?.name,
      fileId: selectedBanner?.fileId,
      url: selectedBanner?.url,
      zoneId: selectedBanner?.zoneId,
      startDate: selectedBanner?.startDate,
      endDate: selectedBanner?.endDate,
      active: selectedBanner?.active,
      label: null, // Add any other form fields here
    });
  }
  addLabel() {
    const labelsArray = this.editForm.get('labels') as FormArray;
    const selectedLabel = this.editForm.get('label')?.value;
    labelsArray.push(this.fb.control(selectedLabel));
  }

  removeLabel(label: any) {
    const labelsArray = this.editForm.get('labels') as FormArray;
    const index = labelsArray.value.findIndex((item: string) => item === label);
    if (index !== -1) {
      labelsArray.removeAt(index);
    }
  }
}
