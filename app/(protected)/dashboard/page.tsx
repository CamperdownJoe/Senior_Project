import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Bookmark, HelpCircle, Settings } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Dashboard – Bookmark Organizer",
  description: "Welcome to your personalized dashboard.",
});

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <>
      <DashboardHeader
        heading={`Welcome, ${user?.name || 'User'}!`}
        text="Organize your bookmarks with ease."
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Organize Bookmarks
            </CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Start a new organization session for your bookmarks.</p>
            <Button className="mt-4" asChild>
              <Link href="/organize-bookmarks">Start Organizing</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              View Documentation
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">View the documentation for the Bookmark Organizer.</p>
            <Button className="mt-4" asChild>
              <Link href="/docs">View Documentation</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Settings
            </CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Manage your account preferences and details.</p>
            <Button className="mt-4" asChild>
              <Link href="/dashboard/settings">Go to Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">If you have any questions or need assistance, our support team is here to help.</p>
          <Link href="/dashboard/support">
            <Button className="mt-4" variant="outline">
              <HelpCircle className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}