"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/language-context";
import { motion } from "framer-motion";

type Currency = "denari" | "dinar" | "dollar";

export default function PricingTable() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("dollar");

  // Initialize on mount and update when language changes
  useEffect(() => {
    setMounted(true);
    if (language === "mk") {
      setSelectedCurrency("denari");
    } else if (language === "sr") {
      setSelectedCurrency("dinar");
    } else {
      setSelectedCurrency("dollar");
    }
  }, [language]);

  const pricingData = t("services.pricing.services") as Record<string, any>;

  const currencySymbols = {
    denari: "ден",
    dinar: "дин",
    dollar: "$",
  };

  const services = [
    {
      key: "webdev",
      title: pricingData.webdev.title,
      duration: pricingData.webdev.duration,
      prices: {
        denari: pricingData.webdev.denari,
        dinar: pricingData.webdev.dinar,
        dollar: pricingData.webdev.dollar,
      },
      note: pricingData.webdev.note,
    },
    {
      key: "design",
      title: pricingData.design.title,
      duration: pricingData.design.duration,
      prices: {
        denari: pricingData.design.denari,
        dinar: pricingData.design.dinar,
        dollar: pricingData.design.dollar,
      },
      note: pricingData.design.note,
    },
    {
      key: "mobile",
      title: pricingData.mobile.title,
      duration: pricingData.mobile.duration,
      prices: {
        denari: pricingData.mobile.denari,
        dinar: pricingData.mobile.dinar,
        dollar: pricingData.mobile.dollar,
      },
      note: pricingData.mobile.note,
    },
    {
      key: "ai",
      title: pricingData.ai.title,
      duration: pricingData.ai.duration,
      prices: {
        denari: pricingData.ai.denari,
        dinar: pricingData.ai.dinar,
        dollar: pricingData.ai.dollar,
      },
      note: pricingData.ai.note,
    },
    {
      key: "poc",
      title: pricingData.poc.title,
      duration: pricingData.poc.duration,
      prices: {
        denari: pricingData.poc.denari,
        dinar: pricingData.poc.dinar,
        dollar: pricingData.poc.dollar,
      },
      note: pricingData.poc.note,
    },
    {
      key: "ngo",
      title: pricingData.ngo.title,
      duration: pricingData.ngo.duration,
      prices: {
        denari: pricingData.ngo.denari,
        dinar: pricingData.ngo.dinar,
        dollar: pricingData.ngo.dollar,
      },
      note: pricingData.ngo.note,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("services.pricing.title")}
          </h2>
          <p className="text-lg text-gray-600">
            {mounted && selectedCurrency === "denari" && t("services.pricing.notedenari")}
            {mounted && selectedCurrency === "dinar" && t("services.pricing.notedinar")}
            {mounted && selectedCurrency === "dollar" && t("services.pricing.notedollar")}
          </p>
        </motion.div>

        {/* Currency Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-3 mb-10 flex-wrap"
        >
          {mounted && ["denari", "dinar", "dollar"].map((currency) => (
            <button
              key={currency}
              onClick={() => setSelectedCurrency(currency as Currency)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                selectedCurrency === currency
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400"
              }`}
            >
              {currency === "denari"
                ? "Денари"
                : currency === "dinar"
                ? "Динари"
                : "Долари"}
            </button>
          ))}
        </motion.div>

        {/* Pricing Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="overflow-x-auto rounded-lg shadow-lg"
        >
          <table className="w-full border-collapse bg-white">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">
                  {t("services.pricing.title").split(" ")[0]}
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  {t("services.pricing.duration")}
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  {t("services.pricing.startingPrice")}
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  {t("services.pricing.note")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service, index) => (
                <motion.tr
                  key={service.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {service.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{service.duration}</td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-blue-600">
                      {service.prices[selectedCurrency]}{" "}
                      {currencySymbols[selectedCurrency]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {service.note}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-lg"
        >
          <p className="text-gray-700">
            <strong>Напомена:</strong> Цените се примерни и може да варираат во
            зависност од сложеноста на проектот. За поточна понуда, ве молиме
            контактирајте не директно.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
