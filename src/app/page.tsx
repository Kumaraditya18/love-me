import Link from "next/link";
import { M } from "@/lib/memes";

export default function IntroPage() {
  return (
    <main className="page scene">
      <h1 className="title">hii cutie 💕</h1>
      <img src={M.hi} alt="Cute cat" className="cat-big" />
      <Link href="/love" className="cta">
        tap me →
      </Link>
    </main>
  );
}
