"use client";
import { useEffect, useState } from "react";

export const Header = () => {
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authData")) {
      const authData = localStorage.getItem("authData");
      if (authData) {
        setAccountName(JSON.parse(authData).username);
      }
    }
  }, []);

  return (
    <header className="flex items-end justify-between">
      <h2 className="text-2xl font-bold tracking-wide text-foreground">
        Kanban.
      </h2>
      <h4 className="text-lg font-semibold text-foreground">{accountName}</h4>
    </header>
  );
};
