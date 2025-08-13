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
import { Textarea } from "@/components/ui/textarea";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type TDivisionFormData = {
  name: string;
  file: FileList;
  description: string;
};

export default function AddDivisionModal() {
  const form = useForm<TDivisionFormData>();
  const [addDivision] = useAddDivisionMutation();

  const onSubmit = async (data: TDivisionFormData) => {
   
    try {
      const formData = new FormData();

      const divisionData = {
        name: data.name,
        description: data.description || "",
      };

      formData.append("data", JSON.stringify(divisionData));

      // Append file if exists, field name "file"
      if (data.file && data.file.length > 0) {
        formData.append("file", data.file[0]);
      }

      /* for (const [key, value] of formData.entries()) {
        console.log(key, value);
      } */
     
      const res = await addDivision(formData).unwrap();
      if (res.success) {
        toast.success("Division created successfully");
        form.reset();
      }
    } catch (error) {
      toast.error("Error creating division");
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Division</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="add-division-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Division name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Khulna" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload */}
            <FormField
              control={form.control}
              name="file"
              rules={{ required: "Thumbnail is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short description..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button id="close-dialog" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="add-division-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
