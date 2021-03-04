import { Injectable } from '@angular/core';
import { DomService } from './dom.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private domService: DomService, private utilsService: UtilsService) { }

  private modalElementId = 'modal-container';
  private overlayElementId = 'modal-overlay';

  // tslint:disable-next-line:max-line-length
  init(component: any, inputs: object, outputs: object) {
    const componentConfig = {
      inputs,
      outputs
    };

    this.domService.appendComponentTo(this.modalElementId, component, componentConfig);

    document.getElementById(this.modalElementId).style.opacity = '1';
    document.getElementById(this.overlayElementId).style.opacity = '1';

    document.getElementById(this.modalElementId).className = 'shown';
    document.getElementById(this.overlayElementId).className = 'shown';
  }

  async destroy() {
    document.getElementById(this.modalElementId).style.opacity = '0';
    document.getElementById(this.overlayElementId).style.opacity = '0';

    // Sleep amount of ms transition of modal-container and overlay to let them finish animation
    await this.utilsService.sleep(150);

    this.domService.removeComponent();

    document.getElementById(this.modalElementId).className = 'hidden';
    document.getElementById(this.overlayElementId).className = 'hidden';
  }
}
