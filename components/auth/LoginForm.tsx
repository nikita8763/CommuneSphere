// LoginForm.tsx
'use client'
import React, { useState, useTransition } from 'react';
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Login } from '@/actions/auth/login';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { LoginSchema } from '@/schema';
import Image from 'next/image';
import loginForm from '@/public/loginForm.png'


const LoginForm: React.FC = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })



  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  // eslint-disable-next-line no-unused-vars
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      Login(values)
        .then((data ) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };



  return (
    <div className='flex h-[100vh] w-full items-center justify-center'>
      <div className='w-[50%] h-[70%] flex'>
        <div className='w-1/2   rounded-l-lg p-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
          <div>
            <h1 className='text-3xl font-semibold text-center'>Managing made <span className='underline underline-offset-8 decoration-4 font-bold'>EZ</span>.</h1>
          </div>
          <div className='flex justify-center my-12'>
            <Image src="/mlsaLogo.png" alt='mlsa logo' width={100} height={100}/>
          </div>

          <div className=''>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Email</FormLabel> */}
                      <FormControl>
                        <Input placeholder="Email" {...field} disabled={isPending} />
                      </FormControl>
                      {/* <FormDescription>
                        This is your kiit email id.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Password</FormLabel> */}
                      <FormControl>
                        <Input placeholder="Password" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button type="submit" className='w-full h-10 bg-black text-white'>Login</Button>
              </form>
            </Form>
            <div>
              <h3 className='text-sm font-light flex justify-center mt-5'>Forgot Password ?</h3>
            </div>
          </div>
          
        </div>
        <div className='w-1/2'>
          <Image src={loginForm} alt='loginform' className='rounded-r-lg w-[100%] h-[100%]'/>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
