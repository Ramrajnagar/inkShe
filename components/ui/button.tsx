import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95",
    {
        variants: {
            variant: {
                default: "bg-ink-pink text-ink-text hover:bg-ink-blush shadow-md hover:shadow-lg",
                premium: "bg-gradient-to-r from-ink-pink to-ink-purple text-white shadow-lg hover:shadow-xl hover:from-ink-blush hover:to-ink-purple border border-white/20",
                destructive:
                    "bg-red-500 text-destructive-foreground hover:bg-red-500/90",
                outline:
                    "border border-ink-text/20 bg-background hover:bg-ink-pink/10 hover:border-ink-pink",
                secondary:
                    "bg-ink-neutral text-ink-text hover:bg-ink-pink/20",
                ghost: "hover:bg-ink-pink/10 hover:text-ink-blush",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-9 rounded-full px-3",
                lg: "h-12 rounded-full px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
