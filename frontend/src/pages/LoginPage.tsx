import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/constants/Icons";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import type { Credentials } from "@/types/types";


const Login = () => {
    const form = useForm<Credentials>();
    const { login } = useAuth();
    const navigate = useNavigate();
    const { mutate: loginUser, status } = login;

    const isPending = status === "pending";

    const handleSubmit: SubmitHandler<Credentials> = (credentials) => {
        loginUser(credentials, {
            onSuccess: () => {
                toast.success("Login Success!");
                navigate(`/`);
            },
            onError: (error) => {
                toast.error("Error Loggin In!", { description: error.message });
            },
        });
    };

    return (
        <div className="mx-auto flex w-full flex-col px-6 justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl flex items-center justify-center gap-4 font-grotesk font-semibold tracking-tight">
                    <span>Login to account </span>
                    <KeyRound />
                    {/* <LogInIcon /> */}
                </h1>
                <p className="text-sm font-grotesk font-medium tracking-normal text-muted-foreground">
                    Enter your email and password below to login to your account
                </p>

                <div className={"grid gap-6"}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="sr-only">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="example@example.com"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="sr-only">Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="password"
                                                    placeholder="password"
                                                    type="password"
                                                    autoCapitalize="none"
                                                    autoComplete="password"
                                                    autoCorrect="off"
                                                    disabled={isPending}
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button disabled={isPending}>
                                    {isPending && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Sign In with Email
                                </Button>
                            </div>
                            <p className="text-xs mt-3 text-red-600">
                                NOTE: The backend server may take up to a minute to respond on
                                the first request after being inactive.
                            </p>

                            <br />
                            <p className="text-xs">
                                For testing purposes, here are some sample credentials:
                            </p>
                            <p className="text-xs mt-1 text-red-600">
                                <strong>admin:</strong> ID: admin@admin.com, Password:
                                @admin@admin
                            </p>
                            <p className="text-xs mt-1 text-red-600">
                                <strong>employee:</strong> ID: employee@employee.com, Password:
                                @employee@employee
                            </p>
                        </form>
                    </Form>

                </div>
            </div>
        </div>
    );
};

export default Login;