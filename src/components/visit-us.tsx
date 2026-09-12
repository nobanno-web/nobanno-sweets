// src/components/visit-us.tsx
"use client";

import { motion } from "motion/react";
import { MapPin, Phone, Clock } from "lucide-react";
import { storeLocation } from "@/lib/dummy-data";

export function VisitUs() {
    const mapSrc = `https://www.google.com/maps?q=${storeLocation.latitude},${storeLocation.longitude}&output=embed`;

    return (
        <section
            id="visit-us"
            className="mx-auto max-w-6xl px-4 py-16 md:py-24 scroll-mt-32"
        >
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <h2 className="font-heading font-bold text-2xl md:text-3xl mb-8 text-center">
                    Visit Us
                </h2>
                <p className="text-muted-foreground text-sm md:text-base text-center mb-8">
                    Come see us in person — fresh sweets, ready when you walk in.
                </p>

                <div className="flex flex-col md:flex-row gap-6 rounded-2xl border-2 border-foreground overflow-hidden">
                    <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                        <iframe
                            src={mapSrc}
                            className="absolute inset-0 w-full h-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Map to ${storeLocation.name}`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 bg-card p-6 md:p-8 flex flex-col justify-center gap-5">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                            <p className="text-sm md:text-base">{storeLocation.address}</p>
                        </div>

                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                            <p className="text-sm md:text-base">{storeLocation.hours}</p>
                        </div>

                        <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                            <a
                                href={`tel:${storeLocation.phone}`}
                                className="text-sm md:text-base hover:text-primary transition-colors"
                            >
                                {storeLocation.phone}
                            </a>
                        </div>
                        <a

                            href={`https://www.google.com/maps/dir/?api=1&destination=${storeLocation.latitude},${storeLocation.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-center bg-primary text-primary-foreground font-heading font-medium text-sm px-6 py-3 rounded-xl border-2 border-foreground hover:opacity-90 transition-opacity"
                        >
                            Get Directions
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}