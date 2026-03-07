export default function ContactPage() {
    return (
        <main className="bg-[#f6f4ef] text-[#111111]">
            <section className="relative overflow-hidden border-b border-black/5">
                <div className="mx-auto max-w-[1450px] px-6 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28">
                    <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-6">
                            <div className="mb-6 flex items-center gap-4">
                                <span className="h-px w-10 bg-[#f97316]" />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                    START YOUR PROJECT
                                </span>
                            </div>

                            <h1 className="max-w-[760px] text-[44px] font-black leading-[0.95] tracking-[-0.05em] md:text-[60px] lg:text-[82px]">
                                Start the Conversation with a Team Built for Real Execution.
                            </h1>

                            <p className="mt-8 max-w-[760px] text-[18px] leading-8 text-[#5f6672] md:text-[20px]">
                                Start your project with a team structured for both production
                                capability and operational clarity.
                            </p>

                            <p className="mt-6 max-w-[760px] text-[17px] leading-8 text-[#5f6672] md:text-[18px]">
                                Manufacturing is carried out through our facility in{" "}
                                <strong>Kayseri, Turkey</strong>, while our{" "}
                                <strong>U.S. operations office</strong> supports logistics,
                                administration, project communication, and coordination for
                                North American clients.
                            </p>

                            <p className="mt-6 max-w-[760px] text-[17px] leading-8 text-[#5f6672] md:text-[18px]">
                                From early planning through active execution, we help bring
                                complex physical environments forward with greater structure,
                                consistency, and control.
                            </p>
                        </div>

                        <div className="lg:col-span-6">
                            <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-10">
                                <div className="mb-6 flex items-center gap-4">
                                    <span className="h-px w-10 bg-[#f97316]" />
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                        PROJECT BRIEF
                                    </span>
                                </div>

                                <form className="space-y-5">
                                    <div>
                                        <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full rounded-[16px] border border-black/10 bg-[#f8f7f4] px-5 py-4 text-[16px] outline-none transition focus:border-[#f97316]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Company Name"
                                            className="w-full rounded-[16px] border border-black/10 bg-[#f8f7f4] px-5 py-4 text-[16px] outline-none transition focus:border-[#f97316]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="you@company.com"
                                            className="w-full rounded-[16px] border border-black/10 bg-[#f8f7f4] px-5 py-4 text-[16px] outline-none transition focus:border-[#f97316]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                                            Project Type
                                        </label>
                                        <select className="w-full rounded-[16px] border border-black/10 bg-[#f8f7f4] px-5 py-4 text-[16px] outline-none transition focus:border-[#f97316]">
                                            <option>Select Project Type</option>
                                            <option>Digital Surface Manufacturing</option>
                                            <option>Experiential Fabrication</option>
                                            <option>Large Format Printing</option>
                                            <option>Environmental Graphics</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                                            Project Description
                                        </label>
                                        <textarea
                                            rows={5}
                                            placeholder="Tell us about your environment, scope, timeline, and what support you need."
                                            className="w-full rounded-[16px] border border-black/10 bg-[#f8f7f4] px-5 py-4 text-[16px] outline-none transition focus:border-[#f97316]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="inline-flex min-h-[58px] w-full items-center justify-center rounded-[16px] bg-[#f97316] px-8 text-[13px] font-bold uppercase tracking-[0.06em] text-white transition hover:bg-[#ea580c]"
                                    >
                                        Submit Project Brief
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-black/5">
                <div className="mx-auto grid max-w-[1450px] gap-8 px-6 py-16 md:px-10 lg:grid-cols-2 lg:px-14 lg:py-24">
                    <div className="rounded-[28px] bg-[#0c0f14] p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.16)] md:p-10">
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-10 bg-[#f97316]" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                U.S. OPERATIONS OFFICE
                            </span>
                        </div>

                        <p className="text-[26px] font-black leading-tight tracking-[-0.03em] md:text-[34px]">
                            Logistics, Administration, and Project Coordination
                        </p>

                        <p className="mt-5 max-w-[640px] text-[16px] leading-8 text-white/70 md:text-[17px]">
                            This location supports logistics, administration, client
                            communication, and project coordination for active North American
                            work.
                        </p>
                    </div>

                    <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-10">
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-10 bg-[#f97316]" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                MANUFACTURING FACILITY
                            </span>
                        </div>

                        <p className="text-[26px] font-black leading-tight tracking-[-0.03em] md:text-[34px]">
                            Kayseri, Turkey
                        </p>

                        <p className="mt-5 max-w-[640px] text-[16px] leading-8 text-[#5f6672] md:text-[17px]">
                            Production and fabrication are carried out through our facility in
                            Kayseri, Turkey, where digital surface manufacturing and material
                            execution are handled with precision and consistency.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}