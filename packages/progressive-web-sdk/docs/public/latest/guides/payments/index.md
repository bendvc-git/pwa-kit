## PayPal

In order to use PayPal as your payment method, you typically need to submit a
form. This form will send the user to PayPal, where they can fill in their
payment information. When the user has finished this, PayPal will redirect them
back to the site.

That form might look something like this:
```html
<form action="https://www.yoursite.com/checkout/submit-paypal" method="POST">
    <input type="hidden" name="token" value="aaa" />
    <button type="submit">
        Check Out with PayPal
    </button>
</form>
```

Notice that the form's action is set to a URL on your site, rather than
`https://www.paypal.com`. When this form is submitted, the site's backend
manages redirecting the user to PayPal.

Normally, to handle a [form submission within a
PWA](../forms/#submitting-forms), you would use an AJAX request to post this
data directly to the backend. However, if we try to do that with this form, we
run into a problem. When we make the request, the ecommerce backend redirects us
to `https://www.paypal.com` so the user can enter their information. Because
`https://www.paypal.com` is on a different origin and doesn't have Cross-Origin
Resource Sharing (CORS) headers enabled, this redirect fails. To get around this
issue, we need to change how we submit this form. Instead of AJAX, use a regular
form submission instead.

### Example

A custom command that navigates the user to PayPal might look something like the
following example.

```js
export const goToPayPal = (formValues, formAction) => () => {
    // Create a regular HTML form
    const payPalForm = document.createElement('form')

    // Copy over all form values into hidden inputs
    // These hidden inputs let the site's backend know
    // that we want to use PayPal as our payment method
    Object.keys(formValues).forEach((key) => {
        const input = document.createElement('input')
        input.name = key
        input.value = formValues[key]
        payPalForm.appendChild(input)
    })

    payPalForm.action = formAction
    payPalForm.method = 'POST'

    // The form must be attached to the DOM for us to submit it
    document.body.appendChild(payPalForm)

    // Submit the form and navigate to PayPal
    // Because we're doing a form submission and not an AJAX request,
    // we'll actually navigate the page to formURL
    // Then we automatically follow the redirect to PayPal without hitting the CORS issues
    payPalForm.submit()
}
```

When the user completes filling in their information on PayPal, PayPal will
automatically redirect the user back to the PWA. PayPal will communicate
directly with your ecommerce backend to set up the PayPal payment information.
For example, if your ecommerce backend is Salesforce Commerce Cloud, you would
now see a payment instrument with a type of `PAYPAL` in your basket.

From here, you can often submit the order in the same way you normally would for
credit card payments.

## Apple Pay

See the [Apple Pay JS
documentation](https://developer.apple.com/documentation/applepayjs) for
information on supported devices.

This guide will show you how to implement Apple Pay on PWAs which use Salesforce
Commerce Cloud (SFCC) as their backend.

### Salesforce Commerce Cloud Implementation

SFCC provides us with two scripts that we need to set up Apple Pay. One is
called `applepay.js` and the other is an inline script that sets up some
configuration for Apple Pay. We need to load `applepay.js` and add the inline
script to the page. This will set up the `window.dw.applepay` object that
`applepay.js` uses.

Next, we need to render the Apple Pay button. `applepay.js` searches the DOM for
an element whose tag name is `isapplepay` and transforms that into the Apple Pay
button. So, we just need to render `<isapplepay />` wherever we want this button
to appear. Note that the `<isapplepay />` element should only be rendered once.
If it rerenders, the events added to the element by the script will be removed.
To avoid this, make sure that your component which renders the `<isapplepay />`
element returns false in its `shouldComponentUpdate` method.

<div class="c-callout">
  <p>
    <strong>Note:</strong> If you can't see the Apple Pay button injected, perhaps these criteria that <code>applepay.js</code> is looking for have not been met. Please make sure that:
    <ul>
        <li>Your cart is not empty</li>
        <li>And the total cart amount is greater than 0</li>
    </ul>
  </p>
</div>

<div class="c-callout">
  <p>
    <strong>Note:</strong> It is possible to use Apple Pay to speed up the purchase of a single item, by having the Apple Pay button on the Product Detail page. However, in this case, it is most likely that the cart would be empty. To make sure that the button is injected properly, you'll need to add an attribute to identify the current item's SKU number: <code>&lt;isapplepay sku="12345" /&gt;</code>
  </p>
</div>

The styles used for Apple Pay buttons are built into Safari. To create an Apple
Pay button that matches the dimensions of standard buttons in your PWA, you can
use the following example:

```scss
// Apple Pay Button
// ---
// 
// 1. This class is added by the SFCC script
@supports (-webkit-appearance: -apple-pay-button) {
    .dw-apple-pay-button { // 1
        display: block;
        width: 100%;
        height: $tap-size;

        -webkit-appearance: -apple-pay-button;
        -apple-pay-button-type: buy; // sass-lint:disable-line no-misspelled-properties
    }
}
```

#### Analytics

Analytics Integrations provides events that should be fired when the
user interacts with the Apple Pay button. These events can be imported from
`progressive-web-sdk/dist/analytics/actions`. The first,
[`APPLEPAYBUTTONDISPLAYED`](../../analytics/analytics-integrations-events/#applepaybuttondisplayed), should be called when the Apple Pay
button is displayed. You can fire this after the Apple Pay script has loaded.

The second, [`APPLEPAYBUTTONCLICKED`](../../analytics/analytics-integrations-events/#applepaybuttonclicked), should be fired when the Apple
Pay button has been clicked.

Once you have that in place, you should be able to start testing Apple Pay.
Tapping on the Apple Pay button will bring up the Apple Pay sheet where you can
authorize the transaction. Once this is done, the order is automatically
submitted by SFCC and the page will refresh. It should take you to the order
confirmation page automatically.

For a full list of all the Apple Pay Analytics Integrations events and examples, see the relevant page in our [Analytics Integrations Events](../../analytics/analytics-integrations-events/) documentation.

## Payment Request API

The Payment Request API offers an alternative method for gathering the user's
shipping and billing information. It replaces the normal checkout flow with a
Payment Sheet, enabling users to select from addresses and payment methods their
browser already has saved. As this can be radically different from the existing
checkout flow, the first step to adding Payment Request to your PWA should be to
review the user experience of your checkout with some additional considerations
in mind. See [Payment Request UX
Considerations](https://developers.google.com/web/fundamentals/payments/payment-request-ux-considerations)
for more information.

For more information about implementing Payment Request, see the [Payment
Request API
documentation](https://developers.google.com/web/fundamentals/payments/deep-dive-into-payment-request).

### Restrictions

You may not want to use Payment Request in some circumstances. For registered
users, you may already have their shipping and billing information on hand, so
using Payment Request could be slower than your normal checkout flow. In
general, choose whether to use Payment Request or not based on what would be the
best experience for your user.

The Payment Request API doesn't support adding gift cards or promo codes within
the Payment Sheet. If you want users to be able to apply gift cards or promo
codes to their order, this must happen before the Payment Sheet is opened.
Typically, this means adding a form for gift cards or promo codes to the cart
page.

For [tag-loaded PWAs](../../architecture/#1.-tag-loaded-pwas), note that the Payment Sheet will only open if the page is loaded over HTTPS and there are no security warnings. This can make it difficult to preview your implementation,
as preview relies on a self signed certificate. If you haven't trusted this
certificate, you won't be able to test this feature. For instructions on
trusting this certificate on the computer you are developing on, see our steps to [trust the self-signed certificate](../../getting-started/installation/#additional-steps-for-tag-loaded-projects) in our Getting Started page. If you want to test the Payment Sheet on mobile, we recommend pushing a bundle to Mobify Cloud and using Mobify Preview to view it. The bundle uses the certificate from `cdn.mobify.com`, which will not cause that security warning.

### Example

The Payment Request API expects you to provide it with an object called
`paymentDetails`. This object is used to show the price of the order, as well as
set the available and selected shipping options. When the user selects a
shipping address or shipping option, we need to update this `paymentDetails`
object with the appropriate information. We can use
[selectors](../../guides/selectors/) to help us build this
object.

Your selector for getting the payment details might look something like the
following example:

```js
// selectors.js
import {getOrderTotal, getSubtotal} from '../../dist/store/cart/selectors'
import {getShippingMethods} from '../../dist/store/checkout/selectors'

export const getPaymentDetails = createSelector(
    getOrderTotal,
    getSubtotal,
    getShippingMethods,
    // add other details that you need here
    (total, subtotal, shippingMethods) => {
        return {
            total: {
                label: 'Total',
                amount: {
                    currency: 'USD',
                    value: 0
                }
            },
            displayItems: [
                {
                    label: 'Subtotal',
                    amount: {
                        currency: 'USD',
                        value: subtotal
                    }
                },
                // other display items could include:
                //   tax,
                //   shipping cost,
                //   discounts
            ],
            shippingOptions: shippingMethods
        }
    }
)
```

For more information on the structure of the payment details object, see the
[Defining Payment
Details](https://developers.google.com/web/fundamentals/payments/deep-dive-into-payment-request#defining_payment_details)
documentation.

To show the Payment Sheet, you might implement an action like the following
example. This example is heavily simplified and doesn't include remapping the
data you receive from the Payment Sheet to the format expected by the command to
keep things a little simpler.

```js
// actions.js
// When using the Payment Request API, we still need to submit the order ourselves.
// We can use Commerce Integrations to do so.
// By using createPropsSelector, we ensure that we're always getting
// the regular JS version of the object, not the Immutable version
const paymentRequestSelector = createPropsSelector({
    paymentDetails: getPaymentDetails
})

// Note: before calling showPaymentSheet,
// you probably want to check if window.PaymentRequest exists
export const showPaymentSheet = () => (dispatch, getState) => {
    // Provide the initial configuration needed to set up the PaymentRequest
    const supportedPaymentMethods = [{
        supportedMethods: 'basic-card',
        data: {
            supportedNetworks: ['visa', 'mastercard', 'amex'],
            supportedTypes: ['credit', 'debit', 'prepaid']
        }
    }]

    const initialPaymentDetails = paymentRequestSelector(getState()).paymentDetails
    const options = {
        // For most ecommerce backends,
        // we'll need the user's shipping address and email
        requestShipping: true,
        requestPayerEmail: true
    }
    const request = new window.PaymentRequest(
        supportedPaymentMethods,
        initialPaymentDetails,
        options
    )

    // When the shipping address changes,
    // we want to find the appropriate shipping options
    request.addEventListener('shippingaddresschange', (evt) => {
        const shippingAddress = evt.target.shippingAddress

        // The fetchShippingMethodsEstimate command
        // should add the appropriate shipping methods to the Redux store
        // This way, we can use the paymentRequestSelector to provide
        // the updated information to the PaymentRequest
        const promise = dispatch(connector.getShippingMethods(cart, opts))
            .then(() => paymentRequestSelector(getState()).paymentDetails)

        evt.updateWith(promise)
    })

    request.addEventListener('shippingoptionchange', (evt) => {
        const {
            shippingAddress,
            shippingOption
        } = evt.target

        // Now that we have the selected shipping option,
        // we're ready to submit our shipping information
        const promise = dispatch(connector.setShippingAddress(cart, shippingAddress, opts))
            .then(() => paymentRequestSelector(getState()).paymentDetails)

        evt.updateWith(promise)
    })

    // Time to actually show the Payment Sheet
    request.show()
        // This promise will resolve once the user clicks the "Pay" button,
        // meaning that we now want to submit the order
        .then((result) => dispatch(connector.createOrder(cart, opts)))
        .catch(() => {
            // Handle errors
        })
}
```

<div id="toc"><p class="u-text-size-smaller u-margin-start u-margin-bottom"><b>IN THIS ARTICLE:</b></p></div>