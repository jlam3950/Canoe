
async function test () {
  try{
    response = await fetch('/send')
  }catch{
    console.log('early')
  }

  try {
    
    let apiKeys = await response.json()
    console.log(apiKeys)
  }catch(e){
    console.log(`oh No: ${e}`)
  }
  
}

console.log('main')

test()