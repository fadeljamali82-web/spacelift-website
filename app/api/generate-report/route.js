import OpenAI from "openai"
import { Resend } from "resend"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed")
    }

    const { name, email, company, industry, environment, goals } = req.body

    const prompt = `
You are SpaceLift Studio.

Create a premium consulting insight report.

Client name: ${name}
Company: ${company}
Industry: ${industry}

Environment description:
${environment}

Goals:
${goals}

Write a short but premium consulting memo.

Sections:

Executive Snapshot  
Environment & Market Diagnosis  
Opportunity Gaps  
Strategic Recommendations  
SpaceLift Fit Review  
Recommended Next Path

Tone: professional strategy consultant
Length: 700-900 words
`

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "user", content: prompt }
        ]
    })

    const report = completion.choices[0].message.content

    await resend.emails.send({
        from: "SpaceLift Studio <hello@spacelift-studio.com>",
        to: email,
        subject: "Your SpaceLift Environment Insight Report",
        html: `
    <div style="font-family:Arial;max-width:700px;margin:auto">
      <h2>SpaceLift Studio</h2>
      <p>Your environment insight report:</p>
      <pre style="white-space:pre-wrap">${report}</pre>
    </div>
    `
    })

    res.status(200).json({ success: true })
}