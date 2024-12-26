'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

const OrderContext = createContext(undefined)

export function OrderProvider({ children }) {
  const [orderItems, setOrderItems] = useState([])

  const addItem = useCallback((item) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.dishID=== item.dishID)
      if (existingItem) {
        return prevItems.map((i) =>
          i.dishID === item.dishID ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((dishID) => {
    setOrderItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.dishID === dishID) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 })
          }
        } else {
          acc.push(item)
        }
        return acc
      }, [])
    )
  }, [])

  const updateQuantity = useCallback((dishID, quantity) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.dishID === dishID ? { ...item, quantity } : item
      )
    )
  }, [])

  return (
    <OrderContext.Provider value={{ orderItems, addItem, removeItem, updateQuantity }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return context
}
