"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "../contexts/language-context"

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-20 md:py-32 bg-neutral-100">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t("contact.title")}</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          </div>
          <form className="bg-white p-8 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-neutral-700">
                  {t("contact.name")}
                </label>
                <Input id="name" type="text" className="w-full" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-700">
                  {t("contact.email")}
                </label>
                <Input id="email" type="email" className="w-full" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-neutral-700">
                {t("contact.subject")}
              </label>
              <Input id="subject" type="text" className="w-full" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-neutral-700">
                {t("contact.message")}
              </label>
              <Textarea id="message" rows={5} className="w-full" />
            </div>
            <Button type="submit" className="w-full bg-neutral-900 hover:bg-neutral-800 text-white">
              {t("contact.send")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

