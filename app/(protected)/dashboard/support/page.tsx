import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { SupportForm } from "@/components/forms/support-form";

export const metadata = constructMetadata({
  title: "Support – SaaS Starter",
  description: "Get help and support for your account.",
});

export default async function SupportPage() {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/");
  if (!user?.email) redirect("/");

  return (
    <>
      <DashboardHeader
        heading="Support"
        text="Need help? Send us a message and we'll get back to you as soon as possible."
      />
      <div className="max-w-2xl">
        <SupportForm user={{ id: user.id, email: user.email }} />
      </div>
    </>
  );
}