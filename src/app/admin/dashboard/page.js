
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  UserCheck,
  CreditCard,
  Eye,
  ArrowUpRight,
  Plus,
  LogOut,
  Search,
  Bell,
  CalendarDays,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// DEMO DATA - Replace with backend API data later
const stats = [
  {
    title: "Total Users",
    value: "1,284",
    change: "+12.8%",
    icon: Users,
  },
  {
    title: "Active Users",
    value: "1,106",
    change: "+8.2%",
    icon: UserCheck,
  },
  {
    title: "Total NFC Cards",
    value: "2,450",
    change: "+16.4%",
    icon: CreditCard,
  },
  {
    title: "Card Views",
    value: "18,920",
    change: "+22.1%",
    icon: Eye,
  },
];

const chartData = [
  { month: "Jun", users: 430 },
  { month: "Jul", users: 550 },
  { month: "Aug", users: 710 },
  { month: "Sep", users: 840 },
  { month: "Oct", users: 1030 },
  { month: "Nov", users: 1284 },
];

const recentUsers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "ADMIN",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Nair",
    email: "priya@example.com",
    role: "USER",
    status: "Active",
  },
  {
    id: 3,
    name: "Arjun Kumar",
    email: "arjun@example.com",
    role: "USER",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha@example.com",
    role: "USER",
    status: "Active",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredUsers = recentUsers.filter((user) =>
    `${user.name} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* PAGE HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Welcome back! Here's an overview of your NFC platform.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Notifications"
              disabled title="Notifications coming soon">
              <Bell className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" aria-label="Calendar"
              disabled title="Calendar coming soon">
              <CalendarDays className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* DEMO INDICATOR */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          Preview mode: dashboard statistics and users are sample data.
        </div>

        {/* STATS CARDS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.title} className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <div className="rounded-xl bg-blue-50 p-2.5">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>

                  <h2 className="mt-4 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </h2>

                  <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                    <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                    <span className="font-semibold text-emerald-600">
                      {stat.change}
                    </span>
                    vs. last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* GRAPH AND QUICK ACTIONS */}
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <p className="text-sm text-slate-500">
                Monthly user registrations
              </p>
            </CardHeader>

            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.20} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#2563eb"
                      strokeWidth={3}
                      fill="url(#userGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <p className="text-sm text-slate-500">
                Manage your NFC platform
              </p>
            </CardHeader>

            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                onClick={() => router.push("/admin/users")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Manage Users
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                disabled
                title="Available after creating a cards page"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Manage NFC Cards
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                disabled
                title="Available after implementing analytics"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* RECENT USERS */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Recent Users</CardTitle>
                <p className="mt-1 text-sm text-slate-500">
                  Latest users on your platform
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search users..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-slate-500">
                    <th className="px-4 py-3 font-medium">User</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b last:border-0">
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {user.email}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <Badge variant="secondary">
                          {user.role}
                        </Badge>
                      </td>

                      <td className="px-4 py-4">
                        <Badge
                          variant={
                            user.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-slate-500">
                        No matching users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
