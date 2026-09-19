import { getDictionary } from "@/i18n/dictionaries";
import { CraftView } from "@/views";

export default async function CraftPage() {
  const dictionary = await getDictionary();

  return <CraftView dictionary={dictionary} />;
}
