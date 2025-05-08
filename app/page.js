
import { getCondidats } from "@/actions/badge.action";
import Acc from "@/components/Acc";

export default async function Home() {

  const results = await getCondidats()
  return (
   <Acc data={results?.condidats} />
  );
}
