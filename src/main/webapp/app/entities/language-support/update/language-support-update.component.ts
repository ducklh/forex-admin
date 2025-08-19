import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILanguageSupport } from '../language-support.model';
import { LanguageSupportService } from '../service/language-support.service';
import { LanguageSupportFormGroup, LanguageSupportFormService } from './language-support-form.service';

@Component({
  selector: 'jhi-language-support-update',
  templateUrl: './language-support-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LanguageSupportUpdateComponent implements OnInit {
  isSaving = false;
  languageSupport: ILanguageSupport | null = null;

  protected languageSupportService = inject(LanguageSupportService);
  protected languageSupportFormService = inject(LanguageSupportFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LanguageSupportFormGroup = this.languageSupportFormService.createLanguageSupportFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ languageSupport }) => {
      this.languageSupport = languageSupport;
      if (languageSupport) {
        this.updateForm(languageSupport);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const languageSupport = this.languageSupportFormService.getLanguageSupport(this.editForm);
    if (languageSupport.id !== null) {
      this.subscribeToSaveResponse(this.languageSupportService.update(languageSupport));
    } else {
      this.subscribeToSaveResponse(this.languageSupportService.create(languageSupport));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILanguageSupport>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(languageSupport: ILanguageSupport): void {
    this.languageSupport = languageSupport;
    this.languageSupportFormService.resetForm(this.editForm, languageSupport);
  }
}
