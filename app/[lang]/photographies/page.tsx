import { getDictionary } from "@/i18n/dictionaries";
import { PhotographiesView } from "@/views";

export default async function PhotographiesPage() {
  const dictionary = await getDictionary();

  return <PhotographiesView dictionary={dictionary} />;
}
