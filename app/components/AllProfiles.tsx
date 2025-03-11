import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import pb from "~/pocketbase";

export default function AllProfiles() {
  useEffect(() => {
    getProfiles();
  }, []);
  const [Profiles, setProfiles] = useState(Array<String>);
  async function getProfiles() {
    const records = await pb.collection("profiles").getFullList();
    var handles: Array<String> = [];
    records.forEach((record) => handles.push(record.handle));
    setProfiles(handles);
  }
  const navigate = useNavigate();
  return (
    <Dialog>
      <DialogTrigger>Switch Profile</DialogTrigger>
      <DialogContent className="max-h-96 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>All Profiles</DialogTitle>
          <DialogDescription>Switch to any profile</DialogDescription>
        </DialogHeader>
        <ul>
          {Profiles.map((profile, index) => {
            return (
              <li
                key={index}
                className="py-2 hover:text-primary cursor-pointer"
                onClick={() => navigate("/fetch/" + profile)}
              >
                {profile}
              </li>
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
