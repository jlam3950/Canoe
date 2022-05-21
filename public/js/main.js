


const sendKeys = async () => {
  try {
    let response = await fetch('/send')
    let apiKeys = await response.json()
    return apiKeys
  }catch(e){
    console.log(`oh No: ${e}`)
  }
  
 
}
// example on how to get the Keys, use async await for your function
// const getKeys = async () =>{
//   let keys = await sendKeys()
//   console.log(keys)
// }

// getKeys()



