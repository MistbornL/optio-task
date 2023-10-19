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
    channelId: [''],
    language: '',
    priority: '',
  });
  labelOptions: Options[] = [];
  zoneOptions: Options[] = [];
  img: any;
  label: string = '';
  loading: boolean = false;

  @Input() sharedId: string | undefined;
  @Input() selectedBanner: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  onSubmit() {
    if (this.editForm.valid) {
      this.upload(this.img);
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
    selectedBanner.labels.forEach((label: string) => {
      labelsArray.push(this.fb.control(label));
    });
    const startDate: any = this.formatDate(selectedBanner.startDate);
    const endDate: any = this.formatDate(selectedBanner.endDate);

    this.editForm.patchValue({
      id: selectedBanner?.id,
      name: selectedBanner?.name,
      channelId: 'internet-bank',
      fileId: selectedBanner?.fileId,
      url: selectedBanner?.url,
      zoneId: selectedBanner?.zoneId,
      startDate: startDate,
      endDate: endDate,
      active: selectedBanner?.active,
      language: 'ka',
      priority: '0',
    });
    console.log(this.editForm);
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addLabel() {
    const labelsArray = this.editForm.get('labels') as FormArray;
    labelsArray.push(this.fb.control(this.label));
  }

  removeLabel(label: any) {
    const labelsArray = this.editForm.get('labels') as FormArray;
    const index = labelsArray.value.findIndex((item: string) => item === label);
    if (index !== -1) {
      labelsArray.removeAt(index);
    }
  }

  upload(image?: File) {
    if (image) {
      const formData = new FormData();
      formData.append('blob', image);
      this.loading = true;

      this.apiService.uploadImg(formData).subscribe((data) => {
        this.editForm.controls['fileId'].setValue(data.data.id);
        console.log('upload successful');
        this.loading = false;

        if (!this.loading) {
          this.apiService
            .submitHandler(this.editForm.value)
            .subscribe((data) => {
              alert('Success!!!');
            });
        }
      });
    } else {
      this.apiService.submitHandler(this.editForm.value).subscribe((data) => {
        alert('Success!!!');
      });
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.img = target.files[0];
    }
  }
}
