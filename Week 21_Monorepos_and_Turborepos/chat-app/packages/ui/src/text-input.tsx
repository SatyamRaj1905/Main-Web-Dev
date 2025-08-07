interface PropType{
    placeholder : string,
    size : "big" | "small"
}


export function TextInput({placeholder, size} : PropType){
    return(
        <input placeholder={placeholder} style = {{
            padding : size == "big" ? 20 : 10,
            margin : 10,
            borderColor : "Black",
            borderWidth : 1
        }}></input>
    )
}