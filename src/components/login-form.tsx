import * as z from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

export type FormValues = z.infer<typeof formSchema>;
type Props = { onSubmit: SubmitHandler<FormValues> };

export const LoginForm = ({ onSubmit }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const errors = form.formState.errors;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label>Username: </label>
        <input className="border border-black" {...form.register("username")} />
        {errors.username?.message && <p>{errors.username.message}</p>}
      </div>

      <div>
        <label>Password: </label>
        <input className="border border-black" type="password" {...form.register("password")} />
        {errors.password?.message && <p>{errors.password.message}</p>}
      </div>

      <button className="bg-gray-200 p-1 ml-2" type="submit">
        submit
      </button>
    </form>
  );
};
