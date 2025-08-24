
// Below is the function to create hash (a link which is unique to everyone)

export function random(len : number){
    let options = "qwertyuiopasdfghjklzxcvbnm1234567890"
    let ans = ""
    let length = options.length

    for(let i = 0; i < len; i++){
        ans = ans + options[Math.floor((Math.random() * length))]

    }
    return ans;
}
