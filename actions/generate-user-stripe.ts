"use server";

import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { absoluteUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
}

// const billingUrl = absoluteUrl("/dashboard/billing")
const billingUrl = absoluteUrl("/pricing")

export async function generateUserStripe(priceId: string): Promise<responseAction> {
  let redirectUrl: string = "";

  try {
    const session = await auth()
    const user = session?.user;

    if (!user || !user.email || !user.id) {
      throw new Error("Unauthorized");
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
      // User on Paid Plan - Create a portal session to manage subscription.
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      })

      redirectUrl = stripeSession.url as string
    } else {
      // User on Free Plan - Create a checkout session to upgrade.
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId: user.id,
        },
      })

      redirectUrl = stripeSession.url as string
    }
  } catch (error) {
    throw new Error("Failed to generate user stripe session");
  }

  // no revalidatePath because redirect
  redirect(redirectUrl)
}



// for one time test
// "use server";

// import { auth } from "@/auth";
// import { stripe } from "@/lib/stripe";
// import { getUserSubscriptionPlan } from "@/lib/subscription";
// import { absoluteUrl } from "@/lib/utils";
// import { redirect } from "next/navigation";

// export type responseAction = {
//   status: "success" | "error";
//   stripeUrl?: string;
// }

// const billingUrl = absoluteUrl("/dashboard/billing")

// export async function generateUserStripe(priceId: string): Promise<responseAction> {
//   try {
//     const session = await auth()
//     const user = session?.user;

//     if (!user || !user.email || !user.id) {
//       throw new Error("Unauthorized");
//     }

//     const subscriptionPlan = await getUserSubscriptionPlan(user.id)

//     // Check if this is a one-time purchase
//     const isOneTimePurchase = priceId === process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_PURCHASE_ID;

//     if (isOneTimePurchase) {
//       // Create a one-time Checkout session
//       const stripeSession = await stripe.checkout.sessions.create({
//         success_url: billingUrl,
//         cancel_url: billingUrl,
//         mode: "payment",
//         payment_method_types: ["card"],
//         billing_address_collection: "auto",
//         customer_email: user.email,
//         line_items: [
//           {
//             price: priceId,
//             quantity: 1,
//           },
//         ],
//         metadata: {
//           userId: user.id,
//         },
//       });

//       if (stripeSession.url) {
//         return { status: "success", stripeUrl: stripeSession.url };
//       }
//     } else {
//       // Handle subscription logic (existing code)
//       if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
//         const stripeSession = await stripe.billingPortal.sessions.create({
//           customer: subscriptionPlan.stripeCustomerId,
//           return_url: billingUrl,
//         });
//         return { status: "success", stripeUrl: stripeSession.url };
//       } else {
//         const stripeSession = await stripe.checkout.sessions.create({
//           success_url: billingUrl,
//           cancel_url: billingUrl,
//           payment_method_types: ["card"],
//           mode: "subscription",
//           billing_address_collection: "auto",
//           customer_email: user.email,
//           line_items: [
//             {
//               price: priceId,
//               quantity: 1,
//             },
//           ],
//           metadata: {
//             userId: user.id,
//           },
//         });
//         return { status: "success", stripeUrl: stripeSession.url };
//       }
//     }

//     throw new Error("Failed to generate Stripe session");
//   } catch (error) {
//     return { status: "error" };
//   }
// }