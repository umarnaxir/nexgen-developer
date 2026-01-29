"use client";

import { services } from "../data";
import ServiceCard from "./ServiceCard";

export default function ServicesList() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto" data-aos="fade-up">
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} index={index} />
      ))}
    </div>
  );
}
