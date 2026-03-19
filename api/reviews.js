export default async function handler(req, res) {

  const db = await fetch("YOUR_DATABASE_API_ENDPOINT"); // or use direct DB if available

  // ⚠️ If you cannot connect DB directly, use your current API as fallback
  const API_URL = "https://www.biohackingcompanies.com/api/v2/users_reviews/search";

  try {

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "YOUR_API_KEY"
      },
      body: JSON.stringify({
        limit: 200,
        page: 1,
        output_type: "array"
      })
    });

    const json = await response.json();

    // 🔥 PARSE HTML (fallback only)
    const parser = new DOMParser();
    const doc = parser.parseFromString(json.message, "text/html");

    const reviews = doc.querySelectorAll(".module.search_result");

    let map = new Map();

    reviews.forEach(r => {

      const company =
        r.querySelector(".notranslate")?.innerText.trim() || "Company";

      const reviewer =
        r.innerText.match(/Submitted by (.*?) on/)?.[1] || "Anonymous";

      const rating =
        r.querySelectorAll(".fa-star, .fa-star-filled").length || 5;

      const description =
        r.querySelectorAll("p")[1]?.innerText || "";

      const dateText =
        r.innerText.match(/\d{2}\/\d{2}\/\d{4}/)?.[0] || "";

      const date = new Date(dateText);

      const reviewLink =
        r.querySelector('a[href*="/reviews/"]')?.getAttribute("href") || "";

      const link = reviewLink
        ? "https://www.biohackingcompanies.com" + reviewLink
        : "#";

      // ✅ KEEP LATEST PER COMPANY
      if(!map.has(company) || map.get(company).date < date){
        map.set(company,{
          company,
          reviewer,
          rating,
          description,
          link,
          date
        });
      }

    });

    let results = Array.from(map.values());

    // 🎲 RANDOM
    results.sort(()=>Math.random()-0.5);

    // 🎯 LIMIT
    results = results.slice(0,12);

    res.status(200).json(results);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

}
