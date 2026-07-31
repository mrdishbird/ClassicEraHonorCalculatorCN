import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'footer-root',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [NgIcon, TranslatePipe]
})
export class FooterComponent {

}
