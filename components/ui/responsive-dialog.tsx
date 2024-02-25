// Copied from 'Responsive Dialog' Example on https://ui.shadcn.com/docs/components/drawer

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { ReactNode } from "react";

export interface ResponsiveDialogProps {
    children: ReactNode;
    content: ReactNode;
}

export function ResponsiveDialog(props: ResponsiveDialogProps) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return (
            <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogTrigger asChild>{props.children}</DialogTrigger>
                <DialogContent className="overflow-auto sm:max-w-[500px] 2xl:max-w-[800px]">{props.content}</DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer
            open={open}
            onOpenChange={setOpen}
        >
            <DrawerTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit profile</DrawerTitle>
                    <DrawerDescription>Make changes to your profile here. Click save when you&apos;re done.</DrawerDescription>
                </DrawerHeader>
                {props.content}

                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
