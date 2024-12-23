import { IconHexagon } from "@tabler/icons-react";
import { Slugs } from "@/components/User";
import IconCloud from "./icon-cloud";

export function Loader() {
  return (
    <div className="relative bg-base-100 flex h-full w-full animate-[ping_1.5s_ease-in-out_1_4.5s] items-center justify-center">
      <IconCloud iconSlugs={Slugs} />
      <IconHexagon
        className="absolute -z-10 animate-[spin_5s_linear_infinite] text-primary"
        size={120}
        stroke={1.25}
      />
      <div className="absolute font-mono text-primary font-semibold text-6xl -z-10">
        SP
      </div>
    </div>
  );
}