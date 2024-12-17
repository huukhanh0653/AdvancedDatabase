"use client"
import React, { useState, useEffect } from 'react';
import { Command } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';




export function NavBranch() {
  const [branch, setBranch] = useState({});
  const getBranch = () => {
  const _userbase64 = localStorage.getItem("user");
    if (_userbase64) {
      const authuser = JSON.parse(decodeURIComponent(escape(atob(_userbase64))));
      if(authuser.MaBP == 6) {
        setBranch({
          branchID: localStorage.getItem('branch'),
          branchUrl: '/company-dashboard',
        });
      } else {
        setBranch({
          branchID: null,
          branchUrl: '/dashboard',
        });
      }
    }
  }
  useEffect(() => {
    getBranch();
  },[]);
    return (
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={branch.branchUrl}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SuShiX</span>
                  <span className="truncate text-xs">Chi nhánh {branch.branchID}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
    )
}