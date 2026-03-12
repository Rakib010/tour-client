import { role } from "@/constants/auth/role";
import { adminSidebarItems } from "@/constants/sidebar/adminSidebarItems";
import { userSidebarItems } from "@/constants/sidebar/userSidebarItems";
import type { TRole } from "@/interfaces";


export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.superAdmin:
            return [...adminSidebarItems];
        case role.admin:
            return [...adminSidebarItems];
        case role.user:
            return [...userSidebarItems];
        default:
            return [];
    }
};