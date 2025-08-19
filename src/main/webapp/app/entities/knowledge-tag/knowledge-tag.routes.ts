import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import KnowledgeTagResolve from './route/knowledge-tag-routing-resolve.service';

const knowledgeTagRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/knowledge-tag.component').then(m => m.KnowledgeTagComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/knowledge-tag-detail.component').then(m => m.KnowledgeTagDetailComponent),
    resolve: {
      knowledgeTag: KnowledgeTagResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/knowledge-tag-update.component').then(m => m.KnowledgeTagUpdateComponent),
    resolve: {
      knowledgeTag: KnowledgeTagResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/knowledge-tag-update.component').then(m => m.KnowledgeTagUpdateComponent),
    resolve: {
      knowledgeTag: KnowledgeTagResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default knowledgeTagRoute;
