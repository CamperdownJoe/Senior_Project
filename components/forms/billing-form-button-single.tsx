"use client";

import { useTransition } from "react";
import { generateUserStripe } from "@/actions/generate-user-stripe";
import { UserSubscriptionPlan } from "@/types";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

interface BillingFormButtonProps {
  offer: {
    title: string;
    stripeId: string;
  };
  subscriptionPlan: UserSubscriptionPlan;
}

export function BillingFormButtonSingle({
  offer,
  subscriptionPlan,
}: BillingFormButtonProps) {
  let [isPending, startTransition] = useTransition();

  const stripeSessionAction = () =>
    startTransition(async () => {
      try {
        const result = await generateUserStripe(offer.stripeId);
        if (result.status === "success" && result.stripeUrl) {
          window.location.href = result.stripeUrl;
        } else {
          console.error("Failed to generate Stripe session");
          // 可以在这里添加错误处理，比如显示一个错误消息给用户
        }
      } catch (error) {
        console.error("Error generating Stripe session:", error);
        // 同样，这里可以添加错误处理
      }
    });

  return (
    <Button
      variant="default"
      className="w-full"
      disabled={isPending}
      onClick={stripeSessionAction}
    >
      {isPending ? (
        <>
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Processing...
        </>
      ) : (
        <>Purchase</>
      )}
    </Button>
  );
}