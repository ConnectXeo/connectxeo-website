import { redirect } from "next/navigation";

/** Legacy Hermes OS shell removed — send visitors to contact voice. */
export default function VoiceRedirectPage() {
  redirect("/contact");
}
