// Test for examples included in README.md
const helpers = require('./global-setup');
const path = require('path');
const {expect} = require('chai');

const describe = global.describe;
const it = global.it;
const beforeEach = global.beforeEach;
const afterEach = global.afterEach;

describe('example application launch', function () {
  helpers.setupTimeout(this);

  let app = null;

  beforeEach(function () {
    return helpers
      .startApplication({
        args: [path.join(__dirname, '..')]
      })
      .then(function (startedApp) {
        app = startedApp;
      });
  });

  afterEach(function () {
    return helpers.stopApplication(app);
  });

  it('opens a window', async function () {
    await app.client.waitUntilWindowLoaded();
    app.browserWindow.focus();
    const windowCount = await app.client.getWindowCount();
    expect(windowCount).to.equal(1);
    const isMinimized = await app.browserWindow.isMinimized();
    expect(isMinimized).to.equal(false);
    const isDevOpen = await app.browserWindow.isDevToolsOpened();
    expect(isDevOpen).to.equal(false);
    const isVisible = await app.browserWindow.isVisible();
    expect(isVisible).to.equal(true);
    const isFocused = await app.browserWindow.isFocused();
    expect(isFocused).to.equal(true);
    app.browserWindow
      .getBounds()
      .should.eventually.have.property('width')
      .and.be.above(0);
    app.browserWindow
      .getBounds()
      .should.eventually.have.property('height')
      .and.be.above(0);
  });;
});
