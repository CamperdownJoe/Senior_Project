"use client";

import { useContext } from "react";
import { UserSubscriptionPlan } from "@/types";

import { oneTimePurchase } from "@/config/subscriptions";
import { Button } from "@/components/ui/button";
import { BillingFormButtonSingle } from "@/components/forms/billing-form-button-single";
import { ModalContext } from "@/components/modals/providers";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

interface PricingCardsSingleProps {
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
}

export function PricingCardsSingle({ userId, subscriptionPlan }: PricingCardsSingleProps) {
  const { setShowAuthModal } = useContext(ModalContext);

  return (
    <MaxWidthWrapper>
      <section className="flex flex-col items-center text-center">
        <HeaderSection label="Pricing" title="Reorganize Your Bookmarks" />

        <div className="mt-10 w-full max-w-sm">
          <div className="rounded-3xl border shadow-sm">
            <div className="p-8">
              <h3 className="text-2xl font-bold">{oneTimePurchase.title}</h3>
              <p className="mt-2 text-muted-foreground">{oneTimePurchase.description}</p>
              <div className="mt-4 text-4xl font-bold">${oneTimePurchase.price}</div>
              <ul className="mt-8 space-y-3">
                {oneTimePurchase.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center">
                    <Icons.check className="mr-3 size-5 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t p-8">
              {/* make sure subscriptionPlan is not null */}
              {userId && subscriptionPlan ? (
                <BillingFormButtonSingle
                  offer={oneTimePurchase}
                  subscriptionPlan={subscriptionPlan}
                />
              ) : (
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => setShowAuthModal(true)}
                >
                  Sign in to Purchase
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}