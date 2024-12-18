"use client"

import { useState } from "react";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface SupportFormProps {
  user: Pick<User, "id" | "email">;
}

export function SupportForm({ user }: SupportFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  async function onSubmit(data: any) {
    setIsLoading(true);

    // Here you would typically send this data to your backend
    // For now, we'll just simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    toast({
      title: "Message sent",
      description: "We've received your message and will get back to you soon.",
    });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register("email")}
        type="email"
        placeholder="Your email"
        defaultValue={user.email || ""}
        disabled
      />
      <Input
        {...register("subject")}
        type="text"
        placeholder="Subject"
        required
      />
      <Textarea
        {...register("message")}
        placeholder="Describe your issue or question"
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}