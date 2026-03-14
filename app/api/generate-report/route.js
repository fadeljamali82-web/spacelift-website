const INDUSTRY_PLAYBOOKS = {
    hospitality: `
Hospitality industry intelligence:
- Guest expectations are rising faster than renovation cycles.
- Many properties suffer from a perception gap: operations may be strong, but environments feel visually dated.
- Common pain points include weak arrival impact, inconsistent guest-facing finishes, aging corridors, and underleveraged public spaces.
- Stronger operators increasingly use phased environment refresh strategies instead of waiting for full renovation cycles.
- Premium surface transformation can improve perceived quality, guest experience, and brand coherence without major structural disruption.
`,

    "corporate workplace": `
Corporate workplace intelligence:
- Hybrid work has changed the role of the office from routine workspace to experience environment.
- Many workplaces are over-allocated to desks and under-optimized for collaboration, identity, and culture.
- Common pain points include generic environments, weak brand presence, low experiential value, and poor alignment between physical space and modern workplace strategy.
- Stronger operators use the environment to support culture, client impression, and employee engagement.
- Upgrades that improve identity, flexibility, and perceived quality can reposition the workplace without full reconstruction.
`,

    retail: `
Retail intelligence:
- Physical stores increasingly function as brand experience environments rather than purely transactional spaces.
- Common pain points include generic store feel, weak experiential hierarchy, outdated surfaces, and inconsistency between flagship identity and network rollout.
- Stronger retailers use surfaces and environmental storytelling to extend brand identity and encourage dwell time.
- Continuous environment refresh strategies often outperform infrequent full redesigns.
- Surface transformation can enhance brand impression and scalability across locations.
`,

    healthcare: `
Healthcare intelligence:
- Patient perception is influenced not only by care quality but by environment quality, clarity, and emotional comfort.
- Common pain points include outdated waiting areas, impersonal reception spaces, aging corridors, and a mismatch between clinical quality and visual experience.
- Stronger healthcare operators increasingly invest in patient-centered environments without always relying on major capital renovation.
- Surface and finish upgrades can improve comfort, confidence, and perception while preserving operational continuity.
`,

    "event venue": `
Event and venue intelligence:
- Event planners increasingly choose venues based on visual flexibility, experience value, and differentiation, not just capacity.
- Common pain points include static ballroom aesthetics, visually dated finishes, limited transformation capability, and weak distinctiveness in planner perception.
- Stronger venues use adaptable environments and surface transformation to support a broader range of event identities.
- Strategic visual refreshes can improve competitiveness without major reconstruction.
`,

    "mixed-use residential": `
Mixed-use and residential development intelligence:
- Tenant and visitor expectations increasingly center on lifestyle experience, not just architecture and amenities.
- Common pain points include aging shared spaces, weak first impression in lobbies and corridors, inconsistent amenity aesthetics, and visual lag versus newer competing developments.
- Stronger operators use periodic environment refreshes to preserve prestige and perceived asset value.
- Surface transformation can elevate shared spaces while minimizing operational disruption.
`,
};

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            name = "",
            company = "",
            email = "",
            industry = "",
            locations = "",
            timeline = "",
            scope = "",
            environment = "",
            goals = "",
            constraints = "",
        } = body;

        if (!industry || !environment || !goals || !company || !name) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Missing required fields.",
                }),
                { status: 400 }
            );
        }

        const industryPack =
            INDUSTRY_PLAYBOOKS[industry] ||
            `General environment intelligence:
- The opportunity should be evaluated through perception, consistency, surface quality, brand expression, and rollout feasibility.
- Stronger operators typically improve high-visibility environments before pursuing broader structural change.
`;

        const prompt = `
You are SpaceLift Studio.

Write a premium two-page strategic memo that feels like a high-value consulting brief.
It must sound expensive, sharp, industry-aware, and useful.
Do not mention AI.
Do not sound generic.
Do not sound like a print shop.
Do not use hype language.

Use the following report structure exactly:

1. Executive Snapshot
2. Industry & Market Dynamics
3. Key Environment Gaps
4. Strategic Recommendations
5. What Stronger Operators Usually Do
6. SpaceLift Relevance
7. Recommended Next Path

Use the industry intelligence below as the factual strategic lens:

${industryPack}

Now personalize the report using these client details:

Name: ${name}
Company: ${company}
Email: ${email}
Industry: ${industry}
Number of locations: ${locations}
Timeline: ${timeline}
Scope of work: ${scope}
Environment description: ${environment}
Goals: ${goals}
Constraints: ${constraints}

Requirements:
- Make it feel personalized
- Reference their number of locations, timeline, scope, and stated goals naturally
- Provide real pain points and practical recommendations relevant to this industry
- Keep it concise but substantial
- Make it read like a premium consulting memo
- Length target: 1100 to 1600 words
`;

        const ollamaRes = await fetch("https://ollama.com/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-oss:120b",
                stream: false,
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a premium strategic environment consultant writing for SpaceLift Studio.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            }),
        });

        if (!ollamaRes.ok) {
            const text = await ollamaRes.text();
            return new Response(
                JSON.stringify({
                    success: false,
                    error: `Ollama Cloud request failed: ${text}`,
                }),
                { status: 500 }
            );
        }

        const data = await ollamaRes.json();
        const report = data?.message?.content || "";

        if (!report) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "No report generated.",
                }),
                { status: 500 }
            );
        }

        return Response.json({
            success: true,
            report,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                error: error?.message || "Unknown error",
            }),
            { status: 500 }
        );
    }
}