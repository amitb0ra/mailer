"use client";
import { ModeToggle } from "@/components/theme-toggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Sender() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Send Email</h2>
      <ModeToggle />
      <form>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="to">To:</Label>
            <Input id="to" type="email" placeholder="example@example.com" />
          </div>
          <div>
            <Label htmlFor="subject">Subject:</Label>
            <Input id="subject" type="text" placeholder="Email Subject" />
          </div>
          <div>
            <Label htmlFor="body">Body:</Label>
            <Textarea id="body" rows={5} placeholder="Email Body" />
          </div>
          <Button type="submit">Send Email</Button>
        </div>
      </form>
    </div>
  );
}
