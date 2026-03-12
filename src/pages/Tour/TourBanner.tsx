import tour from "../../assets/images/Tours.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tourType/tourType.api";
import { useSearchParams } from "react-router";

type SearchForm = { tourSearch: string };

export default function TourBanner() {
  const form = useForm<SearchForm>();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;
  const searchTerm = searchParams.get("searchTerm") || "";

  const { data: divisionData } = useGetDivisionsQuery(undefined);
  const { data: tourTypeData } = useGetTourTypesQuery({
    limit: 1000,
    fields: "_id,name",
  });

  const divisionOptions = divisionData?.data?.map(
    (item: { _id: string; name: string }) => ({ label: item.name, value: item._id })
  );
  const tourTypeOptions = tourTypeData?.data?.map(
    (item: { _id: string; name: string }) => ({ label: item.name, value: item._id })
  );

  const handleSearch = (data: { tourSearch: string }) => {
    const params = new URLSearchParams(searchParams);
    if (data.tourSearch) params.set("searchTerm", data.tourSearch);
    else params.delete("searchTerm");
    setSearchParams(params);
  };

  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("division", value);
    setSearchParams(params);
  };

  const handleTourTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourType", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    setSearchParams({});
    form.setValue("tourSearch", "");
  };

  const hasFilters =
    selectedDivision || selectedTourType || searchTerm;

  return (
    <section
      className="relative min-h-[420px] md:min-h-[480px] flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${tour})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
          Where would you like to go?
        </h1>
        <p className="text-lg text-white/90 mb-8">
          Search destinations, filter by division or tour type
        </p>

        {/* Search + Filter Bar */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-xl border border-white/20">
          <form
            onSubmit={form.handleSubmit(handleSearch)}
            className="flex flex-col md:flex-row gap-3 md:gap-4 md:items-end"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Controller
                name="tourSearch"
                control={form.control}
                defaultValue={searchTerm}
                render={({ field }) => (
                  <Input
                    placeholder="Search destination..."
                    className="pl-12 py-3 h-12 rounded-xl border-gray-200 focus-visible:ring-emerald-500"
                    {...field}
                  />
                )}
              />
            </div>
            <Select
              onValueChange={handleDivisionChange}
              value={selectedDivision || ""}
              disabled={!divisionOptions?.length}
            >
              <SelectTrigger className="w-full md:w-[180px] h-12 rounded-xl">
                <SelectValue placeholder="Division" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {divisionOptions?.map((item: { label: string; value: string }) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleTourTypeChange}
              value={selectedTourType || ""}
              disabled={!tourTypeOptions?.length}
            >
              <SelectTrigger className="w-full md:w-[180px] h-12 rounded-xl">
                <SelectValue placeholder="Tour type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {tourTypeOptions?.map((item: { label: string; value: string }) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                type="submit"
                className="h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700"
              >
                Search
              </Button>
              {hasFilters && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-xl"
                  onClick={handleClearFilter}
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
