<div class="c-callout c--important">
  <p>
    <strong>Important:</strong> We've removed this article from the site navigation because many of the source code examples in it are out of date, but we've left it here in case you still need to refer to it.
  </p>
</div>

The Cookie Manager is a singleton class that manages cookies. It helps React components
to be aware of changes in a cookie's value.

## Why a Cookie Manager?

Browser cookies are essentially a key-value store for the browser that is separated
from the PWA. The PWA is a reactive application but there is no way to know when a cookie
is updated at any given time. We introduced the Cookie Manager to help facilitate that.

## Setup

```jsx
import React, {Component} from 'react'
import cookieManager from 'progressive-web-sdk/dist/utils/cookie-manager'

const MY_COOKIE_NAME = 'my_cookie_name'

class MyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            splitValue: cookieManager.get(MY_COOKIE_NAME)
        }
    }

    componentDidMount() {
        this.cookieSubscriber = cookieManager.subscribe(
            MY_COOKIE_NAME,
            (splitValue) => {
                // This gets called when my_cookie_name is updated
                // splitValue will be the new cookie value
                // Make sure we don't setState when the new value is the same
                // as the old value
                if (this.state.splitValue !== splitValue) {
                    this.setState({splitValue})
                }
            }
        )
    }

    componentWillUnmount() {
        // Stop getting notification when component gets unmount
        this.cookieSubscriber.unsubscribe()
    }

    render() {
        return (
            <div>{this.state.splitValue}</div>
        )
    }
}
```

The above setup allows a React component to listen for a particular cookie's value.

### Triggering a cookie update

Traditionally, browsers get updated cookie settings through a page refresh. However,
this update mechanism is no longer available to single-page apps because page refreshes
don't happen. Sometimes you'll still need to update cookies, usually to integrate with
one of the following types of third-party scripts:

* Social logins
* Multi-variate platforms
* Recommendation systems
* Campaign platforms

To trigger a cookie update within your PWA, place the following code where appropriate:

```jsx
import cookieManager from 'progressive-web-sdk/dist/utils/cookie-manager'
...
    cookieManager.pollForAllCookieUpdate()
...
```

An appropriate time to trigger this function would be when:

* After making an AJAX request to a back-end API
* A third-party script has began executing and you are expecting a cookie change
* A third-party script that is aware of PWA navigation and will place a cookie
    when conditions are meet

## Methods

### set(cookieName, cookieValue, domain, lifetime)
Sets a cookie

|parameter|type|description|
|:--|:--|:--|
|cookieName|String|Name of the cookie|
|cookieValue|String|Value of the cookie|
|domain|String|Domain of the cookie|
|lifetime|Integer|Lifetime duration in milliseconds to the future or leave it `null` for a session cookie|

Returns _nothing_

### get(cookieName, defaultValue)
Get the cookie value if exist, otherwise return the default value

|parameter|type|description|
|:--|:--|:--|
|cookieName|String|Name of the cookie|
|defaultValue|String|Default value of the cookie|

Returns _String_

### subscribe(cookieName, updateCallback)
Subscribe to the specified cookie

|parameter|type|description|
|:--|:--|:--|
|cookieName|String|Name of the cookie|
|updateCallback|Function|A callback when Cookie Manager detects an updated value for this cookie|

Returns _CookieSubscriber_

Example
```jsx
import cookieManager from 'progressive-web-sdk/dist/utils/cookie-manager'

// To listen for cookie value change
const cookieSubscriber = cookieManager.subscribe(
    'cookie_name',
    (splitValue) => {
        // splitValue will be the new cookie value
    }
)

// To stop listening for cookie value change
cookieSubscriber.unsubscribe()
```

### pollForAllCookieUpdate()

Perform an update check on subscribed cookies. Cookie Manager will call the updateCallback
for each cookie subscribers when the cookie in inquiry exists. It is up to each cookie
subscriber to determine what to do when the updated cookie value is the same as the last
cookie value.

<div id="toc"><p class="u-text-size-smaller u-margin-start u-margin-bottom"><b>IN THIS ARTICLE:</b></p></div>