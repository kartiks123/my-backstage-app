import { createRouter } from '@backstage/plugin-permission-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

class TestPermissionPolicy implements PermissionPolicy {
    // async handle(request: PolicyQuery): Promise<PolicyDecision> {
    async handle(
      request: PolicyQuery,
      user?: BackstageIdentityResponse,
     ): Promise<PolicyDecision> {
    //   if (request.permission.name === 'catalog.entity.delete') {
    if (isResourcePermission(request.permission, 'catalog-entity')) {
        // return {
        // result: AuthorizeResult.DENY,
        // };
        return createCatalogConditionalDecision(
          request.permission,
          {
          anyOf: [
            catalogConditions.isEntityOwner({
              claims: user?.identity.ownershipEntityRefs ?? [],
            }),
            isInSystem({ systemRef: 'interviewing' }),
          ],
        },
        );
      }
       return { result: AuthorizeResult.ALLOW };
    }
  }
export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    config: env.config,
    logger: env.logger,
    discovery: env.discovery,
    policy: new TestPermissionPolicy(),
    identity: env.identity,
  });
}



import type { Entity } from '@backstage/catalog-model';
import { catalogConditions, createCatalogConditionalDecision, createCatalogPermissionRule } from '@backstage/plugin-catalog-backend/alpha';
import { PermissionPolicy, PolicyQuery, createConditionFactory } from '@backstage/plugin-permission-node';
import { BackstageIdentityResponse } from '@backstage/plugin-auth-node';
import { AuthorizeResult, PolicyDecision, isResourcePermission } from '@backstage/plugin-permission-common';
import { z } from 'zod';

export const isInSystemRule = createCatalogPermissionRule({
  name: 'IS_IN_SYSTEM',
  description: 'Checks if an entity is part of the system provided',
  resourceType: 'catalog-entity',
  paramsSchema: z.object({
    systemRef: z
      .string()
      .describe('SystemRef to check the resource is part of'),
  }),
  apply: (resource: Entity, { systemRef }) => {
    if (!resource.relations) {
      return false;
    }

    return resource.relations
      .filter(relation => relation.type === 'partOf')
      .some(relation => relation.targetRef === systemRef);
  },
  toQuery: ({ systemRef }) => ({
    key: 'relations.partOf',
    values: [systemRef],
  }),
});

const isInSystem = createConditionFactory(isInSystemRule);