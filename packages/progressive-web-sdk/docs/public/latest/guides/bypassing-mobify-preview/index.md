There will be times when you would like an **automation tool** (e.g. SEO crawler, WebPagetest) to work with a _non-published_ bundle. This is a bundle that has been pushed to Cloud but it's not published yet because it's not ready for production. 

Since the bundle is not published yet, you would have to preview this bundle. But the act of visiting the [Mobify Preview page](https://preview.mobify.com/) breaks your automation tool from working properly. Thus, we need a way to bypass/skip it.

This is how you would **bypass the Mobify Preview page**:

1. [Push your code bundle to Mobify Cloud](../../getting-started/mobify-cloud), if you haven't done it yet
    - This step ensures that your automation tool has access to that bundle
2. Perform the preview normally, as if you're doing it for yourself
3. Copy the URL of the page you are redirected to. This URL should be long and have a hash at the end of it.
    - For example: https://www.merlinspotions.com/#mobify-override&mobify-path=true&mobify-url=//cdn.mobify.com/sites/progressive-web-scaffold/bundles/438/loader.js&mobify-domain=&mobify-all=true&mobify=1&mobify-debug=1&mobify-js=1
4. Then configure your automation tool to use one of these:
    - a custom user agent
    - or a custom http header
5. Pass the copied page URL (from Step 2) into your automation tool

## Custom user agent

Does your automation tool allow you to use a custom user agent? If yes, then construct a user agent that has `MobifyPreview` in it:

1. Start with your current user agent, which has to be one of the supported browsers for Progressive Web Apps (see our [compatibility matrix](https://docs.mobify.com/platform/compatibility/))
2. Then append `MobifyPreview` to it

For example, appending `MobifyPreview` to iPhone 8 Safari's user agent would give us:  
`Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1 MobifyPreview`

## Custom HTTP header

If your automation tool allows you to use a custom HTTP header, then this is the easier way. The custom header is `X-Mobify-Preview: 1`.

For example, in [WebPagetest](http://www.webpagetest.org), you could customize the HTTP header within its Advanced Settings:

!['Custom headers' field](webpagetest-custom-header.png)

<div id="toc"><p class="u-text-size-smaller u-margin-start u-margin-bottom"><b>IN THIS ARTICLE:</b></p></div>