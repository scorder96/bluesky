import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface Props {
  loading: boolean;
  embedJson: { title: string; description: string };
  onRemoveEmbed: () => void;
}
export default function EmbedWeb({ loading, embedJson, onRemoveEmbed }: Props) {
  return (
    <div className="bg-neutral-200 p-2 mt-2">
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <p className="text-sm font-semibold">{embedJson.title}</p>
          <p className="text-xs">
            {embedJson.description?.slice(0, 30) + "..."}
          </p>
        </>
      )}
      <Button
        variant="outline"
        size={"sm"}
        className="mt-2"
        onClick={onRemoveEmbed}
      >
        Remove Embed
      </Button>
    </div>
  );
}
