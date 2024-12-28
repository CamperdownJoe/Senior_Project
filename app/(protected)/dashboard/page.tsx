import Link from "next/link";
import { Bookmark, BookOpen, HelpCircle, Settings } from "lucide-react";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata = constructMetadata({
  title: "Dashboard – Bookmark Organizer",
  description: "Welcome to your personalized dashboard.",
});

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <>
      <DashboardHeader
        heading={`Welcome, ${user?.name || "User"}!`}
        text="Organize your bookmarks with ease."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Organize Bookmarks
            </CardTitle>
            <Bookmark className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Start a new organization session for your bookmarks.
            </p>
            <Link href="/organize-bookmarks">
              <Button className="mt-4">Start Organizing</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              View Documentation
            </CardTitle>
            <BookOpen className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View the documentation for the Bookmark Organizer.
            </p>
            <Link href="/docs">
              <Button className="mt-4">View Documentation</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Settings
            </CardTitle>
            <Settings className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage your account preferences and details.
            </p>
            <Link href="/dashboard/settings">
              <Button className="mt-4">Go to Settings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            If you have any questions or need assistance, our support team is
            here to help.
          </p>
          <Link href="/dashboard/support">
            <Button className="mt-4" variant="outline">
              <HelpCircle className="mr-2 size-4" />
              Contact Support
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}