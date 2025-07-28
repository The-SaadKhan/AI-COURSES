import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from '@/components/ui/button';


export default function Home() {
  return (
    <div>
      <h2>HELOO WORLD</h2>
      <Button>HELLO</Button>
      <UserButton/>
    </div>
  );
}
