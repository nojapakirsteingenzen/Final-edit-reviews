export default async function handler(req, res) {

  const API_URL = "https://www.biohackingcompanies.com/api/v2/users_reviews/search";

  try {

    let allResults = [];

    // 🔥 FETCH MULTIPLE PAGES
    for(let p = 1; p <= 5; p++){

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "YOUR_API_KEY"
        },
        body: JSON.stringify({
          limit: 50,
          page: p,
          output_type: "array"
        })
      });

      const json = await response.json();

      if(json.message){
        allResults.push(json.message);
      }

    }

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json({
      message: allResults.join("") // merge HTML
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

}
