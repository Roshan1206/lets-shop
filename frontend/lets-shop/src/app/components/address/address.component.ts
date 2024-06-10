import { Router } from '@angular/router';
import { AddressService } from './../../service/address.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../common/address';
import { Country } from 'src/app/common/country';
import { State } from '../../common/state';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  private modalService = inject(NgbModal);
  closeResult = '';
  @Output() address = new EventEmitter<any>();
  addressForm!: FormGroup;
  countries: Country[] = [];
  states: State[] = [];

  constructor(private addressService: AddressService, private router: Router) {}

  ngOnInit() {
    this.getCountries();

    this.addressForm = new FormGroup({
      country: new FormControl('', Validators.required)!,
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      streetLine1: new FormControl('', Validators.required),
      streetLine2: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
    });
  }

  getCountries() {
    this.addressService.getCountries().subscribe((data: any) => {
      this.countries = data;
      console.log(this.countries);
    });
  }

  getStates() {
    const code: string = this.addressForm.value.country.id;
    this.addressService.getStates(code).subscribe((data: any) => {
      this.states = data;
    });
  }

  onAddressChange() {
    const address = new Address(
      this.addressForm.value.country,
      this.addressForm.value.state,
      this.addressForm.value.city,
      this.addressForm.value.streetLine1,
      this.addressForm.value.streetLine2,
      this.addressForm.value.zipCode
    );

    this.address.emit(address);
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.router.navigate(['products']);
        },
        (reason) => {
          this.router.navigate(['products']);
        }
      );
  }
}
