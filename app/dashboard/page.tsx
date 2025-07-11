"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { DollarSign, ShoppingCart, Users, Coffee, AlertTriangle, Clock, CheckCircle } from "lucide-react"

const revenueData = [
  { name: "T2", value: 2400 },
  { name: "T3", value: 1398 },
  { name: "T4", value: 9800 },
  { name: "T5", value: 3908 },
  { name: "T6", value: 4800 },
  { name: "T7", value: 3800 },
  { name: "CN", value: 4300 },
]

const recentOrders = [
  {
    id: "#001",
    customer: "Nguyễn Văn A",
    items: "Cà phê đen, Bánh mì",
    total: 45000,
    status: "completed",
    time: "10:30",
  },
  { id: "#002", customer: "Trần Thị B", items: "Trà sữa, Bánh ngọt", total: 65000, status: "preparing", time: "10:25" },
  { id: "#003", customer: "Lê Văn C", items: "Cappuccino, Croissant", total: 85000, status: "ready", time: "10:20" },
  { id: "#004", customer: "Phạm Thị D", items: "Americano", total: 35000, status: "pending", time: "10:15" },
  { id: "#005", customer: "Hoàng Văn E", items: "Latte, Tiramisu", total: 95000, status: "completed", time: "10:10" },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Hoàn thành</Badge>
    case "preparing":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Đang pha</Badge>
    case "ready":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Sẵn sàng</Badge>
    case "pending":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Chờ xử lý</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Tổng quan hoạt động cafe hôm nay</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu hôm nay</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250,000₫</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> so với hôm qua
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đơn hàng</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8</span> đơn so với hôm qua
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sản phẩm bán chạy</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Cà phê đen</div>
            <p className="text-xs text-muted-foreground">23 ly đã bán</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng mới</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> so với hôm qua
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu tuần này</CardTitle>
            <CardDescription>Biểu đồ doanh thu 7 ngày gần nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value.toLocaleString()}₫`, "Doanh thu"]} />
                <Bar dataKey="value" fill="#ea580c" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <CardDescription>5 đơn hàng mới nhất hôm nay</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">{order.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>{order.total.toLocaleString()}₫</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <CardTitle className="text-sm font-medium text-yellow-800">Cảnh báo hết hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-700">3 sản phẩm sắp hết hàng cần nhập thêm</p>
            <Button variant="outline" size="sm" className="mt-2 text-yellow-700 border-yellow-300 bg-transparent">
              Xem chi tiết
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Clock className="h-5 w-5 text-blue-600 mr-2" />
            <CardTitle className="text-sm font-medium text-blue-800">Đơn hàng chờ xử lý</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700">5 đơn hàng đang chờ được xử lý</p>
            <Button variant="outline" size="sm" className="mt-2 text-blue-700 border-blue-300 bg-transparent">
              Xử lý ngay
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <CardTitle className="text-sm font-medium text-green-800">Hoạt động tốt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700">Hệ thống đang hoạt động bình thường</p>
            <Button variant="outline" size="sm" className="mt-2 text-green-700 border-green-300 bg-transparent">
              Xem báo cáo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
