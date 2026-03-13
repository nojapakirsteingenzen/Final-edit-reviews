export default async function handler(req, res) {

const API_URL = "https://www.biohackingcompanies.com/api/v2/users_reviews/search";

try {

const response = await fetch(API_URL,{
method:"POST",
headers:{
"Content-Type":"application/json",
"X-Api-Key":"38b2668904a5e2839b6106773444040b"
},
body:JSON.stringify({
limit:100,
page:1,
output_type:"array"
})
});

const data = await response.json();

res.setHeader("Access-Control-Allow-Origin","*");

res.status(200).json(data);

}

catch(err){

res.status(500).json({
error:err.message
});

}

}
