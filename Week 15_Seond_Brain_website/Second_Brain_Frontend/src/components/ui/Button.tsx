
interface ButtonProps {
  variant : "Primary" | "Secondary"
  size : "sm" | "md" | "lg" 
  text : string 
  startIcon ?: any 
  endIcon ?: any 
  onClick : () => void
}

const variantStyles = {
   "Primary" : "bg-purple-600 text-white",
   "Secondary" : "bg-purple-300 text-purple-600"
}

const defaultStyles = "rounded-md"

const sizeStyles = {
   "sm" : "p-2",
   "md" : "p-4",
   "lg" : "p-6"
}

export const Button = (props : ButtonProps) => { 
  return <button className = {`${variantStyles[props.variant]} bg-pur ${defaultStyles} ${sizeStyles[props.size]}`}>{props.text}</button>

}

