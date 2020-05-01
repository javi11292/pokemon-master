import { useEffect } from "react"
import Router from "next/router"

export default function Page404() {
  useEffect(() => {
    Router.replace("/[pokemon]", window.location.pathname.replace(process.env.basePath, ""))
      .catch(() => Router.replace("/"))
  }, [])
  return null
}