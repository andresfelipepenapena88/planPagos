import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Cuota } from './models/payment-plan-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  countSeguro: number = 0;
  countIntereses: number = 0;
  countAbono: number = 0;
  countCuota: number = 0;
  decountSaldo: number = 0;
  tempCountSeguro: number = 0;
  tempCountIntereses: number = 0;
  tempCountAbono: number = 0;
  tempCountCuota: number = 0;
  tempCecountSaldo: number = 0;
  contador = 1;
  
  form: FormGroup = new FormGroup({
    monto: new FormControl(''),
    plazo: new FormControl(''),
    cuota: new FormControl(''),
    intereses: new FormControl(''),
    seguro: new FormControl('')
  });

  cuotas: Cuota[] = [];

  constructor(
  ) {}

  calcular() {
    this.cuotas = [];
    let saldo: number = this.form.controls['monto'].value;
    this.decountSaldo = saldo;
    const seguro: number = this.form.controls['seguro'].value;
    let intereses: number = this.form.controls['intereses'].value;
    const cuota: number = this.form.controls['cuota'].value;
    let abono = cuota - intereses - seguro;
    const tasa = intereses / saldo;
    while(saldo > 0) {
      if (abono > saldo) {
        abono = saldo
      }
      this.cuotas.push({ 
        numeroCuota: this.contador, 
        seguro,
        intereses,
        abono,
        cuota: seguro + intereses + abono,
        saldo
      });
      if (this.contador % 5 == 0) {
        this.cuotas.push({ 
          numeroCuota: -2, 
          seguro: this.tempCountSeguro,
          intereses: this.tempCountIntereses,
          abono: this.tempCountAbono,
          cuota: this.tempCountCuota,
          saldo: this.decountSaldo
        });
        this.cuotas.push({ 
          numeroCuota: -1, 
          seguro: this.countSeguro,
          intereses: this.countIntereses,
          abono: this.countAbono,
          cuota: this.countCuota,
          saldo: this.decountSaldo
        });
        this.tempCountCuota = 0;
        this.tempCountSeguro = 0;
        this.tempCountIntereses = 0;
        this.tempCountAbono = 0;

      }
      this.countCuota += seguro + intereses + abono;
      this.countSeguro += seguro;
      this.countIntereses += intereses;
      this.countAbono += abono;
      this.contador++;
      this.tempCountCuota += seguro + intereses + abono;
      this.tempCountSeguro += seguro;
      this.tempCountIntereses += intereses;
      this.tempCountAbono += abono;

      saldo = saldo - abono;
      this.decountSaldo = saldo;
      intereses = tasa * saldo; 
      abono = (cuota - intereses - seguro);
    }
    
  }

}
