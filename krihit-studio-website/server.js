require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "12kb" }));
app.use(
  "/api/chat",
  rateLimit({
    windowMs: 60 * 1000,
    limit: 12,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  }),
);
app.use(express.static(path.join(__dirname, "public")));
const facts = `You are the friendly wedding consultant for KRIHIT STUDIO, an Indian wedding photography and films studio. Speak naturally and warmly in the language the customer uses (Hindi, Hinglish, or English). Be accurate, never invent services, testimonials, availability, past clients, addresses, email addresses, or discounts. Explain packages clearly and ask one helpful follow-up when useful. Packages currently listed: Starter Photography ₹20,000: 4-day photo coverage, all photos on pen drive; no video or album. Wedding Story ₹35,000: 4-day photo coverage, basic-edited wedding video up to 3 hours, 60-page album, all photos on pen drive, 3 Instagram reels, 5 edited WhatsApp-status photos during functions. Cinematic Wedding ₹50,000: 4-day photo coverage, 80-page premium album, colour-graded wedding film up to 3 hours, cinematic highlight, 3 reels plus 1 trending-style Instagram reel, all photos on pen drive, 5 edited WhatsApp-status photos during functions. Luxury Signature ₹1,00,000: 4-day premium photo/cinematic coverage, 100-page luxury album with premium box, colour-graded wedding film up to 3 hours, cinematic highlight and couple teaser, 5 cinematic reels plus 1 Instagram reel, drone footage subject to permission/weather/availability, all photos on pen drive, 5 edited WhatsApp-status photos during functions, gimbal shots, candid photography, extra lighting, dedicated team subject to availability. Booking process: customer selects a package, contacts the studio to confirm date availability and deliverables, pays 50% advance only after details are agreed, and receives a booking confirmation slip/receipt after the studio verifies payment. The booking is final only after written confirmation from the studio; a payment screenshot alone is not confirmation. Remaining 50% is due before final delivery. Travel, accommodation, extra hours/days/equipment may cost extra. Dates and team availability must be confirmed by the studio; do not promise availability. WhatsApp contact: +91 7803998864. Instagram: @def_kishuu_. If asked to book, collect name, wedding date, location, and preferred package, then invite them to contact via WhatsApp; do not claim you submitted a booking. Do not request sensitive payment details.`;

function basicReply(message) {
  const m = message.toLowerCase();
  const wa =
    "WhatsApp par booking ya date confirm karein: https://wa.me/917803998864";
  if (/(hello|hi\b|hey|namaste|namaskar|hii|helo)/i.test(m))
    return "Namaste! 🙏 KRIHIT STUDIO mein welcome hai. Main wedding photography, films aur packages ke baare mein help kar sakta hoon. Aapko package details chahiye ya booking karni hai?";
  if (/(20,?000|20000|starter|photography only|sirf photo)/i.test(m))
    return "📸 Starter Photography — ₹20,000\n• 4-day photo coverage\n• Saari photos pen drive mein\n• Is package mein video aur album included nahi hain.\nKya aap is package ke liye wedding date aur location share karna chahenge?";
  if (/(35,?000|35000|wedding story)/i.test(m))
    return (
      "💍 Wedding Story — ₹35,000\n• 4-day photo coverage\n• Basic-edited wedding video, up to 3 hours\n• 60-page album\n• All photos pen drive mein\n• 3 Instagram reels\n• Functions ke dauran 5 edited WhatsApp-status photos\n" +
      wa
    );
  if (/(50,?000|50000|cinematic)/i.test(m))
    return (
      "🎬 Cinematic Wedding — ₹50,000\n• 4-day photo coverage\n• 80-page premium album\n• Colour-graded wedding film, up to 3 hours\n• Cinematic highlight\n• 3 reels + 1 trending-style Instagram reel\n• All photos pen drive mein aur functions ke dauran 5 edited status photos\n" +
      wa
    );
  if (/(1,?00,?000|100000|1 lakh|one lakh|luxury|signature)/i.test(m))
    return (
      "✨ Luxury Signature — ₹1,00,000\n• 4-day premium photo + cinematic coverage\n• 100-page luxury album with premium box\n• Colour-graded wedding film, cinematic highlight aur couple teaser\n• 5 cinematic reels + 1 Instagram reel\n• Drone footage (permission, weather aur availability par depend)\n• Gimbal, candid photography, extra lighting, dedicated team subject to availability\n• All photos pen drive mein + 5 edited status photos\nTravel, accommodation, extra hours/days/equipment extra ho sakte hain. " +
      wa
    );
  if (/(package|price|cost|rate|kitne|kitna|budget|पैकेज|कीमत|कितना)/i.test(m))
    return "Hamare wedding packages hain:\n📸 Starter Photography — ₹20,000\n💍 Wedding Story — ₹35,000\n🎬 Cinematic Wedding — ₹50,000\n✨ Luxury Signature — ₹1,00,000\nAapka budget kya hai? Main us package ki full details bata sakta hoon.";
  if (/(album|page|pages|पेज)/i.test(m))
    return "Album options: Wedding Story mein 60-page album, Cinematic Wedding mein 80-page premium album, aur Luxury Signature mein 100-page luxury album with premium box. Starter Photography mein album included nahi hai.";
  if (/(reel|instagram|video|film|cinematic|वीडियो)/i.test(m))
    return "Wedding Story mein 3 reels aur basic-edited wedding video (up to 3 hours) hai. ₹50,000 package mein colour-graded film, cinematic highlight aur 4 reels total. Luxury package mein cinematic highlight, couple teaser aur 6 reels total hain. Aap kis package ki detail chahenge?";
  if (/(advance|payment|booking|book|confirm|बुकिंग|एडवांस)/i.test(m))
    return (
      "Booking ka sahi tarika:\n1. Pehle apna package select karein.\n2. WhatsApp par wedding date, location aur package ki availability/deliverables confirm karein.\n3. Details agree hone ke baad 50% advance pay karein.\n4. Payment verify hone par KRIHIT STUDIO aapko booking confirmation slip/receipt issue karega. Wahi aapki written booking confirmation hogi. Sirf payment screenshot bhejne se booking final nahi hoti.\nRemaining 50% final delivery se pehle payable hai. " +
      wa
    );
  if (/(date|available|availability|location|where|कहाँ|तारीख)/i.test(m))
    return "Wedding date aur team availability confirm karne ke liye humein WhatsApp karein: https://wa.me/917803998864. Aap date, venue/location aur preferred package share kar sakte hain.";
  if (/(contact|whatsapp|instagram|phone|number|संपर्क)/i.test(m))
    return "Aap humein WhatsApp par +91 7803998864 par contact kar sakte hain. Instagram: @def_kishuu_. WhatsApp link: https://wa.me/917803998864";
  return "Main KRIHIT STUDIO ke wedding packages, photography, films, albums aur booking process ke baare mein help kar sakta hoon. Aap ₹20,000, ₹35,000, ₹50,000 ya ₹1,00,000 package ke baare mein pooch sakte hain.";
}

app.post("/api/chat", async (req, res) => {
  const message =
    typeof req.body.message === "string" ? req.body.message.trim() : "";
  if (!message || message.length > 1200)
    return res
      .status(400)
      .json({ error: "Please send a message under 1200 characters." });
  if (!process.env.OPENAI_API_KEY)
    return res.json({ reply: basicReply(message), mode: "basic" });
  try {
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        messages: [
          { role: "system", content: facts },
          { role: "user", content: message },
        ],
        temperature: 0.6,
        max_tokens: 350,
      }),
    });
    const data = await upstream.json();
    if (!upstream.ok)
      return res.status(502).json({
        error:
          "Sorry, chat is temporarily unavailable. Please WhatsApp us at +91 7803998864.",
      });
    res.json({
      reply:
        data.choices?.[0]?.message?.content ||
        "Sorry, I could not prepare an answer. Please try again.",
    });
  } catch (e) {
    res.status(502).json({
      error: "Connection issue. Please WhatsApp us at +91 7803998864.",
    });
  }
});
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html")),
);
app.listen(PORT, () =>
  console.log(`KRIHIT STUDIO running at http://localhost:${PORT}`),
);
