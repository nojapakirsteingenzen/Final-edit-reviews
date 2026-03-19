export default async function handler(req, res) {

  const API_URL = "https://www.biohackingcompanies.com/api/v2/users_reviews/search";

  try {

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "38b2668904a5e2839b6106773444040b"
      },
      body: JSON.stringify({
        limit: 200,
        page: 1,
        output_type: "array"
      })
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "Invalid JSON from API",
        raw: text
      });
    }

    // ✅ FIX CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).json(data);

  } catch (error) {

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(500).json({
      error: error.message
    });

  }

}
