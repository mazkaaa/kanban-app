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
      <h2 className="text-2xl font-bold tracking-wide text-zinc-100">
        Kanban.
      </h2>
      <h4 className="text-lg font-semibold text-zinc-200">{accountName}</h4>
    </header>
  );
};
