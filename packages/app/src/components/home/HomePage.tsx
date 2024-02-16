import Grid from '@material-ui/core/Grid';
import { HomePageCompanyLogo } from '@backstage/plugin-home';

const HomePage: React.FC<{}> = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <HomePageCompanyLogo />
    </Grid>
  </Grid>
);

export default HomePage;


import React, { ComponentType } from 'react';
import { CustomHomepageGrid } from '@backstage/plugin-home';
import {
  starredEntitiesApiRef,
  MockStarredEntitiesApi,
  entityRouteRef,
  catalogApiRef,
} from '@backstage/plugin-catalog-react';
import { wrapInTestApp, TestApiProvider } from '@backstage/test-utils';
import { configApiRef } from '@backstage/core-plugin-api';
import { ConfigReader } from '@backstage/config';
import { searchApiRef } from '@backstage/plugin-search-react';
import { HomePageSearchBar, searchPlugin } from '@backstage/plugin-search';
import { HomePageCalendar } from '@backstage/plugin-gcalendar';
import { MicrosoftCalendarCard } from '@backstage/plugin-microsoft-calendar';
import { HomePageRandomJoke, HomePageStarredEntities } from '@backstage/plugin-home';

const entities = [
  {
    apiVersion: '1',
    kind: 'Component',
    metadata: {
      name: 'mock-starred-entity',
      title: 'Mock Starred Entity!',
    },
  },
  {
    apiVersion: '1',
    kind: 'Component',
    metadata: {
      name: 'mock-starred-entity-2',
      title: 'Mock Starred Entity 2!',
    },
  },
  {
    apiVersion: '1',
    kind: 'Component',
    metadata: {
      name: 'mock-starred-entity-3',
      title: 'Mock Starred Entity 3!',
    },
  },
  {
    apiVersion: '1',
    kind: 'Component',
    metadata: {
      name: 'mock-starred-entity-4',
      title: 'Mock Starred Entity 4!',
    },
  },
];

const mockCatalogApi = {
  getEntities: async () => ({ items: entities }),
};

const starredEntitiesApi = new MockStarredEntitiesApi();
starredEntitiesApi.toggleStarred('component:default/example-starred-entity');
starredEntitiesApi.toggleStarred('component:default/example-starred-entity-2');
starredEntitiesApi.toggleStarred('component:default/example-starred-entity-3');
starredEntitiesApi.toggleStarred('component:default/example-starred-entity-4');

export const HomeTemplates = {
  title: 'Plugins/Home/Templates',
  decorators: [
    (Story: ComponentType<{}>) =>
      wrapInTestApp(
        <>
          <TestApiProvider
            apis={[
              [catalogApiRef, mockCatalogApi],
              [starredEntitiesApiRef, starredEntitiesApi],
              [searchApiRef, { query: () => Promise.resolve({ results: [] }) }],
              [
                configApiRef,
                new ConfigReader({
                  backend: {
                    baseUrl: 'https://localhost:7007',
                  },
                }),
              ],
            ]}
          >
            <Story />
          </TestApiProvider>
        </>,
        {
          mountedRoutes: {
            '/hello-company': searchPlugin.routes.root,
            '/catalog/:namespace/:kind/:name': entityRouteRef,
          },
        },
      ),
  ],
};

export const CustomizableTemplate = () => {
  // This is the default configuration that is shown to the user
  // when first arriving to the homepage.
  const defaultConfig = [
    {
      component: 'HomePageSearchBar',
      x: 0,
      y: 0,
      width: 12,
      height: 5,
    },
    {
      component: 'HomePageRandomJoke',
      x: 0,
      y: 2,
      width: 6,
      height: 16,
    },
    {
      component: 'HomePageStarredEntities',
      x: 6,
      y: 2,
      width: 6,
      height: 12,
    },
  ];

  return (
    <CustomHomepageGrid config={defaultConfig} rowHeight={10}>
      {/* Insert the allowed widgets inside the grid. User can add, organize and
      remove the widgets as they want. */}
      <HomePageSearchBar />
      <HomePageRandomJoke />
      <HomePageCalendar />
      <MicrosoftCalendarCard />
      <HomePageStarredEntities />
    </CustomHomepageGrid>
  );
};
