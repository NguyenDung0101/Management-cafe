"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, Minus, Trash2, CreditCard, Banknote } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const categories = [
  { id: "all", name: "Tất cả" },
  { id: "coffee", name: "Cà phê" },
  { id: "tea", name: "Trà" },
  { id: "pastry", name: "Bánh ngọt" },
  { id: "snack", name: "Đồ ăn nhẹ" },
]

const products = [
  { id: 1, name: "Cà phê đen", price: 25000, category: "coffee", image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Cà phê sữa", price: 30000, category: "coffee", image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Cappuccino", price: 45000, category: "coffee", image: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Latte", price: 50000, category: "coffee", image: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Trà sữa", price: 35000, category: "tea", image: "/placeholder.svg?height=100&width=100" },
  { id: 6, name: "Trà đào", price: 40000, category: "tea", image: "/placeholder.svg?height=100&width=100" },
  { id: 7, name: "Bánh croissant", price: 25000, category: "pastry", image: "/placeholder.svg?height=100&width=100" },
  { id: 8, name: "Bánh tiramisu", price: 55000, category: "pastry", image: "/placeholder.svg?height=100&width=100" },
]

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  size?: string
  note?: string
}

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const { toast } = useToast()

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product: (typeof products)[0]) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter((item) => item.id !== id))
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Giỏ hàng trống",
        description: "Vui lòng thêm sản phẩm vào giỏ hàng",
        variant: "destructive",
      })
      return
    }

    // Simulate order processing
    const orderNumber = `#${String(Date.now()).slice(-6)}`

    toast({
      title: "Đặt hàng thành công!",
      description: `Đơn hàng ${orderNumber} đã được tạo`,
    })

    // Reset form
    setCart([])
    setCustomerName("")
    setCustomerPhone("")
    setIsCheckoutOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bán hàng (POS)</h1>
        <p className="text-muted-foreground">Giao diện bán hàng trực tiếp</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-20 object-cover rounded-md mb-2"
                  />
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-orange-600 font-bold text-sm mb-2">{product.price.toLocaleString()}₫</p>
                  <Button size="sm" className="w-full" onClick={() => addToCart(product)}>
                    <Plus className="h-3 w-3 mr-1" />
                    Thêm
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Giỏ hàng
                <Badge variant="secondary">{cart.length} món</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Giỏ hàng trống</p>
              ) : (
                <>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-orange-600 text-sm">{item.price.toLocaleString()}₫</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tạm tính:</span>
                      <span>{getTotalAmount().toLocaleString()}₫</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-orange-600">{getTotalAmount().toLocaleString()}₫</span>
                    </div>
                  </div>

                  <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Thanh toán
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Thanh toán đơn hàng</DialogTitle>
                        <DialogDescription>Nhập thông tin khách hàng và phương thức thanh toán</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="customerName">Tên khách hàng</Label>
                          <Input
                            id="customerName"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Nhập tên khách hàng"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="customerPhone">Số điện thoại</Label>
                          <Input
                            id="customerPhone"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder="Nhập số điện thoại"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phương thức thanh toán</Label>
                          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cash">Tiền mặt</SelectItem>
                              <SelectItem value="card">Thẻ</SelectItem>
                              <SelectItem value="transfer">Chuyển khoản</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Tổng thanh toán:</span>
                            <span className="text-orange-600">{getTotalAmount().toLocaleString()}₫</span>
                          </div>
                        </div>
                      </div>
                      <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>
                          Hủy
                        </Button>
                        <Button onClick={handleCheckout}>
                          <Banknote className="h-4 w-4 mr-2" />
                          Xác nhận thanh toán
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
