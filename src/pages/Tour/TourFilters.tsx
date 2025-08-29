import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tourType/tourType.api";
import { useSearchParams } from "react-router";

export default function TourFilters() {
  const form = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;
  const searchTerm = searchParams.get("searchTerm") || "";

  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDivisionsQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeIsLoading } =
    useGetTourTypesQuery({ limit: 1000, fields: "_id,name" });

  const divisionOption = divisionData?.data?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  const tourTypeOptions = tourTypeData?.data?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

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

  const handleSearch = (data: { tourSearch: string }) => {
    const params = new URLSearchParams(searchParams);
    if (data.tourSearch) {
      params.set("searchTerm", data.tourSearch);
    } else {
      params.delete("searchTerm");
    }
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("division");
    params.delete("tourType");
    params.delete("searchTerm");
    setSearchParams(params);
  };

  return (
    <div className="w-full border border-gray-200 rounded-2xl p-6 space-y-6 bg-white shadow-md sticky top-24">
      {/* Filters header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="font-semibold text-gray-800 text-lg">Filters</h2>
        <Button size="sm" variant="outline" onClick={handleClearFilter}>
          Clear
        </Button>
      </div>

      {/* 🔍 Search Box */}
      <div className="max-w-full">
        <form
          onSubmit={form.handleSubmit(handleSearch)}
          className="flex flex-col gap-4"
        >
          <Controller
            name="tourSearch"
            control={form.control}
            defaultValue={searchTerm}
            render={({ field }) => (
              <div className="relative">
                <Input
                  placeholder="Search destination..."
                  className="w-full pl-10 pr-4 py-3 border-gray-300 rounded-lg focus-visible:ring-emerald-500"
                  {...field}
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            )}
          />
        </form>
      </div>

      {/* Division Filter */}
      <div>
        <Label className="mb-2 block text-gray-700 font-medium">Division</Label>
        <Select
          onValueChange={handleDivisionChange}
          value={selectedDivision ? selectedDivision : ""}
          disabled={divisionIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select division" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {divisionOption?.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Tour Type Filter */}
      <div>
        <Label className="mb-2 block text-gray-700 font-medium">
          Tour Type
        </Label>
        <Select
          onValueChange={handleTourTypeChange}
          value={selectedTourType ? selectedTourType : ""}
          disabled={tourTypeIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select tour type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {tourTypeOptions?.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
