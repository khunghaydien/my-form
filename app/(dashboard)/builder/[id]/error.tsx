"use client";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

function error({ error }: { error: Error }) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4">
      <span className="text-destructive text-4xl">Something went wrong</span>
      <Button asChild>
        <Link href={"/"}>Go back to home</Link>
      </Button>
    </div>
  );
}

export default error;
