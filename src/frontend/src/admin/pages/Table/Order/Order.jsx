'use client'

import { useState, useMemo } from 'react'
import { CategoryCard } from '@/src/admin/components/category-card'
import { OrderItem } from "./components/order-item"
import { OrderSummary } from "./components/order-summary"
import { ScrollArea } from "@/components/ui/scroll-area"
import { OrderProvider } from './context/OrderContext'
import { SearchBar } from '@/src/admin/components/search-bar'
import { Separator } from "@/components/ui/separator"
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { useParams } from 'react-router-dom'

const categories = [
  { title: "Pizza", itemCount: 20 },
  { title: "Burger", itemCount: 15 },
  { title: "Chicken", itemCount: 10 },
  { title: "Bakery", itemCount: 15 },
  { title: "Beverage", itemCount: 12 },
  { title: "Seafood", itemCount: 16 },
]

const menuItems = [
  { id: "1", title: "Margherita Pizza", price: 12.99, category: "Pizza" },
  { id: "2", title: "Pepperoni Pizza", price: 14.99, category: "Pizza" },
  { id: "3", title: "Vegetarian Pizza", price: 13.99, category: "Pizza" },
  { id: "4", title: "Hawaiian Pizza", price: 15.99, category: "Pizza" },
  { id: "5", title: "BBQ Chicken Pizza", price: 16.99, category: "Pizza" },
  { id: "6", title: "Mushroom Pizza", price: 13.99, category: "Pizza" },
  { id: "7", title: "Supreme Pizza", price: 17.99, category: "Pizza" },
  { id: "8", title: "Buffalo Chicken Pizza", price: 16.99, category: "Pizza" },
  { id: "9", title: "Four Cheese Pizza", price: 14.99, category: "Pizza" },
  { id: "10", title: "Meat Lovers Pizza", price: 18.99, category: "Pizza" },
  { id: "11", title: "Spinach and Feta Pizza", price: 15.99, category: "Pizza" },
  { id: "12", title: "Pesto Pizza", price: 14.99, category: "Pizza" },
  { id: "13", title: "Classic Burger", price: 10.99, category: "Burger" },
  { id: "14", title: "Cheeseburger", price: 11.99, category: "Burger" },
  { id: "15", title: "Bacon Burger", price: 12.99, category: "Burger" },
  { id: "16", title: "Veggie Burger", price: 11.99, category: "Burger" },
  { id: "17", title: "Grilled Chicken", price: 13.99, category: "Chicken" },
  { id: "18", title: "Fried Chicken", price: 12.99, category: "Chicken" },
  { id: "19", title: "Croissant", price: 3.99, category: "Bakery" },
  { id: "20", title: "Baguette", price: 2.99, category: "Bakery" },
]

export default function Order() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const {tableID} = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Navigates to the previous screen
  };

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
        <OrderProvider>
          <div className="flex h-screen bg-black text-white">
            <div className="flex-1 flex flex-col">
            <header className="flex items-center justify-between p-4 border-b border-zinc-800">
                <Button onClick={handleGoBack} variant="ghost" size="icon">
                    <ArrowLeft className="h-10 w-10" />
                </Button>
            </header>
              <div className="p-4 grid grid-cols-9 gap-1 pb-7">
                {categories.map((category) => (
                  <CategoryCard 
                    key={category.title} 
                    {...category} 
                    onClick={() => setSelectedCategory(category.title)}
                    isSelected={selectedCategory === category.title}
                  />
                ))}
              </div>
              <div className="p-4">
                <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Tìm món ăn..." />
              </div>
              <Separator className="bg-zinc-700 w-11/12 items-center mx-auto"/>
              <ScrollArea className="flex-1">
                <div className="p-4 grid grid-cols-4 gap-4">
                  {filteredItems.map((item) => (
                    <OrderItem key={item.id} {...item} />
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="w-[400px] border-transparent">
              <OrderSummary tableNumber={tableID} employeeName="Watson Joyce" onCancel= {handleGoBack} />
            </div>
          </div>
        </OrderProvider>
  )
}
