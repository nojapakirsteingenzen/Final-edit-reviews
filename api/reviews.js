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
        limit: 50,
        page: 1,
        output_type: "array"
      })
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        error: "API returned non-JSON response",
        raw: text
      });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

}
