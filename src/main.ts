/// <reference types="@angular/localize" />
import { bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
inject();

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule),
        provideHttpClient(),
        provideTranslateService({
            fallbackLang: 'en',
            loader: provideTranslateHttpLoader({ prefix: 'assets/i18n/', suffix: '.json' })
        })
    ]
})
.then(app => {
    const translate = app.injector.get(TranslateService);
    translate.addLangs(['en', 'zh']);

    const supportedLangs = ['en', 'zh'];
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('appLang') : null;
    const browserLang = translate.getBrowserLang();
    const lang = stored && supportedLangs.includes(stored)
        ? stored
        : (browserLang && browserLang.startsWith('zh') ? 'zh' : 'en');
    translate.use(lang);
    if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
    }
})
.catch(err => console.error(err));
