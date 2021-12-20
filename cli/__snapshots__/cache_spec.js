exports['lib/tasks/cache .clear deletes cache folder and everything inside it 1'] = `
[no output]
`

exports['lib/tasks/cache .prune exits cleanly if cache dir DNE 1'] = `
No cache directory found at /.cache/Cypress.
No versions found to prune.
`

exports['lib/tasks/cache .list lists all versions of cached binary 1'] = `
┌─────────┬───────────┐
│ version │ last used │
├─────────┼───────────┤
│ 1.2.3   │ unknown   │
├─────────┼───────────┤
│ 2.3.4   │ unknown   │
└─────────┴───────────┘
`

exports['lib/tasks/cache .path lists path to cache 1'] = `
/.cache/Cypress
`

exports['lib/tasks/cache .list lists all versions of cached binary with last access 1'] = `
┌─────────┬──────────────┐
│ version │ last used    │
├─────────┼──────────────┤
│ 1.2.3   │ 3 months ago │
├─────────┼──────────────┤
│ 2.3.4   │ 5 days ago   │
└─────────┴──────────────┘
`

exports['lib/tasks/cache .list some versions have never been opened 1'] = `
┌─────────┬──────────────┐
│ version │ last used    │
├─────────┼──────────────┤
│ 1.2.3   │ 3 months ago │
├─────────┼──────────────┤
│ 2.3.4   │ unknown      │
└─────────┴──────────────┘
`

exports['cache list with silent log level'] = `
┌─────────┬───────────┐
│ version │ last used │
├─────────┼───────────┤
│ 1.2.3   │ unknown   │
├─────────┼───────────┤
│ 2.3.4   │ unknown   │
└─────────┴───────────┘
`

exports['cache list with warn log level'] = `
┌─────────┬───────────┐
│ version │ last used │
├─────────┼───────────┤
│ 1.2.3   │ unknown   │
├─────────┼───────────┤
│ 2.3.4   │ unknown   │
└─────────┴───────────┘
`

exports['lib/tasks/cache .list shows sizes 1'] = `
┌─────────┬──────────────┬───────┐
│ version │ last used    │ size  │
├─────────┼──────────────┼───────┤
│ 1.2.3   │ 3 months ago │ 0.2MB │
├─────────┼──────────────┼───────┤
│ 2.3.4   │ unknown      │ 0.2MB │
└─────────┴──────────────┴───────┘
`

exports['lib/tasks/cache .prune throws when there is a problem 1'] = `
Failed to prune cache
`

exports['lib/tasks/cache .prune does not delete binaries with an atime younger than 90 days 1'] = `
No versions found to prune.
`

exports['lib/tasks/cache .prune does not delete binaries with a birthtime younger than 90 days 1'] = `
No versions found to prune.
`

exports['lib/tasks/cache .prune does not delete registered binaries 1'] = `
No versions found to prune.
`

exports['lib/tasks/cache .prune does not delete the cy or registry folders 1'] = `
No versions found to prune.
`

exports['lib/tasks/cache .prune deletes binaries older than 90 days 1'] = `
Pruned the following versions from cache:
cypress: 2.3.4
`

exports['lib/tasks/cache .prune deletes unregistered binaries greater than 10.0.0 1'] = `
Pruned the following versions from cache:
cypress: 10.0.0
cypress: 11.0.0
`
