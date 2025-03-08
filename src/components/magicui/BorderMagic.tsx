import { Button } from "@/components/ui/button";
import { BorderBeam } from "./border-beam";

export function BorderMagic() {
  return (
    <Button className="relative overflow-hidden rounded-xl" size="lg" variant="outline">
      مسیر یادگیری
      <BorderBeam
        size={40}
        initialOffset={20}
        className="from-transparent via-green to-transparent "
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 20,
        }}
      />
    </Button>
  );
}
