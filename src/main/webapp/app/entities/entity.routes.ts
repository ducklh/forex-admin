import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'kNetworkAdminApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'forex-broker',
    data: { pageTitle: 'kNetworkAdminApp.forexBroker.home.title' },
    loadChildren: () => import('./forex-broker/forex-broker.routes'),
  },
  {
    path: 'feature',
    data: { pageTitle: 'kNetworkAdminApp.feature.home.title' },
    loadChildren: () => import('./feature/feature.routes'),
  },
  {
    path: 'platform',
    data: { pageTitle: 'kNetworkAdminApp.platform.home.title' },
    loadChildren: () => import('./platform/platform.routes'),
  },
  {
    path: 'instrument',
    data: { pageTitle: 'kNetworkAdminApp.instrument.home.title' },
    loadChildren: () => import('./instrument/instrument.routes'),
  },
  {
    path: 'pro',
    data: { pageTitle: 'kNetworkAdminApp.pro.home.title' },
    loadChildren: () => import('./pro/pro.routes'),
  },
  {
    path: 'con',
    data: { pageTitle: 'kNetworkAdminApp.con.home.title' },
    loadChildren: () => import('./con/con.routes'),
  },
  {
    path: 'language-support',
    data: { pageTitle: 'kNetworkAdminApp.languageSupport.home.title' },
    loadChildren: () => import('./language-support/language-support.routes'),
  },
  {
    path: 'support',
    data: { pageTitle: 'kNetworkAdminApp.support.home.title' },
    loadChildren: () => import('./support/support.routes'),
  },
  {
    path: 'payment-method',
    data: { pageTitle: 'kNetworkAdminApp.paymentMethod.home.title' },
    loadChildren: () => import('./payment-method/payment-method.routes'),
  },
  {
    path: 'crypto-broker',
    data: { pageTitle: 'kNetworkAdminApp.cryptoBroker.home.title' },
    loadChildren: () => import('./crypto-broker/crypto-broker.routes'),
  },
  {
    path: 'coin',
    data: { pageTitle: 'kNetworkAdminApp.coin.home.title' },
    loadChildren: () => import('./coin/coin.routes'),
  },
  {
    path: 'crypto-feature',
    data: { pageTitle: 'kNetworkAdminApp.cryptoFeature.home.title' },
    loadChildren: () => import('./crypto-feature/crypto-feature.routes'),
  },
  {
    path: 'crypto-pro',
    data: { pageTitle: 'kNetworkAdminApp.cryptoPro.home.title' },
    loadChildren: () => import('./crypto-pro/crypto-pro.routes'),
  },
  {
    path: 'crypto-con',
    data: { pageTitle: 'kNetworkAdminApp.cryptoCon.home.title' },
    loadChildren: () => import('./crypto-con/crypto-con.routes'),
  },
  {
    path: 'security-feature',
    data: { pageTitle: 'kNetworkAdminApp.securityFeature.home.title' },
    loadChildren: () => import('./security-feature/security-feature.routes'),
  },
  {
    path: 'crypto-payment-method',
    data: { pageTitle: 'kNetworkAdminApp.cryptoPaymentMethod.home.title' },
    loadChildren: () => import('./crypto-payment-method/crypto-payment-method.routes'),
  },
  {
    path: 'customer-support',
    data: { pageTitle: 'kNetworkAdminApp.customerSupport.home.title' },
    loadChildren: () => import('./customer-support/customer-support.routes'),
  },
  {
    path: 'tag',
    data: { pageTitle: 'kNetworkAdminApp.tag.home.title' },
    loadChildren: () => import('./tag/tag.routes'),
  },
  {
    path: 'knowledge-item',
    data: { pageTitle: 'kNetworkAdminApp.knowledgeItem.home.title' },
    loadChildren: () => import('./knowledge-item/knowledge-item.routes'),
  },
  {
    path: 'knowledge-tag',
    data: { pageTitle: 'kNetworkAdminApp.knowledgeTag.home.title' },
    loadChildren: () => import('./knowledge-tag/knowledge-tag.routes'),
  },
  {
    path: 'site-news-article',
    data: { pageTitle: 'kNetworkAdminApp.siteNewsArticle.home.title' },
    loadChildren: () => import('./site-news-article/site-news-article.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
