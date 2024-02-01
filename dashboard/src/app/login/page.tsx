'use client';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Button, Image } from '@/components/common';
import { loginSchema } from '@/schemas/login';
import { useUserLoginMutation } from '@/redux/api/authApi';
import { getNewAccessToken } from '@/services/auth.service';

function Login() {
  const router = useRouter();

  const [login, { data }] = useUserLoginMutation();
  // console.log(data);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async values => {
      await login(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleRefresh = async () => {
    const token = await getNewAccessToken();
    console.log(token);
  };

  return (
    <div className="flex h-screen flex-wrap items-center justify-center overflow-x-hidden bg-bgwhite md:gap-[60px]">
      <Image
        className="h-[300px] w-[100%] rounded-rounded-md md:h-[500px] md:w-[500px]"
        src="/static/pictures/login.png"
        alt="Login image of RSE dashboard"
      />

      <form
        onSubmit={formik.handleSubmit}
        className="mx-2 flex w-full flex-col items-end justify-center gap-3 md:mx-0 md:h-[500px] md:w-[500px]"
      >
        <input
          type="email"
          placeholder="Type your email here..."
          className="h-[50px] w-full rounded-rounded-md bg-white-c p-[22px] text-black-c placeholder-gray-600 shadow-default focus:outline-none"
          {...formik.getFieldProps('email')}
        />
        <input
          type="password"
          placeholder="Type your password here..."
          className="h-[50px] w-full rounded-rounded-md bg-white-c p-[22px] text-black-c placeholder-gray-600 shadow-default focus:outline-none"
          {...formik.getFieldProps('password')}
        />
        <Button type="submit" className="h-[50px]">
          LOG IN
        </Button>
        <Button className="h-[50px]" onClick={handleRefresh}>
          check refresh
        </Button>
      </form>
    </div>
  );
}
export default Login;
// onClick={() => router.push('/dashboard')}
