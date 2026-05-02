import Link from "next/link";

export function SocialHandle({Social}) {
  const {link, Icon, name} = Social;
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex text-foreground hover:text-primary items-center text-sm font-bold p-2 rounded-md hover:bg-white/10 transition-colors group"
    >
      <Icon className="mr-2 text-primary group-hover:scale-110 transition-transform"/>
      <span className="drop-shadow-sm">{name}</span>
    </Link>
  )
}