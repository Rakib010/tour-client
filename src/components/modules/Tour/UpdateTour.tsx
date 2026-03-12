/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Pencil, Plus, Trash2, Loader2 } from "lucide-react";

import MultipleImageUploads from "@/components/MultipleImageUploads";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn, getErrorMessage } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tourType/tourType.api";
import { useGetTourQuery, useUpdateTourMutation } from "@/redux/features/tour/tour.api";
import { toast } from "sonner";

interface UpdateTourProps {
  tourId: string;
}

export default function UpdateTour({ tourId }: UpdateTourProps) {
  const [open, setOpen] = useState(false);
  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);
  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionsQuery(undefined);
  const { data: tourResponse, isLoading: tourLoading } = useGetTourQuery(
    { _id: tourId, limit: "1" },
    { skip: !open }
  );
  const [updateTour] = useUpdateTourMutation();
  const [images, setImages] = useState<File[]>([]);

  const tour = tourResponse?.data?.data?.[0];

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      costFrom: "",
      startDate: new Date(),
      endDate: new Date(),
      departureLocation: "",
      arrivalLocation: "",
      included: [{ value: "" }],
      exclude: [{ value: "" }],
      amenities: [{ value: "" }],
      tourPlan: [{ value: "" }],
      maxGuest: "",
      minAge: "",
      division: "",
      tourType: "",
    },
  });

  // dynamic fields
  const {
    fields: includedFields,
    append: appendIncluded,
    remove: removeIncluded,
  } = useFieldArray({ control: form.control, name: "included" });
  const {
    fields: excludedFields,
    append: appendExcluded,
    remove: removeExcluded,
  } = useFieldArray({ control: form.control, name: "exclude" });
  const {
    fields: amenitiesFields,
    append: appendAmenity,
    remove: removeAmenity,
  } = useFieldArray({ control: form.control, name: "amenities" });
  const {
    fields: tourPlanFields,
    append: appendTourPlan,
    remove: removeTourPlan,
  } = useFieldArray({ control: form.control, name: "tourPlan" });

  // map options
  const tourTypeOptions = tourTypeData?.data?.map((t: any) => ({
    label: t.name,
    value: t._id,
  }));
  const divisionOptions = divisionData?.data?.map((d: any) => ({
    label: d.name,
    value: d._id,
  }));

  // Populate form when tour data loads (dialog opened)
  useEffect(() => {
    if (!tour) return;
    const startDate = tour.starDate ? new Date(tour.starDate) : new Date();
    const endDate = tour.endDate ? new Date(tour.endDate) : new Date();
    form.reset({
      title: tour.title || "",
      description: tour.description || "",
      location: tour.location || "",
      costFrom: tour.costFrom?.toString() || "",
      startDate,
      endDate,
      departureLocation: tour.departureLocation || "",
      arrivalLocation: tour.arrivalLocation || "",
      included: (tour.included?.length ? tour.included : [""]).map((v: string) => ({ value: v })),
      exclude: (tour.exclude?.length ? tour.exclude : [""]).map((v: string) => ({ value: v })),
      amenities: (tour.amenities?.length ? tour.amenities : [""]).map((v: string) => ({ value: v })),
      tourPlan: (tour.tourPlan?.length ? tour.tourPlan : [""]).map((v: string) => ({ value: v })),
      maxGuest: tour.maxGuest?.toString() || "",
      minAge: tour.minAge?.toString() || "",
      division: tour.division?._id || tour.division || "",
      tourType: tour.tourType?._id || tour.tourType || "",
    });
  }, [tour, form]);

  // submit
  const onSubmit = async (data: any) => {
    const payload: any = {
      ...data,
      costFrom: Number(data.costFrom),
      minAge: Number(data.minAge),
      maxGuest: Number(data.maxGuest),
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included:
        data.included[0]?.value === ""
          ? []
          : data.included.map((i: any) => i.value),
      exclude:
        data.exclude[0]?.value === ""
          ? []
          : data.exclude.map((i: any) => i.value),
      amenities:
        data.amenities[0]?.value === ""
          ? []
          : data.amenities.map((i: any) => i.value),
      tourPlan:
        data.tourPlan[0]?.value === ""
          ? []
          : data.tourPlan.map((i: any) => i.value),
    };

    const formData = new FormData();
    // Append each field separately
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v)); // multiple values for array fields
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    // Append images
    images.forEach((image) => formData.append("files", image));

    try {
      const res = await updateTour({ id: tourId, data: formData }).unwrap();

      if (res.success) {
        toast.success("Tour updated successfully");
        setOpen(false);
        setImages([]);
      }
      console.log("Response:", res);
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error, "Failed to update tour. Please try again."));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Tour</DialogTitle>
        </DialogHeader>

        {tourLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
        <Form {...form}>
          <form
            id="update-tour-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Title */}
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                    {...field}
                    className="min-h-[200px] resize-y"
                    placeholder="Write description... Press Enter for new line. Use double Enter for new paragraph."
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tour Type */}
            <FormField
              control={form.control}
              name="tourType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={tourTypeLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Tour Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tourTypeOptions?.map((option: any) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Division */}
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={divisionLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {divisionOptions?.map((option: any) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter location" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="departureLocation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter departure location" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="arrivalLocation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arrival Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter arrival location" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              {/* Start Date */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Date */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Cost, Guests, Min Age */}
            <FormField
              name="costFrom"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost From</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Enter starting cost"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="maxGuest"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Guest</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Enter max guest"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="minAge"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Enter minimum age"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Included */}
            <div>
              <div className="flex justify-between mt-4">
                <p className="font-semibold">Included</p>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => appendIncluded({ value: "" })}
                >
                  <Plus />
                </Button>
              </div>
              <div className="space-y-2 mt-2">
                {includedFields.map((item, index) => (
                  <div className="flex gap-2" key={item.id}>
                    <FormField
                      control={form.control}
                      name={`included.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="Add included item" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeIncluded(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Excluded */}
            <div>
              <div className="flex justify-between mt-4">
                <p className="font-semibold">Excluded</p>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => appendExcluded({ value: "" })}
                >
                  <Plus />
                </Button>
              </div>
              <div className="space-y-2 mt-2">
                {excludedFields.map((item, index) => (
                  <div className="flex gap-2" key={item.id}>
                    <FormField
                      control={form.control}
                      name={`exclude.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="Add excluded item" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeExcluded(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <div className="flex justify-between mt-4">
                <p className="font-semibold">Amenities</p>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => appendAmenity({ value: "" })}
                >
                  <Plus />
                </Button>
              </div>
              <div className="space-y-2 mt-2">
                {amenitiesFields.map((item, index) => (
                  <div className="flex gap-2" key={item.id}>
                    <FormField
                      control={form.control}
                      name={`amenities.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="Add amenity" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeAmenity(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tour Plan */}
            <div>
              <div className="flex justify-between mt-4">
                <p className="font-semibold">Tour Plan</p>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => appendTourPlan({ value: "" })}
                >
                  <Plus />
                </Button>
              </div>
              <div className="space-y-2 mt-2">
                {tourPlanFields.map((item, index) => (
                  <div className="flex gap-2" key={item.id}>
                    <FormField
                      control={form.control}
                      name={`tourPlan.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Add tour plan item"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeTourPlan(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              {tour?.images?.length ? (
                <div className="mb-3">
                  <p className="text-sm font-medium mb-2">Current images</p>
                  <div className="flex flex-wrap gap-2">
                    {tour.images.map((url: string, i: number) => (
                      <img key={i} src={url} alt="" className="h-16 w-16 object-cover rounded-md border" />
                    ))}
                  </div>
                </div>
              ) : null}
              <MultipleImageUploads onChange={setImages} />
            </div>
          </form>
        </Form>
        )}

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="update-tour-form" disabled={tourLoading}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
