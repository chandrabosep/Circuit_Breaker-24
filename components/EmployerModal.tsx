"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { Sparkles } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  description: z.string().min(6, {
    message: "Description is to short.",
  }),
});

export default function EmployerModal({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      companyName: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="w-9/12 mx-auto flex items-center absolute bottom-4  px-3 py-1 text-green-500 bg-grad-magic rounded-full shadow-md">
          {icon}Be a {title}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-col gap-6">
            <AlertDialogTitle className="text-2xl font-semibold text-center py-2 bg-grad-magic rounded-full">
              Welcome HERO!
            </AlertDialogTitle>
            <div className="flex gap-10 ">
              <div className="w-1/3 py-28 h-fit border-4 text-gray-400 border-gray-400 round border-dashed px-8 ">
                <Input id="picture" type="file" className="text-gray-400" />
              </div>
              <div className="w-2/3 flex flex-col">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            How do you want other Heroes to call you?
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Roaring Kitty"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your company Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Kitty Productions"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your company Name</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Looking for great feline minds, that are top notch at their jobs"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="float-right items-center flex">
                      <AlertDialogCancel className="px-6 py-1 font-semibold text-green-500 bg-grad-magic rounded-full shadow-md">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction>
                        <Button
                          type="submit"
                          className="px-6 py-1 font-semibold text-green-500 bg-grad-magic rounded-full shadow-md"
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          Get started
                        </Button>
                      </AlertDialogAction>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
