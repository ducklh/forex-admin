import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'forexBeApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'broker',
    data: { pageTitle: 'forexBeApp.broker.home.title' },
    loadChildren: () => import('./broker/broker.routes'),
  },
  {
    path: 'feature',
    data: { pageTitle: 'forexBeApp.feature.home.title' },
    loadChildren: () => import('./feature/feature.routes'),
  },
  {
    path: 'regulation',
    data: { pageTitle: 'forexBeApp.regulation.home.title' },
    loadChildren: () => import('./regulation/regulation.routes'),
  },
  {
    path: 'platform',
    data: { pageTitle: 'forexBeApp.platform.home.title' },
    loadChildren: () => import('./platform/platform.routes'),
  },
  {
    path: 'instrument',
    data: { pageTitle: 'forexBeApp.instrument.home.title' },
    loadChildren: () => import('./instrument/instrument.routes'),
  },
  {
    path: 'pro',
    data: { pageTitle: 'forexBeApp.pro.home.title' },
    loadChildren: () => import('./pro/pro.routes'),
  },
  {
    path: 'con',
    data: { pageTitle: 'forexBeApp.con.home.title' },
    loadChildren: () => import('./con/con.routes'),
  },
  {
    path: 'language',
    data: { pageTitle: 'forexBeApp.language.home.title' },
    loadChildren: () => import('./language/language.routes'),
  },
  {
    path: 'support',
    data: { pageTitle: 'forexBeApp.support.home.title' },
    loadChildren: () => import('./support/support.routes'),
  },
  {
    path: 'payment-method',
    data: { pageTitle: 'forexBeApp.paymentMethod.home.title' },
    loadChildren: () => import('./payment-method/payment-method.routes'),
  },
  {
    path: 'crypto-broker',
    data: { pageTitle: 'forexBeApp.cryptoBroker.home.title' },
    loadChildren: () => import('./crypto-broker/crypto-broker.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
