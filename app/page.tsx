import Image from "next/image";
import Container from "./components/Container";
import blueyBingo from "@/public/images/bluey-bingo.jpg";
import Card from "./components/Card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Container classes={{ container: "grid grid-cols-4 gap-10 z-20" }}>
        <Card classes={{ card: "w-60 h-60" }}>
          <Link href="/memory-cards" className="w-40 lg:w-80">
            <Image
              className="object-cover h-full"
              src={blueyBingo.src}
              width={blueyBingo.width}
              height={blueyBingo.height}
              alt="Logo"
            />
          </Link>
        </Card>
        <Card classes={{ card: "w-60 h-60" }}>
          {" "}
          <div></div>
        </Card>
        <Card classes={{ card: "w-60 h-60" }}>
          {" "}
          <div></div>
        </Card>
        <Card classes={{ card: "w-60 h-60" }}>
          {" "}
          <div></div>
        </Card>
        <Card classes={{ card: "w-60 h-60" }}>
          {" "}
          <div></div>
        </Card>
        <Card classes={{ card: "w-60 h-60" }}>
          {" "}
          <div></div>
        </Card>
        <Card classes={{ card: "w-60 h-60" }}>
          {" "}
          <div></div>
        </Card>
        <Card classes={{ card: "w-60 h-60" }}>
          {" "}
          <div></div>
        </Card>
      </Container>
    </main>
  );
}
