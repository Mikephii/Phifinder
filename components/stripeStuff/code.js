<div id="paypal-button-container-P-6KY30808RB481294GMEHZFWA"></div>
<script src="https://www.paypal.com/sdk/js?client-id=AUpPgih8NRv7o9K6hV6tTIi8Dp7LW6yKHHsq6aT7bco8OaAr80ahJ0zY6ZgbW5ROl8h9NGjuGF1I4W9U&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script>
<script>
  paypal.Buttons({
      style: {
          shape: 'pill',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription: function(data, actions) {
        return actions.subscription.create({
          /* Creates the subscription */
          plan_id: 'P-6KY30808RB481294GMEHZFWA'
        });
      },
      onApprove: function(data, actions) {
        alert(data.subscriptionID); // You can add optional success message for the subscriber here
      }
  }).render('#paypal-button-container-P-6KY30808RB481294GMEHZFWA'); // Renders the PayPal button
</script>