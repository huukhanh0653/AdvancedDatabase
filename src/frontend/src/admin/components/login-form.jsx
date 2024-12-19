"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"




export function LoginForm({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [username, setUserName] = React.useState('')
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          const error = await response.json();
          setErrorMessage(error.message || 'Login failed');
          return;
        }
  
        const result = await response.json();
        setSuccessMessage(result.message);
        setErrorMessage('');
        setIsLoading(false);
  
        // Redirect to the homepage
         const isBoss = result.user.MaBP == 6;
        console.log(isBoss);
         if(isBoss) {
            navigate('/company-dashboard');
          }
          else {
            navigate('/dashboard');
          }
         const base64Value = btoa(unescape(encodeURIComponent(JSON.stringify(result.user))));
         localStorage.setItem('user', base64Value);

  
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setErrorMessage(error);
      }
    };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleLogin}>
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
          <Button onClick={handleLogin} type = "submit" disabled={isLoading}>
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