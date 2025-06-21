import {Chat} from "@/components/chat"
export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* <h1 className="text-4xl font-bold">Contact</h1>
      <p className="text-lg mt-4">You can reach me at <a href="mailto:mdtuhinhasnat@gmail.com" className="text-primary">
        <span className="text-primary">mdtuhinhasnat@gmail.com</span>
      </a></p> */}

      <Chat />
    </div>
  );
}