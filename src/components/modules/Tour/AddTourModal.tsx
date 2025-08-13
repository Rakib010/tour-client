/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useAddTourMutation } from "@/redux/features/tour/tour.api";
import { useGetTourTypesQuery } from "@/redux/features/tourType/tourType.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddTourModal() {
  const form = useForm();
  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);

  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionsQuery(undefined);
  const [addTour] = useAddTourMutation();

  const tourTypeOptions = tourTypeData?.data?.map(
    (tourType: { _id: string; name: string }) => ({
      value: tourType._id,
      tourType: tourType.name,
    })
  );
  const divisionOptions = divisionData?.data?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      divisionName: item.name,
    })
  );

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();

      // Create tour object
      const tourData = {
        title: data.title,
        description: data.description,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        costFrom: Number(data.costFrom),
        included: data.included?.split(",").map((i: string) => i.trim()),
        exclude: data.exclude?.split(",").map((i: string) => i.trim()),
        amenities: data.amenities?.split(",").map((i: string) => i.trim()),
        tourPlan: data.tourPlan?.split("\n").map((p: string) => p.trim()),
        maxGuest: Number(data.maxGuest),
        minAge: Number(data.minAge),
        division: data.division,
        tourType: data.tourType,
      };

      formData.append("data", JSON.stringify(tourData));

      // Append files
      if (data.images instanceof FileList && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append("images", file);
        });
      }

      /*  for (const [key, value] of formData.entries()) {
        console.log(key, value);
      } */

      /* const res = await addTour(formData);
      console.log(res);
      if (res.success) {
        toast.success("Tour created successfully!");
      } */
    } catch (err) {
      console.error(err);
      toast.error("Error creating tour");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Tour</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Tour</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="add-tour-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[100px]" />
                  </FormControl>
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
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="startDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="endDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="costFrom"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost From</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="included"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Included (comma separated)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="exclude"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excluded (comma separated)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="amenities"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amenities (comma separated)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="tourPlan"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Plan (one per line)</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[80px]" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="maxGuest"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Guests</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
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
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tourType"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Tour Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={tourTypeLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tourTypeOptions?.map(
                        (option: { value: string; tourType: string }) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.tourType}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem className="flex-1 ">
                  <FormLabel>Division</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={divisionLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {divisionOptions?.map(
                        (item: { divisionName: string; value: string }) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.divisionName}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="images"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="sticky bottom-0 bg-white pt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="add-tour-form">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
