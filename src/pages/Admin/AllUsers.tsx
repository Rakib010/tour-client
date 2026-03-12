import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsersQuery } from "@/redux/features/user/user.api";
import { Loader2, Users } from "lucide-react";

export default function AllUsers() {
  const { data, isLoading, isError } = useGetAllUsersQuery(undefined);

  if (isError) {
    return (
      <p className="text-center py-10 text-destructive">Failed to load users</p>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const users = data?.data?.data || [];
  const meta = data?.data?.meta || {};

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            All Users
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage registered users
          </p>
        </div>
        <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
          Total: {meta.total || users.length}
        </span>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
              <TableHead className="font-semibold text-foreground py-4 px-4">Name</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4">Email</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4">Phone</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4">Role</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length ? (
              users.map((user: { _id: string; name: string; email: string; phone?: string; role: string; isDeleted?: boolean }) => (
                <TableRow key={user._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium py-4 px-4">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground py-4 px-4">{user.email}</TableCell>
                  <TableCell className="py-4 px-4">{user.phone || "—"}</TableCell>
                  <TableCell className="py-4 px-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                      {user.role?.toLowerCase()}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        user.isDeleted
                          ? "bg-destructive/10 text-destructive"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      }`}
                    >
                      {user.isDeleted ? "Inactive" : "Active"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
