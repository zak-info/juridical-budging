
import { getCondidats, getConds } from "@/actions/badge.action";
import Acc from "@/components/Acc";

export default async function Home() {

  const results = await getConds()
  return (
   <Acc data={results?.condidats} />
  );
}
