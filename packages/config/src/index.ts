// Separating this, so we don't pull all of the server side
// babel transforms, etc. into client-side usage of the config code
export * from './browser'

export {
  addProjectIdToCypressConfig,
  addToCypressConfig,
  addTestingTypeToCypressConfig,
  defineConfigAvailable,
} from './ast-utils/addToCypressConfig'

export type {
  AddTestingTypeToCypressConfigOptions,
} from './ast-utils/addToCypressConfig'
