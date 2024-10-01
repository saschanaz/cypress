import Debug from 'debug'
import { CdpAutomation } from './cdp_automation'
import { BrowserCriClient } from './browser-cri-client'
import type { Automation } from '../automation'
import type { CypressError } from '@packages/errors'
import type { WebDriverClassic } from './webdriver-classic'

const debug = Debug('cypress:server:browsers:firefox-util')

let webDriverClassic: WebDriverClassic

async function connectToNewTabClassic () {
  // Firefox keeps a blank tab open in versions of Firefox 123 and lower when the last tab is closed.
  // For versions 124 and above, a new tab is not created, so @packages/extension creates one for us.
  // Since the tab is always available on our behalf,
  // we can connect to it here and navigate it to about:blank to set it up for CDP connection
  const handles = await webDriverClassic.getWindowHandles()

  await webDriverClassic.switchToWindow(handles[0])

  await webDriverClassic.navigate('about:blank')
}

async function connectToNewSpec (options, automation: Automation, browserCriClient: BrowserCriClient) {
  debug('firefox: reconnecting to blank tab')

  await connectToNewTabClassic()

  debug('firefox: reconnecting CDP')

  if (browserCriClient) {
    await browserCriClient.currentlyAttachedTarget?.close().catch(() => {})
    const pageCriClient = await browserCriClient.attachToTargetUrl('about:blank')

    await CdpAutomation.create(pageCriClient.send, pageCriClient.on, pageCriClient.off, browserCriClient.resetBrowserTargets, automation)
  }

  await options.onInitializeNewBrowserTab()

  debug(`firefox: navigating to ${options.url}`)
  await navigateToUrlClassic(options.url)
}

async function setupCDP (remotePort: number, automation: Automation, onError?: (err: Error) => void): Promise<BrowserCriClient> {
  const browserCriClient = await BrowserCriClient.create({ hosts: ['127.0.0.1', '::1'], port: remotePort, browserName: 'Firefox', onAsynchronousError: onError as (err: CypressError) => void, onServiceWorkerClientEvent: automation.onServiceWorkerClientEvent })
  const pageCriClient = await browserCriClient.attachToTargetUrl('about:blank')

  await CdpAutomation.create(pageCriClient.send, pageCriClient.on, pageCriClient.off, browserCriClient.resetBrowserTargets, automation)

  return browserCriClient
}

async function navigateToUrlClassic (url: string) {
  await webDriverClassic.navigate(url)
}

export default {
  async setup ({
    automation,
    onError,
    url,
    remotePort,
    webDriverClassic: wdcInstance,
  }: {
    automation: Automation
    onError?: (err: Error) => void
    url: string
    remotePort: number
    webDriverClassic: WebDriverClassic
  }): Promise<BrowserCriClient> {
    // set the WebDriver classic instance instantiated from geckodriver
    webDriverClassic = wdcInstance
    const browserCriClient = await setupCDP(remotePort, automation, onError)

    await navigateToUrlClassic(url)

    return browserCriClient
  },

  connectToNewSpec,

  navigateToUrlClassic,

  setupCDP,
}
