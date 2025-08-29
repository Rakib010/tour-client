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
import { useUpdateUserMutation } from "@/redux/features/auth/auth.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateUser({ userId }: any) {
  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  const [userUpdate] = useUpdateUserMutation();

  const onSubmit = async (data: any) => {
    try {
      const res = await userUpdate({ id: userId, ...data }).unwrap();
      if (res.success) {
        toast.success("User profile update successfully");
        form.reset();
      }
    } catch (error) {
      //console.error("Update failed:", error);
      toast.error("Something wrong went");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-left flex justify-between items-center hover:bg-green-400 hover:text-gray-700  "
        >
          <span>Update Profile</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Update User Profile
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="updateUser"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-2"
          >
            {/* Name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your phone"
                      {...field}
                      className="bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your address"
                      {...field}
                      className="bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="sticky bottom-0 bg-white pt-4 flex justify-end gap-2 border-t">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="updateUser">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
