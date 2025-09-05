import Sighup from "@/components/Sighup";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center bg-cover" style={{backgroundImage : "url('https://images.pexels.com/photos/33498262/pexels-photo-33498262.jpeg')"}}>
      <Sighup />
    </div>
  );
}
