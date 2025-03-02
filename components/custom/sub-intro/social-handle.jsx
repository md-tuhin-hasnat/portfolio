import Link from "next/link";

export function SocialHandle({Social}) {
  const {link, Icon, name} = Social;
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex text-secondary-foreground/70 hover:text-primary items-center text-sm font-medium"
    >
      <Icon className="mr-2 text-primary"/>
      <span>{name}</span>
    </Link>
  )
}