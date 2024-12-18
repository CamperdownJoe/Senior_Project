"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { UserSubscriptionPlan } from "@/types";

import { SubscriptionPlan } from "@/types/index";
import { pricingData } from "@/config/subscriptions";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BillingFormButton } from "@/components/forms/billing-form-button";
import { ModalContext } from "@/components/modals/providers";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";


