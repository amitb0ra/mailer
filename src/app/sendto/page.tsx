import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/navbar";

export default function SendToPage() {
  return (
    <div className="h-screen">
      <Navbar />
      <ResizablePanelGroup
        direction="horizontal"
        className="text-white h-screen p-2"
      >
        <ResizablePanel defaultSize={35} minSize={25}>
          <Card className="h-screen bg-gray-900 mx-2 p-3">
            <div className="flex gap-2">
              <Input placeholder="Search leads"></Input>
              <Button className="w-fit m-auto">Search</Button>
            </div>
          </Card>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={65} minSize={50}>
          <Card className="h-screen bg-gray-900 mr-2 p-3">
            <div className="flex flex-col gap-3">
              <Input placeholder="Enter leads name"></Input>
              <Textarea placeholder="Type your message here." />
              <Button className="w-fit m-auto">Add</Button>
            </div>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
