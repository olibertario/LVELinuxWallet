"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainWindowHelpers_1 = require("./mainWindowHelpers");
const originalUrl = 'https://medium.com/';
const internalUrl = 'https://medium.com/topics/technology';
const externalUrl = 'https://www.wikipedia.org/wiki/Electron';
const foregroundDisposition = 'foreground-tab';
const backgroundDisposition = 'background-tab';
const nativeTabsSupported = () => true;
const nativeTabsNotSupported = () => false;
test('internal urls should not be handled', () => {
    const preventDefault = jest.fn();
    const openExternal = jest.fn();
    const createAboutBlankWindow = jest.fn();
    const createNewTab = jest.fn();
    mainWindowHelpers_1.onNewWindowHelper(internalUrl, undefined, originalUrl, undefined, preventDefault, openExternal, createAboutBlankWindow, nativeTabsNotSupported, createNewTab);
    expect(openExternal.mock.calls.length).toBe(0);
    expect(createAboutBlankWindow.mock.calls.length).toBe(0);
    expect(createNewTab.mock.calls.length).toBe(0);
    expect(preventDefault.mock.calls.length).toBe(0);
});
test('external urls should be opened externally', () => {
    const openExternal = jest.fn();
    const createAboutBlankWindow = jest.fn();
    const createNewTab = jest.fn();
    const preventDefault = jest.fn();
    mainWindowHelpers_1.onNewWindowHelper(externalUrl, undefined, originalUrl, undefined, preventDefault, openExternal, createAboutBlankWindow, nativeTabsNotSupported, createNewTab);
    expect(openExternal.mock.calls.length).toBe(1);
    expect(createAboutBlankWindow.mock.calls.length).toBe(0);
    expect(createNewTab.mock.calls.length).toBe(0);
    expect(preventDefault.mock.calls.length).toBe(1);
});
test('tab disposition should be ignored if tabs are not enabled', () => {
    const preventDefault = jest.fn();
    const openExternal = jest.fn();
    const createAboutBlankWindow = jest.fn();
    const createNewTab = jest.fn();
    mainWindowHelpers_1.onNewWindowHelper(internalUrl, foregroundDisposition, originalUrl, undefined, preventDefault, openExternal, createAboutBlankWindow, nativeTabsNotSupported, createNewTab);
    expect(openExternal.mock.calls.length).toBe(0);
    expect(createAboutBlankWindow.mock.calls.length).toBe(0);
    expect(createNewTab.mock.calls.length).toBe(0);
    expect(preventDefault.mock.calls.length).toBe(0);
});
test('tab disposition should be ignored if url is external', () => {
    const openExternal = jest.fn();
    const createAboutBlankWindow = jest.fn();
    const createNewTab = jest.fn();
    const preventDefault = jest.fn();
    mainWindowHelpers_1.onNewWindowHelper(externalUrl, foregroundDisposition, originalUrl, undefined, preventDefault, openExternal, createAboutBlankWindow, nativeTabsSupported, createNewTab);
    expect(openExternal.mock.calls.length).toBe(1);
    expect(createAboutBlankWindow.mock.calls.length).toBe(0);
    expect(createNewTab.mock.calls.length).toBe(0);
    expect(preventDefault.mock.calls.length).toBe(1);
});
test('foreground tabs with internal urls should be opened in the foreground', () => {
    const openExternal = jest.fn();
    const createAboutBlankWindow = jest.fn();
    const createNewTab = jest.fn();
    const preventDefault = jest.fn();
    mainWindowHelpers_1.onNewWindowHelper(internalUrl, foregroundDisposition, originalUrl, undefined, preventDefault, openExternal, createAboutBlankWindow, nativeTabsSupported, createNewTab);
    expect(openExternal.mock.calls.length).toBe(0);
    expect(createAboutBlankWindow.mock.calls.length).toBe(0);
    expect(createNewTab.mock.calls.length).toBe(1);
    expect(createNewTab.mock.calls[0][1]).toBe(true);
    expect(preventDefault.mock.calls.length).toBe(1);
});
test('background tabs with internal urls should be opened in background tabs', () => {
    const openExternal = jest.fn();
    const createAboutBlankWindow = jest.fn();
    const createNewTab = jest.fn();
    const preventDefault = jest.fn();
    mainWindowHelpers_1.onNewWindowHelper(internalUrl, backgroundDisposition, originalUrl, undefined, preventDefault, openExternal, createAboutBlankWindow, nativeTabsSupported, createNewTab);
    expect(openExternal.mock.calls.length).toBe(0);
    expect(createAboutBlankWindow.mock.calls.length).toBe(0);
    expect(createNewTab.mock.calls.length).toBe(1);
    expect(createNewTab.mock.calls[0][1]).toBe(false);
    expect(preventDefault.mock.calls.length).toBe(1);
});
test('about:blank urls should be handled', () => {
    const preventDefault = jest.fn();
    const openExternal = jest.fn();
    const createAboutBlankWindow = jest.fn();
    const createNewTab = jest.fn();
    mainWindowHelpers_1.onNewWindowHelper('about:blank', undefined, originalUrl, undefined, preventDefault, openExternal, createAboutBlankWindow, nativeTabsNotSupported, createNewTab);
    expect(openExternal.mock.calls.length).toBe(0);
    expect(createAboutBlankWindow.mock.calls.length).toBe(1);
    expect(createNewTab.mock.calls.length).toBe(0);
    expect(preventDefault.mock.calls.length).toBe(1);
});
//# sourceMappingURL=mainWindowHelpers.test.js.map