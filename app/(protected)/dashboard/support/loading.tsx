import { DashboardHeader } from "@/components/dashboard/header";
import { SkeletonSection } from "@/components/shared/section-skeleton";

export default function SupportPageLoading() {
  return (
    <>
      <DashboardHeader
        heading="Support"
        text="Need help? Send us a message and we'll get back to you as soon as possible."
      />
      <div className="max-w-2xl">
        <SkeletonSection />
      </div>
    </>
  );
}