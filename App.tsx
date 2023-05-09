import React from 'react';

import {createTRPCProxyClient, httpBatchLink} from '@trpc/client';
import {AppRouter} from './src/server/router/appRouter';
import {store} from './src/app/store';
import {Provider as StoreProvider} from 'react-redux';
import Root from './src/app/Root';

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8080', //This would be whatever the BFF endpoint was (Local, dev, preprod & prod)
    }),
  ],
});

const App = () => {
  return (
    <StoreProvider store={store}>
      <Root />
    </StoreProvider>
  );
};

export default App;
