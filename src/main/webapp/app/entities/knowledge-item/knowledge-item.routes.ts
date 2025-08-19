import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import KnowledgeItemResolve from './route/knowledge-item-routing-resolve.service';

const knowledgeItemRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/knowledge-item.component').then(m => m.KnowledgeItemComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/knowledge-item-detail.component').then(m => m.KnowledgeItemDetailComponent),
    resolve: {
      knowledgeItem: KnowledgeItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/knowledge-item-update.component').then(m => m.KnowledgeItemUpdateComponent),
    resolve: {
      knowledgeItem: KnowledgeItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/knowledge-item-update.component').then(m => m.KnowledgeItemUpdateComponent),
    resolve: {
      knowledgeItem: KnowledgeItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default knowledgeItemRoute;
