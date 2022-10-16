import * as React from 'react';

export interface ModuleProps {
  name: string;
  routeProps: { path: string; element: React.ReactElement };
}
