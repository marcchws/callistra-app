'use client'
import React from 'react'
import { cn } from '@/lib/utils'

interface TextEffectProps {
    children: React.ReactNode
    className?: string
    as?: keyof React.JSX.IntrinsicElements
}

export const TextEffect = ({
    children,
    className,
    as: Component = 'div',
    ...domProps
}: TextEffectProps) => {
    return React.createElement(
        Component,
        {
            className: cn('animate-fade-in', className),
            ...domProps
        },
        children
    )
}

interface AnimatedGroupProps {
    children: React.ReactNode
    className?: string
}

export const AnimatedGroup = ({ children, className, ...domProps }: AnimatedGroupProps) => {
    return (
        <div className={cn('animate-fade-in', className)} {...domProps}>
            {children}
        </div>
    )
}