import { LoginForm } from "@/src/admin/components/login-form"



export default function Login() {
  return (
    <>
      <div className="container relative hidden h-[922px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <img src="../../../public/sushi.jpg" alt="Background" className="absolute inset-0 h-full w-full object-cover" />
          <div className="relative z-20 flex items-center text-4xl font-semibold text-white">
            Quản lý hệ thống nhà hàng SushiX
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-white">
                Đồ án môn học Cơ sở dữ liệu nâng cao
              </p>
              <footer className="text-base">Khoa Công Nghệ Thông Tin -
              Trường Đại Học Khoa Học Tự Nhiên, Thành phố Hồ Chí Minh.</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Đăng nhập
              </h1>
              <p className="text-sm text-muted-foreground">
                Nhập tài khoản và mật khẩu để đăng nhập
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}