import { headers } from "next/headers";
import Stripe from "stripe";

import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Handle one-time purchase
    if (session.mode === "payment") {
      await prisma.user.update({
        where: {
          id: session?.metadata?.userId,
        },
        data: {
          hasPurchasedReorganization: true,
          purchaseDate: new Date(),
        },
      });
    }
  }

  return new Response(null, { status: 200 });
}