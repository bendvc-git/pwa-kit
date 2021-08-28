Released on July 2nd, 2019

In this release, we've enhanced the Mobify Platform by upgrading to the latest version of React, improving the PWA scaffold, and providing Early Access to the new Analytics Manager. For Native Apps, we've updated Mobify's native app framework to meet new Google Play requirements.

The following packages have been updated:

- `progressive-web-sdk @1.11.0`
- `mobify-progressive-app-sdk @3.1.0`
- `@mobify/commerce-integrations @1.11.0`
- `@mobify/test-framework @1.11.0`

From now on, version numbers for related packages, such as `progressive-web-sdk`, `commerce-integrations`, and `test-framework` will be synchronized.

## <span class="c-label c--features">Features</span>

### Progressive Web Apps (PWAs)

#### Analytics Integrations (Early Access)

Our legacy Analytics Manager implementation was a bit too "magical," meaning that a lot of its implementation logic was encapsulated and hidden away from developers. To make this interface better understood by developers, we've redesigned and shipped a brand new Analytics Manager interface that is implemented in a more explicit manner. From now on, the new interface will be referred to as the **Analytics Integrations**.

We've also released an initial set of [API documentation](https://docs.mobify.com/progressive-web/latest/utility-functions/reference/module-analytics-integrations_interface.AnalyticsConnector.html) alongside our new interface, with more documentation and guides soon to follow.

#### Target Management API (Early Access)

When starting a new Mobify project, some of the key tasks involve understanding how many development and test targets you need, and asking [Mobify Support](https://support.mobify.com/) to create and configure these targets for you. In an effort to reduce the friction of getting started, we’ve developed an API that gives you the ability to create your own Mobify targets, plus an API that enables you to update the configuration of any existing Mobify targets.

These APIs are available as Early Access features and we’d love to hear your feedback on how they can be improved. Please refer to our guide on [Target Management APIs](../../../progressive-web/latest/guides/deploying-with-mobify-cloud/#target-management-apis-(early-access)) for information on how to access these APIs. Expect a comprehensive user guide as part of our next release.

#### Request Processor: New Documentation

In the [last release](../2019-may/#features), we informed you about a new feature called the request processor. In this release, we’ve developed a new guide that will introduce you to some powerful ways you can use the request processor to improve your server-side rendered PWA’s performance. Read our guide, [Using the Request Processor to Optimize CDN Caching](../../../progressive-web/latest/guides/request-processor/), to find general guidance plus several code examples.


## <span class="c-label c--updates">Updates</span>

### Mobify Test Framework

#### Nightwatch update to 1.1.12

The [Mobify Test Framework](http://docs.mobify.com/mobify-test-framework/latest/) has now been bumped to use Nightwatch 1.1.12, solving some security vulnerabilites from the previous version. Our custom Nightwatch commands using Mobify Preview have also been merged into this framework so there are no breaking changes.

### Platform Updates

#### React Version Update

The PWA SDK, PWA Scaffold, and Commerce Integrations SDK have all upgraded to version 16.8.6 of React, giving developers access to all the latest and greatest features React has to offer.

### PWA Scaffold

#### Developer Experience Enhancements

We've reduced the overall installation time for the Mobify Platform in two ways:
1. Omitting documentation from the build process
2. Removing unused package dependencies: 26 from the PWA Scaffold and 10 from the PWA SDK

A new command has been added for developers wanting to start their development server for a project loaded with the Mobify Tag: `npm run tag-loaded`.

We've changed our Node Package Manager (npm) and Node version checker to make it easier to get up and running. The Mobify Platform previously _required_ users to have Node version 8.10.10 along with npm version 5.7.1 to install the platform. However, we recognize that it can be difficult for developers to get the correct versions of both npm and Node for a variety of reasons, so we have removed this hard requirement. Instead of throwing errors, the version checker will now throw warnings.

### Native Apps

#### Android API support

Google Play updated their [target API level requirements](https://developer.android.com/distribute/best-practices/develop/target-sdk). Google Play will require new app submissions to target at least Android API level 28 starting August 1st 2019, and app updates to target the same API level starting November 1st, 2019. To prepare for this new requirement, Mobify's native app framework has been updated to target and support Android API level 28.

## <span class="c-label c--bugs">Bug Fixes</span>

### Progressive Web Apps

- Fixed a broken startup message when developers would start up their server side rendered development server
- Reduced the verbosity of logging when installing the Mobify Platform
- Adjusted the default setting for DownloadTracker logging which was incorrectly set to always log to the developer console


## <span class="c-label c--known">Known Issues</span>

None!

<div id="toc"><p class="u-text-size-smaller u-margin-start u-margin-bottom"><b>IN THIS RELEASE:</b></p></div>