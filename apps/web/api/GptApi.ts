
 async function chatCompletion(params){
  const response = await fetch(`/api/gpt/chat-completion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

   if (!response.ok) {
     throw new Error('Something went wrong.')
   }

  return response.json();
}

export default {
  chatCompletion
}
