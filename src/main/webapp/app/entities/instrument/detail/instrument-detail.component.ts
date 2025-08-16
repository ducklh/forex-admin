import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IInstrument } from '../instrument.model';

@Component({
  selector: 'jhi-instrument-detail',
  templateUrl: './instrument-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class InstrumentDetailComponent {
  instrument = input<IInstrument | null>(null);

  previousState(): void {
    window.history.back();
  }
}
