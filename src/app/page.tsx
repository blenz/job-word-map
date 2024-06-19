import SearchInput from "@/components/SearchInput";

export async function searchJob(input: string) {
  'use server'
  console.log(input)
}

export default function JobWordMap() {
  return (
    <main>
      <div className="px-20">
        <SearchInput placeholder="Job" onSearch={searchJob} />
      </div>
    </main>
  );
}
