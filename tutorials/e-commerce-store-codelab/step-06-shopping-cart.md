---
description: Adding a shopping cart feature and management to an e-commerce app built with Remix, Drizzle, Turso, and Cloudflare Workers
keywords:
  - turso
  - e-commerce
  - shopping
  - cart
  - remix
---

# Step 6: Adding the shopping cart

Let’s implement the cart for the Mug Store app so that users can hold items that
they would like to finally purchase.

All the items that a user adds to the cart are stored in the `cartItems` table
inside our Turso database, this is a good practice since the user can resume
their shopping session even when they hop onto another device.

Start off by creating a cart page `cart._index.tsx` file inside the routes
directory.

The Drizzle query that we’ll need to run on the loader function of this page is
as follows.

```tsx title="/app/routes/cart._index.tsx"
const cartItems = await db.query.cartItems.findMany({
  where: (cartItems, { eq }) => eq(cartItems.userId, userId),
  columns: {
    count: true,
    id: true,
  },
  with: {
    product: true,
  },
});
```

Then on the page component, get the loader data and list the cart items.

```tsx title="/app/routes/cart._index.tsx"
<div className="flex flex-col space-y-4">
  {cartData.cartItems.length ? (
    cartData.cartItems?.map((item: CartItem) => (
      <CartPageItem key={item.id} {...item} />
    ))
  ) : (
    <div className="flex w-full items-center p-4 gap-4">
      Your cart is empty, continue shopping!
    </div>
  )}
</div>
```

Here is the `<CartPageItem>` component we are using to list items within the
cart.

```tsx title="/app/components/CartPageItem.tsx"
import { useFetcher } from "@remix-run/react";

import type { CartItem } from "~/lib/types";

export const CartPageItem = (props: CartItem) => {
  const itemFetcher = useFetcher();

  return (
    <div className="flex w-full p-4 gap-4">
      <div>
        <img
          src={props.product.image || "Default image url"}
          alt=""
          className="h-64 w-64 rounded object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-start">
        <h3 className="text-gray-900">
          <a href={`/product/${props.product.id}`}>{props.product.name}</a>
          <strong>x({props.count})</strong>
        </h3>

        <div className="px-2 py-4 font-semibold">
          ${(props.product.price * props.count).toFixed(2)}
        </div>

        <p className="mt-0.5 space-y-px text-gray-600">
          {props.product.description}
        </p>
      </div>
      <div>
        <itemFetcher.Form method="post" action="/manage-cart">
          <input type="hidden" name="product_id" value={props.product.id} />
          <button
            className="p-1 rounded bg-red-600 text-white"
            name="_action"
            value="deleteCartItem"
          >
            {(itemFetcher.state === "submitting" ||
              itemFetcher.state === "loading") &&
            itemFetcher.formData?.get("product_id") === props.product.id ? (
              <span className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="animate-spin text-white w-4 h-4 fill-white"
                >
                  <path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path>
                </svg>
              </span>
            ) : (
              <svg
                className="h-4 w-4 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
              </svg>
            )}
          </button>
        </itemFetcher.Form>
      </div>
    </div>
  );
};
```

## The mini-cart

It is also a good practice to make the cart accessible from all points within an
e-commerce website, we will do so by adding a mini-cart that can be accessed
from the navigation bar.

In the first section of this tutorial we added a placeholder for the space that
the cart component was going to reside, we are going to make use of this space.
Add a new `Cart.tsx` component inside `app/components` and paste the following
code into it.

```tsx title="/app/components/Cart.tsx"
import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";

import type { CartItem } from "~/lib/types";

import { CartIcon } from "./Icon";
import { CartListItem } from "./CartListItem";

export const Cart = () => {
  const cartItemsFetcher = useFetcher();
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart((s) => !s);
  };

  useEffect(() => {
    cartItemsFetcher.submit(
      {},
      {
        action: "/manage-cart",
        method: "get",
      }
    );
  }, []);

  return (
    <div className="relative z-40">
      <button className="flex space-x-1 items-center" onClick={toggleCart}>
        <CartIcon color="#4ff8d2" />
        <span className="bg-secondary-400 text-black rounded-full p-1 h-5 w-5 flex items-center justify-center font-semibold">
          {cartItemsFetcher.data && cartItemsFetcher.data.cartItems
            ? cartItemsFetcher.data.cartItems.length
            : 0}
        </span>
      </button>

      {showCart && (
        <div className="fixed top-14 right-2 z-10 max-h[90vh]">
          <div
            className="relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 drop-shadow-md"
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
          >
            <button
              className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
              onClick={toggleCart}
            >
              <span className="sr-only">Close cart</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mt-4 space-y-6">
              <div className="flex flex-col space-y-4">
                {cartItemsFetcher.data &&
                cartItemsFetcher.data.cartItems &&
                cartItemsFetcher.data.cartItems.length ? (
                  cartItemsFetcher.data.cartItems.map((item: CartItem) => (
                    <div key={item.id} className="max-h-[80vh] overflow-y-auto">
                      <CartListItem {...item} />
                    </div>
                  ))
                ) : (
                  <div className="flex w-full items-center p-4 gap-4">
                    Your cart is empty, continue shopping!
                  </div>
                )}
              </div>

              <div className="space-y-4 text-center">
                <a
                  href="/cart"
                  className="block rounded border border-gray-600 px-5 py-3 transition hover:ring-1 hover:ring-gray-400"
                >
                  <span className="text-sm text-tertiary-800 font-semibold">
                    View my cart (
                    {cartItemsFetcher.data && cartItemsFetcher.data.cartItems
                      ? cartItemsFetcher.data.cartItems.length
                      : 0}
                    )
                  </span>
                </a>

                <a
                  href="/checkout"
                  className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  Checkout
                </a>

                <a href="/" className="inline-block text-sm">
                  <span className="text-gray-500 underline underline-offset-4 transition hover:text-gray-600">
                    Continue shopping
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
```

We can now replace the placeholder text "CART_ICON" we used previously within
the `<Header />` component with the `<Cart />` component.

Inside the cart component we use state to toggle the mini-cart component into
and out of view. The rest of the component’s logic will be covered in the
section that follows.

Observing the cart component’s code, you should see that we are using another
component `<CartListItem />`. Add this component to the project by creating a
CartListItem.tsx file inside the components directory, and paste the following
code into it.

```tsx title="/app/components/CartListItem.tsx"
import { useFetcher } from "@remix-run/react";

import type { CartItem } from "~/lib/types";
import { DeleteIcon, LoadingIcon } from "./Icon";
import { resizeImage } from "~/lib/utils";

export const CartListItem = (props: CartItem) => {
  const itemFetcher = useFetcher();

  return (
    <div className="flex w-full items-center p-4 gap-4">
      <img
        src={resizeImage(props.product.image, 50, 50)}
        alt=""
        className="h-16 w-16 rounded object-cover"
      />

      <div className=" flex-1">
        <h3 className="text-sm text-gray-900">
          {props.product.name} <strong>x({props.count})</strong>
        </h3>
      </div>
      <div>
        <itemFetcher.Form method="post" action="/manage-cart">
          <input type="hidden" name="product_id" value={props.product.id} />
          <button
            className="p-1 rounded bg-red-600 text-white"
            name="_action"
            value="deleteCartItem"
          >
            {(itemFetcher.state === "submitting" ||
              itemFetcher.state === "loading") &&
            itemFetcher.formData?.get("product_id") === props.product.id ? (
              <span className="flex justify-center">
                <LoadingIcon />
              </span>
            ) : (
              <DeleteIcon />
            )}
          </button>
        </itemFetcher.Form>
      </div>
    </div>
  );
};
```

We’ll also talk more about this component in the next section.

## Managing cart items

Since cart management can be done from different points within the app (the cart
page, mini-cart component, checkout page), let’s create a [Remix resource route]
that will handle some CRUD requests to our database concerning cart items.

Add a Remix resource route file `manage-cart.ts` under `app/routes` and inside it
paste the following code.

```ts title="/app/routes/manage-cart.ts"
import { v4 as uuidv4 } from "uuid";
import {
  type ActionArgs,
  type LoaderArgs,
  json,
  redirect,
} from "@remix-run/cloudflare";
import { and, eq } from "drizzle-orm";

import { cartItems } from "drizzle/schema";
import { requireUserId } from "~/lib/session.server";
import { buildDbClient } from "~/lib/client";

export async function loader({ request, context }: LoaderArgs) {
  const db = buildDbClient(context);
  const userId = await requireUserId(
    { request, redirectTo: "/account/login" },
    context
  );

  if (!userId) {
    return {
      cartItems: [],
    };
  }

  const cartItems = await db.query.cartItems.findMany({
    where: (cartItems, { eq }) => eq(cartItems.userId, userId),
    columns: {
      count: true,
      id: true,
    },
    with: {
      product: true,
    },
  });

  return {
    cartItems,
  };
}

export async function action({ request, context }: ActionArgs): Promise<Promise<TypedResponse<never> | TypedResponse | null> {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  const userId = await requireUserId(
    { request, redirectTo: "/account/login" },
    context
  );
  if (userId === undefined) {
    const searchParams = new URLSearchParams([
      ["error", "Log in to add items to cart"],
    ]);
    return redirect(`/account/login?${searchParams}`);
  }

  const productId = values.product_id as string;
  const quantity = values.quantity;
  const db = buildDbClient(context);

  if (_action === "addToCart") {
    const cartItem = await db.query.cartItems.findFirst({
      where: (cartItems, { eq, and }) =>
        and(eq(cartItems.productId, productId), eq(cartItems.userId, userId)),
    });

    if (cartItem) {
      const append = await db
        .update(cartItems)
        .set({ count: cartItem.count + 1 })
        .where(
          and(eq(cartItems.productId, productId), eq(cartItems.userId, userId))
        )
        .returning()
        .get();
      return json(append);
    } else {
      const id = uuidv4();
      const cartInsertionResponse = await db
        .insert(cartItems)
        .values({
          id,
          productId,
          userId,
          count: (quantity || 1) as number,
        })
        .returning()
        .get();
      return json(cartInsertionResponse);
    }
  }

  if (_action === "deleteCartItem") {
    const deleted = await db
      .delete(cartItems)
      .where(eq(cartItems.productId, productId))
      .returning()
      .get();

    return json(deleted);
  }

  return null;
}
```

In the `manage-cart.ts` resource route, you’ll find a loader function that
queries our Turso database and returns the cart items belonging to the
authenticated user.

In the mini-cart component, you can see a `cartItemsFetcher` which is updated
whenever changes are detected in our app by leveraging the `useEffect` hook. It
consumes the data from the loader within the `manage-cart.ts` resource route and
updates the listed cart items.

For cart items management, the action function set within the resource route
handles such requests. This action handles cart item data addition,
modification, and deletion.

After having added this resource route, we can proceed to creating the
components that expose its functionalities to the user.

### Adding items to the cart

Let's implement the feature that adds items to the cart inside the product
details page. Create the product details it by adding a `mug.$id.tsx` file under
the routes directory. In this page, we first check whether a product id `$id`
has been passed as a route parameter within the page's URL, we then check if a
product with that id exists inside the database, if not we throw a 404 error,
else we pass the product's date to the page component.

Here is the code to the loader function within the product details page.

```tsx title="/app/routes/mug.$id.tsx"
export const loader: LoaderFunction = async ({
  params,
  context,
}: LoaderArgs) => {
  const db = buildDbClient(context);
  const { id } = params;
  if (!id) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Product id not found!",
    });
  }

  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .get();

  if (!product) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Product not found!",
    });
  }

  return {
    product: product as unknown as Product,
  };
};
```

Here is the page's component code with the markup of the form that's responsible
for triggering the action that add's an item to the cart.

```tsx title="/app/routes/mug.$id.tsx"
export default function () {
  const pageData = useLoaderData<typeof loader>();
  const triggerAction = useFetcher();

  return (
    <>
    <!-- Other markup -->
      <triggerAction.Form
        method="post"
        action="/manage-cart"
        className="pt-8"
      >
        <input
          type="hidden"
          name="product_id"
          value={pageData.product.id}
        />
        <button
          className={
            (triggerAction.state === "submitting" ||
              triggerAction.state === "loading") &&
              triggerAction.formData?.get("product_id") ===
              pageData.product.id &&
              triggerAction.formData?.get("_action") === "addToCart"
              ? `block w-full rounded bg-yellow-600 p-4 text-sm font-medium hover:bg-yellow-700`
              : `block w-full rounded bg-yellow-400 p-4 text-sm font-medium hover:bg-yellow-500`
          }
          name="_action"
          value="addToCart"
        >
          Add to Cart{" "}
          {(triggerAction.state === "submitting" ||
            triggerAction.state === "loading") &&
            triggerAction.formData?.get("product_id") ===
            pageData.product.id &&
            triggerAction.formData?.get("_action") === "addToCart" &&
            "..."}
        </button>
      </triggerAction.Form>
    <!-- Other markup -->
    </>
  )
}
```

As we have it in the `manage-cart` resource route, the cart item being submitted
is either updated when it’s detected as a duplicate or added as a new item if it
does not exist in the user’s cart.

For the full component markup, you can [view it over here].

By the end of this step, here's a demonstration of what we expect the cart
within our website to function.

![Demonstration of the cart within the website](assets/09-cart-preview.gif)

Next, let's manage customer checking out and order placement.

[Remix resource route]: https://remix.run/docs/en/1.18.1/guides/api-routes#resource-routes
[view it over here]: https://github.com/turso-extended/app-the-mug-store/blob/master/app/routes/mug.%24id.tsx#L55
