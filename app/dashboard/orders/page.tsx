"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Clock, CheckCircle, AlertCircle } from "lucide-react"

const orders = [
  {
    id: "#001",
    orderNumber: "ORD-001",
    customer: { name: "Nguyễn Văn A", phone: "0901234567" },
    items: [
      { name: "Cà phê đen", quantity: 2, price: 25000 },
      { name: "Bánh croissant", quantity: 1, price: 25000 },
    ],
    total: 75000,
    status: "completed",
    paymentMethod: "cash",
    createdAt: "2024-01-15 10:30",
    completedAt: "2024-01-15 10:45",
  },
  {
    id: "#002",
    orderNumber: "ORD-002",
    customer: { name: "Trần Thị B", phone: "0901234568" },
    items: [
      { name: "Cappuccino", quantity: 1, price: 45000 },
      { name: "Trà sữa", quantity: 1, price: 35000 },
    ],
    total: 80000,
    status: "preparing",
    paymentMethod: "card",
    createdAt: "2024-01-15 11:00",
  },
  {
    id: "#003",
    orderNumber: "ORD-003",
    customer: { name: "Lê Văn C", phone: "0901234569" },
    items: [{ name: "Latte", quantity: 1, price: 50000 }],
    total: 50000,
    status: "ready",
    paymentMethod: "transfer",
    createdAt: "2024-01-15 11:15",
  },
  {
    id: "#004",
    orderNumber: "ORD-004",
    customer: { name: "Phạm Thị D", phone: "0901234570" },
    items: [
      { name: "Americano", quantity: 2, price: 35000 },
      { name: "Bánh tiramisu", quantity: 1, price: 55000 },
    ],
    total: 125000,
    status: "pending",
    paymentMethod: "cash",
    createdAt: "2024-01-15 11:30",
  },
]

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "pending", label: "Chờ xử lý" },
  { value: "preparing", label: "Đang pha" },
  { value: "ready", label: "Sẵn sàng" },
  { value: "completed", label: "Hoàn thành" },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="h-3 w-3 mr-1" />
          Hoàn thành
        </Badge>
      )
    case "preparing":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="h-3 w-3 mr-1" />
          Đang pha
        </Badge>
      )
    case "ready":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <AlertCircle className="h-3 w-3 mr-1" />
          Sẵn sàng
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          <Clock className="h-3 w-3 mr-1" />
          Chờ xử lý
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getPaymentMethodText = (method: string) => {
  switch (method) {
    case "cash":
      return "Tiền mặt"
    case "card":
      return "Thẻ"
    case "transfer":
      return "Chuyển khoản"
    default:
      return method
  }
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would update the order in the database
    console.log(`Updating order ${orderId} to status ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý Đơn hàng</h1>
        <p className="text-muted-foreground">Theo dõi và quản lý tất cả đơn hàng</p>
      </div>

      {/* Order Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ xử lý</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "pending").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang pha</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "preparing").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sẵn sàng</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "ready").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoàn thành</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "completed").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo mã đơn, tên khách hàng, SĐT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng</CardTitle>
          <CardDescription>Tất cả đơn hàng được sắp xếp theo thời gian tạo</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer.name}</div>
                      <div className="text-sm text-muted-foreground">{order.customer.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {order.items.length} món
                      <div className="text-xs text-muted-foreground">
                        {order.items[0].name}
                        {order.items.length > 1 && ` +${order.items.length - 1} món khác`}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{order.total.toLocaleString()}₫</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{order.createdAt.split(" ")[1]}</div>
                      <div className="text-xs text-muted-foreground">{order.createdAt.split(" ")[0]}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Chi tiết đơn hàng {order.orderNumber}</DialogTitle>
                          <DialogDescription>Thông tin chi tiết và cập nhật trạng thái đơn hàng</DialogDescription>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Thông tin khách hàng</h4>
                                <p className="text-sm">{selectedOrder.customer.name}</p>
                                <p className="text-sm text-muted-foreground">{selectedOrder.customer.phone}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Thanh toán</h4>
                                <p className="text-sm">{getPaymentMethodText(selectedOrder.paymentMethod)}</p>
                                <p className="text-sm font-medium text-orange-600">
                                  {selectedOrder.total.toLocaleString()}₫
                                </p>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Sản phẩm đã đặt</h4>
                              <div className="space-y-2">
                                {selectedOrder.items.map((item: any, index: number) => (
                                  <div key={index} className="flex justify-between text-sm">
                                    <span>
                                      {item.name} x{item.quantity}
                                    </span>
                                    <span>{(item.price * item.quantity).toLocaleString()}₫</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Cập nhật trạng thái</h4>
                              <div className="flex gap-2">
                                {selectedOrder.status === "pending" && (
                                  <Button size="sm" onClick={() => updateOrderStatus(selectedOrder.id, "preparing")}>
                                    Bắt đầu pha
                                  </Button>
                                )}
                                {selectedOrder.status === "preparing" && (
                                  <Button size="sm" onClick={() => updateOrderStatus(selectedOrder.id, "ready")}>
                                    Hoàn thành
                                  </Button>
                                )}
                                {selectedOrder.status === "ready" && (
                                  <Button size="sm" onClick={() => updateOrderStatus(selectedOrder.id, "completed")}>
                                    Giao hàng
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
