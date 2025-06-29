import getSongsByTitle from "../../../actions/getSongsByTitle";
import SearchContent from "./components/SearchContent";
import Header from "../../components/Header";
import SearchInput from "../../components/SearchInput";


interface SearchPageProps {
  searchParams: Promise<{ title?: string }>;
}

export const revalidate = 0;

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const resolvedSearchParams = await searchParams;
  const title = resolvedSearchParams?.title ?? "";
  const songs = await getSongsByTitle(title);

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Search
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default SearchPage;
