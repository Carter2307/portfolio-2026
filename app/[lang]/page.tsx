import { getDictionary } from "@/i18n/dictionaries";
import { HomeView } from "@/views";

export default async function HomePage() {
  const dictionary = await getDictionary();

  return <HomeView dictionary={dictionary} />;
}
