import { HistoryTable } from "./_components/table";

export default function Page() {
  return <div className="container mx-auto py-8 space-y-8">

    <h1 className="text-2xl font-bold">
      Előzmények
    </h1>

    <div className="border-2 rounded-md">
      <HistoryTable data={[{ id: "1", date: new Date(), input: "Sample ticket" }]} />
    </div>

  </div>
}
