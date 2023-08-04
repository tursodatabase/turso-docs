---
description: Implementing checking out and order placement for an e-commerce app built with Remix, Drizzle, Turso, and Cloudflare Workers
keywords:
  - turso
  - remix
  - e-commerce
---

# Step 7: Checking out and placing orders

After users have selected items they want to buy and placed them in the cart, we
then expect them to check out. To facilitate this inside the app, let’s create
the checkout page by adding a `checkout._index.tsx` file under `app/routes`.

For the loader, we are trying to get the same data as we did in the cart page,
only that here we need the user information too. The user data is used to
pre-fill some fields on the checkout form.

```tsx title="/app/routes/checkout._index.tsx"
cartItems = await db.query.cartItems.findMany({
  where: (cartItems, { eq }) => eq(cartItems.userId, userId),
  columns: { count: true, id: true },
  with: { product: true, user: true },
});
return {
  cartItems,
  userData: cartItems[0].user,
};
```

We then get the loader data and lay out the cart items and checkout information
on the page component. [Here is the page markup for the checkout page
component].

After having registered a user and added some items to the cart, this is what
you should see when you visit the checkout page.

![Checkout page preview](assets/10-checkout-page-preview.png)

After having provided the required payment, contact, and billing information,
the user will submit the checkout form by clicking the “Pay Now” button.

Clinking the "Pay Now" button prompts the submission of the checkout form data
to the checkout page's action that validates submitted data, handles the
creation of new orders, and returns the correct message depending on the action
being successful or not.

Here is the page action that handles order placement.

```tsx title="/app/routes/checkout._index.tsx"
export const action = async ({
  request,
  context,
}: ActionArgs): Promise<
  { status: string; message: string; data: any } | Response
> => {
  const userId = await requireUserId(
    { request, redirectTo: "/account/login" },
    context
  );
  if (userId === undefined) {
    return redirect("/account/login");
  } else {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);

    // Validate submitted data

    const db = buildDbClient(context);

    try {
      const cartItemsData = await db.query.cartItems.findMany({
        where: (cartItems, { eq }) => eq(cartItems.userId, userId),
        columns: {
          count: true,
          id: true,
        },
        with: {
          product: true,
          user: true,
        },
      });

      if (!cartItemsData.length) {
        return {
          status: "error",
          message: "Add something to your cart first",
          data: null,
        };
      }

      const amount = cartItemsData.reduce(
        (
          accumulator: number,
          currentVal: { count: number; product: { price: number } }
        ) => accumulator + currentVal.count * currentVal.product.price,
        0
      );
      const calculatedShippingFees = 0;
      const discountAmount = 0;
      const finalAmount = amount + calculatedShippingFees - discountAmount;

      const newOrder = await db
        .insert(orders)
        .values({
          id: uuidv4(),
          userId,
          customerName: `${values.firstName} ${values.lastName}`,
          amount,
          shippingFees: calculatedShippingFees,
          discountAmt: discountAmount,
          finalAmount,
          shippingAddress: `${values.zipCode} ${values.country}`,
        })
        .returning()
        .get();

      for (const item of cartItemsData) {
        const orderItemData = {
          id: uuidv4(),
          orderId: newOrder.id,
          productId: item.product.id,
          count: item.count,
        };
        await db.insert(orderItems).values(orderItemData).run();

        await db.delete(cartItems).where(eq(cartItems.id, item.id)).run();
      }
      return {
        status: "success",
        message: "Order placed!",
        data: true,
      };
    } catch (error) {
      // TODO: Catch error and notify user
      return {
        status: "failure",
        message: "Could not create an order!",
        data: null,
      };
    }
  }
};
```

_**Note:** There is no payment integration in this tutoria that would be
implemented here. You can plug in one on your own._

After having added all of the essential features to our e-commerce store, next,
we'll be deploying the site to Cloudflare workers.

[Here is the page markup for the checkout page component]: https://github.com/turso-extended/app-the-mug-store/blob/master/app/routes/checkout._index.tsx#L171-L497
