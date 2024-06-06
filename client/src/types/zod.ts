import { z } from 'zod'

export const productItemSchema = z.object({
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  _id: z.string(),
})

export const cartItemSchema = z.object({
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  _id: z.string(),
  productId: z.string()
})

/*
title, price, quantity, _id
*/