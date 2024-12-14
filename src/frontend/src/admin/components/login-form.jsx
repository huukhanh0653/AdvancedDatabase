"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { use } from "react"



export function LoginForm({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userName, setUserName] = React.useState('')
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate()
  let navigateUrl = "/reservation"

  const onLogin = (e) => {
    e.preventDefault();
    if(userName === "" || password === "") {
        alert("Vui lòng nhập đầy đủ thông tin")
        return;
    }
    if(userName == "boss") {
      navigateUrl = "/company-dashboard"
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("user", JSON.stringify({ role: userName }));
      navigate(navigateUrl);
    }, 1000);

}

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onLogin}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label  htmlFor="user">
              Tên đăng nhập
            </Label>
            <Input
              id="user"
              placeholder="username..."
              type="text"
              autoCapitalize="none"
              autoComplete="user"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setUserName(e.target.value)}
              required 
            />
          </div>
          <div className="grid gap-1 pt-3 pb-3">
            <Label  htmlFor="password">
              Mật khẩu
            </Label>
            <Input
              id="password"
              placeholder="password..."
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button onClick={onLogin} type = "submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Đăng nhập
          </Button>
        </div>
      </form>
    </div>
  )
}