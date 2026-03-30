import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/shared/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const isPasswordField = type === "password"
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={isPasswordField && isPasswordVisible ? "text" : type}
          data-slot="input"
          className={cn(
            "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base text-foreground shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
            isPasswordField && "pr-10 [&::-ms-clear]:hidden [&::-ms-reveal]:hidden",
            className
          )}
          {...props}
        />

        {isPasswordField ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label={isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setIsPasswordVisible((current) => !current)}
          >
            {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        ) : null}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
