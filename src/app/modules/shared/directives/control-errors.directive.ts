import { Directive, OnInit, Self, OnDestroy, Optional, Host, ComponentRef, ViewContainerRef,
    ComponentFactoryResolver, ElementRef, InjectionToken, Inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, merge, EMPTY, Observable, fromEvent } from 'rxjs';
import { takeUntil, shareReplay } from 'rxjs/operators';
import { ControlErrorComponent } from '../components/global/control-error/control-error.component';

export const defaultErrors = {
    required: (error) => `Required field`,
    email: (error) => `Email format is required`
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
    providedIn: 'root',
    factory: () => defaultErrors
});

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
    click$ = fromEvent(this.host.nativeElement, 'click').pipe(shareReplay(1));

    controlErrorComponent: ComponentRef<ControlErrorComponent>;
    ngUnsubscribe = new Subject();

    constructor(@Self() private control: NgControl,
                @Inject(FORM_ERRORS) private errors,
                private host: ElementRef<HTMLFormElement>,
                private vcr: ViewContainerRef,
                private resolver: ComponentFactoryResolver) { }

    ngOnInit() {
        merge(
            this.click$,
            this.control.valueChanges
        ).pipe(
            takeUntil(this.ngUnsubscribe)
        ).subscribe(() => {
            // Error object for example: {minlength: 6, requiredlength: 10}
            const controlErrors = this.control.errors;
            if (controlErrors) {
                const firstKey = Object.keys(controlErrors)[0];
                const getError = this.errors[firstKey];
                const text = getError(controlErrors[firstKey]);
                this.setError(text);
            } else if (this.controlErrorComponent) {
                this.setError(null);
            }
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    setError(text: string) {
        // If component not already exists, build factory with resolver, create and assign it to the reference
        if (!this.controlErrorComponent) {
            const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
            this.controlErrorComponent = this.vcr.createComponent(factory);
        }
        // Else just change the text variable inside it
        this.controlErrorComponent.instance.text = text;
    }
}
