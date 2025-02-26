import { AtpAgent } from "@atproto/api";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import pb from "~/pocketbase";
import { useNavigate } from "@remix-run/react";

interface Props {
  file: File;
  onEmbedJson: (imageJson: any) => void;
  onRemove: () => void;
}
export default function EmbedImage({ file, onEmbedJson, onRemove }: Props) {
  useEffect(() => {
    uploadImage();
  }, []);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cachedURL = URL.createObjectURL(file);

  async function uploadImage() {
    setLoading(true);
    const agent = new AtpAgent({
      service: "https://bsky.social",
    });
    const dataOrg = localStorage.getItem("ALLDATA");
    const localData = JSON.parse(dataOrg!);
    const record = await pb
      .collection("profiles")
      .getFirstListItem(`handle="${localData.profileData.handle}"`);
    await agent.login({
      identifier: record.handle,
      password: record.password,
    });
    const dataArray: Uint8Array = new Uint8Array(await file.arrayBuffer());
    const { data } = await agent.uploadBlob(dataArray, {
      encoding: file.type,
    });
    const imageJson = {
      $type: "app.bsky.embed.images",
      images: [
        {
          alt: "alt",
          image: data.blob,
          // aspectRatio: {
          //   width: ,
          //   height: 667,
          // },
        },
      ],
    };
    onEmbedJson(imageJson);
    setLoading(false);
  }
  function removeImage() {
    const imageJson = { remove: "remove" };
    onEmbedJson(imageJson);
    onRemove();
  }
  return (
    <>
      {Loading ? (
        <div className="h-20 w-20 border border-primary flex justify-center items-center mt-2">
          <Loader2 className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="bg-neutral-200 p-2 mt-2 max-w-fit">
          <img src={cachedURL} className="h-20 mt-2" />
          <Button
            variant="outline"
            size={"sm"}
            className="mt-2 w-full"
            onClick={removeImage}
          >
            Remove
          </Button>
        </div>
      )}
    </>
  );
}
