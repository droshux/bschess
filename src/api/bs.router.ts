import express, {Request, Response } from "express"
import * as BSService from "./bs.service.js"
import { BS } from "./bs.js"
import { HttpStatus } from "http-status-ts"
import * as dotenv from "dotenv"

export const router = express.Router()

// GET bss
router.get("/", async (_req: Request, res: Response) => {
  try {
    res.status(HttpStatus.OK).send(await BSService.findall());
  } catch (e: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message)
  }
})

// GET bss/:id
router.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10)
  try {
    const bs: BS = await BSService.find(id)
    if (bs) return res.status(HttpStatus.OK).send(bs)
    res.status(HttpStatus.NOT_FOUND).send("bs not found")
  } catch (e: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message)
  }
})

// POST bss
router.post("/", async (req: Request, res: Response) => {
  try {
    res.status(HttpStatus.CREATED).json(await BSService.create(req.body))
  } catch (e: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message)
  }
})

// Password protected
// PUT bss/:id
router.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10)
  if (!process.env.ADMINPWD || req.query.pwd != process.env.ADMINPWD)
    return res.status(HttpStatus.NOT_ACCEPTABLE).send("Password Incorrect!")
  try {
    if (await BSService.find(id)) 
      return res.status(HttpStatus.OK).json(BSService.update(id, req.body))
    res.status(HttpStatus.CREATED).json(BSService.create(req.body))
  } catch (e: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message)
  }
})

// Password protected
// DELETE bss/:id
router.delete("/:id", async (req: Request, res: Response) => {
  if (!process.env.ADMINPWD || req.query.pwd != process.env.ADMINPWD)
    return res.status(HttpStatus.NOT_ACCEPTABLE).send("Password Incorrect!")
  try {
    await BSService.remove(parseInt(req.params.id, 10))
    res.sendStatus(HttpStatus.NO_CONTENT)
  } catch (e: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message)
  }
})
