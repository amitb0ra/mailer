"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function Component() {
  const [smtpServers, setSmtpServers] = useState([
    {
      id: 1,
      host: "smtp.example.com",
      port: 587,
      username: "user1",
      password: "pass1",
      enabled: true,
      deliveryRate: 95,
      bounceRate: 2,
    },
    {
      id: 2,
      host: "smtp2.example.com",
      port: 587,
      username: "user2",
      password: "pass2",
      enabled: true,
      deliveryRate: 92,
      bounceRate: 3,
    },
    {
      id: 3,
      host: "smtp3.example.com",
      port: 587,
      username: "user3",
      password: "pass3",
      enabled: false,
      deliveryRate: 88,
      bounceRate: 5,
    },
  ]);
  const [currentServerIndex, setCurrentServerIndex] = useState(0);
  const sendEmail = (to, subject, body) => {
    const currentServer = smtpServers[currentServerIndex];
    console.log(`Sending email to ${to} using ${currentServer.host}`);
    setCurrentServerIndex((currentServerIndex + 1) % smtpServers.length);
  };
  const addServer = (server) => {
    setSmtpServers([...smtpServers, server]);
  };
  const editServer = (id, updates) => {
    setSmtpServers(
      smtpServers.map((server) =>
        server.id === id ? { ...server, ...updates } : server
      )
    );
  };
  const deleteServer = (id) => {
    setSmtpServers(smtpServers.filter((server) => server.id !== id));
  };
  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">SMTP Server Manager</h1>
        <Button
          onClick={() =>
            addServer({
              id: smtpServers.length + 1,
              host: "",
              port: 587,
              username: "",
              password: "",
              enabled: true,
              deliveryRate: 0,
              bounceRate: 0,
            })
          }
        >
          Add Server
        </Button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {smtpServers.map((server) => (
          <Card key={server.id}>
            <CardHeader>
              <CardTitle>{server.host}</CardTitle>
              <CardDescription>
                {server.username}@{server.host}:{server.port}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span>Enabled:</span>
                  <Checkbox
                    checked={server.enabled}
                    onCheckedChange={(e) =>
                      editServer(server.id, { enabled: e.target.checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery Rate:</span>
                  <span>{server.deliveryRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Bounce Rate:</span>
                  <span>{server.bounceRate}%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  editServer(server.id, {
                    host: "new-host.example.com",
                    port: 587,
                    username: "newuser",
                    password: "newpass",
                  })
                }
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteServer(server.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
