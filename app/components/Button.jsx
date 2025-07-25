"use client";

import { forwardRef } from "react";
import { cn } from "../utils/cn";

const Button = forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      icon,
      iconPosition = "right",
      loading = false,
      disabled = false,
      fullWidth = false,
      href,
      download,
      target,
      rel,
      onClick,
      ...props
    },
    ref
  ) => {
    // Base styles that apply to all buttons
    const baseStyles = cn(
      "relative inline-flex items-center justify-center font-medium",
      "transition-all duration-200 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "group overflow-hidden",
      fullWidth && "w-full"
    );

    // Variant styles updated for dark theme
    const variants = {
      primary: cn(
        "bg-[#ff3f81] text-white border border-[#ff3f81]",
        "shadow-[0_0_20px_rgba(255,63,129,0.3)]",
        "hover:bg-[#ff3f81]/90 hover:shadow-[0_0_30px_rgba(255,63,129,0.5)] hover:-translate-y-0.5",
        "active:translate-y-0",
        "focus-visible:ring-[#ff3f81]"
      ),
      secondary: cn(
        "bg-white/10 text-white border border-white/20",
        "backdrop-blur-sm",
        "hover:bg-white/20 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-0.5",
        "active:translate-y-0",
        "focus-visible:ring-white/50"
      ),
      ghost: cn(
        "bg-transparent text-white/80 border border-transparent",
        "hover:bg-white/10 hover:text-white hover:border-white/20",
        "focus-visible:ring-white/50"
      ),
      gradient: cn(
        "bg-gradient-to-r from-[#ff3f81] to-purple text-white",
        "shadow-[0_0_20px_rgba(255,63,129,0.3)]",
        "hover:shadow-[0_0_30px_rgba(255,63,129,0.5)] hover:-translate-y-0.5",
        "active:translate-y-0",
        "focus-visible:ring-[#ff3f81]",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-[#ff3f81]/80 before:to-purple/80",
        "before:opacity-0 before:transition-opacity before:duration-200",
        "hover:before:opacity-100",
        "[&>*]:relative [&>*]:z-10"
      ),
    };

    // Size styles
    const sizes = {
      sm: "text-sm px-4 py-2 rounded-lg gap-1.5",
      md: "text-base px-6 py-3 rounded-xl gap-2",
      lg: "text-lg px-8 py-4 rounded-2xl gap-2.5",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    // Loading spinner component
    const LoadingSpinner = () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );

    // Magnetic effect on hover (subtle pull towards cursor)
    const handleMouseMove = (e) => {
      if (disabled || loading) return;

      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    };

    const handleMouseLeave = (e) => {
      if (disabled || loading) return;
      e.currentTarget.style.transform = "";
    };

    // Content with loading state
    const content = (
      <>
        {loading && <LoadingSpinner />}
        <span
          className={cn(
            "inline-flex items-center gap-2",
            loading && "opacity-0"
          )}
        >
          {icon && iconPosition === "left" && (
            <span className="transition-transform duration-200 group-hover:scale-110">
              {icon}
            </span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              {icon}
            </span>
          )}
        </span>
      </>
    );

    // Render as link if href is provided
    if (href) {
      const isExternal = href.startsWith("http");
      const linkProps = {
        href,
        download,
        target: target || (isExternal ? "_blank" : undefined),
        rel: rel || (isExternal ? "noopener noreferrer" : undefined),
      };

      return (
        <a
          ref={ref}
          className={classes}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          {...linkProps}
          {...props}
        >
          {content}
        </a>
      );
    }

    // Render as button
    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        disabled={disabled || loading}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
