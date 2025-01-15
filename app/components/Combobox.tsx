import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { useState } from "react";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { useNavigate } from "@remix-run/react";
import pb from "~/pocketbase";

interface Props {
  placeholder: string;
  list: Array<string>;
  onSelected: (value: string) => void;
}
export default function Combobox({ placeholder, list, onSelected }: Props) {
  const [Open, setOpen] = useState(false);
  const [Selected, setSelected] = useState(String);
  const navigate = useNavigate();
  return (
    <Popover open={Open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="text-left">
        <Button variant="outline" role="combobox" className="justify-between">
          {Selected || <p className="opacity-50">{placeholder}</p>}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandGroup>
              {list.map((property) => {
                return (
                  <CommandItem
                    key={property}
                    onSelect={(value) => {
                      !pb.authStore.isValid && navigate("/sign-up");
                      setSelected(value);
                      onSelected(value);
                      setOpen(false);
                    }}
                    className="flex justify-between cursor-pointer"
                  >
                    {property}
                    {Selected == property && <Check />}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
