Released on November 15, 2018

## New features

## Enhancements

### Universal Progressive Web Apps (Early Access)

For this release, we focused on improving the developer experience of our Universal PWA platform by providing enhancements that assist partners with environment security, testing and documentation.

#### Deployment Environment Access Control

A key feature of this release is the addition of Access Control for deployment environments. To use this feature, developers can create IP addresses that will have access to their deployment environment during development. This feature will allow developers to ensure their development environments will only be accessed by people with the right authorisation and be hidden from the wider public.

#### Local Development Device Testing

It is now possible for developers to test their local Universal PWA sites on physical devices (such as a phone or tablet). Previously, testing a Universal PWA site was locked to the localhost, which meant it could only be conducted on the workstation but this change allows developers to access the site through different IP addresses.

#### Developer Documentation

[Overview](/progressive-web/latest/guides/upwa/) and [reference](/progressive-web/latest/reference/upwa/) documentation for Universal PWAs is now available. It covers:

* [Configuration of a Universal PWA project](/progressive-web/latest/reference/upwa/configuration/)
* [The Universal PWA Lifecycle](/progressive-web/latest/reference/upwa/lifecycle/)
* [How proxying works for a Universal PWA](/progressive-web/latest/reference/upwa/proxying/)
* [Reference for the SSR Server](/progressive-web/latest/reference/upwa/ssr-server/)

### UI Kit v3.1
Based on industry research and learnings from our commerce customers, new artboards have been added to show our best practices in responsive shopping cart and checkout flow from shipping to confirmation. Full release notes on the UI Kit can be found on [github](https://github.com/mobify/ui-kit/releases/tag/v3.1).

### Progressive Web Apps
Service Worker on iOS is now enabled by default. Previously, Service Worker was disabled on iOS by default due to an issue with Safari which would cause sites viewed in private mode of the browser to break. The issue was resolved on the release of iOS 12, and has been retroactively fixed for other versions of iOS as well.

### Native Apps
The latest generation of iPhone's brought in new edge-to-edge displays, and introduced a new resolution to support as a result. Support for iPhone X, iPhone XS, iPhone XS Max, and iPhone XR has been added for our native apps.

Documentation around setting up your environment has been updated and can be found on within our [documentation hub for native apps](http://astro.mobify.com/latest/guides/before-you-begin/setup/).

We also want to keep developers up to date with the latest tools to work with, and have also added in support for Xcode 12 and the iOS 12 SDK.

## Known Issues

### Progressive Web Apps
* [Navigation component](/progressive-web/latest/components/#!/Nav) will throw an error if two or more children in the navigation tree have the same path.
* Errors appear in the browser console when Service Worker loads cached assets while Chrome is in Incognito mode

### Native Apps
* Account dashboard is unresponsive on Android after user registers
* If a user is signed in from a previous session, the sign in / register tabs persists if you sign in again from App Onboarding
* Android devices with notches may not render as expected

## Fixes

### Progressive Web Apps
* Addressed an issue with our implementation of redux-form where form interactions weren't properly being captured and tracked.

### Native Apps
* iOS devices with notches will now properly render as expected
* The iOS framework has a bug which doesn't correctly set the state of the history object in some cases. This made it impossible for developers to customize any behavior related to the history object. We've added a workaround for this which will allow developers to specify custom back navigation behavior when needed.